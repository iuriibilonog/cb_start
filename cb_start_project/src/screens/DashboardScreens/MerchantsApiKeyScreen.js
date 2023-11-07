import React, { useState, useEffect, use } from 'react';
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
import SimpleText from '../../components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import TransactionsFilters from 'src/components/molecules/TransactionsFilters';
import { getMerchantsApiKeys } from 'src/redux/content/operations';
import MainLoader from 'src/components/molecules/MainLoader';

const arrowRight = require('src/images/right.png');

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
  const [radioSelect, setRadioSelect] = useState({ value: 'All api keys' });
  const reportType = route.params.type.value;
  const dispatch = useDispatch();
  const [data, setData] = useState([{ value: 'All api keys' }]);
  const [merchId, setMerchId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    switch (reportType) {
      case 'Payments':
        if (clientId) {
          setMerchId(clientId);
          getMerchApiKeys(clientId);
        } else {
          let merchantObj = genReportPaymentsFilters.find((item) => item.name === 'merchants');
          console.log('1>', genReportPaymentsFilters);
          if (merchantObj?.filters?.value && merchantObj?.filter?.value !== 'All merchants') {
            setMerchId(merchantObj.filters.id);
            getMerchApiKeys(merchantObj.filters.id);
          }
        }
        break;
      case 'Transactions':
        merchantObj = genReportTransactionFilters.find((item) => item.name === 'merchants');

        if (merchantObj?.filters?.value && merchantObj?.filter?.value !== 'All merchants') {
          setMerchId(merchantObj.filters.id);
          getMerchApiKeys(merchantObj.filters.id);
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
          setPaymentsFilter('merchantApiKey', {}, true);
        } else {
          setPaymentsFilter('merchantApiKey', { filters: radioSelect, value: radioSelect.value });
        }

        break;
      case 'Transactions':
        if (radioSelect.value === 'All api keys') {
          setTransactionFilter('merchantApiKey', {}, true);
        } else {
          setTransactionFilter('merchantApiKey', {
            filters: radioSelect,
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
      setIsLoading(true);
      const data = await dispatch(getMerchantsApiKeys(id));
      const keys = data.payload.items.map((item) => ({
        ...item,
        value: item.name,
      }));

      setData((prev) => [...prev, ...keys]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.warn('Error:', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <MainLoader isVisible={isLoading} />
      {isFiltersVisible && (
        <TransactionsFilters
          isActive={'key'}
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
            defaultValue={{ value: 'All api keys' }}
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

export default MerchantsApiKeyScreen;
