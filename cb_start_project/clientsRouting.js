import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';
import ClientsDashboardRoutes from 'src/clientScreens/clientsDashboard/ClientsDashboardRoutes';
import TransactionsRoutes from 'src/screens/TransactionsScreens/TransactionsRoutes';
import ApiRoutes from 'src/screens/ApiScreens/ApiRoutes';

const ClientsRouting = ({ handlePressIconLogOut }) => {
  const MainStack = createBottomTabNavigator();

  return (
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
        name="ClientsDashboardRoutes"
      >
        {(props) => (
          <ClientsDashboardRoutes {...props} handlePressIconLogOut={handlePressIconLogOut} />
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
          <ClientsDashboardRoutes {...props} handlePressIconLogOut={handlePressIconLogOut} />
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
        {(props) => (
          <ClientsDashboardRoutes {...props} handlePressIconLogOut={handlePressIconLogOut} />
        )}
      </MainStack.Screen>
    </MainStack.Navigator>
  );
};

export default ClientsRouting;
