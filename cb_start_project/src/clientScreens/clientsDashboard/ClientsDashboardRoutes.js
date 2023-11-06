import { Pressable, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ClientsDashboardScreen from './ClientsDashboardScreen';

const ClientsDashboardRoutes = ({ handlePressIconLogOut }) => {
  const DashboardStack = createStackNavigator();
  const profileIcon = require('src/images/profile_icon.png');
  const headerLeft = require('src/images/header_left.png');
  return (
    <DashboardStack.Navigator initialRouteName={ClientsDashboardScreen}>
      <DashboardStack.Screen
        options={{
          headerTitle: 'Dashboard',
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
        name="ClientsDashboardScreen"
        // component={DashboardScreen}
      >
        {(props) => (
          <ClientsDashboardScreen
            {...props}
            // getBalancePeriod={getBalancePeriod}
            // balancePeriod={balancePeriod}
            // setBalancePeriod={setBalancePeriod}
          />
        )}
      </DashboardStack.Screen>
    </DashboardStack.Navigator>
  );
};

export default ClientsDashboardRoutes;
