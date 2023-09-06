import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, Image, StyleSheet, View, Pressable } from 'react-native';
import SplashScreen from 'src/screens/SplashScreen';
import LoginScreen from 'src/screens/LoginScreen';
import RegistrationScreen from 'src/screens/RegistrationScreen';
import DashboardScreen from 'src/screens/DashboardScreen';
import EnterSecureScreen from 'src/screens/EnterSecureScreen';
import CreateSecurePassScreen from 'src/screens/CreateSecurePassScreen';

export const useRouting = () => {
  const [isAuth, setIsAuth] = useState(true);

  const AuthStack = createNativeStackNavigator();
  const Dashboard = createBottomTabNavigator();

  const profileIcon = require('src/images/profile_icon.png');

  return (
    <>
      {!isAuth ? (
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="EnterSecureScreen"
            component={EnterSecureScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="LoginScreen"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="RegistrationScreen"
            component={RegistrationScreen}
          />
        </AuthStack.Navigator>
      ) : (
        <Dashboard.Navigator
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
          <Dashboard.Screen
            options={{
              headerTitle: 'Dashboard',
              headerTitleAlign: 'center',
              headerRight: ({ size }) => (
                <Image
                  source={profileIcon}
                  style={{ width: 25, height: 25, marginRight: 20 }}
                  // onPress={() => navigation.navigate("registration")}
                />
              ),
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
            name="DashboardScreen"
            component={DashboardScreen}
          />
          <Dashboard.Screen
            options={{
              headerTitle: 'Card',
              headerTitleAlign: 'center',
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
          <Dashboard.Screen
            options={{
              headerTitle: 'Api',
              headerTitleAlign: 'center',
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
          <Dashboard.Screen
            options={{
              headerTitle: 'Users',
              headerTitleAlign: 'center',
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
          <Dashboard.Screen
            options={{
              headerTitle: 'Balance',
              headerTitleAlign: 'center',
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
        </Dashboard.Navigator>
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
