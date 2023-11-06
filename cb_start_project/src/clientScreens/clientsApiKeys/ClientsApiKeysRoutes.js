import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ClientsApiKeysScreen from './ClientsApiKeyScreen';

import { Image, Pressable, TouchableOpacity, View, TextInput } from 'react-native';
import debounce from 'lodash.debounce';

const headerLeft = require('src/images/header_left.png');
const profileIcon = require('src/images/profile_icon.png');
const searchIcon = require('src/images/search_dark.png');

const ClientsApiKeysRoutes = ({ handlePressIconLogOut }) => {
  const [searchApi, setSearchApi] = useState();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const ApiStack = createStackNavigator();

  const handleSearchApiText = (data) => {
    setSearchApi(data);
  };

  const handleHideSearchInput = () => {
    setIsSearchVisible(false);
  };

  const handleFilter = debounce(handleSearchApiText, 500);

  const handleSearchApi = () => {
    setIsSearchVisible((prev) => !prev);
  };
  return (
    <ApiStack.Navigator initialRouteName={ClientsApiKeysScreen}>
      <ApiStack.Screen
        options={{
          headerTitle: 'API',
          headerTitleAlign: 'left',
          headerRight: ({ size }) => (
            <View style={{ flexDirection: 'row', position: 'relative', height: 26 }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleSearchApi}
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
        name="ClientsApiKeysScreen"
        // component={TransactionsScreen}
      >
        {(props) => (
          <ClientsApiKeysScreen
            {...props}
            searchApi={searchApi}
            setIsSearchVisible={handleHideSearchInput}
          />
        )}
      </ApiStack.Screen>
    </ApiStack.Navigator>
  );
};

export default ClientsApiKeysRoutes;
