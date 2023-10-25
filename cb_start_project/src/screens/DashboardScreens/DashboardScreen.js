import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
  Dimensions,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleLineChart from 'src/components/molecules/LineChart';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import {
  getAllBanks,
  getBankConversion,
  getBankBalance,
  conversionLastDaysData,
} from 'src/redux/content/operations';
import React, { useState, useEffect, useRef } from 'react';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import api from 'src/services/interceptor';
// import ModalDropdown from 'react-native-modal-dropdown';
import ModalDropdown from 'src/components/molecules/ModalDropdown';
import SimpleText from 'src/components/atoms/SimpleText';
import MainLoader from 'src/components/molecules/MainLoader';
import { FormattedMessage } from 'react-intl';
import SimpleButton from 'src/components/atoms/SimpleButton';
import Datepicker from 'src/components/atoms/Datepicker';
import StyledCalendar from 'src/components/molecules/StyledCalendar';

const calendarIcon = require('src/images/calendar_icon.png');
const arrowDown = require('src/images/arrow_down.png');
const arrowUp = require('src/images/arrow_up.png');

const DashboardScreen = ({ navigation, setBalancePeriod, balancePeriod }) => {
  const initialDateString = new Date().toISOString().slice(0, 10);
  const initialDateMsec = new Date(`${initialDateString}T00:00:00.000Z`).getTime();

  const [isDropdownOpen, setIsDropdownOpen] = useState();
  const [selectedBank, setSelectedBank] = useState('0');
  const [selectedDiagram, setSelectedDiagram] = useState();
  const [isShowDiagramCount, setIsShowDiagramCount] = useState(false);
  const [inputsData, setInputsData] = useState({});
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const [banks, setBanks] = useState([]);
  const [initialBank, setInitialBank] = useState('');
  const [chartUploadCurrency, setChartUploadCurrence] = useState('EUR');

  const [banksNames, setBanksNames] = useState([]);
  const [bankBalance, setBankBalance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedDay, setFocusedDay] = useState('start');
  const [currentBankConversion, setCurrentBankConversion] = useState({});

  const [isTimezoneDropdownOpen, setIsTimezoneDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isConversionVisible, setIsConversionVisible] = useState(false);
  const [approvedDataChart, setApprovedDataChart] = useState([]);
  const [declinedDataChart, setDeclinedDataChart] = useState([]);
  const [processingDataChart, setProcessingDataChart] = useState([]);

  const approvedValue = currentBankConversion?.approvedCount || 0;
  const declinedValue = currentBankConversion?.declinedCount || 0;
  const { width } = Dimensions.get('window');
  const refTimezone = useRef();
  const refCurrency = useRef();
  const refStatus = useRef();

  const timezones = [
    { value: 'UTC0', code: 'Etc/UTC' },
    {
      value: '(UTC+0) Dublin, Lisbon, London',
      code: 'Europe/London',
    },
    {
      value: '(UTC+1) Berlin, Vienna, Rome, Paris',
      code: 'Europe/Paris',
    },
    { value: '(UTC+2) Athens, Kiev, Riga', code: 'Europe/Riga' },
    {
      value: '(UTC+3) Minsk, Moscow, St. Petersburg',
      code: 'Europe/Moscow',
    },
    {
      value: '(UTC+4) Baku, Yerevan, Saratov, Tbilisi',
      code: 'Asia/Baku',
    },
    {
      value: '(UTC+5) Tashkent, Yekaterinburg',
      code: 'Asia/Tashkent',
    },
    {
      value: '(UTC +5.5) Mumbai, New Delhi, Sri Lanka',
      code: 'Asia/Kolkata',
    },
    { value: '(UTC+6) Astana, Omsk', code: 'Asia/Omsk' },
  ];

  const currencies = [
    { value: 'EUR' },
    { value: 'USD' },
    { value: 'RUB' },
    { value: 'KZT' },
    { value: 'INR' },
    { value: 'BRL' },
  ];

  let approvedPercent, declinedPercent;
  if (approvedValue === 0 && declinedValue === 0) {
    approvedPercent === 0;
    declinedPercent === 0;
  } else if (approvedValue === 0) {
    approvedPercent = 0;
    declinedPercent = 100;
  } else if (declinedValue === 0) {
    approvedPercent = 100;
    declinedPercent = 0;
  } else if (approvedValue <= declinedValue) {
    approvedPercent = Math.round(100 / (2 * (declinedValue / approvedValue)));
    declinedPercent = Math.abs(approvedPercent - 100);
  } else if (approvedValue > declinedValue) {
    declinedPercent = Math.round(100 / (2 * (approvedValue / declinedValue)));
    approvedPercent = Math.abs(declinedPercent - 100);
  }
  const data = [
    {
      value: approvedValue,
      text: `${approvedPercent}%`,
      color: 'rgba(162, 223, 141, 0.6)',
      textColor: '#262626',
      onPress: () => {
        setSelectedDiagram({ name: 'approve', title: `Approved: count: ${approvedValue}` });
        setIsShowDiagramCount(true);
      },
    }, //APPROVE
    {
      value: declinedValue,
      color: 'rgba(162, 223, 141, 0)',
      text: `${declinedPercent}%`,
      onPress: () => {
        setSelectedDiagram({ name: 'decline', title: `Declined: count: ${declinedValue}` });
        setIsShowDiagramCount(true);
      },
    }, //DECLINE
  ];
  const data2 = [
    {
      value: 1,
      color: '#FF7676E5',
      textColor: '#262626',
      // shiftTextX: -50,
    },
  ];
  //=======
  useEffect(() => {
    setIsLoading(true);
    getBanks();
    setInputsData((prev) => ({
      ...prev,
      startDate: { dateString: initialDateString, timestamp: initialDateMsec },
      endDate: { dateString: initialDateString, timestamp: initialDateMsec },
      timezone: timezones[0].value,
      currency: currencies[0].value,
    }));
  }, []);

  const checkDatesError = (startDate, endDate) => {
    const diffInDays = (endDate.timestamp - startDate.timestamp) / 86400000;
    if (Math.abs(diffInDays) > 4) {
      setErrors((prev) => ({ ...prev, endDate: 'date_interval' }));
    } else {
      setErrors({});
    }
  };

  const checkOverDates = (startDate, endDate) => {
    const diffInDays = (endDate.timestamp - startDate.timestamp) / 86400000;
    if (diffInDays < 0) {
      switch (focusedDay) {
        case 'end':
          setInputsData((prev) => ({ ...prev, startDate: { ...prev.endDate } }));
        case 'start':
          setInputsData((prev) => ({ ...prev, endDate: { ...prev.startDate } }));
      }
      return false;
    } else return true;
  };

  useEffect(() => {
    if (
      inputsData.startDate &&
      inputsData.endDate &&
      inputsData.startDate.timestamp !== inputsData.endDate.timestamp
    ) {
      const noOverDates = checkOverDates(inputsData.startDate, inputsData.endDate);
      if (noOverDates) {
        checkDatesError(inputsData.startDate, inputsData.endDate);
      } else {
        handleUpload();
        setErrors({});
      }
    } else {
      setErrors({});
    }
  }, [inputsData]);

  useEffect(() => {
    chackBalanceAndConversion();
  }, [selectedBank, initialBank]);

  const chackBalanceAndConversion = async () => {
    if ((selectedBank || selectedBank === 0) && initialBank) {
      setIsLoading(true);
      const bankName = banksNames[selectedBank] || initialBank;

      await getBalance(bankName);
      await getCurrentBankConversion(bankName);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    checkConversionOfPeriod();
  }, [balancePeriod]);

  const checkConversionOfPeriod = async () => {
    if (
      balancePeriod.startDate !== initialDateString ||
      balancePeriod.endDate !== initialDateString
    ) {
      setIsLoading(true);
      const bankName = banksNames[selectedBank] || initialBank;
      await getCurrentBankConversion(bankName);
      setIsLoading(false);
    }
  };

  const getCurrentBankConversion = async (bankName) => {
    try {
      const data = await dispatch(getBankConversion({ bankName, balancePeriod }));
      setCurrentBankConversion(data.payload);
    } catch (error) {
      console.warn('Error:', error);
    }
  };
  const getBalance = async (bankName) => {
    try {
      const data = await dispatch(getBankBalance(bankName));
      setBankBalance(data.payload);
    } catch (error) {
      console.warn('Error:', error);
    }
  };

  const getBanks = async () => {
    try {
      const data = await dispatch(getAllBanks());
      if (data.payload && Array.isArray(data.payload)) {
        setBanks(data.payload);
        const name = data.payload.map((item) => item.name);

        setBanksNames(name);
        setInitialBank(name[0]);
      }
    } catch (error) {
      console.warn('Error:', error);
    }
  };

  const testReq = async () => {
    // api.get('https://httpstat.us/500');
    await AsyncStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTIsInJvbGVJZCI6MywiZW1haWwiOiJkZXNpZ25lckFkbWluQGRlc2lnbmVyLmNvbSIsImlhdCI6MTY5NzE5NzQ0NiwiZXhwIjoxNjk3MjAxMDQ2fQ.bWCU8oVvk97Qi-cSYyeHNTaRd3AZlwvbQg2pzhcnot4'
    );
    await AsyncStorage.setItem(
      'refresh',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTIsInJvbGVJZCI6MywiZW1haWwiOiJkZXNpZ25lckFkbWluQGRlc2lnbmVyLmNvbSIsImlhdCI6MTY5NzE5NzQ0NiwiZXhwIjoxNjk3MjAxMDQ2fQ.bWCU8oVvk97Qi-cSYyeHNTaRd3AZlwvbQg2pzhcnot4'
    );
  };
  const handleUpload = async () => {
    setIsLoading(true);
    setChartUploadCurrence(inputsData.currency);
    const result = {
      ...inputsData,
      startDate: inputsData.startDate.dateString,
      endDate: inputsData.endDate.dateString,
      timezone: timezones.find((item) => item.value === inputsData.timezone).code,
    };

    try {
      const approved = await dispatch(
        conversionLastDaysData({ chartData: result, type: 'approved' })
      ).unwrap();
      console.log('approved', approved);
      setApprovedDataChart(approved);
    } catch (error) {
      setIsLoading(false);
      showMessage({
        message: `Somthing went wrong! Approved conversion of last days didn't upload!`,
        titleStyle: {
          textAlign: 'center',
        },
        type: 'danger',
      });
      console.warn('Error:', error);
    }
    try {
      const declined = await dispatch(
        conversionLastDaysData({ chartData: result, type: 'declined' })
      ).unwrap();
      console.log('declined', declined);
      setDeclinedDataChart(declined);
    } catch (error) {
      setIsLoading(false);
      showMessage({
        message: `Somthing went wrong! Declined conversion of last days didn't upload!`,
        titleStyle: {
          textAlign: 'center',
        },
        type: 'danger',
      });
      console.warn('Error:', error);
    }
    try {
      const processing = await dispatch(
        conversionLastDaysData({ chartData: result, type: 'processing' })
      ).unwrap();
      console.log('processing', processing);
      setProcessingDataChart(processing);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      showMessage({
        message: `Somthing went wrong! Processing conversion of last days didn't upload!`,
        titleStyle: {
          textAlign: 'center',
        },
        type: 'danger',
      });
      console.warn('Error:', error);
    }
  };

  const handleCalendarData = (data) => {
    switch (focusedDay) {
      case 'start':
        if (!data.dateString) return;
        setInputsData((prev) => ({ ...prev, startDate: data }));
        break;
      case 'end':
        if (!data.dateString) return;
        setInputsData((prev) => ({ ...prev, endDate: data }));

        break;

      default:
        break;
    }
    setIsCalendarVisible(false);
  };

  const handleDatePickerData = (data, currentPicker) => {
    setFocusedDay(currentPicker);
    const msec = new Date(`${data.dateString}T00:00:00.000Z`).getTime();
    setInputsData((prev) => ({
      ...prev,
      [currentPicker === 'start' ? 'startDate' : 'endDate']: {
        dateString: data.dateString,
        timestamp: msec,
      },
    }));
  };

  return (
    <ScrollView style={styles.mainWrapper}>
      <MainLoader isVisible={isLoading} />
      <TouchableWithoutFeedback
        onPress={() => {
          setIsDropdownOpen(false);
          setIsShowDiagramCount(false);
          setIsCalendarVisible(false);
        }}
      >
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <SimpleText style={styles.title}>
              <FormattedMessage id={'dashboard.all_balances'} />
            </SimpleText>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('CalendarScreen', {
                  isBalancePeriod: true,
                  // getBalancePeriod,
                  balancePeriod,
                })
              }
            >
              <Image source={calendarIcon} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={testReq}>
            <Text>999</Text>
          </TouchableOpacity>
          <View style={styles.bankContainer}>
            <SimpleText style={styles.smallTitle}>
              <FormattedMessage id={'dashboard.banks'} />
            </SimpleText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <View
                style={{ justifyContent: 'flex-start', width: 167, height: 42, marginBottom: 97 }}
              >
                {banksNames && initialBank && (
                  <ModalDropdown
                    options={banksNames}
                    defaultIndex={0}
                    defaultValue={initialBank}
                    isFullWidth
                    animated={false}
                    onSelect={setSelectedBank}
                    textStyle={{ fontSize: 16, fontFamily: 'Mont', lineHeight: 16 }}
                    style={{
                      backgroundColor: '#F4F4F4',
                      paddingHorizontal: 16,
                      paddingVertical: 11,
                      justifyContent: 'space-between',
                    }}
                    dropdownStyle={{
                      marginLeft: -16,
                      marginTop: Platform.OS === 'ios' ? 12 : -12,
                      paddingLeft: 11,
                      paddingRight: 2,
                      width: 167,
                      height: banksNames.length > 4 ? 152 : banksNames.length * 40,
                      backgroundColor: '#F4F4F4',
                      borderWidth: 0,
                    }}
                    dropdownTextStyle={{
                      fontSize: 16,
                      lineHeight: 16,
                      fontWeight: '600',
                      fontFamily: 'Mont',
                      backgroundColor: '#F4F4F4',
                      color: 'rgba(38, 38, 38, 0.50)',
                    }}
                    renderRightComponent={() => (
                      <Image
                        source={
                          isDropdownOpen
                            ? require('src/images/arrow_up.png')
                            : require('src/images/arrow_down.png')
                        }
                        style={{ width: 26, height: 26, marginLeft: 'auto' }}
                      ></Image>
                    )}
                    renderRowProps={{ activeOpacity: 1 }}
                    renderSeparator={() => <></>}
                    onDropdownWillShow={() => setIsDropdownOpen(true)}
                    onDropdownWillHide={() => setIsDropdownOpen(false)}
                  />
                )}
              </View>
              <View>
                {bankBalance.length > 0 &&
                  bankBalance.map((item, index) => (
                    <View style={styles.currencyWrapper} key={index}>
                      <View style={{ marginRight: 8 }}>
                        <SimpleText style={styles.currency}>{item.currency}</SimpleText>
                      </View>
                      <View>
                        <SimpleText style={styles.currency}>{item.amount}</SimpleText>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          </View>
          <View style={styles.bankConversionContainer}>
            <SimpleText style={styles.smallTitle}>
              <FormattedMessage id={'dashboard.bank_conversion'} />
            </SimpleText>
            {approvedValue || declinedValue ? (
              <View style={styles.pieChartWrapper}>
                <View style={{ justifyContent: 'center' }}>
                  <View style={{ backdropFilter: 'blur(20) ' }}>
                    <PieChart
                      data={data2}
                      showText={true}
                      shadow={true}
                      labelsPosition={'mid'}
                      radius={100}
                    />
                  </View>
                  <View style={styles.pieChart}>
                    <PieChart data={data} showText={true} labelsPosition={'mid'} radius={110} />
                  </View>
                  {isShowDiagramCount && (
                    <View
                      style={{
                        ...styles.pieChartCount,
                        top: selectedDiagram.name === 'decline' ? 40 : 10,
                        borderColor:
                          selectedDiagram.name === 'decline'
                            ? 'rgba(255, 132, 132, 0.50)'
                            : '#C6FFA9',
                        backgroundColor:
                          selectedDiagram.name === 'decline'
                            ? 'rgba(255, 0, 0, 0.20)'
                            : 'rgba(198, 255, 169, 0.40)',
                      }}
                    >
                      <SimpleText style={{ fontSize: 14 }}>{selectedDiagram.title}</SimpleText>
                    </View>
                  )}
                </View>
                <View style={styles.chartLegendWrapper}>
                  <View style={styles.chartLegendItem}>
                    <View style={{ ...styles.circle, backgroundColor: '#FE8383' }} />
                    <SimpleText style={styles.legendText}>
                      <FormattedMessage id={'dashboard.declined'} />
                    </SimpleText>
                  </View>
                  <View style={styles.chartLegendItem}>
                    <View
                      style={{ ...styles.circle, backgroundColor: 'rgba(162, 223, 141, 0.60)' }}
                    />
                    <SimpleText style={styles.legendText}>
                      <FormattedMessage id={'dashboard.approved'} />
                    </SimpleText>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.noTransactionWrapper}>
                <SimpleText style={{ fontSize: 20, letterSpacing: 1, fontFamily: 'Mont_SB' }}>
                  <FormattedMessage id={'dashboard.no_transactions'} />
                </SimpleText>
              </View>
            )}
          </View>
          <SimpleText style={{ ...styles.title, marginTop: 50 }}>
            <FormattedMessage id={'dashboard.generate_report'} />
          </SimpleText>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('GeneralReportsScreen')}
            style={{ width: 175 }}
          >
            <View style={styles.submitBtn}>
              <SimpleText style={styles.submitBtnText}>
                <FormattedMessage id={'dashboard.report_options'} />
              </SimpleText>
            </View>
          </TouchableOpacity>
          <View style={styles.conversionWrapper}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <SimpleText style={styles.title}>
                <FormattedMessage id={'dashboard.conversion.last_days'} />
              </SimpleText>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setIsConversionVisible((prev) => !prev)}
              >
                <Image
                  source={isConversionVisible ? arrowUp : arrowDown}
                  style={{ width: 26, height: 26, marginBottom: 6 }}
                />
              </TouchableOpacity>
            </View>
            {isConversionVisible && (
              <View>
                <View style={styles.conversionInputsWrapper}>
                  <View style={styles.itemWrapper}>
                    <View style={styles.itemTitle}>
                      <SimpleText style={styles.itemTextTitle}>
                        <FormattedMessage id={'dashboard.start_date'} />
                      </SimpleText>
                    </View>
                    <Pressable
                      onPress={() => {
                        setIsCalendarVisible((prev) => !prev);
                        setFocusedDay('start');
                      }}
                      style={{
                        ...styles.datePickerWrapper,
                        borderBottomWidth: 1,
                        borderBottomColor: errors.endDate === 'date_interval' ? 'red' : '#fff',
                      }}
                    >
                      {inputsData.startDate && (
                        <Datepicker
                          // isFocused={focusedDay === 'start'}
                          value={inputsData.startDate.dateString}
                          setValue={(text) => handleDatePickerData(text, 'start')}
                        />
                      )}

                      <Image source={calendarIcon} style={styles.calendarIcon} />
                    </Pressable>
                    {errors.startDate && errors.startDate === 'required' && (
                      <SimpleText
                        style={{
                          position: 'absolute',
                          top: 68,
                          left: 0,
                          color: 'red',
                          marginTop: 5,
                          fontSize: 12,
                          letterSpacing: 1,
                        }}
                      >
                        <FormattedMessage id={'errors.required_field'} />
                      </SimpleText>
                    )}
                    {isCalendarVisible && focusedDay === 'start' && (
                      <StyledCalendar
                        setSelectedDay={handleCalendarData}
                        initialDay={inputsData.startDate}
                      />
                    )}
                  </View>

                  <View style={styles.itemWrapper}>
                    <View style={styles.itemTitle}>
                      <SimpleText style={styles.itemTextTitle}>
                        <FormattedMessage id={'dashboard.end_date'} />
                      </SimpleText>
                    </View>
                    <Pressable
                      onPress={() => {
                        setIsCalendarVisible((prev) => !prev);
                        setFocusedDay('end');
                      }}
                      style={{
                        ...styles.datePickerWrapper,
                        borderBottomWidth: 1,
                        borderBottomColor: errors.endDate === 'date_interval' ? 'red' : '#fff',
                      }}
                    >
                      {inputsData.endDate && (
                        <Datepicker
                          // isFocused={focusedDay === 'end'}
                          value={inputsData.endDate.dateString}
                          setValue={(text) => handleDatePickerData(text, 'end')}
                        />
                      )}

                      <Image source={calendarIcon} style={styles.calendarIcon} />
                    </Pressable>
                    {errors.endDate && errors.endDate === 'date_interval' ? (
                      <SimpleText
                        style={{
                          position: 'absolute',
                          top: 68,
                          left: 0,
                          color: '#FF6765',
                          marginTop: 5,
                          fontSize: 12,
                          // letterSpacing: 1,
                        }}
                      >
                        <FormattedMessage id={'errors.date_interval'} />
                      </SimpleText>
                    ) : (
                      <SimpleText
                        style={{
                          position: 'absolute',
                          top: 68,
                          left: 0,
                          color: 'rgba(38, 38, 38, 0.6)',
                          marginTop: 5,
                          fontSize: 12,
                        }}
                      >
                        *<FormattedMessage id={'dashboard.max_days'} />
                      </SimpleText>
                    )}
                    {isCalendarVisible && focusedDay === 'end' && (
                      <StyledCalendar
                        setSelectedDay={handleCalendarData}
                        initialDay={inputsData.endDate}
                      />
                    )}
                  </View>
                  <View style={{ ...styles.itemWrapper, marginTop: 20 }}>
                    <View style={styles.itemTitle}>
                      <SimpleText style={styles.itemTextTitle}>
                        <FormattedMessage id={'dashboard.timezone'} />
                      </SimpleText>
                    </View>
                    {timezones && inputsData.timezone && (
                      <ModalDropdown
                        ref={refTimezone}
                        options={timezones.map((item) => item.value)}
                        defaultIndex={0}
                        defaultValue={inputsData.timezone}
                        // isFullWidth
                        animated={false}
                        onSelect={(index, option) => {
                          // console.log(index, '<>', option);
                          if (errors.timezone) {
                            setErrors({});
                          }
                          setInputsData((prev) => ({ ...prev, timezone: option }));
                        }}
                        textStyle={{
                          fontSize: 16,
                          fontFamily: 'Mont',
                          fontWeight: '600',
                          lineHeight: 16,
                          paddingRight: 25,
                        }}
                        style={{
                          backgroundColor: '#F4F4F4',
                          paddingHorizontal: 16,
                          paddingVertical: 12,
                          borderRadius: 2,
                          justifyContent: 'space-between',

                          width: width - 40,
                        }}
                        dropdownStyle={{
                          marginLeft: -16,
                          marginTop: Platform.OS === 'ios' ? 14 : -14,
                          paddingLeft: 11,
                          paddingRight: 2,
                          width: width - 40,
                          backgroundColor: '#F4F4F4',
                          borderWidth: 0,
                          borderRadius: 2,
                          height: timezones.length > 6 ? 220 : timezones.length * 40,
                        }}
                        dropdownTextStyle={{
                          fontSize: 16,
                          lineHeight: 16,
                          fontWeight: '600',
                          fontFamily: 'Mont',
                          backgroundColor: '#F4F4F4',
                          color: 'rgba(38, 38, 38, 0.50)',
                        }}
                        renderRightComponent={() => (
                          <Image
                            source={
                              isTimezoneDropdownOpen
                                ? require('src/images/arrow_up.png')
                                : require('src/images/arrow_down.png')
                            }
                            style={{ width: 26, height: 26, marginLeft: 'auto' }}
                          ></Image>
                        )}
                        renderRowProps={{ activeOpacity: 1 }}
                        renderSeparator={() => <></>}
                        onDropdownWillShow={() => setIsTimezoneDropdownOpen(true)}
                        onDropdownWillHide={() => setIsTimezoneDropdownOpen(false)}
                      />
                    )}
                  </View>
                  <View style={styles.itemWrapper}>
                    <View style={styles.itemTitle}>
                      <SimpleText style={styles.itemTextTitle}>
                        <FormattedMessage id={'common.currency'} />
                      </SimpleText>
                    </View>
                    {currencies && inputsData.currency && (
                      <ModalDropdown
                        ref={refCurrency}
                        options={currencies.map((item) => item.value)}
                        defaultIndex={0}
                        defaultValue={inputsData.currency}
                        // isFullWidth
                        animated={false}
                        onSelect={(index, option) => {
                          // console.log(index, '<>', option);
                          if (errors.currency) {
                            setErrors({});
                          }
                          setInputsData((prev) => ({ ...prev, currency: option }));
                        }}
                        textStyle={{
                          fontSize: 16,
                          fontFamily: 'Mont',
                          fontWeight: '600',
                          lineHeight: 16,
                          paddingRight: 25,
                        }}
                        style={{
                          backgroundColor: '#F4F4F4',
                          paddingHorizontal: 16,
                          paddingVertical: 12,
                          borderRadius: 2,
                          justifyContent: 'space-between',

                          width: width - 40,
                        }}
                        dropdownStyle={{
                          marginLeft: -16,
                          marginTop: Platform.OS === 'ios' ? 14 : -14,
                          paddingLeft: 11,
                          paddingRight: 2,
                          width: width - 40,
                          backgroundColor: '#F4F4F4',
                          borderWidth: 0,
                          borderRadius: 2,
                          height: currencies.length > 5 ? 175 : currencies.length * 35,
                        }}
                        dropdownTextStyle={{
                          fontSize: 16,
                          lineHeight: 16,
                          fontWeight: '600',
                          fontFamily: 'Mont',
                          backgroundColor: '#F4F4F4',
                          color: 'rgba(38, 38, 38, 0.50)',
                        }}
                        renderRightComponent={() => (
                          <Image
                            source={
                              isCurrencyDropdownOpen
                                ? require('src/images/arrow_up.png')
                                : require('src/images/arrow_down.png')
                            }
                            style={{ width: 26, height: 26, marginLeft: 'auto' }}
                          ></Image>
                        )}
                        renderRowProps={{ activeOpacity: 1 }}
                        renderSeparator={() => <></>}
                        onDropdownWillShow={() => setIsCurrencyDropdownOpen(true)}
                        onDropdownWillHide={() => setIsCurrencyDropdownOpen(false)}
                      />
                    )}
                  </View>
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress={handleUpload}>
                  <SimpleButton
                    text={'common.upload'}
                    style={{ width: width - 90, marginHorizontal: 25 }}
                  />
                </TouchableOpacity>
              </View>
            )}

            <SimpleLineChart
              approvedDataChart={approvedDataChart}
              declinedDataChart={declinedDataChart}
              processingDataChart={processingDataChart}
              currency={chartUploadCurrency}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  mainWrapper: { flex: 1, backgroundColor: '#fff' },
  titleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontFamily: 'Mont_SB', fontSize: 34, lineHeight: 40 },
  smallTitle: { fontFamily: 'Mont_SB', marginBottom: 21 },
  bankContainer: { zIndex: 1, marginTop: 50 },
  currencyWrapper: { flexDirection: 'row' },
  noTransactionWrapper: { marginTop: 30, marginBottom: 40 },
  bankConversionContainer: { marginTop: 30 },
  currency: { lineHeight: 21, marginBottom: 15 },
  circle: { borderRadius: 8, width: 8, height: 8, marginRight: 8 },
  chartLegendWrapper: { marginBottom: 20 },
  chartLegendItem: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  pieChart: {
    position: 'absolute',
    left: -10,
    top: -10,
  },
  pieChartCount: {
    position: 'absolute',
    left: 150,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 2,
    borderWidth: 1,
    backdropFilter: 'blur(2)',
  },
  pieChartWrapper: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  legendText: { fontSize: 14 },
  submitBtn: {
    height: 44,
    width: 175,
    marginTop: 16,
    borderRadius: 2,
    backgroundColor: '#0BA39A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    letterSpacing: 0.48,
    fontFamily: 'Mont_SB',
    color: '#fff',
  },
  conversionWrapper: { marginTop: 90, marginBottom: 70 },
  conversionInputsWrapper: { marginTop: 30, marginBottom: 4 },
  itemWrapper: { marginBottom: 26 },
  itemTitle: { marginBottom: 12 },
  itemTextTitle: { fontSize: 14 },
  textInput: {
    backgroundColor: '#F4F4F4',
    paddingVertical: 11,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Mont',
  },
  datePickerWrapper: {
    height: 40,
    // width: 150,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarIcon: { width: 16, height: 16 },
});

export default DashboardScreen;
