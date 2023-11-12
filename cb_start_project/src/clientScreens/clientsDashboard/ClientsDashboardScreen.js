import React, { useState, useEffect, useRef } from 'react';
import { showMessage } from 'react-native-flash-message';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { getUser } from 'src/redux/user/selectors';
import { getLedgersData, getBalanceLogs, putBalanceDeposit } from 'src/redux/content/operations';
import { useSelector, useDispatch } from 'react-redux';
import SimpleButton from 'src/components/atoms/SimpleButton';
import ModalDropdown from 'src/components/molecules/ModalDropdown';
import { FormattedMessage } from 'react-intl';
import MainLoader from 'src/components/molecules/MainLoader';
import SimpleText from 'src/components/atoms/SimpleText';
import Datepicker from 'src/components/atoms/Datepicker';
import StyledCalendar from 'src/components/molecules/StyledCalendar';

const calendarIcon = require('src/images/calendar_icon.png');
const arrowDown = require('src/images/arrow_down.png');
const arrowUp = require('src/images/arrow_up.png');

const ClientsDashboardScreen = ({ navigation, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ledgersList, setLedgersList] = useState([]);
  const [selectedBalanceName, setSelectedBalanceName] = useState();
  const [selectedBalanceObject, setSelectedBalanceObject] = useState();
  const [isBalanceDropdownOpen, setIsBalanceDropdownOpen] = useState(false);
  const [balanceLogs, setBalanceLogs] = useState([]);
  const [initialBalanceLogs, setInitialBalanceLogs] = useState([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState();
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [focusedDay, setFocusedDay] = useState('start');
  const [inputsData, setInputsData] = useState({});
  const [errors, setErrors] = useState({});
  const [isTimezoneDropdownOpen, setIsTimezoneDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const [isPayinActive, setIsPayinActive] = useState(true);
  const [isPayoutActive, setIsPayoutActive] = useState(true);

  const { width } = Dimensions.get('window');
  const userInfo = useSelector(getUser);
  const dispatch = useDispatch();
  const initialStartDateString = new Date(new Date().getTime() - 86400000 * 4).toISOString();
  const initialStartDateMsec = new Date(initialStartDateString).getTime();
  const initialEndDateString = new Date().toISOString();
  const initialEndDateMsec = new Date(initialEndDateString).getTime();
  const refTimezone = useRef();
  const refStatuses = useRef();

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

  const statuses = [
    { value: 'All' },
    { value: 'declined' },
    { value: 'approved' },
    { value: 'processing' },
    { value: 'new' },
  ];

  useEffect(() => {
    getLedgersByUserId(userInfo.id);

    setInputsData((prev) => ({
      ...prev,
      startDate: { dateString: initialStartDateString, timestamp: initialStartDateMsec },
      endDate: { dateString: initialEndDateString, timestamp: initialEndDateMsec },
      timezone: timezones[0].value,
      status: statuses[0].value,
    }));
  }, [userInfo]);

  const getLedgersByUserId = async (userId) => {
    try {
      const ledgers = await dispatch(getLedgersData(userId)).unwrap();
      if (ledgers.items && ledgers.items.length > 0) {
        setLedgersList(ledgers.items);
        setSelectedBalanceName(ledgers.items[0].name);
        setSelectedBalanceObject(ledgers.items[0]);
        getLogs(ledgers.items[0].id);
      } else {
        setLedgersList([' ']);
        setSelectedBalanceName('');
        setSelectedBalanceObject({});
      }
    } catch (error) {
      setIsLoading(false);
      setTimeout(() => {
        showMessage({
          message: `Something went wrong! Ledgers list loading error`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 1000);
      console.warn('Error:', error);
    }
  };
  const handleBalanceSelect = (text) => {
    setSelectedBalanceName(text);
    setSelectedBalanceObject(ledgersList.find((item) => item.name === text));
    const selectedLedgerId = ledgersList.find((item) => item.name === text).id;
    getLogs(selectedLedgerId);
  };
  const getLogs = async (id) => {
    try {
      const logs = await dispatch(getBalanceLogs(id)).unwrap();
      setInitialBalanceLogs(logs.items);
      setBalanceLogs(logs.items);
    } catch (error) {
      setIsLoading(false);
      setTimeout(() => {
        showMessage({
          message: `Something went wrong! Get Logs error`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 1000);
      console.warn('Error:', error);
    }
  };

  useEffect(() => {
    if (isPayinActive && isPayoutActive) {
      setBalanceLogs([...initialBalanceLogs]);
      return;
    } else if (!isPayinActive && !isPayoutActive) {
      setBalanceLogs([]);
      return;
    }
    setBalanceLogs(
      initialBalanceLogs.filter((item) =>
        isPayoutActive ? item.diffPayoutAmount : item.diffPayinAmount
      )
    );
  }, [isPayinActive, isPayoutActive]);

  const getDate = (createdAt) => {
    createdAt = createdAt.split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
    return createdAt;
  };

  const getTime = (createdAt) => {
    createdAt = createdAt.split('T')[1].slice(0, 8);
    return createdAt;
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

  const handleChangeHistoryLogs = (type) => {
    switch (type) {
      case 'payin':
        setIsPayinActive((prev) => !prev);
        break;
      case 'payout':
        setIsPayoutActive((prev) => !prev);
        break;

      default:
        break;
    }
  };

  const flatListRenderRow = (item, index) => (
    <View
      key={index}
      style={{
        ...styles.tableRow,
        backgroundColor: item.diffPayoutAmount
          ? 'rgba(11, 163, 154, 0.15)'
          : item.diffPayinAmount
          ? 'rgba(255, 199, 0, 0.15)'
          : '#fff',
      }}
    >
      <View
        style={{
          ...styles.tableCell,
          paddingRight: 0,
          width: width / 4,
        }}
      >
        <SimpleText>{getDate(item.createdAt)}</SimpleText>
      </View>
      <View
        style={{
          ...styles.tableCell,
          width: width / 5,
        }}
      >
        <SimpleText>{getTime(item.createdAt)}</SimpleText>
      </View>
      <View
        style={{
          ...styles.tableCell,
          paddingLeft: 10,
          flex: 1,
        }}
      >
        <SimpleText>
          {item.diffPayoutAmount
            ? item.diffPayoutAmount.toFixed(2)
            : item.diffPayinAmount
            ? item.diffPayinAmount.toFixed(2)
            : ''}
        </SimpleText>
      </View>
    </View>
  );

  return (
    <ScrollView>
      <MainLoader isVisible={isLoading} />

      <TouchableWithoutFeedback
        onPress={() => {
          setIsDropdownOpen(false);
          setIsCalendarVisible(false);
        }}
      >
        <View style={styles.wrapper}>
          {/**********************************************/}
          {/**********************************************/}
          <View style={styles.userBalance}>
            <SimpleText style={{ fontFamily: 'Mont_SB', marginBottom: 30, fontSize: 34 }}>
              <FormattedMessage id={'common.balance'} />
            </SimpleText>
            {ledgersList && selectedBalanceName && (
              <View style={{ pointerEvents: ledgersList[0] === ' ' ? 'none' : 'auto' }}>
                <ModalDropdown
                  // ref={refBalanceModal}
                  options={ledgersList.map((item) => item.name)}
                  defaultIndex={ledgersList.map((item) => item.name).indexOf(selectedBalanceName)}
                  defaultValue={selectedBalanceName}
                  isFullWidth
                  animated={false}
                  onSelect={(index, option) => {
                    handleBalanceSelect(option);
                  }}
                  textStyle={{ fontSize: 16, fontFamily: 'Mont', lineHeight: 16 }}
                  style={{
                    backgroundColor: '#F4F4F4',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    justifyContent: 'space-between',
                  }}
                  dropdownStyle={{
                    marginLeft: -16,
                    marginTop: 14,
                    paddingLeft: 11,
                    paddingRight: 2,
                    width: width - 40,
                    height: ledgersList.length > 4 ? 152 : ledgersList.length * 40,
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
                        isBalanceDropdownOpen
                          ? require('src/images/arrow_up.png')
                          : require('src/images/arrow_down.png')
                      }
                      style={{ width: 26, height: 26, marginLeft: 'auto' }}
                    ></Image>
                  )}
                  renderRowProps={{ activeOpacity: 1 }}
                  renderSeparator={() => <></>}
                  onDropdownWillShow={() => setIsBalanceDropdownOpen(true)}
                  onDropdownWillHide={() => setIsBalanceDropdownOpen(false)}
                />
              </View>
            )}
          </View>
          {/**********************************************/}
          {/**********************************************/}
          <View style={styles.userPayInOut}>
            <View style={styles.payInOutTitles}>
              <SimpleText style={{ ...styles.payInOutTitlesText, marginBottom: 12 }}>
                <FormattedMessage id={'users.payin'} />:
              </SimpleText>
              <SimpleText style={styles.payInOutTitlesText}>
                <FormattedMessage id={'users.payout'} />:
              </SimpleText>
            </View>
            <View style={styles.payInOutValues}>
              <SimpleText style={{ ...styles.payInOutValuesText, marginBottom: 12 }}>
                {selectedBalanceObject
                  ? selectedBalanceObject.payinAmount.toFixed(2) +
                    ' ' +
                    selectedBalanceObject.currency
                  : ''}
              </SimpleText>
              <SimpleText style={styles.payInOutValuesText}>
                {selectedBalanceObject
                  ? selectedBalanceObject.payoutAmount.toFixed(2) +
                    ' ' +
                    selectedBalanceObject.currency
                  : ''}
              </SimpleText>
            </View>
          </View>
          {/**********************************************/}
          {/**********************************************/}
          <SimpleText style={{ ...styles.title }}>
            <FormattedMessage id={'dashboard.generate_report'} />
          </SimpleText>
          <View style={{ marginBottom: 60 }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('ClientsGeneralReportsScreen')}
              style={{ width: 175 }}
            >
              <View style={styles.submitBtn}>
                <SimpleText style={styles.submitBtnText}>
                  <FormattedMessage id={'dashboard.report_options'} />
                </SimpleText>
              </View>
            </TouchableOpacity>
            <SimpleText style={{ fontSize: 12, marginTop: 5, color: 'grey' }}>
              <FormattedMessage id={'dashboard.report_create_warning'} />
            </SimpleText>
          </View>

          {/**********************************************/}
          {/**********************************************/}
          <View>
            <SimpleText style={{ fontSize: 24 }}>
              <FormattedMessage id={'dashboard.client.balance_history'} />
            </SimpleText>
          </View>
          <View style={{ marginTop: 25, flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleChangeHistoryLogs('payin')}>
              <View style={{ ...styles.barTitleWrapper, opacity: isPayinActive ? 1 : 0.3 }}>
                <View
                  style={{
                    ...styles.marker,
                    backgroundColor: 'rgba(255, 199, 0, 0.35)',
                  }}
                />
                <SimpleText style={{}}>
                  <FormattedMessage id={'users.payin'} />
                </SimpleText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => handleChangeHistoryLogs('payout')}>
              <View style={{ ...styles.barTitleWrapper, opacity: isPayoutActive ? 1 : 0.3 }}>
                <View
                  style={{
                    ...styles.marker,
                    backgroundColor: 'rgba(11, 163, 154, 0.35)',
                  }}
                />
                <SimpleText style={{}}>
                  <FormattedMessage id={'users.payout'} />
                </SimpleText>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(217, 217, 217, 0.70)',
              backgroundColor: '#F4F4F4',
              marginTop: 10,
              paddingHorizontal: 20,
              marginHorizontal: -20,
            }}
          >
            <View
              style={{
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={{ ...styles.tableCell, width: width / 2.22 }}>
                <SimpleText style={styles.headerText}>
                  <FormattedMessage id={'common.date'} />
                </SimpleText>
              </View>
              <View style={{ ...styles.tableCell, flex: 1 }}>
                <SimpleText style={styles.headerText}>
                  <FormattedMessage id={'transactions.amount'} />,{' '}
                  {selectedBalanceObject && selectedBalanceObject.currency}
                </SimpleText>
              </View>
            </View>
          </View>
          {balanceLogs && balanceLogs.length > 0 ? (
            balanceLogs.map((item, index) => (
              <View key={item.id}>{flatListRenderRow(item, index)}</View>
            ))
          ) : (
            <View style={{ marginVertical: 70, justifyContent: 'center', alignItems: 'center' }}>
              <SimpleText style={{ fontSize: 20, fontFamily: 'Mont_SB' }}>
                <FormattedMessage id={'common.data_not_found'} />
              </SimpleText>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    // marginBottom: 30,
  },
  titleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { /* fontFamily: 'Mont_SB', */ fontSize: 24, lineHeight: 24 },
  merchantTextTitle: {
    fontSize: 24,
    fontFamily: 'Mont_SB',
  },
  userBalance: {
    marginBottom: 25,
  },
  userPayInOut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 30,
    marginBottom: 30,
  },
  payInOutTitles: { width: 96, marginRight: 21 },
  payInOutValues: {},
  payInOutTitlesText: { fontSize: 24, lineHeight: 31 },
  payInOutValuesText: { fontSize: 24, lineHeight: 31, fontFamily: 'Mont_SB' },

  tableCell: { height: 40, paddingHorizontal: 5, justifyContent: 'center' },
  tableRow: {
    height: 40,
    // paddingLeft: 15,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(217, 217, 217, 0.40)',
  },
  tableCell: { height: 40, paddingHorizontal: 5, justifyContent: 'center' /* borderWidth: 1 */ },

  submitBtn: {
    height: 44,
    width: 175,
    marginTop: 25,

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
  barTitleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  marker: {
    width: 12,
    height: 12,
    borderRadius: 12,
    marginRight: 7,
  },
});

export default ClientsDashboardScreen;
