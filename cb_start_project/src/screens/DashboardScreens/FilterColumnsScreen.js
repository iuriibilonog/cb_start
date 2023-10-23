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

const FilterColumnsScreen = ({ setPaymentsFilter, paymentFilter,confirmReport }) => {
  const defaultPaymentFilter =
    paymentFilter && paymentFilter.find((item) => item.name === 'filterColumns')
      ? paymentFilter.find((item) => item.name === 'filterColumns')
      : { filters: [] };
  const [checkBoxSelect, setCheckBoxSelect] = useState(defaultPaymentFilter.filters);
  const data = [
    { value: 'Select all filters' },
    { value: 'Payment ID', code: 'id' },
    { value: 'Type', code: 'type' },
    { value: 'Payment Description', code: 'message' },
    { value: 'Customer Email', code: 'customerEmail' },
    { value: 'Customer Phone', code: 'customerPhone' },
    { value: 'Customer First Name', code: 'customerFirstName' },
    { value: 'Customer Last Name', code: 'customerLastName' },
    { value: 'Payment Settings Name', code: 'paymentSettingsName' },
    { value: 'Merchant Order ID', code: 'orderId' },
    { value: 'Commission', code: 'commission' },
    { value: 'Payment Method Name', code: 'paymentMethodName' },
    { value: 'Card Country', code: 'cardCountry' },
    { value: 'Last Transaction ID', code: 'transactionId' },
    { value: 'Pan', code: 'pan' },
    { value: 'Customer IP', code: 'customerIp' },
    { value: 'Card Issuer', code: 'cardIssuer' },
    { value: 'Bank ID', code: 'bankPaymentId' },
    { value: 'Card Type', code: 'system' },
    { value: 'Bank Name', code: 'bankName' },
    { value: 'Profit', code: 'profit' },
    { value: 'Is visited url', code: 'isVisitedUrl' },
  ];

  const navigation = useNavigation();

  useEffect(() => {
    const isAllSelected = checkBoxSelect.find((item) => item.value === 'Select all filters');
    const checkValues = checkBoxSelect.filter((item) => item.value !== 'Select all filters');
    setPaymentsFilter('filterColumns', {
      filters: checkValues,
      value: isAllSelected
        ? 'Select all filters'
        : checkValues.map((item) => item.value).join(', '),
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

        <TouchableOpacity activeOpacity={0.5} onPress={confirmReport} style={{ width: 140 }}>
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
