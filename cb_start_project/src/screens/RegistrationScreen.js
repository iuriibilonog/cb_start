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
  TouchableOpacity,
} from 'react-native';
import api from '../services/interceptor';
// import StyledTextInputBox from 'src/components/molecules/StyledTextInputBox';
// import StyledButton from 'src/components/atoms/StyledButton/StyledButton';

const boxEmpty = require('src/images/box_empty.png');
const boxChecked = require('src/images/box_checked.png');
const eyeOff = require('src/images/eye_off.png');
const eyeOn = require('src/images/eye_on.png');

const RegistrationScreen = ({ navigation }) => {
  const handleSubmit = (data) => {
    console.log('submit data>>', inputValue);
    // navigation.navigate('RegistrationScreen');
  };

  const [inputValue, setInputValue] = useState('');
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isPassShown, setIsPassShown] = useState(false);

  const handlePassShowBtn = () => {
    setIsPassShown((prev) => !prev);
  };

  const handleInput = (data) => {
    // console.log(data);
    setInputValue((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    console.log('InputValues: ', inputValue);
  }, [inputValue]);

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="email"
        placeholderTextColor={'grey'}
        value={inputValue?.name}
        onChangeText={(text) => handleInput({ email: text })}
      />
      <TextInput
        style={{ ...styles.input, marginVertical: 30 }}
        placeholder="login"
        placeholderTextColor={'grey'}
        value={inputValue?.name}
        onChangeText={(text) => handleInput({ login: text })}
      />
      <View style={styles.passInputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor={'grey'}
          value={inputValue?.name}
          onChangeText={(text) => handleInput({ password: text })}
          secureTextEntry={!isPassShown}
        />
        <Pressable onPress={handlePassShowBtn} style={{ position: 'absolute', right: 20, top: 13 }}>
          <Image source={isPassShown ? eyeOff : eyeOn} style={{ width: 25, height: 25 }} />
        </Pressable>
      </View>
      {/* <View style={styles.rememberWrapper}> */}
      <Pressable onPress={() => setIsRememberMe((prev) => !prev)} style={styles.rememberWrapper}>
        <Image source={isRememberMe ? boxChecked : boxEmpty} style={{ width: 25, height: 25 }} />
        <Text style={styles.rememberTxt}>Remember me</Text>
      </Pressable>
      {/* </View> */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text> Sign Up </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242834',
    paddingHorizontal: 54,
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
