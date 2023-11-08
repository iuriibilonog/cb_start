import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';
import ClientsDashboardRoutes from 'src/clientScreens/clientsDashboard/ClientsDashboardRoutes';
import ClientsTransactionsRoutes from 'src/clientScreens/clientsTransactions/ClientsTransactionsRoutes';
import ClientsApiKeysRoutes from 'src/clientScreens/clientsApiKeys/ClientsApiKeysRoutes';

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
        name="ClientsTransactionsRoutes"
      >
        {(props) => (
          <ClientsTransactionsRoutes {...props} handlePressIconLogOut={handlePressIconLogOut} />
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
        name="ClientsApiKeysRoutes"
      >
        {(props) => (
          <ClientsApiKeysRoutes {...props} handlePressIconLogOut={handlePressIconLogOut} />
        )}
      </MainStack.Screen>
    </MainStack.Navigator>
  );
};

export default ClientsRouting;
