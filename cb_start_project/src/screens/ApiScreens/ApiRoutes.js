import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ApiScreen from './ApiScreen';
import EditScreen from './EditScreen';
import DeleteScreen from './DeleteScreen';

import { Image, Pressable } from 'react-native';
const headerLeft = require('src/images/header_left.png');
const ApiStack = createStackNavigator();

const ApiRoutes = ({ handlePressIconLogOut }) => {
  const profileIcon = require('src/images/profile_icon.png');
  return (
    <ApiStack.Navigator initialRouteName={ApiScreen}>
      <ApiStack.Screen
        options={{
          headerTitle: 'API',
          headerTitleAlign: 'left',
          headerRight: ({ size }) => (
            <Pressable onPress={handlePressIconLogOut}>
              <Image
                source={profileIcon}
                style={{ width: 25, height: 25, marginRight: 20 }}
                // onPress={() => navigation.navigate("registration")}
              />
            </Pressable>
          ),
        }}
        name="ApiScreen"
        // component={TransactionsScreen}
      >
        {(props) => <ApiScreen {...props} />}
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
