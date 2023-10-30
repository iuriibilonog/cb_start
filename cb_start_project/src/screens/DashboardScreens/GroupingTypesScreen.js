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
import RadioList from 'src/components/molecules/RadioList';
import SimpleText from '../../components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import TransactionsFilters from 'src/components/molecules/TransactionsFilters';

const GroupingTypesScreen = ({
  setTransactionFilter,
  transactionFilter,
  isFiltersVisible,
  filtersDots,
  isMerchApiKeyAvailable,
  confirmReport,
}) => {
  const getDefaultFilter = transactionFilter?.find((item) => item.name === 'groupingType');
  const defaultTransactionFilter = getDefaultFilter ? getDefaultFilter : { value: 'ApiKey' };
  const [radioSelect, setRadioSelect] = useState(defaultTransactionFilter);

  const groupingTypes = [{ value: 'ApiKey' }, { value: 'Bank' }, { value: 'All' }];

  useEffect(() => {
    setTransactionFilter('groupingType', { value: radioSelect.value });
  }, [radioSelect]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {isFiltersVisible && (
        <TransactionsFilters
          isActive={'groupingType'}
          filtersDots={filtersDots}
          isMerchApiKeyAvailable={isMerchApiKeyAvailable}
        />
      )}
      <View style={styles.container}>
        <View style={styles.radioBoxContainer}>
          <RadioList
            data={groupingTypes}
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

export default GroupingTypesScreen;
