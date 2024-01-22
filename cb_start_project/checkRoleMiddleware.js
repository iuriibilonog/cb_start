import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { isLoggedIn, getUserRole, getUser, getRefresh } from 'src/redux/user/selectors';

import AdminRouting from './routing';
import { userLogout } from 'src/redux/user/operations';
import { showMessage } from 'react-native-flash-message';
import ClientRouting from './clientsRouting';
import LoginScreen from 'src/screens/LoginScreen';
import LogOutScreen from 'src/screens/LogOutScreen';
import UpdateScreen from 'src/screens/UpdateScreens/UpdateScreen';

const CheckRoleMiddleware = ({ isAppGetUpdates }) => {
  // merchant - 1
  // support - 2
  // admin - 3

  const [isShowLogOut, setIsShowLogOut] = useState(false);
  const isAuth = useSelector(isLoggedIn);
  const userRole = useSelector(getUserRole);

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const refresh = useSelector(getRefresh);

  const AuthStack = createStackNavigator();

  useEffect(() => {
    if (!isAuth && isShowLogOut) setIsShowLogOut(false);
  }, [isAuth]);

  const handleLogoutSubmit = () => {
    try {
      dispatch(userLogout({ email: user.email, refreshToken: refresh }));
      setTimeout(() => {
        showMessage({
          message: `Sorry! You haven't permissions for use app.`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        showMessage({
          message: `Sorry! You haven't permissions for use app.`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 3000);
      console.warn('Error:', error);
    }
  };

  const handlePressIconLogOut = () => {
    setIsShowLogOut(true);
  };

  if (isAppGetUpdates) {
    return (
      <AuthStack.Navigator initialRouteName={'UpdateScreen'}>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="UpdateScreen"
          component={UpdateScreen}
        />
      </AuthStack.Navigator>
    );
  }
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
      handleLogoutSubmit();
      break;
  }
};

export default CheckRoleMiddleware;
