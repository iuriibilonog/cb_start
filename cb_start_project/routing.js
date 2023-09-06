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
  const Dashboard = createNativeStackNavigator();

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
        <Dashboard.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="CreateSecurePassScreen"
            component={CreateSecurePassScreen}
          />
          <AuthStack.Screen
            options={{
              // headerShown: true,
              // title: 'Dashboard',
              // headerTitleAlign: 'left',
              headerTitle: (props) => (
                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 20 }}>
                  <Text style={styles.headerTitle}>Dashboard</Text>
                </View>
              ),
              headerlef: () => <Text>Dashboard</Text>,
              headerRight: ({ size }) => (
                <Image
                  source={profileIcon}
                  style={{ width: 25, height: 25, marginRight: 20 }}
                  // onPress={() => navigation.navigate("registration")}
                />
              ),
            }}
            name="DashboardScreen"
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
