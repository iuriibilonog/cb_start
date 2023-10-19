import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ApiScreen from './ApiScreen';
import EditScreen from './EditScreen';
import DeleteScreen from './DeleteScreen';
import UserScreen from '../UsersScreens/UserScreen';
import { Image, Pressable, TouchableOpacity, View, TextInput } from 'react-native';
import debounce from 'lodash.debounce';

const headerLeft = require('src/images/header_left.png');
const profileIcon = require('src/images/profile_icon.png');
const searchIcon = require('src/images/search_dark.png');

const ApiRoutes = ({ handlePressIconLogOut }) => {
  const [searchApi, setSearchApi] = useState();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const ApiStack = createStackNavigator();

  const handleSearchApiText = (data) => {
    console.log('DATA-> ', data);
    setSearchApi(data);
  };

  const handleHideSearchInput = () => {
    setIsSearchVisible(false);
  };

  const handleFilter = debounce(handleSearchApiText, 1000);

  const handleSearchApi = () => {
    setIsSearchVisible((prev) => !prev);
  };
  return (
    <ApiStack.Navigator initialRouteName={ApiScreen}>
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
        name="ApiScreen"
        // component={TransactionsScreen}
      >
        {(props) => (
          <ApiScreen {...props} searchApi={searchApi} setIsSearchVisible={handleHideSearchInput} />
        )}
      </ApiStack.Screen>
      <ApiStack.Screen
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
      </ApiStack.Screen>

      <ApiStack.Screen
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
      </ApiStack.Screen>
      <ApiStack.Screen
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
      </ApiStack.Screen>
    </ApiStack.Navigator>
  );
};

export default ApiRoutes;
