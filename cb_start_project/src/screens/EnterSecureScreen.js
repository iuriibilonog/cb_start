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

import { useDispatch } from 'react-redux';
import SimpleText from '../components/atoms/SimpleText';

const logoBack = require('src/images/logo_back.png');

const numbers = [
  { id: '1', style: 'codeBtn' },
  { id: '2', style: 'codeBtn' },
  { id: '3', style: 'codeBtnLast' },
  { id: '4', style: 'codeBtn' },
  { id: '5', style: 'codeBtn' },
  { id: '6', style: 'codeBtnLast' },
  { id: '7', style: 'codeBtn' },
  { id: '8', style: 'codeBtn' },
  { id: '9', style: 'codeBtnLast' },
  { id: '0', style: 'codeBtnLast' },
];

const EnterSecureScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [passcode, setPassCode] = useState([
    { id: '1', value: '' },
    { id: '2', value: '' },
    { id: '3', value: '' },
    { id: '4', value: '' },
    { id: '5', value: '' },
  ]);
  const [isPassWrong, setIsPassWrong] = useState(false);

  const [animation, setAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (passcode[4].value !== '') setIsPassWrong(true);
  }, [passcode]);

  const makeVibration = (sec) => {
    Vibration.vibrate(sec);
  };

  useEffect(() => {
    if (isPassWrong) {
      startAnimation();
      makeVibration(500);
      setTimeout(() => {
        setIsPassWrong(false);
        setPassCode([
          { id: '1', value: '' },
          { id: '2', value: '' },
          { id: '3', value: '' },
          { id: '4', value: '' },
          { id: '5', value: '' },
        ]);
      }, 1000);
    }
  }, [isPassWrong]);

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

  const handleEnterPass = (num) => {
    makeVibration(50);
    let tmpCode = passcode;
    for (let i = 0; i < tmpCode.length; i++) {
      if (tmpCode[i].value === '') {
        tmpCode[i].value = num;
        break;
      } else {
        continue;
      }
    }
    setPassCode([...tmpCode]);
  };

  const handleDeletePass = () => {
    makeVibration(50);
    let tmpCode = passcode;
    for (let i = tmpCode.length - 1; i >= 0; i--) {
      if (tmpCode[i].value !== '') {
        tmpCode[i].value = '';
        break;
      } else {
        continue;
      }
    }
    setPassCode([...tmpCode]);
  };

  const handleDeleteAll = () => {
    makeVibration(50);
    setPassCode([
      { id: '1', value: '' },
      { id: '2', value: '' },
      { id: '3', value: '' },
      { id: '4', value: '' },
      { id: '5', value: '' },
    ]);
  };

  const getCodeStyles = (item) => {
    switch (item.id) {
      case '5':
        if (item.value !== '') {
          return isPassWrong ? 'codeLastValueWithError' : 'codeLastValue';
        } else {
          return 'codeLast';
        }
        break;

      default:
        if (item.value !== '') {
          return isPassWrong ? 'codeValueWithError' : 'codeValue';
        } else {
          return 'code';
        }
        break;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={logoBack} resizeMode="contain" style={styles.background}>
        <View>
          <SimpleText style={styles.title}>
            <FormattedMessage id={'secure.title_enter'} />
          </SimpleText>
          <Animated.View style={[styles.codeContainer, animatedStyles]}>
            {passcode.map((item) => (
              <View key={item.id} style={styles[getCodeStyles(item)]}></View>
              //   item.value !== '' ? styles.codeValue : styles.code
            ))}
          </Animated.View>
          <View style={styles.codeBtnsWrapper}>
            {numbers.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => handleEnterPass(item.id)}
                style={({ pressed }) => [
                  {
                    ...styles[item.style],
                    borderColor: pressed ? '#36D0BB' : 'transparent',
                    backgroundColor: pressed ? 'rgba(54, 208, 187, 0.10)' : 'transparent',
                  },
                ]}
              >
                <View>
                  <Text style={styles.codeBtnText}>{item.id}</Text>
                </View>
              </Pressable>
            ))}
            <TouchableOpacity
              style={styles.delete}
              onPress={handleDeletePass}
              onLongPress={handleDeleteAll}
            >
              <Image source={require('../images/delete_code.png')} />
            </TouchableOpacity>
          </View>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 54,
  },
  title: {
    textAlign: 'center',
    marginTop: 115,
    fontSize: 20,
    color: '#36D0BB',
  },

  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  code: {
    marginRight: 26,
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
  },
  codeValue: {
    marginRight: 26,
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: '#36D0BB',
    shadowColor: '#36D0BB',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  codeValueWithError: {
    marginRight: 26,
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: '#FF7875',
    shadowColor: '#FF7875',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  codeLast: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
  },
  codeLastValue: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: '#36D0BB',
    shadowColor: '#36D0BB',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  codeLastValueWithError: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: '#FF7875',
    shadowColor: '#FF7875',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  codeBtnsWrapper: {
    position: 'relative',
    marginTop: 182,
    width: 296,
    height: 380,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeBtn: {
    width: 80,
    height: 80,
    borderRadius: 80,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 28,
  },
  codeBtnLast: {
    width: 80,
    height: 80,
    borderRadius: 80,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  codeBtnText: {
    fontSize: 32,
    fontWeight: '400',
    color: '#36D0BB',
  },

  delete: {
    position: 'absolute',
    bottom: 3,
    right: 14,
  },
});

export default EnterSecureScreen;
