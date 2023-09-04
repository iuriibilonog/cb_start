import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, Image, StyleSheet, View, Pressable } from 'react-native';
import SplashScreen from 'src/screens/SplashScreen';
import LoginScreen from 'src/screens/LoginScreen';
import RegistrationScreen from 'src/screens/RegistrationScreen';

export const useRouting = () => {
  const [isAuth, setIsAuth] = useState(false);

  const AuthStack = createNativeStackNavigator();
  const Dashboard = createNativeStackNavigator();

  // const arrowLeft = require('src/assets/images/arrow_left.png');

  return (
    <>
      {!isAuth ? (
        <AuthStack.Navigator>
          {/* <AuthStack.Screen
            options={{ headerShown: false }}
            name="SplashScreen"
            component={SplashScreen}
          /> */}
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
        <Dashboard.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="SplashScreen"
            component={SplashScreen}
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
});
