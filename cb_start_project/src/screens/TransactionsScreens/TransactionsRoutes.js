import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TransactionsScreen from './TransactionsScreen';
import CardholderScreen from './CardholderScreen';

import { Image, Pressable } from 'react-native';

const TransactionsStack = createStackNavigator();

const TransactionsRoutes = ({ handlePressIconLogOut }) => {
  const [genReportPaymentsFilters, setGenReportPaymentsFilters] = useState([]);
  const [genReportTransactionFilters, setGenReportTransactionFilters] = useState([]);

  useEffect(() => {
    // console.log('genReportPaymentsFilters', genReportPaymentsFilters);
  }, [genReportPaymentsFilters, genReportTransactionFilters]);

  const setPaymentsFilter = (filterName, data) => {
    const filter = genReportPaymentsFilters.filter(
      (item) => !Object.keys(item).includes(filterName)
    );
    // console.log('data999', data);

    setGenReportPaymentsFilters((prev) => [...filter, { [filterName]: data }]);
  };
  const setTransactionFilter = (filterName, data) => {
    const filter = genReportPaymentsFilters.filter(
      (item) => !Object.keys(item).includes(filterName)
    );
    setGenReportTransactionFilters((prev) => [...filter, { [filterName]: data }]);
  };

  const profileIcon = require('src/images/profile_icon.png');
  const closeIcon = require('src/images/delete.png');
  return (
    <TransactionsStack.Navigator initialRouteName={TransactionsScreen}>
      <TransactionsStack.Screen
        options={{
          headerTitle: 'Transactions',
          headerTitleAlign: 'left',
          headerRight: ({ size }) => (
            <Pressable onPress={handlePressIconLogOut}>
              <Image
                source={profileIcon}
                style={{ width: 25, height: 25, marginRight: 20 }}
                // onPress={() => navigation.navigate("registration")}
              />
            </Pressable>
          ),
        }}
        name="TransactionsScreen"
        component={TransactionsScreen}
      />
      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: '',
          // headerTitleAlign: 'left',
          headerRight: ({ size }) => (
            <Pressable onPress={handlePressIconLogOut}>
              <Image
                source={closeIcon}
                style={{ width: 25, height: 25, marginRight: 20 }}
                onPress={() => navigation.navigate('TransactionsScreen')}
              />
            </Pressable>
          ),
        }}
        name="CardholderScreen"
        component={CardholderScreen}
      />
    </TransactionsStack.Navigator>
  );
};

export default TransactionsRoutes;
