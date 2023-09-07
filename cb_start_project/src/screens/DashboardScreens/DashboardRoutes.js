import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './DashboardScreen';
import CalendarScreen from './CalendarScreen';
import { Image } from 'react-native';

const DashboardStack = createStackNavigator();

const DashboardRoutes = () => {
  const profileIcon = require('src/images/profile_icon.png');
  const headerLeft = require('src/images/header_left.png');
  return (
    <DashboardStack.Navigator initialRouteName={DashboardScreen}>
      <DashboardStack.Screen
        options={{
          headerTitle: 'Dashboard',
          headerTitleAlign: 'left',
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
      <DashboardStack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Calendar',
          headerTitleAlign: 'left',
          headerBackImage: () => (
            <Image
              source={headerLeft}
              style={{ width: 24, height: 24, marginLeft: 20, marginRight: 10 }}
              // onPress={() => navigation.navigate("registration")}
            />
          ),
        }}
        name="CalendarScreen"
        component={CalendarScreen}
      />
    </DashboardStack.Navigator>
  );
};

export default DashboardRoutes;
