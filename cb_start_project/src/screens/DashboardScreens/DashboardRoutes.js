import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import DashboardScreen from './DashboardScreen';
import GeneralReportsScreen from './GeneralReportsScreen';
import CalendarScreen from './CalendarScreen';
import TimeZoneScreen from './TimeZoneScreen';
import MerchantsScreen from './MerchantsScreen';
import MerchantsApiKeyScreen from './MerchantsApiKeyScreen';
import StatusScreen from './StatusScreen';
import FilterColumnsScreen from './FilterColumnsScreen';
import BanksScreen from './BanksScreen';
import { Image, Pressable, Alert } from 'react-native';
import { getReport } from 'src/redux/content/operations';
import { useDispatch } from 'react-redux';

const DashboardStack = createStackNavigator();

const DashboardRoutes = ({ handlePressIconLogOut }) => {
  const initialDate = new Date().toISOString().slice(0, 10);
  const [genReportPaymentsFilters, setGenReportPaymentsFilters] = useState([]);
  const [genReportTransactionFilters, setGenReportTransactionFilters] = useState([]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('genReportPaymentsFilters', genReportPaymentsFilters);
  // }, [genReportPaymentsFilters, genReportTransactionFilters]);

  const confirmReport = async () => {
    let str = '';

    genReportPaymentsFilters.map((item) => {
      switch (item.name) {
        case 'date':
          str = `startDate=${item.filters.startDate}` + '&' + `endDate=${item.filters.endDate}`;
          break;
        case 'timezone':
          str = str + '&' + `timezone=${item.filters.code}`;
          break;
        case 'merchants':
          if (item.value !== 'All merchants') {
            str = str + '&' + `userId=${item.filters.id}`;
          }
          break;
        case 'merchantApiKey':
          if (item.value !== 'All api keys') {
            str = str + '&' + `apiKeyId=${item.filters.id}`;
          }
          break;
        case 'status':
          if (item.value !== 'All') {
            str = str + '&' + `status=${item.value}`;
          }
          break;
        case 'banks':
          if (item.value !== 'All') {
            str = str + '&' + `bankName=${item.value}`;
          }
          break;
        case 'filterColumns':
          const filters = item.filters.map((filter) => (filter = `exportFields=${filter.code}`));
          str = str + '&' + `${filters.join('&')}`;
          // console.log('str', str);
          break;

        default:
          break;
      }
    });

    const report = await dispatch(getReport(str));

    if (report.error) {
      Alert.alert(`${report.payload.error}`, ' ', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      const blob = new Blob([report.payload], {
        type: 'application/json',
      });
      // const url = URL.createObjectURL(blob);

      const fr = new FileReader();
      console.log('fr', fr);

      fr.onload = async () => {
        const fileUri = `${FileSystem.documentDirectory}/report.xlsx`;

        console.log('fr', fr);
        await FileSystem.writeAsStringAsync(fileUri, fr.result.split(',')[1], {
          encoding: FileSystem.EncodingType.Base64,
        });
        Sharing.shareAsync(fileUri);
        // const { StorageAccessFramework } = FileSystem;
        // const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

        // if (permissions.granted) {
        //   let directoryUri = permissions.directoryUri;
        //   await StorageAccessFramework.createFileAsync(
        //     directoryUri,
        //     'report1',
        //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        //   )
        //     .then(async (fileUri) => {
        //       await FileSystem.writeAsStringAsync(fileUri, fr.result.split(',')[1], {
        //         encoding: FileSystem.EncodingType.Base64,
        //       });
        //     })
        //     .catch((e) => {
        //       console.log(e);
        //     });
        // }
      };
      fr.readAsDataURL(blob);
      // console.log('fr.readAsDataURL', fr.onload());
    }
  };

  const setPaymentsFilter = (filterName, data) => {
    const filter = genReportPaymentsFilters.filter((item) => item.name !== filterName);

    setGenReportPaymentsFilters((prev) => [...filter, { name: filterName, ...data }]);
  };
  const setTransactionFilter = (filterName, data) => {
    const filter = genReportTransactionFilters.filter((item) => item.name !== filterName);
    setGenReportTransactionFilters((prev) => [...filter, { name: filterName, ...data }]);
  };

  const handleDeleteFilter = (radioSelectValue, { name }) => {
    switch (radioSelectValue) {
      case 'Payments':
        setGenReportPaymentsFilters((prev) => prev.filter((item) => item.name !== name));
        break;
      case 'Transactions':
        setGenReportTransactionFilters((prev) => prev.filter((item) => item.name !== name));
        break;
    }
  };

  const handleDeleteAllFilters = (radioSelectValue) => {
    switch (radioSelectValue) {
      case 'Payments':
        setGenReportPaymentsFilters([]);
        break;
      case 'Transactions':
        setGenReportTransactionFilters([]);
        break;
    }
  };

  const profileIcon = require('src/images/profile_icon.png');
  const headerLeft = require('src/images/header_left.png');
  return (
    <DashboardStack.Navigator initialRouteName={DashboardScreen}>
      <DashboardStack.Screen
        options={{
          headerTitle: 'Dashboard',
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
        name="DashboardScreen"
        component={DashboardScreen}
      />
      <DashboardStack.Screen
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
        // component={CalendarScreen}
      >
        {(props) => (
          <CalendarScreen
            {...props}
            setPaymentsFilter={setPaymentsFilter}
            setTransactionFilter={setTransactionFilter}
            paymentFilter={genReportPaymentsFilters}
            transactionFilter={genReportTransactionFilters}
          />
        )}
      </DashboardStack.Screen>
      <DashboardStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'General report',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate("registration")}
            />
          ),
        }}
        name="GeneralReportsScreen"
        // component={GeneralReportsScreen}
      >
        {(props) => (
          <GeneralReportsScreen
            {...props}
            genReportPaymentsFilters={genReportPaymentsFilters}
            genReportTransactionFilters={genReportTransactionFilters}
            handleDeleteFilter={handleDeleteFilter}
            handleDeleteAllFilters={handleDeleteAllFilters}
          />
        )}
      </DashboardStack.Screen>
      <DashboardStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Timezone',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate("registration")}
            />
          ),
        }}
        name="TimeZoneScreen"
        // component={TimeZoneScreen}
      >
        {(props) => (
          <TimeZoneScreen
            {...props}
            paymentFilter={genReportPaymentsFilters}
            transactionFilter={genReportTransactionFilters}
            setPaymentsFilter={setPaymentsFilter}
            setTransactionFilter={setTransactionFilter}
            confirmReport={confirmReport}
          />
        )}
      </DashboardStack.Screen>

      <DashboardStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Merchants',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate("registration")}
            />
          ),
        }}
        name="MerchantsScreen"
        // component={MerchantsScreen}
      >
        {(props) => (
          <MerchantsScreen
            {...props}
            paymentFilter={genReportPaymentsFilters}
            transactionFilter={genReportTransactionFilters}
            setPaymentsFilter={setPaymentsFilter}
            setTransactionFilter={setTransactionFilter}
          />
        )}
      </DashboardStack.Screen>
      <DashboardStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Merchant"s api key',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate("registration")}
            />
          ),
        }}
        name="MerchantsApiKeyScreen"
        // component={MerchantsApiKeyScreen}
      >
        {(props) => (
          <MerchantsApiKeyScreen
            {...props}
            setPaymentsFilter={setPaymentsFilter}
            setTransactionFilter={setTransactionFilter}
            genReportPaymentsFilters={genReportPaymentsFilters}
            genReportTransactionFilters={genReportTransactionFilters}
          />
        )}
      </DashboardStack.Screen>
      <DashboardStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Status',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate("registration")}
            />
          ),
        }}
        name="StatusScreen"
        // component={StatusScreen}
      >
        {(props) => (
          <StatusScreen
            {...props}
            paymentFilter={genReportPaymentsFilters}
            transactionFilter={genReportTransactionFilters}
            setPaymentsFilter={setPaymentsFilter}
            setTransactionFilter={setTransactionFilter}
          />
        )}
      </DashboardStack.Screen>
      <DashboardStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Filter columns',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate("registration")}
            />
          ),
        }}
        name="FilterColumnsScreen"
        // component={FilterColumnsScreen}
      >
        {(props) => (
          <FilterColumnsScreen
            {...props}
            paymentFilter={genReportPaymentsFilters}
            // transactionFilter={genReportTransactionFilters}
            setPaymentsFilter={setPaymentsFilter}
            // setTransactionFilter={setTransactionFilter}
          />
        )}
      </DashboardStack.Screen>

      <DashboardStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Banks',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate("registration")}
            />
          ),
        }}
        name="BanksScreen"
        // component={BanksScreen}
      >
        {(props) => (
          <BanksScreen
            {...props}
            transactionFilter={genReportTransactionFilters}
            setTransactionFilter={setTransactionFilter}
          />
        )}
      </DashboardStack.Screen>
    </DashboardStack.Navigator>
  );
};

export default DashboardRoutes;
