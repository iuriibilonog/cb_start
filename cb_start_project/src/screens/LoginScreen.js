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
} from 'react-native';
// const addPhotoIcon = require('src/assets/images/plus_in_round.png');

const LoginScreen = ({ navigation }) => {
  const handleNextScreen = () => {
    console.log('nextScreen>>');
    navigation.navigate('RegistrationScreen');
  };

  return (
    <View style={styles.wrapper}>
      <Text>REGISTRATION</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default LoginScreen;
