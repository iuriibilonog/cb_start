import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { getAllBanks, getBankConversion } from 'src/redux/content/operations';
import React, { useState, useEffect, cloneElement } from 'react';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import api from 'src/services/interceptor';
import ModalDropdown from 'react-native-modal-dropdown';
import SimpleText from '../../components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';

const DashboardScreen = ({ navigation }) => {
  const calendarIcon = require('src/images/calendar_icon.png');
  const approvedValue = 250;
  const declinedValue = 79;
  let approvedPercent, declinedPercent;
  if (approvedValue <= declinedValue) {
    approvedPercent = Math.round(100 / (2 * (declinedValue / approvedValue)));
    declinedPercent = Math.abs(approvedPercent - 100);
  }
  if (approvedValue > declinedValue) {
    declinedPercent = Math.round(100 / (2 * (approvedValue / declinedValue)));
    approvedPercent = Math.abs(declinedPercent - 100);
  }

  // need for <Dropdown to close pressing out of as onBlur doesn`t work )
  const [isDropdownOpen, setIsDropdownOpen] = useState();
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedDiagram, setSelectedDiagram] = useState();
  const [isShowDiagramCount, setIsShowDiagramCount] = useState(false);

  const dispatch = useDispatch();

  const [banks, setBanks] = useState([]);
  const [banksNames, setBanksNames] = useState([]);
  const [currentBankConversion, setCurrentBankConversion] = useState({});

  const data = [
    {
      value: approvedValue,
      text: `${approvedPercent}%`,
      color: 'rgba(162, 223, 141, 0.6)',
      textColor: '#262626',
      onPress: () => {
        console.log('approve ', approvedValue);
        setSelectedDiagram({ name: 'approve', title: `Approved: count: ${approvedValue}` });
        setIsShowDiagramCount(true);
      },
    }, //APPROVE
    {
      value: declinedValue,
      color: 'rgba(162, 223, 141, 0)',
      text: `${declinedPercent}%`,
      onPress: () => {
        console.log('decline ', declinedValue);
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
    getBanks();
  }, []);

  useEffect(() => {
    if (selectedBank) {
      const bankName = banksNames[selectedBank];
      // getCurrentBankConversion(bankName);
    }
  }, [selectedBank]);

  const getCurrentBankConversion = async (bankName) => {
    try {
      const data = await dispatch(getBankConversion(bankName));
      setCurrentBankConversion(data.payload);
      console.log('data', data);
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
        setSelectedBank(name[0]);
      }

      // console.log('data', data.payload);
    } catch (error) {
      console.warn('Error:', error);
    }
  };

  // const handleScrollView = (e) => {
  //   if (isDropdownOpen) e.preventDefault();
  // };

  let euroCurrency = 19984.38,
    kztCurrency = 332577687.13,
    usdCurrency = 260.2;
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsDropdownOpen((prev) => !prev);
          setIsShowDiagramCount(false);
        }}
      >
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <SimpleText style={styles.title}>
              <FormattedMessage id={'dashboard.all_balances'} />
            </SimpleText>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('CalendarScreen')}
            >
              <Image source={calendarIcon} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          </View>
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
              <View style={{ justifyContent: 'flex-start', width: 167, height: 42 }}>
                <ModalDropdown
                  options={banksNames}
                  defaultIndex={0}
                  defaultValue={banksNames[0]}
                  isFullWidth
                  animated={false}
                  onSelect={setSelectedBank}
                  textStyle={{ fontSize: 16, fontFamily: 'Mont' }}
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
                    backgroundColor: '#F4F4F4',
                    borderWidth: 0,
                  }}
                  dropdownTextStyle={{
                    fontSize: 16,
                    fontWeight: '600',
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
                      style={{ width: 26, height: 36, marginLeft: 'auto' }}
                    ></Image>
                  )}
                  renderRowProps={{ activeOpacity: 1 }}
                  renderSeparator={() => <></>}
                  onDropdownWillShow={() => setIsDropdownOpen(true)}
                  onDropdownWillHide={() => setIsDropdownOpen(false)}
                />
              </View>
              <View style={styles.currencyWrapper}>
                <View style={{ marginRight: 8 }}>
                  <SimpleText style={styles.currency}>EUR</SimpleText>
                  <SimpleText style={styles.currency}>KZT</SimpleText>
                  <SimpleText style={styles.currency}>USD</SimpleText>
                </View>
                <View>
                  <SimpleText style={styles.currency}>{euroCurrency}</SimpleText>
                  <SimpleText style={styles.currency}>{kztCurrency}</SimpleText>
                  <SimpleText style={styles.currency}>{usdCurrency}</SimpleText>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bankConversionContainer}>
            <SimpleText style={styles.smallTitle}>
              <FormattedMessage id={'dashboard.bank_conversion'} />
            </SimpleText>
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
  titleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontFamily: 'Mont', fontSize: 34 },
  smallTitle: { fontFamily: 'Mont_SB', marginBottom: 21 },
  bankContainer: { zIndex: 1, marginTop: 30 },
  currencyWrapper: { flexDirection: 'row' },
  bankConversionContainer: { marginTop: 50 },
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
});

export default DashboardScreen;
