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
import { useNavigation } from '@react-navigation/native';

const TransactionsFilters = (props) => {
  const [selection, setSelection] = useState(props.isActive || ''); //'date'
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.filtersCol}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setSelection('date');
            navigation.navigate('CalendarScreen', { type: { value: 'Transactions' } });
          }}
        >
          <SimpleTransactionFilter
            type="date"
            isActive={selection === 'date'}
            isDot={props?.filtersDots?.includes('date')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setSelection('status');
            navigation.navigate('StatusScreen', { type: { value: 'Transactions' } });
          }}
        >
          <SimpleTransactionFilter
            type="status"
            isActive={selection === 'status'}
            isDot={props?.filtersDots?.includes('status')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.filtersCol}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setSelection('merchants');
            navigation.navigate('MerchantsScreen', { type: { value: 'Transactions' } });
          }}
        >
          <SimpleTransactionFilter
            type="merchants"
            isActive={selection === 'merchants'}
            isDot={props?.filtersDots?.includes('merchants')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setSelection('currency');
            navigation.navigate('CurrencyScreen', { type: { value: 'Transactions' } });
          }}
        >
          <SimpleTransactionFilter
            type="currency"
            isActive={selection === 'currency'}
            isDot={props?.filtersDots?.includes('currency')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.filtersCol}>
        <TouchableOpacity
          activeOpacity={props.isMerchApiKeyAvailable ? 0.5 : 1}
          onPress={() => {
            if (props.isMerchApiKeyAvailable) {
              setSelection('key');
              navigation.navigate('MerchantsApiKeyScreen', { type: { value: 'Transactions' } });
            }
          }}
        >
          <SimpleTransactionFilter
            type="key"
            isActive={selection === 'key'}
            isInactive={!props.isMerchApiKeyAvailable}
            isDot={props?.filtersDots?.includes('merchantApiKey')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setSelection('banks');
            navigation.navigate('BanksScreen', { type: { value: 'Transactions' } });
          }}
        >
          <SimpleTransactionFilter
            type="banks"
            isActive={selection === 'banks'}
            isDot={props?.filtersDots?.includes('banks')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.filtersCol}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setSelection('mode');
            navigation.navigate('ModeScreen', { type: { value: 'Transactions' } });
          }}
        >
          <SimpleTransactionFilter
            type="mode"
            isActive={selection === 'mode'}
            isDot={props?.filtersDots?.includes('mode')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setSelection('gmt');
            navigation.navigate('TimeZoneScreen', { type: { value: 'Transactions' } });
          }}
        >
          <SimpleTransactionFilter
            type="gmt"
            isActive={selection === 'timezone'}
            isDot={props?.filtersDots?.includes('timezone')}
          />
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
