import React, { useEffect, useState, useCallback } from 'react';
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
import BalanceScreen from './BalanceScreen';
import debounce from 'lodash.debounce';

const profileIcon = require('src/images/profile_icon.png');
const searchIcon = require('src/images/search_dark.png');

const BalanceRoutes = ({ handlePressIconLogOut }) => {
  const [searchUser, setSearchUser] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const BalanceStack = createStackNavigator();

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
    <BalanceStack.Navigator initialRouteName={BalanceScreen}>
      <BalanceStack.Screen
        options={{
          // headerShown: false,
          headerTitle: 'Balance',
          headerTitleAlign: 'left',
          headerRight: ({ size }) => (
            <Pressable onPress={handlePressIconLogOut}>
              <View style={{ flexDirection: 'row', position: 'relative', height: 26 }}>
                <Image source={profileIcon} style={{ width: 25, height: 25, marginRight: 20 }} />
              </View>
            </Pressable>
          ),
        }}
        name="BalanceMainScreen"
      >
        {(props) => (
          <BalanceScreen
            {...props}
            searchUser={searchUser}
            setIsSearchVisible={handleHideSearchInput}
          />
        )}
      </BalanceStack.Screen>
    </BalanceStack.Navigator>
  );
};

export default BalanceRoutes;
