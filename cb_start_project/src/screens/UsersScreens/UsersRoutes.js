import React, { useEffect, useState } from 'react';
import UserScreen from './UserScreen';
import UsersListScreen from './UsersListScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Pressable } from 'react-native';
import EditScreen from '../ApiScreens/EditScreen';
import DeleteScreen from '../ApiScreens/DeleteScreen';

const UsersRoutes = () => {
  const UsersStack = createStackNavigator();
  return (
    <UsersStack.Navigator initialRouteName={UsersListScreen}>
      <UsersStack.Screen
        options={{
          headerShown: false,
          // headerTitle: 'User',
          // headerTitleAlign: 'left',
          // headerRight: ({ size }) => (
          //   <Pressable>
          //     <Image
          //       // source={profileIcon}
          //       style={{ width: 25, height: 25, marginRight: 20 }}
          //     />
          //   </Pressable>
          // ),
        }}
        name="UsersListScreen"
      >
        {(props) => <UsersListScreen {...props} />}
      </UsersStack.Screen>
      <UsersStack.Screen
        options={{
          headerShown: false,
          // headerTitle: 'User',
          // headerTitleAlign: 'left',
          // headerRight: ({ size }) => (
          //   <Pressable>
          //     <Image
          //       // source={profileIcon}
          //       style={{ width: 25, height: 25, marginRight: 20 }}
          //     />
          //   </Pressable>
          // ),
        }}
        name="UserScreen"
      >
        {(props) => <UserScreen {...props} />}
      </UsersStack.Screen>
      <UsersStack.Screen
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
      </UsersStack.Screen>
      <UsersStack.Screen
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
      </UsersStack.Screen>
    </UsersStack.Navigator>
  );
};

export default UsersRoutes;
