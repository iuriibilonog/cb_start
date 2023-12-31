import React, { useState, useCallback } from 'react';
import UserScreen from './UserScreen';
import UsersListScreen from './UsersListScreen';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Image,
  Pressable,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import EditScreen from '../ApiScreens/EditScreen';
import DeleteScreen from '../ApiScreens/DeleteScreen';
import EditLedgerScreen from './EditLedgerScreen';
import CreateLedgerScreen from './CreateLedgerScreen';
import AddEditUserScreen from './AddEditUserScreen';
import DeleteUserScreen from './DeleteUserScreen';
import CreateApiKeyScreen from './CreateApiKeyScreen';
import EditPaymentsSettingsScreen from './EditPaymentsSettingsScreen';
import CreatePaymentsSettingsScreen from './CreatePaymentsSettingsScreen';
import debounce from 'lodash.debounce';

const profileIcon = require('src/images/profile_icon.png');
const searchIcon = require('src/images/search_dark.png');
const headerLeft = require('src/images/header_left.png');
const clear = require('src/images/delete.png');

const UsersRoutes = ({ handlePressIconLogOut }) => {
  const [searchUser, setSearchUser] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const UsersStack = createStackNavigator();

  const { width } = Dimensions.get('window');

  const handleSearchUserText = (data) => {
    setSearchUser(data);
  };

  const handleHideSearchInput = () => {
    setIsSearchVisible(false);
  };

  const handleFilter = debounce(handleSearchUserText, 500);

  const handleSearchUser = () => {
    setIsSearchVisible((prev) => !prev);
  };
  return (
    <UsersStack.Navigator initialRouteName={UsersListScreen}>
      <UsersStack.Screen
        options={{
          // headerShown: false,
          headerTitle: 'User',
          headerTitleAlign: 'left',
          headerRight: ({ size }) => (
            <View style={{ flexDirection: 'row', position: 'relative', height: 26 }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleSearchUser}
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
        name="UsersListScreen"
      >
        {(props) => (
          <UsersListScreen
            {...props}
            searchUser={searchUser}
            setIsSearchVisible={handleHideSearchInput}
          />
        )}
      </UsersStack.Screen>
      <UsersStack.Screen
        options={{
          // headerShown: false,
          headerTitle: 'User',
          headerTitleAlign: 'left',
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate("registration")}
            />
          ),
        }}
        name="UserScreen"
      >
        {(props) => <UserScreen {...props} />}
      </UsersStack.Screen>
      <UsersStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerLeft: null,
          headerTitle: 'API / Edit API Key name',
          headerTitleStyle: { fontSize: 14, fontFamily: 'Mont' },
          headerTitleAlign: 'left',
        }}
        name="EditScreen"
      >
        {(props) => <EditScreen {...props} />}
      </UsersStack.Screen>
      <UsersStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerLeft: null,
          headerTitle: 'Users / Edit ledger',
          headerTitleStyle: { fontSize: 14, fontFamily: 'Mont' },
          headerTitleAlign: 'left',
        }}
        name="EditLedgerScreen"
      >
        {(props) => <EditLedgerScreen {...props} />}
      </UsersStack.Screen>
      <UsersStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerLeft: null,
          headerTitle: 'Users / Add new ledger',
          headerTitleStyle: { fontSize: 14, fontFamily: 'Mont' },
          headerTitleAlign: 'left',
        }}
        name="CreateLedgerScreen"
      >
        {(props) => <CreateLedgerScreen {...props} />}
      </UsersStack.Screen>
      <UsersStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerLeft: null,
          headerTitle: 'API / Delete API Key name',
          headerTitleStyle: { fontSize: 14, fontFamily: 'Mont' },
          headerTitleAlign: 'left',
        }}
        name="DeleteScreen"
      >
        {(props) => <DeleteScreen {...props} />}
      </UsersStack.Screen>
      <UsersStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerLeft: null,
          headerTitle: 'Users / Edit user',
          headerTitleStyle: { fontSize: 14, fontFamily: 'Mont' },
          headerTitleAlign: 'left',
        }}
        name="EditUserScreen"
      >
        {(props) => <AddEditUserScreen {...props} />}
      </UsersStack.Screen>
      <UsersStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerLeft: null,
          headerTitle: 'Users / Add new user',
          headerTitleStyle: { fontSize: 14, fontFamily: 'Mont' },
          headerTitleAlign: 'left',
        }}
        name="AddNewUserScreen"
      >
        {(props) => <AddEditUserScreen {...props} new />}
      </UsersStack.Screen>
      <UsersStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerLeft: null,
          headerTitle: 'Users / Delete user',
          headerTitleStyle: { fontSize: 14, fontFamily: 'Mont' },
          headerTitleAlign: 'left',
        }}
        name="DeleteUserScreen"
      >
        {(props) => <DeleteUserScreen {...props} />}
      </UsersStack.Screen>
      <UsersStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerLeft: null,
          headerTitle: 'Users / Add new API Key',
          headerTitleStyle: { fontSize: 14, fontFamily: 'Mont' },
          headerTitleAlign: 'left',
        }}
        name="CreateApiKeyScreen"
      >
        {(props) => <CreateApiKeyScreen {...props} />}
      </UsersStack.Screen>
      <UsersStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerLeft: null,
          headerTitle: 'Users / Edit payments settings',
          headerTitleStyle: { fontSize: 14, fontFamily: 'Mont' },
          headerTitleAlign: 'left',
        }}
        name="EditPaymentsSettingsScreen"
      >
        {(props) => <EditPaymentsSettingsScreen {...props} />}
      </UsersStack.Screen>
      <UsersStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerLeft: null,
          headerTitle: 'Users / Add new payments settings',
          headerTitleStyle: { fontSize: 14, fontFamily: 'Mont' },
          headerTitleAlign: 'left',
        }}
        name="CreatePaymentsSettingsScreen"
      >
        {(props) => <CreatePaymentsSettingsScreen {...props} />}
      </UsersStack.Screen>
    </UsersStack.Navigator>
  );
};

export default UsersRoutes;
