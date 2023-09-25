import React, { useEffect, useState } from 'react';
import UserScreen from './UserScreen';
import UsersListScreen from './UsersListScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Pressable } from 'react-native';

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
          headerTitle: 'User',
          headerTitleAlign: 'left',
          headerRight: ({ size }) => (
            <Pressable>
              <Image
                // source={profileIcon}
                style={{ width: 25, height: 25, marginRight: 20 }}
              />
            </Pressable>
          ),
        }}
        name="UserScreen"
      >
        {(props) => <UserScreen {...props} />}
      </UsersStack.Screen>
    </UsersStack.Navigator>
  );
};

export default UsersRoutes;
