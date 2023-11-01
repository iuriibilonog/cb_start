import React, { useState, useEffect, useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';

import LoginScreen from 'src/screens/LoginScreen';

import DashboardScreen from 'src/screens/DashboardScreens/DashboardScreen';
import EnterSecureScreen from 'src/screens/EnterSecureScreen';
import LogOutScreen from 'src/screens/LogOutScreen';
import CreateSecurePassScreen from 'src/screens/CreateSecurePassScreen';
import DashboardRoutes from 'src/screens/DashboardScreens/DashboardRoutes';
import TransactionsRoutes from 'src/screens/TransactionsScreens/TransactionsRoutes';
import ApiRoutes from 'src/screens/ApiScreens/ApiRoutes';
import UsersRoutes from 'src/screens/UsersScreens/UsersRoutes';
import BalanceRoutes from 'src/screens/BalanceScreens/BalanceRoutes';

import { isLoggedIn } from 'src/redux/user/selectors';
import { getUsers } from 'src/redux/content/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from 'src/redux/content/operations';

const profileIcon = require('src/images/profile_icon.png');
export const Routing = () => {
  const [isShowLogOut, setIsShowLogOut] = useState(false);
  const isAuth = useSelector(isLoggedIn);
  const allUsers = useSelector(getUsers);
  // const isAuth = true;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth && isShowLogOut) setIsShowLogOut(false);
    if (isAuth && !allUsers.length) {
      dispatch(getAllUsers());
    }
  }, [isAuth]);

  const AuthStack = createStackNavigator();
  const MainStack = createBottomTabNavigator();

  const handlePressIconLogOut = () => {
    setIsShowLogOut(true);
  };

  console.log('isAuth', isAuth);

  return (
    <>
      {isShowLogOut ? (
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="LogOutScreen"
            // component={LogOutScreen}
          >
            {(props) => <LogOutScreen {...props} setIsShowLogOut={setIsShowLogOut} />}
          </AuthStack.Screen>
        </AuthStack.Navigator>
      ) : !isAuth ? (
        <AuthStack.Navigator initialRouteName={'LoginScreen'}>
          {/* <AuthStack.Screen
            options={{ headerShown: false }}
            name="EnterSecureScreen"
            component={EnterSecureScreen}
          /> */}
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="LoginScreen"
            component={LoginScreen}
          />
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
                  ? (image = require('src/images/dash_active.png'))
                  : (image = require('src/images/dash.png'));
                return (
                  <View>
                    <Image source={image} />
                  </View>
                );
              },
            }}
            name="DashboardRoutes"
          >
            {(props) => (
              <DashboardRoutes {...props} handlePressIconLogOut={handlePressIconLogOut} />
            )}
          </MainStack.Screen>

          <MainStack.Screen
            options={{
              headerShown: false,
              tabBarIcon: ({ tintColor, image, focused }) => {
                focused
                  ? (image = require('src/images/card_active.png'))
                  : (image = require('src/images/card.png'));
                return (
                  <View>
                    <Image source={image} />
                  </View>
                );
              },
            }}
            name="TransactionsRoutes"
          >
            {(props) => (
              <TransactionsRoutes {...props} handlePressIconLogOut={handlePressIconLogOut} />
            )}
          </MainStack.Screen>

          <MainStack.Screen
            options={{
              headerShown: false,
              tabBarIcon: ({ tintColor, image, focused }) => {
                focused
                  ? (image = require('src/images/api_active.png'))
                  : (image = require('src/images/api.png'));
                return (
                  <View>
                    <Image source={image} />
                  </View>
                );
              },
            }}
            name="ApiRoutes"
          >
            {(props) => <ApiRoutes {...props} handlePressIconLogOut={handlePressIconLogOut} />}
          </MainStack.Screen>
          <MainStack.Screen
            options={{
              headerShown: false,

              tabBarIcon: ({ tintColor, image, focused }) => {
                focused
                  ? (image = require('src/images/users_active.png'))
                  : (image = require('src/images/users.png'));
                return (
                  <View>
                    <Image source={image} />
                  </View>
                );
              },
            }}
            name="UsersScreen"
            // component={UsersRoutes}
          >
            {(props) => <UsersRoutes {...props} handlePressIconLogOut={handlePressIconLogOut} />}
          </MainStack.Screen>
          <MainStack.Screen
            options={{
              headerShown: false,

              tabBarIcon: ({ tintColor, image, focused }) => {
                focused
                  ? (image = require('src/images/balance_active.png'))
                  : (image = require('src/images/balance.png'));
                return (
                  <View>
                    <Image source={image} />
                  </View>
                );
              },
            }}
            name="BalanceRoutesScreen"
            // component={BalanceRoutes}
          >
            {(props) => <BalanceRoutes {...props} handlePressIconLogOut={handlePressIconLogOut} />}
          </MainStack.Screen>
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
