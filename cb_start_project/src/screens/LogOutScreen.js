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
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from 'src/redux/user/operations';
import { getUser, getRefresh, getToken } from '../redux/user/selectors';
import SimpleText from '../components/atoms/SimpleText';
const logoBack = require('src/images/logo_back.png');

const LogOutScreen = ({ setIsShowLogOut, navigation, setIsAuth }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const refresh = useSelector(getRefresh);
  const token = useSelector(getToken);

  const handleLogoutSubmit = () => {
    try {
      dispatch(userLogout({ email: user.email, refreshToken: refresh }));
    } catch (error) {
      console.warn((err) => 'Error:', err);
    }
  };

  const handleLogoutCansel = () => {
    setIsShowLogOut(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={logoBack} resizeMode="contain" style={styles.background}>
        <View>
          <SimpleText style={styles.title}>
            <FormattedMessage id={'common.log_out_title'} />
          </SimpleText>
          <TouchableOpacity style={styles.confirm} onPress={handleLogoutSubmit}>
            <SimpleText style={styles.confirmText}>
              <FormattedMessage id={'common.log_out_btn_confirm'} />
            </SimpleText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancel} onPress={handleLogoutCansel}>
            <SimpleText style={styles.confirmText}>
              <FormattedMessage id={'common.log_out_btn_cancel'} />
            </SimpleText>
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
    color: '#fff',
    letterSpacing: 1.2,
  },
  confirm: {
    marginTop: 120,
    width: 282,
    paddingVertical: 16,

    backgroundColor: '#FC7270',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#fff',
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
    fontFamily: 'Mont_SB',
    letterSpacing: 1,
    color: '#fff',
  },
});

export default LogOutScreen;
