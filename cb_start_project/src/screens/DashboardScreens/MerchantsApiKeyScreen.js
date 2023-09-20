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

const arrowRight = require('src/images/right.png');

const MerchantsApiKeyScreen = ({
  route,
  setPaymentsFilter,
  setTransactionFilter,
  genReportPaymentsFilters,
  genReportTransactionFilters,
  isFiltersVisible,
  filtersDots,
  isMerchApiKeyAvailable,confirmReport
}) => {
  const [radioSelect, setRadioSelect] = useState({ value: 'All api keys' });
  const reportType = route.params.type.value;
  const dispatch = useDispatch();
  const [data, setData] = useState([{ value: 'All api keys' }]);
  const [merchId, setMerchId] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    switch (reportType) {
      case 'Payments':
        let merchantObj = genReportPaymentsFilters.find((item) => item.name === 'merchants');

        if (merchantObj?.filters?.value && merchantObj?.filter?.value !== 'All merchants') {
          setMerchId(merchantObj.filters.id);
          getMerchApiKeys(merchantObj.filters.id);
        }
        break;
      case 'Transactions':
        break;

      default:
        break;
    }
  }, [genReportPaymentsFilters, genReportTransactionFilters]);

  useEffect(() => {
    switch (reportType) {
      case 'Payments':
        setPaymentsFilter('merchantApiKey', { filters: radioSelect, value: radioSelect.value });

        break;
      case 'Transactions':
        setTransactionFilter('merchantApiKey', { filters: radioSelect, value: radioSelect.value });
        break;

      default:
        break;
    }
  }, [radioSelect]);

  const getMerchApiKeys = async (id) => {
    if (id.toString() === merchId.toString()) return;

    try {
      const data = await dispatch(getMerchantsApiKeys(id));
      const keys = data.payload.items.map((item) => ({
        ...item,
        value: item.name,
      }));

      setData((prev) => [...prev, ...keys]);
    } catch (error) {
      console.warn('Error:', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
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
