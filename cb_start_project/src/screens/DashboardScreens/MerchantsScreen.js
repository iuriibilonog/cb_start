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
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import RadioList from 'src/components/molecules/RadioList';
import CheckBoxList from 'src/components/molecules/CheckBoxList';
import { FormattedMessage } from 'react-intl';
import SimpleText from '../../components/atoms/SimpleText';
import { getUsers } from 'src/redux/content/selectors';
import TransactionsFilters from 'src/components/molecules/TransactionsFilters';

const arrowRight = require('src/images/right.png');

const MerchantsScreen = ({
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
  const defaultPaymentFilter =
    paymentFilter && paymentFilter.find((item) => item.name === 'merchants')
      ? paymentFilter.find((item) => item.name === 'merchants')
      : {};
  const defaultTransactionFilter =
    transactionFilter && transactionFilter.find((item) => item.name === 'merchants')
      ? transactionFilter.find((item) => item.name === 'merchants')
      : {};

  const [radioSelect, setRadioSelect] = useState(
    reportType === 'Payments' ? defaultPaymentFilter : defaultTransactionFilter
  );

  const [merchants, setMerchants] = useState([
    { id: 10, value: 'Getapay' },
    { id: 36, value: 'Impaya' },
    { id: 43, value: 'XXXX' },
    { id: 52, value: 'MB' },
  ]);
  const allUsers = useSelector(getUsers);

  useEffect(() => {
    if (allUsers.length) {
      const data = allUsers
        .filter(
          (item) =>
            parseInt(item.roleId) === 1 &&
            item.id !== 10 &&
            item.id !== 36 &&
            item.id !== 43 &&
            item.id !== 52
        )
        .map((item) => ({
          ...item,
          value: item.username,
        }));

      setMerchants((prev) => [...prev, ...data]);
    }
  }, [allUsers]);

  const navigation = useNavigation();

  useEffect(() => {
    switch (reportType) {
      case 'Payments':
        if (Object.keys(radioSelect).length > 0) {
          setPaymentsFilter('merchants', { filters: radioSelect, value: radioSelect.value });
        }
        break;
      case 'Transactions':
        console.log('<<))>>', radioSelect);
        if (Object.keys(radioSelect).length > 0) {
          setTransactionFilter('merchants', { filters: radioSelect, value: radioSelect.value });
        }
        break;

      default:
        break;
    }
  }, [radioSelect]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {isFiltersVisible && (
        <TransactionsFilters
          isActive={'merchants'}
          filtersDots={filtersDots}
          isMerchApiKeyAvailable={isMerchApiKeyAvailable}
        />
      )}
      <View style={styles.container}>
        <View style={styles.radioBoxContainer}>
          {/* <CheckBoxList
            data={data}
            onSelect={setCheckBoxSelect}
            // defaultValue={[{ value: 'XXXX' }]}
            styling={{ size: 18, spaceBetween: 34 }}
            isFirstBoxAll={true}
          /> */}
          <RadioList
            data={merchants}
            onSelect={setRadioSelect}
            defaultValue={radioSelect}
            styling={{ size: 18, spaceBetween: 34 }}
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

export default MerchantsScreen;
