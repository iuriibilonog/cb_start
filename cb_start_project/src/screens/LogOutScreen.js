import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Text,
  StyleSheet,
  View,
  Keyboard,
  Dimensions,
  Pressable,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
  TextInput,
  Button,
  Platform,
  TouchableOpacity,
  Animated,
  Vibration,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { userLogout } from 'src/redux/user/operations';
import { getUser, getRefresh } from '../redux/user/selectors';
const logoBack = require('src/images/logo_back.png');

const LogOutScreen = ({ setIsShowLogOut, navigation, setIsAuth }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const refresh = useSelector(getRefresh);

  const handleLogoutSubmit = () => {
    console.log('email', user.email);
    console.log('refresh', refresh);
    try {
      dispatch(userLogout({ email: user.email, refreshToken: refresh }));
      // setIsAuth(false);
    } catch (error) {
      console.warn((err) => 'Error:', err);
    }

    setIsShowLogOut(false);
  };

  const handleLogoutCansel = () => {
    setIsShowLogOut(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={logoBack} resizeMode="contain" style={styles.background}>
        <View>
          <Text style={styles.title}>
            <FormattedMessage id={'common.log_out_title'} />
          </Text>
          <TouchableOpacity style={styles.confirm} onPress={handleLogoutSubmit}>
            <Text style={styles.confirmText}>
              <FormattedMessage id={'common.log_out_btn_confirm'} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancel} onPress={handleLogoutCansel}>
            <Text style={styles.confirmText}>
              <FormattedMessage id={'common.log_out_btn_cancel'} />
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242834',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 54,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 1.2,
  },
  confirm: {
    marginTop: 120,
    width: 282,
    paddingVertical: 12,

    backgroundColor: '#FC7270',
    borderRadius: 2,
  },
  cancel: {
    marginTop: 30,
    width: 282,
    paddingVertical: 16,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#fff',
  },
  confirmText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#fff',
  },
});

export default LogOutScreen;
