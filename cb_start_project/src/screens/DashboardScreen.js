import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, cloneElement } from 'react';
import Dropdown from 'src/components/molecules/Dropdown';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import api from '../services/interceptor';

const DashboardScreen = ({ navigation }) => {
  const calendarIcon = require('src/images/calendar_icon.png');
  const approvedValue = 15;
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
  const data = [
    {
      value: approvedValue,
      text: `${approvedPercent}%`,
      color: 'rgba(162, 223, 141, 0.6)',
      textColor: '#262626',
    }, //APPROVE
    {
      value: declinedValue,
      color: 'rgba(162, 223, 141, 0)',
      text: `${declinedPercent}%`,
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
api.get()``
  }, []);


  useEffect(() => {
    console.log('selectedBank', selectedBank);
  }, [selectedBank]);

  let euroCurrency = 19984.38,
    kztCurrency = 332577687.13,
    usdCurrency = 260.2;
  return (
    <TouchableWithoutFeedback onPress={() => setIsDropdownOpen((prev) => !prev)}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>All Balances</Text>
          <Image source={calendarIcon} style={{ width: 24, height: 24 }} />
        </View>
        <View style={styles.bankContainer}>
          <Text style={styles.smallTitle}>Banks</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <View style={{ justifyContent: 'flex-start', width: 167 }}>
              <Dropdown
                isOpen={isDropdownOpen}
                value={setSelectedBank}
                data={[
                  { id: 1, title: 'AppexMoney1' },
                  { id: 2, title: 'Forta2' },
                  { id: 3, title: 'AppexMoney3' },
                  { id: 4, title: 'Forta4' },
                  { id: 5, title: 'AppexMoney5' },
                  { id: 6, title: 'Forta6' },
                  { id: 7, title: 'AppexMoney7' },
                  { id: 8, title: 'Forta8' },
                  { id: 9, title: 'AppexMoney9' },
                  { id: 10, title: 'Forta10' },
                  { id: 11, title: 'AppexMoney11' },
                  { id: 12, title: 'Forta12' },
                ]}
              />
            </View>
            <View style={styles.currencyWrapper}>
              <View style={{ marginRight: 8 }}>
                <Text style={styles.currency}>EUR</Text>
                <Text style={styles.currency}>KZT</Text>
                <Text style={styles.currency}>USD</Text>
              </View>
              <View>
                <Text style={styles.currency}>{euroCurrency}</Text>
                <Text style={styles.currency}>{kztCurrency}</Text>
                <Text style={styles.currency}>{usdCurrency}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bankConversionContainer}>
          <Text style={styles.smallTitle}>Bank conversion</Text>
          <View style={styles.pieChartWrapper}>
            <View style={{ justifyContent: 'center' }}>
              <PieChart
                data={data2}
                showText={true}
                shadow={true}
                // shadowColor={'red'}
                // shadowWidth={10}
                labelsPosition={'mid'}
                // focusOnPress={true}
                radius={100}
              />
              <View style={styles.pieChart}>
                <PieChart
                  data={data}
                  showText={true}
                  labelsPosition={'mid'}
                  // focusOnPress={true}
                  radius={110}
                />
              </View>
            </View>
            <View style={styles.chartLegendWrapper}>
              <View style={styles.chartLegendItem}>
                <View style={{ ...styles.circle, backgroundColor: '#FE8383' }} />
                <Text style={styles.legendText}>Declined</Text>
              </View>
              <View style={styles.chartLegendItem}>
                <View style={{ ...styles.circle, backgroundColor: 'rgba(162, 223, 141, 0.60)' }} />
                <Text style={styles.legendText}>Approved</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={{ ...styles.title, marginTop: 50 }}>Generate report</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Report options</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
  title: { fontSize: 34, fontWeight: '700' },
  smallTitle: { fontSize: 16, fontWeight: '700', marginBottom: 21 },
  bankContainer: { zIndex: 1, marginTop: 30 },
  currencyWrapper: { flexDirection: 'row' },
  bankConversionContainer: { marginTop: 50 },
  currency: { fontSize: 16, fontWeight: '600', lineHeight: 21, marginBottom: 15 },
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
  pieChartWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  legendText: { fontSize: 14, fontWeight: '600' },
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
    fontSize: 16,
    letterSpacing: 0.48,
    fontWeight: '700',
    color: '#fff',
  },
});

export default DashboardScreen;
