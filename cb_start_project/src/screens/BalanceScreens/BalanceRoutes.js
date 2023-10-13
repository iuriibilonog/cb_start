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

const BalanceRoutes = () => {
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
              <Image source={profileIcon} style={{ width: 25, height: 25, marginRight: 20 }} />
            </View>
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
