import { useState, useEffect } from 'react';
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
import { CommonActions } from '@react-navigation/native';

const ClientsTransactionsFilters = (props) => {
  const navigation = useNavigation();
  let selection;
  selection = props.isActive;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'ClientsTransactionsScreen' }],
            })
          );
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
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'ClientsTransactionsScreen' }],
            })
          );
          // setSelection('key');
          navigation.navigate('MerchantsApiKeyScreen', { type: { value: 'Payments' } });
        }}
      >
        <SimpleTransactionFilter
          type="user_key"
          isActive={selection === 'user_key'}
          // isInactive={!props.isMerchApiKeyAvailable}
          isDot={props?.filtersDots?.includes('merchantApiKey')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          // setSelection('status');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'ClientsTransactionsScreen' }],
            })
          );
          navigation.navigate('StatusScreen', { type: { value: 'Transactions' } });
        }}
      >
        <SimpleTransactionFilter
          type="status"
          isActive={selection === 'status'}
          isDot={props?.filtersDots?.includes('status')}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'ClientsTransactionsScreen' }],
            })
          );
          // setSelection('gmt');
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
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#242834',
    // height: 87,
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

export default ClientsTransactionsFilters;
