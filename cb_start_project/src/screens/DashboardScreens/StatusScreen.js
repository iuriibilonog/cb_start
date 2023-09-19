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
import CheckBoxList from 'src/components/molecules/CheckBoxList';
import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import TransactionsFilters from 'src/components/molecules/TransactionsFilters';

const arrowRight = require('src/images/right.png');

const StatusScreen = ({
  route,
  setPaymentsFilter,
  setTransactionFilter,
  paymentFilter,
  transactionFilter,
  isFiltersVisible,
  filtersDots,
  isMerchApiKeyAvailable,
}) => {
  const reportType = route.params.type.value;

  const defaultPaymentFilter =
    paymentFilter && paymentFilter.find((item) => item.name === 'status')
      ? paymentFilter.find((item) => item.name === 'status')
      : { value: 'All' };
  const defaultTransactionFilter =
    transactionFilter && transactionFilter.find((item) => item.name === 'status')
      ? transactionFilter.find((item) => item.name === 'status')
      : { value: 'All' };

  const [radioSelect, setRadioSelect] = useState(
    reportType === 'Payments' ? defaultPaymentFilter : defaultTransactionFilter
  );
  const data = [
    { value: 'All' },
    { value: 'declined' },
    { value: 'approved' },
    { value: 'procesing' },
    { value: 'new' },
  ];

  useEffect(() => {
    console.log('STATUSSCREEN');
  }, []);

  const navigation = useNavigation();

  useEffect(() => {
    switch (reportType) {
      case 'Payments':
        setPaymentsFilter('status', { filters: radioSelect.value, value: radioSelect.value });
        break;
      case 'Transactions':
        setTransactionFilter('status', { filters: radioSelect.value, value: radioSelect.value });
        break;

      default:
        break;
    }
  }, [radioSelect]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {isFiltersVisible && (
        <TransactionsFilters
          isActive={'status'}
          filtersDots={filtersDots}
          isMerchApiKeyAvailable={isMerchApiKeyAvailable}
        />
      )}
      <View style={styles.container}>
        <View style={styles.radioBoxContainer}>
          {/* <CheckBoxList
            data={data}
            onSelect={setCheckBoxSelect}
            styling={{ size: 18, spaceBetween: 34 }}
            isFirstBoxAll={true}
          /> */}
          <RadioList
            data={data}
            onSelect={setRadioSelect}
            defaultValue={radioSelect}
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

export default StatusScreen;
