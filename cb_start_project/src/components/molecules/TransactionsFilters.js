import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import SimpleTransactionFilter from 'src/components/atoms/SimpleTransactionFilter';

const calendarActive = require('src/images/filters/calendar_active.png');
const calendar = require('src/images/filters/calendar.png');
const bankActive = require('src/images/filters/bank_active.png');
const bank = require('src/images/filters/bank.png');
const statusActive = require('src/images/filters/status_active.png');
const status = require('src/images/filters/status.png');
const clockActive = require('src/images/filters/clock_active.png');
const clock = require('src/images/filters/clock.png');
const keyActive = require('src/images/filters/key_active.png');
const key = require('src/images/filters/key.png');
const userActive = require('src/images/filters/user_active.png');
const user = require('src/images/filters/user.png');
const moneyActive = require('src/images/filters/money_active.png');
const money = require('src/images/filters/money.png');
const transactionActive = require('src/images/filters/transaction_active.png');
const transaction = require('src/images/filters/transaction.png');

const TransactionsFilters = (props) => {
  const [selection, setSelection] = useState('calendar'); //'calendar'
  console.log(selection);

  return (
    <View style={styles.container}>
      <View style={styles.filtersCol}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setSelection('calendar')}>
          <SimpleTransactionFilter type="calendar" isActive={selection === 'calendar'} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setSelection('status')}>
          <SimpleTransactionFilter type="status" isActive={selection === 'status'} />
        </TouchableOpacity>
      </View>
      <View style={styles.filtersCol}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setSelection('merchants')}>
          <SimpleTransactionFilter type="merchants" isActive={selection === 'merchants'} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setSelection('currency')}>
          <SimpleTransactionFilter type="currency" isActive={selection === 'currency'} isDot />
        </TouchableOpacity>
      </View>
      <View style={styles.filtersCol}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setSelection('key')}>
          <SimpleTransactionFilter type="key" isActive={selection === 'key'} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setSelection('banks')}>
          <SimpleTransactionFilter type="banks" isActive={selection === 'banks'} />
        </TouchableOpacity>
      </View>
      <View style={styles.filtersCol}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setSelection('mode')}>
          <SimpleTransactionFilter type="mode" isActive={selection === 'mode'} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setSelection('gmt')}>
          <SimpleTransactionFilter type="gmt" isActive={selection === 'gmt'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#242834',
    height: 174,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  filterWrapper: { alignItems: 'center' },

  filtersCol: {
    width: Dimensions.get('window').width / 4 - 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: { width: 24, height: 24, marginBottom: 7 },
  text: { color: '#BAC0D0', fontSize: 10, letterSpacing: 0.5 },
});

export default TransactionsFilters;
