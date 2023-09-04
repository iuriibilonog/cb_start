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
} from 'react-native';
// import StyledTextInputBox from 'src/components/molecules/StyledTextInputBox';
// import StyledButton from 'src/components/atoms/StyledButton/StyledButton';
// const addPhotoIcon = require('src/assets/images/plus_in_round.png');

const RegistrationScreen = ({ navigation }) => {
  const handleNextScreen = () => {
    console.log('nextScreen>>');
    navigation.navigate('RegistrationScreen');
  };

  const [inputValue, setInputValue] = useState('');
  //   const [isInputFocused, setIsInputFocused] = useState(false);
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
        style={styles.input}
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
        <Text style={styles.showPass} onPress={handlePassShowBtn}>
          {isPassShown ? 'hide' : 'show'}
        </Text>
      </View>
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
    marginBottom: 30,
    color: '#36D0BB',
    borderWidth: 1,
    borderColor: 'rgba(54, 208, 187, 0.20)',
    borderRadius: 2,
    textAlign: 'center',
  },
  passInputWrapper: { width: '100%', position: 'relative' },
  showPass: { position: 'absolute', right: 16, top: 15, color: 'rgba(54, 208, 187, 0.20)' },
});

export default RegistrationScreen;
