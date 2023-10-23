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

const logo = require('src/images/logo.png');

const SplashScreen = ({ navigation }) => {
  const handleNextScreen = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.logoWrapper}>
        <Pressable onPress={handleNextScreen}>
          <Image source={logo} style={styles.logo} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242834',
  },
  logo: {
    width: 131,
    height: 147,
  },
});

export default SplashScreen;
