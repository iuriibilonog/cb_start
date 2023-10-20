import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { getTransactionData } from 'src/redux/content/operations';
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
import debounce from 'lodash.debounce';
import { Image, Pressable, TouchableOpacity, View, TextInput } from 'react-native';

const headerLeft = require('src/images/header_left.png');
const searchIcon = require('src/images/search_dark.png');

const TransactionsStack = createStackNavigator();
const dateNow = new Date().toISOString().slice(0, 10);
const initialFilters = [];
const TransactionsRoutes = ({ navigation, handlePressIconLogOut }) => {
  const [genReportPaymentsFilters, setGenReportPaymentsFilters] = useState(initialFilters);
  const [genReportTransactionFilters, setGenReportTransactionFilters] = useState(initialFilters);
  const [filtersDots, setFiltersDots] = useState([]);
  const [isMerchApiKeyAvailable, setIsMerchApiKeyAvailable] = useState(false);
  const [isTransactionsWithFilterLoading, setIsTransactionsWithFilterLoading] = useState(false);

  const [search, setSearch] = useState();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const dispatch = useDispatch();

  const handleSearchText = (data) => {
    setSearch(data);
  };

  const handleHideSearchInput = () => {
    setIsSearchVisible(false);
  };

  const handleFilter = debounce(handleSearchText, 1000);

  const handleSearchTransactions = () => {
    setIsSearchVisible((prev) => !prev);
  };

  useEffect(() => {
    // console.log('genReportPaymentsFilters', genReportPaymentsFilters);
    const filtersWithData = genReportTransactionFilters.filter(
      (item) => item.name && item.name !== ''
    );
    if (filtersWithData) {
      // console.log('<><><><>', filtersWithData);
      setFiltersDots(filtersWithData.map((item) => item.name));
      setIsMerchApiKeyAvailable(
        filtersWithData.find((item) => item.name === 'merchants') !== undefined
      );
    }
    if (genReportTransactionFilters.length === 0) {
      console.log('Reset filters');
      confirmTransactionFilters();
    }
  }, [genReportTransactionFilters]);

  const setPaymentsFilter = (filterName, data) => {
    const filter = genReportPaymentsFilters.filter((item) => item.name !== filterName);

    setGenReportPaymentsFilters((prev) => [...filter, { name: filterName, ...data }]);
  };
  const setTransactionFilter = (filterName, data, isDeleteFilter) => {
    const filter = genReportTransactionFilters.filter((item) => item.name !== filterName);
    setGenReportTransactionFilters((prev) =>
      isDeleteFilter ? filter : [...filter, { name: filterName, ...data }]
    );
  };

  const createTransactionRequestObject = (filters) => {
    let result = {};
    // [{"filters": {"endDate": "2023-09-20", "startDate": "2023-09-20"}, "name": "date", "value": "2023-09-20, 2023-09-20"}, {"filters": {"value": "All merchants"}, "name": "merchants", "value": "All merchants"}, {"filters": {"value": "All api keys"}, "name": "merchantApiKey", "value": "All api keys"}, {"filters": {"value": "All"}, "name": "mode", "value": "All"}, {"filters": "All", "name": "status", "value": "All"}, {"filters": {"value": "All"}, "name": "currency", "value": "All"}, {"filters": {"value": "All"}, "name": "banks", "value": "All"}, {"filters": {"value": "UTC0"}, "name": "timezone", "value": "UTC0"}]
    filters.forEach((item) => {
      switch (item.name) {
        case 'date':
          result.startDate = item.filters.startDate;
          result.endDate = item.filters.endDate;
          break;
        case 'merchants':
          result.userId = item.filters.id;
          // result.userId = item.filters.id ? item.filters.id : item.filters.value;
          break;
        case 'merchantApiKey':
          result.merchantApiKey = item.filters.id;
          // result.merchantApiKey = item.filters.id ? item.filters.id : item.filters.value;
          break;
        case 'banks':
          result.bankName = item.value;
          break;
        default:
          result[item.name] = item.value;
      }
    });
    return result;
  };

  const profileIcon = require('src/images/profile_icon.png');
  const closeIcon = require('src/images/delete.png');

  const confirmTransactionFilters = async () => {
    setIsTransactionsWithFilterLoading(true);
    navigation.navigate('TransactionsScreen');
    const transactionRequestObject = createTransactionRequestObject(genReportTransactionFilters);
    await dispatch(getTransactionData({ transactionData: transactionRequestObject, page: 1 }));
    setIsTransactionsWithFilterLoading(false);
  };

  return (
    <TransactionsStack.Navigator initialRouteName={TransactionsScreen}>
      <TransactionsStack.Screen
        options={{
          headerTitle: 'Transactions',
          headerTitleAlign: 'left',
          headerRight: ({ size }) => (
            <View style={{ flexDirection: 'row', position: 'relative', height: 26 }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleSearchTransactions}
                style={{
                  borderBottomWidth: isSearchVisible ? 1 : 0,
                  borderColor: 'rgba(217, 217, 217, 0.70)',
                }}
              >
                <Image
                  source={searchIcon}
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: isSearchVisible ? 0 : 20,
                    opacity: isSearchVisible ? 0.3 : 1,
                  }}
                />
              </TouchableOpacity>
              {isSearchVisible && (
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: 'rgba(217, 217, 217, 0.70)',
                    height: 26,
                    width: 150,
                    marginRight: 12,
                    paddingTop: 3,
                    paddingHorizontal: 5,
                  }}
                >
                  <TextInput onChangeText={handleFilter} style={{}} autoFocus={true} />
                </View>
              )}

              <Pressable onPress={handlePressIconLogOut}>
                <Image source={profileIcon} style={{ width: 25, height: 25, marginRight: 20 }} />
              </Pressable>
            </View>
          ),
        }}
        name="TransactionsScreen"
        // component={TransactionsScreen}
      >
        {(props) => (
          <TransactionsScreen
            {...props}
            searchTxt={search}
            setIsSearchVisible={handleHideSearchInput}
            isMerchApiKeyAvailable={isMerchApiKeyAvailable}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            genReportTransactionFilters={genReportTransactionFilters}
            setGenReportTransactionFilters={setGenReportTransactionFilters}
            createTransactionRequestObject={createTransactionRequestObject}
            isTransactionsWithFilterLoading={isTransactionsWithFilterLoading}
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
            <Pressable onPress={confirmTransactionFilters}>
              <Image
                source={headerLeft}
                style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              />
            </Pressable>
          ),
        }}
        name="CalendarScreen"
      >
        {(props) => (
          <CalendarScreen
            {...props}
            isMerchApiKeyAvailable={isMerchApiKeyAvailable}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
            confirmReport={confirmTransactionFilters}
          />
        )}
      </TransactionsStack.Screen>
      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Merchants',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Pressable onPress={confirmTransactionFilters}>
              <Image
                source={headerLeft}
                style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              />
            </Pressable>
          ),
        }}
        name="MerchantsScreen"
      >
        {(props) => (
          <MerchantsScreen
            {...props}
            isMerchApiKeyAvailable={isMerchApiKeyAvailable}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
            confirmReport={confirmTransactionFilters}
          />
        )}
      </TransactionsStack.Screen>
      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Merchant"s api key',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Pressable onPress={confirmTransactionFilters}>
              <Image
                source={headerLeft}
                style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              />
            </Pressable>
          ),
        }}
        name="MerchantsApiKeyScreen"
      >
        {(props) => (
          <MerchantsApiKeyScreen
            {...props}
            isMerchApiKeyAvailable={isMerchApiKeyAvailable}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            genReportTransactionFilters={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
            confirmReport={confirmTransactionFilters}
          />
        )}
      </TransactionsStack.Screen>
      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Status',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Pressable onPress={confirmTransactionFilters}>
              <Image
                source={headerLeft}
                style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              />
            </Pressable>
          ),
        }}
        name="StatusScreen"
      >
        {(props) => (
          <StatusScreen
            {...props}
            isMerchApiKeyAvailable={isMerchApiKeyAvailable}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
            confirmReport={confirmTransactionFilters}
          />
        )}
      </TransactionsStack.Screen>
      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Timezone',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Pressable onPress={confirmTransactionFilters}>
              <Image
                source={headerLeft}
                style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              />
            </Pressable>
          ),
        }}
        name="TimeZoneScreen"
      >
        {(props) => (
          <TimeZoneScreen
            {...props}
            isMerchApiKeyAvailable={isMerchApiKeyAvailable}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
            confirmReport={confirmTransactionFilters}
          />
        )}
      </TransactionsStack.Screen>

      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Banks',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Pressable onPress={confirmTransactionFilters}>
              <Image
                source={headerLeft}
                style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              />
            </Pressable>
          ),
        }}
        name="BanksScreen"
      >
        {(props) => (
          <BanksScreen
            {...props}
            isMerchApiKeyAvailable={isMerchApiKeyAvailable}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
            confirmReport={confirmTransactionFilters}
          />
        )}
      </TransactionsStack.Screen>
      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Mode',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Pressable onPress={confirmTransactionFilters}>
              <Image
                source={headerLeft}
                style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              />
            </Pressable>
          ),
        }}
        name="ModeScreen"
      >
        {(props) => (
          <ModeScreen
            {...props}
            isMerchApiKeyAvailable={isMerchApiKeyAvailable}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
            confirmReport={confirmTransactionFilters}
          />
        )}
      </TransactionsStack.Screen>
      <TransactionsStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Currency',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Pressable onPress={confirmTransactionFilters}>
              <Image
                source={headerLeft}
                style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              />
            </Pressable>
          ),
        }}
        name="CurrencyScreen"
      >
        {(props) => (
          <CurrencyScreen
            {...props}
            isMerchApiKeyAvailable={isMerchApiKeyAvailable}
            isFiltersVisible={true}
            filtersDots={filtersDots}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
            confirmReport={confirmTransactionFilters}
          />
        )}
      </TransactionsStack.Screen>
    </TransactionsStack.Navigator>
  );
};

export default TransactionsRoutes;
