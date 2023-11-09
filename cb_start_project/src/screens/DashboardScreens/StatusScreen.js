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
import ClientsTransactionsFilters from 'src/components/molecules/ClientsTransactionsFilters';
import { useSelector } from 'react-redux';
import { getUserRole } from 'src/redux/user/selectors';
import MainLoader from 'src/components/molecules/MainLoader';

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
  confirmReport,
}) => {
  const reportType = route.params.type.value;
  const userRole = useSelector(getUserRole);

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
    { value: 'processing' },
    { value: 'new' },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // const isAlreadyCheckedTransaction = transactionFilter.find((item) => item.name === 'status');
    // // const isAlreadyCheckedPayment = paymentFilter.find((item) => item.name === 'status');
    // if (radioSelect.value === 'All' && !isAlreadyCheckedTransaction) return;

    switch (reportType) {
      case 'Payments':
        if (radioSelect.value === 'All') {
          const isAlreadyChecked = paymentFilter.find((item) => item.name === 'status');
          if (isAlreadyChecked) {
            setPaymentsFilter('status', {}, true);
          }
        } else {
          setPaymentsFilter('status', { filters: radioSelect.value, value: radioSelect.value });
        }
        break;
      case 'Transactions':
        if (radioSelect.value === 'All') {
          const isAlreadyChecked = transactionFilter.find((item) => item.name === 'status');
          if (isAlreadyChecked) {
            setTransactionFilter('status', {}, true);
          }
        } else {
          setTransactionFilter('status', { filters: radioSelect.value, value: radioSelect.value });
        }
        break;

      default:
        break;
    }
  }, [radioSelect]);

  const handleConfirmReport = () => {
    setIsLoading(true);
    confirmReport();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <MainLoader isVisible={isLoading} />
      {isFiltersVisible &&
        (userRole === 3 ? (
          <TransactionsFilters
            isActive={'status'}
            filtersDots={filtersDots}
            isMerchApiKeyAvailable={isMerchApiKeyAvailable}
          />
        ) : (
          <ClientsTransactionsFilters
            isActive={'status'}
            filtersDots={filtersDots}
            // isMerchApiKeyAvailable={isMerchApiKeyAvailable}
          />
        ))}
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

        <TouchableOpacity activeOpacity={0.5} onPress={handleConfirmReport} style={{ width: 140 }}>
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
