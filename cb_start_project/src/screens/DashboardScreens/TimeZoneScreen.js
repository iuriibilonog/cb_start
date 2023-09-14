import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RadioList from 'src/components/molecules/RadioList';
import { FormattedMessage } from 'react-intl';
import SimpleText from '../../components/atoms/SimpleText';

const arrowRight = require('src/images/right.png');

const TimeZoneScreen = ({ route, setPaymentsFilter, setTransactionFilter }) => {
  const [radioSelect, setRadioSelect] = useState({ value: 'UTC0' });

  const reportType = route.params.type.value;

  useEffect(() => {
    switch (reportType) {
      case 'Payments':
        setPaymentsFilter('status', radioSelect.value);
        break;
      case 'Transactions':
        setTransactionFilter('status', radioSelect.value);
        break;

      default:
        break;
    }
  }, [radioSelect]);

  const data = [
    { value: 'UTC0' },
    { value: '(UTC+0) Dublin, Lisbon, London' },
    { value: '(UTC+1) Berlin, Vienna, Rome, Paris' },
    { value: '(UTC+2) Athens, Kiev, Riga' },
    { value: '(UTC+3) Minsk, Moscow, St.Petersburg' },
    { value: '(UTC+4) Baku, Yerevan, Saratov, Tbilisi' },
    { value: '(UTC+5) Tashkent, Yekaterinburg' },
    { value: '(UTC+6) Astana , Omsk' },
  ];

  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.radioBoxContainer}>
          <RadioList
            data={data}
            onSelect={setRadioSelect}
            defaultValue={{ value: 'UTC0' }}
            styling={{ size: 18, spaceBetween: 34 }}
          />
        </View>

        <TouchableOpacity activeOpacity={0.5} onPress={() => {}} style={{ width: 140 }}>
          <View style={styles.submitBtn}>
            <SimpleText style={styles.submitBtnText}>
              <FormattedMessage id={'dashboard.download'} />
            </SimpleText>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,

    paddingVertical: 50,
  },
  radioBoxContainer: {
    backgroundColor: '#fff',
    maxWidth: Dimensions.get('window').width - 80,
  },
  radioBoxItem: { flexDirection: 'row', alignItems: 'center' },
  reportsContainer: { backgroundColor: '#fff' },
  arrowRight: { width: 24, height: 24 },
  radio: { width: 24, height: 24, marginRight: 14 },
  reportContainerItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingVertical: 10,
    marginVertical: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: { fontSize: 18, letterSpacing: 0.3 },
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

export default TimeZoneScreen;
