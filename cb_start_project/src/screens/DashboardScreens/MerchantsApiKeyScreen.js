import React, { useState, useEffect, use } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RadioList from 'src/components/molecules/RadioList';
import SimpleText from '../../components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import TransactionsFilters from 'src/components/molecules/TransactionsFilters';
import { getMerchantsApiKeys } from 'src/redux/content/operations';
import MainLoader from 'src/components/molecules/MainLoader';
import ClientsTransactionsFilters from 'src/components/molecules/ClientsTransactionsFilters';
import { getUserRole } from 'src/redux/user/selectors';

const MerchantsApiKeyScreen = ({
  route,
  setPaymentsFilter,
  setTransactionFilter,
  genReportPaymentsFilters,
  genReportTransactionFilters,
  isFiltersVisible,
  filtersDots,
  isMerchApiKeyAvailable,
  confirmReport,
  clientId,
}) => {
  const reportType = route.params.type.value;
  const defaultPaymentFilter =
    genReportPaymentsFilters &&
    genReportPaymentsFilters.find((item) => item.name === 'merchantApiKey')
      ? genReportPaymentsFilters.find((item) => item.name === 'merchantApiKey')
      : { value: 'All api keys' };
  const defaultTransactionFilter =
    genReportTransactionFilters &&
    genReportTransactionFilters.find((item) => item.name === 'merchantApiKey')
      ? genReportTransactionFilters.find((item) => item.name === 'merchantApiKey')
      : { value: 'All api keys' };

  const [radioSelect, setRadioSelect] = useState(
    reportType === 'Payments' ? defaultPaymentFilter : defaultTransactionFilter
  );
  const dispatch = useDispatch();
  const [data, setData] = useState([{ value: 'All api keys' }]);
  const [merchId, setMerchId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const userRole = useSelector(getUserRole);

  useEffect(() => {
    switch (reportType) {
      case 'Payments':
        if (clientId) {
          setMerchId(clientId);
          getMerchApiKeys(clientId);
        } else {
          let merchantObj = genReportPaymentsFilters.find((item) => item.name === 'merchants');

          if (merchantObj?.filters?.value && merchantObj?.filter?.value !== 'All merchants') {
            setMerchId(merchantObj.filters.id);
            getMerchApiKeys(merchantObj.filters.id);
          }
        }
        break;
      case 'Transactions':
        if (clientId) {
          setMerchId(clientId);
          getMerchApiKeys(clientId);
        } else {
          merchantObj = genReportTransactionFilters.find((item) => item.name === 'merchants');

          if (merchantObj?.filters?.value && merchantObj?.filter?.value !== 'All merchants') {
            setMerchId(merchantObj.filters.id);
            getMerchApiKeys(merchantObj.filters.id);
          }
        }
        break;

      default:
        break;
    }
  }, [genReportPaymentsFilters, genReportTransactionFilters]);

  useEffect(() => {
    switch (reportType) {
      case 'Payments':
        if (radioSelect.value === 'All api keys') {
          const isAlreadyChecked = genReportPaymentsFilters.find(
            (item) => item.name === 'merchantApiKey'
          );
          if (isAlreadyChecked) {
            setPaymentsFilter('merchantApiKey', {}, true);
          }
        } else {
          setPaymentsFilter('merchantApiKey', {
            filters: radioSelect.filters ? radioSelect.filters : radioSelect,
            value: radioSelect.value,
          });
        }

        break;
      case 'Transactions':
        if (radioSelect.value === 'All api keys') {
          const isAlreadyChecked = genReportTransactionFilters.find(
            (item) => item.name === 'merchantApiKey'
          );
          if (isAlreadyChecked) {
            setTransactionFilter('merchantApiKey', {}, true);
          }
        } else {
          setTransactionFilter('merchantApiKey', {
            filters: radioSelect.filters ? radioSelect.filters : radioSelect,
            value: radioSelect.value,
          });
        }
        break;

      default:
        break;
    }
  }, [radioSelect]);

  const getMerchApiKeys = async (id) => {
    if (id?.toString() === merchId?.toString()) return;

    try {
      // setIsLoading(true);
      const data = await dispatch(getMerchantsApiKeys(id));
      const keys = data.payload.items.map((item) => ({
        ...item,
        value: item.name,
      }));

      setData((prev) => [...prev, ...keys]);
      // setIsLoading(false);
    } catch (error) {
      // setIsLoading(false);
      console.warn('Error:', error);
    }
  };

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
            isActive={'key'}
            filtersDots={filtersDots}
            isMerchApiKeyAvailable={isMerchApiKeyAvailable}
          />
        ) : (
          <ClientsTransactionsFilters
            isActive={'key'}
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

export default MerchantsApiKeyScreen;
