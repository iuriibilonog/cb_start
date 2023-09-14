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
import CheckBoxList from 'src/components/molecules/CheckBoxList';
import SimpleText from '../../components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';

const arrowRight = require('src/images/right.png');

const FilterColumnsScreen = ({ setPaymentsFilter, paymentFilter }) => {
  const defaultPaymentFilter =
    paymentFilter && paymentFilter.find((item) => item.name === 'filterColumns')
      ? paymentFilter.find((item) => item.name === 'filterColumns')
      : { filters: [] };
  console.log('defaultPaymentFilter', defaultPaymentFilter);

  const [radioSelect, setRadioSelect] = useState(defaultPaymentFilter);

  const [checkBoxSelect, setCheckBoxSelect] = useState(defaultPaymentFilter.filters);
  const data = [
    { value: 'Select all filters' },
    { value: 'Payment Description' },
    { value: 'Payment ID' },
    { value: 'Customer Email' },
    { value: 'Type' },
    { value: 'Payment Description2' },
    { value: 'Payment ID2' },
    { value: 'Customer Email2' },
    { value: 'Type2' },
    { value: 'Payment Description3' },
    { value: 'Payment ID3' },
    { value: 'Customer Email3' },
    { value: 'Type3' },
    { value: 'Payment Description4' },
    { value: 'Payment ID4' },
    { value: 'Customer Email4' },
    { value: 'Type4' },
    { value: 'Payment Description5' },
    { value: 'Payment ID5' },
    { value: 'Customer Email5' },
    { value: 'Type5' },
    { value: 'Payment Description6' },
    { value: 'Payment ID6' },
    { value: 'Customer Email6' },
    { value: 'Type6' },
  ];

  const navigation = useNavigation();

  useEffect(() => {
    console.log('checkBoxSelect---', checkBoxSelect);
    const checkValues = checkBoxSelect.filter((item) => item.value !== 'Select all filters');
    setPaymentsFilter('filterColumns', {
      filters: checkValues.map((item) => item.value),
      value: checkValues.map((item) => item.value).join(' ,'),
    });
  }, [checkBoxSelect]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.radioBoxContainer}>
          <CheckBoxList
            data={data}
            onSelect={setCheckBoxSelect}
            defaultValue={checkBoxSelect}
            styling={{ size: 18, spaceBetween: 34 }}
            isFirstBoxAll={true}
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

export default FilterColumnsScreen;
