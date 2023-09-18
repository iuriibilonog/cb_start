import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TransactionsScreen from './TransactionsScreen';
import CardholderScreen from './CardholderScreen';
import CalendarScreen from '../DashboardScreens/CalendarScreen';
import MerchantsScreen from '../DashboardScreens/MerchantsScreen';
import StatusScreen from '../DashboardScreens/StatusScreen';
import BanksScreen from '../DashboardScreens/BanksScreen';
import ModeScreen from '../TransactionsScreens/ModeScreen';
import CurrencyScreen from '../TransactionsScreens/CurrencyScreen';

import TimeZoneScreen from '../DashboardScreens/TimeZoneScreen';
import MerchantsApiKeyScreen from '../DashboardScreens/MerchantsApiKeyScreen';

import { Image, Pressable } from 'react-native';
const headerLeft = require('src/images/header_left.png');
const TransactionsStack = createStackNavigator();

const TransactionsRoutes = ({ handlePressIconLogOut }) => {
  const [genReportPaymentsFilters, setGenReportPaymentsFilters] = useState([]);
  const [genReportTransactionFilters, setGenReportTransactionFilters] = useState([]);
  const [filtersDots, setFiltersDots] = useState([]);

  useEffect(() => {
    // console.log('genReportPaymentsFilters', genReportPaymentsFilters);
    const filtersWithData = genReportTransactionFilters.filter(
      (item) => item.name && item.name !== ''
    );
    if (filtersWithData) {
      setFiltersDots(filtersWithData.map((item) => item.name));
    }
  }, [genReportTransactionFilters]);

  const setPaymentsFilter = (filterName, data) => {
    const filter = genReportPaymentsFilters.filter((item) => item.name !== filterName);

    setGenReportPaymentsFilters((prev) => [...filter, { name: filterName, ...data }]);
  };
  const setTransactionFilter = (filterName, data) => {
    const filter = genReportTransactionFilters.filter((item) => item.name !== filterName);
    setGenReportTransactionFilters((prev) => [...filter, { name: filterName, ...data }]);
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
        // component={TransactionsScreen}
      >
        {(props) => (
          <TransactionsScreen
            {...props}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            genReportTransactionFilters={genReportTransactionFilters}
          />
        )}
      </TransactionsStack.Screen>
      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
          // headerTitle: '',
          // // headerTitleAlign: 'left',
          // headerRight: ({ size }) => (
          //   <Pressable onPress={handlePressIconLogOut}>
          //     <Image
          //       source={closeIcon}
          //       style={{ width: 25, height: 25, marginRight: 20 }}
          //       onPress={() => navigation.navigate('TransactionsScreen')}
          //     />
          //   </Pressable>
          // ),
        }}
        name="CardholderScreen"
        component={CardholderScreen}
      />
      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Calendar',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate("registration")}
            />
          ),
        }}
        name="CalendarScreen"
      >
        {(props) => (
          <CalendarScreen
            {...props}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
          />
        )}
      </TransactionsStack.Screen>
      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Merchants',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate('TransactionsScreen')}
            />
          ),
        }}
        name="MerchantsScreen"
      >
        {(props) => (
          <MerchantsScreen
            {...props}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
          />
        )}
      </TransactionsStack.Screen>
      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Merchant"s api key',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate('TransactionsScreen')}
            />
          ),
        }}
        name="MerchantsApiKeyScreen"
      >
        {(props) => (
          <MerchantsApiKeyScreen
            {...props}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
          />
        )}
      </TransactionsStack.Screen>
      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Status',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate('TransactionsScreen')}
            />
          ),
        }}
        name="StatusScreen"
      >
        {(props) => (
          <StatusScreen
            {...props}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
          />
        )}
      </TransactionsStack.Screen>
      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Timezone',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate('TransactionsScreen')}
            />
          ),
        }}
        name="TimeZoneScreen"
      >
        {(props) => (
          <TimeZoneScreen
            {...props}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
          />
        )}
      </TransactionsStack.Screen>

      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Banks',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate('TransactionsScreen')}
            />
          ),
        }}
        name="BanksScreen"
      >
        {(props) => (
          <BanksScreen
            {...props}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
          />
        )}
      </TransactionsStack.Screen>
      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Mode',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate('TransactionsScreen')}
            />
          ),
        }}
        name="ModeScreen"
      >
        {(props) => (
          <ModeScreen
            {...props}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
          />
        )}
      </TransactionsStack.Screen>
      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Currency',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate('TransactionsScreen')}
            />
          ),
        }}
        name="CurrencyScreen"
      >
        {(props) => (
          <CurrencyScreen
            {...props}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
          />
        )}
      </TransactionsStack.Screen>
    </TransactionsStack.Navigator>
  );
};

export default TransactionsRoutes;
