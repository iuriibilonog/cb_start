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

import { isLoggedIn } from './src/redux/user/selectors';
import { useSelector } from 'react-redux';

const profileIcon = require('src/images/profile_icon.png');
export const Routing = () => {
  const [isAuth2, setIsAuth] = useState(false);
  const [isShowLogOut, setIsShowLogOut] = useState(false);
  const isAuth = useSelector(isLoggedIn);

  useEffect(() => {
    if (!isAuth && isShowLogOut) setIsShowLogOut(false);
  }, [isAuth]);

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
            component={LogOutScreen}
          />
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
            component={DashboardScreen}
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
