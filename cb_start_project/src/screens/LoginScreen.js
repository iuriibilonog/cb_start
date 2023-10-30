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
  Animated,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, removeAuthError } from 'src/redux/user/operations';
import { checkValidation } from 'src/utils/errorsValidation';

import { FormattedMessage } from 'react-intl';
import SimpleText from '../components/atoms/SimpleText';

import { showMessage } from 'react-native-flash-message';

const logoBack = require('src/images/logo_back.png');
const boxEmpty = require('src/images/box_empty.png');
const boxChecked = require('src/images/box_checked.png');
const eyeOff = require('src/images/eye_off.png');
const eyeOn = require('src/images/eye_on.png');

const RegistrationScreen = ({ navigation, setIsAuth }) => {
  const [inputValue, setInputValue] = useState('');
  const [isPassShown, setIsPassShown] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (errors.message) {
      console.log('errors', errors);
      const msg = JSON.parse(errors.message);
      startAnimation();

      showMessage({
        message: msg['message'],
        titleStyle: {
          textAlign: 'center',
        },
        type: 'danger',
        duration: '3000',
      });
    }
  }, [errors]);

  const startAnimation = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      //   easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(0);
    });
  };

  const animatedStyles = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          outputRange: [0, 10, -10, 10, -10, 0, 0, 0, 0, 0, 0],
        }),
      },
    ],
  };

  const handleSubmit = async () => {
    const validationParams = ['email', 'password'];
    const validationAnswer = checkValidation(inputValue, validationParams);

    if (Object.keys(validationAnswer).length > 0) {
      setErrors(validationAnswer);
      return;
    }

    try {
      const data = await dispatch(
        userLogin({ email: inputValue?.email, password: inputValue?.password })
      ).unwrap();
    } catch (error) {
      setErrors({ message: error?.response?.data?.message });
      // console.warn('Error99:', error.response.data);
    }

    Keyboard.dismiss();
  };

  const handlePassShowBtn = () => {
    setIsPassShown((prev) => !prev);
  };

  const handleInput = (data) => {
    setErrors({});
    setInputValue((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {}, [inputValue]);
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
            <Animated.View style={animatedStyles}>
              <FormattedMessage id={'common.email'}>
                {(msg) => (
                  <TextInput
                    style={
                      errors.email || errors.message
                        ? { ...styles.inputWithError, marginBottom: 30 }
                        : { ...styles.input, marginBottom: 30 }
                    }
                    placeholder={msg[0]}
                    placeholderTextColor={'grey'}
                    value={inputValue?.email}
                    onChangeText={(text) => handleInput({ email: text })}
                  />
                )}
              </FormattedMessage>
              {errors['email'] && (
                <SimpleText style={styles.error}>
                  <FormattedMessage id={`errors.${errors['email']}`} />
                </SimpleText>
              )}
              <View style={styles.passInputWrapper}>
                <FormattedMessage id={'common.password'}>
                  {(msg) => {
                    return (
                      <TextInput
                        style={
                          errors.password || errors.message
                            ? { ...styles.inputWithError, marginBottom: 60 }
                            : { ...styles.input, marginBottom: 60 }
                        }
                        placeholder={msg[0]}
                        placeholderTextColor={'grey'}
                        value={inputValue?.name}
                        onChangeText={(text) => handleInput({ password: text })}
                        secureTextEntry={!isPassShown}
                      />
                    );
                  }}
                </FormattedMessage>
                {errors['password'] && (
                  <SimpleText style={styles.error}>
                    <FormattedMessage id={`errors.${errors['password']}`} />
                  </SimpleText>
                )}
                <Pressable
                  onPress={handlePassShowBtn}
                  style={{ position: 'absolute', right: 20, top: 13 }}
                >
                  <Image source={isPassShown ? eyeOff : eyeOn} style={{ width: 25, height: 25 }} />
                </Pressable>
              </View>
            </Animated.View>
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
              <SimpleText>
                <FormattedMessage id={'common.sign_in'} />
              </SimpleText>
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
  inputWithError: {
    width: '100%',
    height: 50,
    color: '#36D0BB',
    borderWidth: 1,
    borderColor: '#FC7270',
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
  error: {
    position: 'absolute',
    top: 50,
    left: 0,
    color: '#FF5A5A',
    marginTop: 5,
    fontSize: 12,
    letterSpacing: 1,
  },
});

export default RegistrationScreen;
