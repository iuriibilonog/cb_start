import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, Image, StyleSheet, View, Pressable } from 'react-native';
import SplashScreen from 'src/screens/SplashScreen';
import LoginScreen from 'src/screens/LoginScreen';
import RegistrationScreen from 'src/screens/RegistrationScreen';
import DashboardScreen from 'src/screens/DashboardScreens/DashboardScreen';
import EnterSecureScreen from 'src/screens/EnterSecureScreen';
import LogOutScreen from 'src/screens/LogOutScreen';
import CreateSecurePassScreen from 'src/screens/CreateSecurePassScreen';
import DashboardRoutes from 'src/screens/DashboardScreens/DashboardRoutes';
import TransactionsScreen from 'src/screens/TransactionsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from './src/redux/user/selectors';
import { useSelector } from 'react-redux';

import { getDataFromStorage } from 'src/helpers/asyncStorageHelpers';

const profileIcon = require('src/images/profile_icon.png');
export const useRouting = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [isShowLogOut, setIsShowLogOut] = useState(false);

  // const isAuth = useSelector(getToken) ? true : false;

  const AuthStack = createStackNavigator();
  const MainStack = createBottomTabNavigator();

  const handlePressIconLogOut = () => {
    setIsShowLogOut(true);
  };

  return (
    <>
      {isShowLogOut ? (
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="LogOutScreen"
            // component={LogOutScreen}
          >
            {(props) => (
              <LogOutScreen {...props} setIsShowLogOut={setIsShowLogOut} setIsAuth={setIsAuth} />
            )}
          </AuthStack.Screen>
        </AuthStack.Navigator>
      ) : !isAuth ? (
        <AuthStack.Navigator>
          {/* <AuthStack.Screen
            options={{ headerShown: false }}
            name="EnterSecureScreen"
            component={EnterSecureScreen}
          /> */}
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="LoginScreen"
            // component={LoginScreen}
          >
            {(props) => <LoginScreen {...props} setIsAuth={setIsAuth} />}
          </AuthStack.Screen>
        </AuthStack.Navigator>
      ) : (
        <MainStack.Navigator
          screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            tabBarStyle: {
              paddingHorizontal: 22,
              paddingTop: 23,
              paddingBottom: 23,
              backgroundColor: '#242834',
              height: 75,
            },
          })}
        >
          {/* <AuthStack.Screen
            options={{ headerShown: false }}
            name="CreateSecurePassScreen"
            component={CreateSecurePassScreen}
          /> */}
          <MainStack.Screen
            options={{
              headerShown: false,

              tabBarIcon: ({ tintColor, image, focused }) => {
                focused
                  ? (image = require('./src/images/dash_active.png'))
                  : (image = require('./src/images/dash.png'));
                return (
                  <View>
                    <Image source={image} />
                  </View>
                );
              },
            }}
            name="DashboardRoutes"
            // component={DashboardRoutes}
          >
            {(props) => (
              <DashboardRoutes {...props} handlePressIconLogOut={handlePressIconLogOut} />
            )}
          </MainStack.Screen>

          <MainStack.Screen
            options={{
              headerTitle: 'Card',
              headerTitleAlign: 'left',
              headerRight: ({ size }) => (
                <Image
                  source={profileIcon}
                  style={{ width: 25, height: 25, marginRight: 20 }}
                  // onPress={() => navigation.navigate("registration")}
                />
              ),
              tabBarIcon: ({ tintColor, image, focused }) => {
                focused
                  ? (image = require('./src/images/card_active.png'))
                  : (image = require('./src/images/card.png'));
                return (
                  <View>
                    <Image source={image} />
                  </View>
                );
              },
            }}
            name="CardScreen"
            component={TransactionsScreen}
          />
          <MainStack.Screen
            options={{
              headerTitle: 'Api',
              headerTitleAlign: 'left',
              headerRight: ({ size }) => (
                <Image
                  source={profileIcon}
                  style={{ width: 25, height: 25, marginRight: 20 }}
                  // onPress={() => navigation.navigate("registration")}
                />
              ),
              tabBarIcon: ({ tintColor, image, focused }) => {
                focused
                  ? (image = require('./src/images/api_active.png'))
                  : (image = require('./src/images/api.png'));
                return (
                  <View>
                    <Image source={image} />
                  </View>
                );
              },
            }}
            name="ApiScreen"
            component={DashboardScreen}
          />
          <MainStack.Screen
            options={{
              headerTitle: 'Users',
              headerTitleAlign: 'left',
              headerRight: ({ size }) => (
                <Image
                  source={profileIcon}
                  style={{ width: 25, height: 25, marginRight: 20 }}
                  // onPress={() => navigation.navigate("registration")}
                />
              ),
              tabBarIcon: ({ tintColor, image, focused }) => {
                focused
                  ? (image = require('./src/images/users_active.png'))
                  : (image = require('./src/images/users.png'));
                return (
                  <View>
                    <Image source={image} />
                  </View>
                );
              },
            }}
            name="UsersScreen"
            component={DashboardScreen}
          />
          <MainStack.Screen
            options={{
              headerTitle: 'Balance',
              headerTitleAlign: 'left',
              headerRight: ({ size }) => (
                <Image
                  source={profileIcon}
                  style={{ width: 25, height: 25, marginRight: 20 }}
                  // onPress={() => navigation.navigate("registration")}
                />
              ),
              tabBarIcon: ({ tintColor, image, focused }) => {
                focused
                  ? (image = require('./src/images/balance_active.png'))
                  : (image = require('./src/images/balance.png'));
                return (
                  <View>
                    <Image source={image} />
                  </View>
                );
              },
            }}
            name="BalanceScreen"
            component={DashboardScreen}
          />
        </MainStack.Navigator>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    alignItems: 'center',
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'gold',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '300',
    fontSize: 28,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.7,
  },
});
