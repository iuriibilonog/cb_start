import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { isLoggedIn, getUserRole } from 'src/redux/user/selectors';
import AdminRouting from './routing';

import ClientRouting from './clientsRouting';
import LoginScreen from 'src/screens/LoginScreen';
import LogOutScreen from 'src/screens/LogOutScreen';

const CheckRoleMiddleware = () => {
  // merchant - 1
  // support - 2
  // admin - 3

  const [isShowLogOut, setIsShowLogOut] = useState(false);
  const isAuth = useSelector(isLoggedIn);
  const userRole = useSelector(getUserRole);

  const AuthStack = createStackNavigator();

  useEffect(() => {
    if (!isAuth && isShowLogOut) setIsShowLogOut(false);
  }, [isAuth]);

  const handlePressIconLogOut = () => {
    setIsShowLogOut(true);
  };

  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName={'LoginScreen'}>
        {/* <AuthStack.Screen
      options={{ headerShown: false }}
      name="EnterSecureScreen"
      component={EnterSecureScreen}
    /> */}
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  if (isAuth && isShowLogOut) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="LogOutScreen"
          // component={LogOutScreen}
        >
          {(props) => <LogOutScreen {...props} setIsShowLogOut={setIsShowLogOut} />}
        </AuthStack.Screen>
      </AuthStack.Navigator>
    );
  }

  

 

  switch (userRole) {
    case 1:
      return <ClientRouting handlePressIconLogOut={handlePressIconLogOut} />;
    case 3:
      return <AdminRouting handlePressIconLogOut={handlePressIconLogOut} />;

    default:
      break;
  }
};

export default CheckRoleMiddleware;
