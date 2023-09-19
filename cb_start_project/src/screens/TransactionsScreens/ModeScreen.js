import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
// import { getModes } from 'src/redux/content/selectors';
import RadioList from 'src/components/molecules/RadioList';
import SimpleText from '../../components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import TransactionsFilters from 'src/components/molecules/TransactionsFilters';

const ModeScreen = ({ setTransactionFilter, transactionFilter, isFiltersVisible, filtersDots , isMerchApiKeyAvailable}) => {
  const getDefaultFilter = transactionFilter?.find((item) => item.name === 'mode');
  const defaultTransactionFilter = getDefaultFilter ? getDefaultFilter : { value: 'All' };

  const [radioSelect, setRadioSelect] = useState(defaultTransactionFilter);
  const [modes, setModes] = useState([{ value: 'All' }, {value:'payin'}, {value:'payout'}]);
  // const data = useSelector(getModes);

  // useEffect(() => {
  //   if (!data.length) return;
  //   const modifyModes = data.map((item) => ({
  //     name: item.name,
  //     value: item.name,
  //     id: item.id,
  //   }));
  //   setModes((prev) => [{ value: 'All' }, ...modifyModes]);

  // }, [data]);

  useEffect(() => {
    setTransactionFilter('mode', { filters: radioSelect, value: radioSelect.value });
  }, [radioSelect]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {isFiltersVisible && <TransactionsFilters isActive={'mode'} filtersDots={filtersDots} isMerchApiKeyAvailable={isMerchApiKeyAvailable}/>}
      <View style={styles.container}>
        <View style={styles.radioBoxContainer}>
          <RadioList
            data={modes}
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

export default ModeScreen;
