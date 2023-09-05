import React, { useState, useEffect } from 'react';
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
  KeyboardAvoidingView,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useDispatch } from 'react-redux';
import { authLoginUser } from '../redux/auth/authOperations';
import { FormattedMessage } from 'react-intl';

const logoBack = require('src/images/logo_back.png');
const boxEmpty = require('src/images/box_empty.png');
const boxChecked = require('src/images/box_checked.png');
const eyeOff = require('src/images/eye_off.png');
const eyeOn = require('src/images/eye_on.png');

const RegistrationScreen = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isPassShown, setIsPassShown] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    console.log('submit data>>', { ...inputValue, isRememberMe });
    dispatch(authLoginUser({ ...inputValue, isRememberMe }));
    // navigation.navigate('RegistrationScreen');
    Keyboard.dismiss();
  };

  const handlePassShowBtn = () => {
    setIsPassShown((prev) => !prev);
  };

  const handleInput = (data) => {
    setInputValue((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    console.log('InputValues: ', inputValue);
  }, [inputValue]);
  const headerHeight = useHeaderHeight();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // behavior="position"
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ImageBackground source={logoBack} resizeMode="contain" style={styles.background}>
            <FormattedMessage id={'common.email'}>
              {(msg) => (
                <TextInput
                  style={{ ...styles.input, marginBottom: 30 }}
                  placeholder={msg[0]}
                  placeholderTextColor={'grey'}
                  value={inputValue?.name}
                  onChangeText={(text) => handleInput({ email: text })}
                />
              )}
            </FormattedMessage>
            <View style={styles.passInputWrapper}>
              <FormattedMessage id={'common.password'}>
                {(msg) => {
                  console.log('msg', msg);
                  return (
                    <TextInput
                      style={{ ...styles.input, marginBottom: 60 }}
                      placeholder={msg[0]}
                      placeholderTextColor={'grey'}
                      value={inputValue?.name}
                      onChangeText={(text) => handleInput({ password: text })}
                      secureTextEntry={!isPassShown}
                    />
                  );
                }}
              </FormattedMessage>
              <Pressable
                onPress={handlePassShowBtn}
                style={{ position: 'absolute', right: 20, top: 13 }}
              >
                <Image source={isPassShown ? eyeOff : eyeOn} style={{ width: 25, height: 25 }} />
              </Pressable>
            </View>
            {/* <Pressable
            onPress={() => setIsRememberMe((prev) => !prev)}
            style={styles.rememberWrapper}
          >
            <Image
              source={isRememberMe ? boxChecked : boxEmpty}
              style={{ width: 25, height: 25 }}
            />
            <Text style={styles.rememberTxt}>Remember me</Text>
          </Pressable> */}
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text>
                <FormattedMessage id={'common.sign_in'} />
              </Text>
            </TouchableOpacity>
            {/* <Pressable
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={styles.registerWrapper}
          >
            <Text style={styles.registerTxt}>Don’t have an account ? Sign Up</Text>
          </Pressable> */}
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242834',
    // paddingHorizontal: 54,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 54,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    color: '#36D0BB',
    borderWidth: 1,
    borderColor: 'rgba(54, 208, 187, 0.20)',
    borderRadius: 2,
    textAlign: 'center',
  },
  passInputWrapper: { width: '100%', position: 'relative' },
  rememberWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 30,
    opacity: 0.5,
  },
  rememberTxt: {
    marginLeft: 12,
    color: '#fff',
  },
  registerWrapper: {
    width: '100%',
    marginTop: 12,
  },

  registerTxt: { opacity: 0.5, color: '#fff' },
  submitBtn: {
    width: '100%',
    height: 50,
    borderRadius: 2,
    backgroundColor: '#36D0BB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitTxt: { fontSize: 20, fontWeight: '600', letterSpacing: 1 },
});

export default RegistrationScreen;
