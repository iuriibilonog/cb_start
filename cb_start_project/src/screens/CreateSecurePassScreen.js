import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated,
  Vibration,
} from 'react-native';

import { useDispatch } from 'react-redux';

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

const CreateSecurePassScreen = ({ navigation }) => {
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

  const [createdPass, setCreatedPass] = useState('');
  const [confirmedPass, setConfirmedPass] = useState('');

  useEffect(() => {
    if (passcode[4].value !== '' && !createdPass) {
      const pass = passcode.map((item) => item.value).join('');
      setCreatedPass(pass);
      setPassCode([
        { id: '1', value: '' },
        { id: '2', value: '' },
        { id: '3', value: '' },
        { id: '4', value: '' },
        { id: '5', value: '' },
      ]);
    } else if (passcode[4].value !== '' && createdPass) {
      const pass = passcode.map((item) => item.value).join('');
      setConfirmedPass(pass);
    }
  }, [passcode]);

  useEffect(() => {
    if (createdPass && confirmedPass) {
      if (createdPass !== confirmedPass) {
        setIsPassWrong(true);
        setCreatedPass('');
        setConfirmedPass('');
      } else {
        console.log('auth');
      }
    }
  }, [confirmedPass]);

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
    console.log('item', item);
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
          <Text style={styles.title}>
            {console.log('createdPass', createdPass)}
            <FormattedMessage
              id={createdPass ? 'secure_confirm.title_enter' : 'secure_create.title_enter'}
            />
          </Text>
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
    fontWeight: '600',
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

export default CreateSecurePassScreen;
