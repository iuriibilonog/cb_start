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
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';

const arrowLeft = require('src/images/header_left.png');

const DeleteScreen = (props) => {
  const [value, setValue] = useState('Getapay');
  useEffect(() => {
    console.log('props', props);
  }, []);

  const { width } = Dimensions.get('window');

  const submit = () => {
    console.log('DELETED', value);
    props.navigation.navigate('ApiScreen');
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 20,
          justifyContent: 'flex-start',
          backgroundColor: '#fff',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('ApiScreen')}
          style={{
            marginRight: 'auto',
            backgroundColor: '#fff',
          }}
        >
          <Image source={arrowLeft} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        {/* </View> */}

        <View style={styles.innerWrapper}>
          <SimpleText style={styles.title}>
            <FormattedMessage id={'common.delete_confirm'} />
          </SimpleText>
          <View style={styles.valueTextWrapper}>
            <SimpleText style={styles.valueText}>{value}</SimpleText>
          </View>
          <SimpleText style={styles.bottomPlaceholder}>
            <FormattedMessage id={'api.api_key_name'} />
          </SimpleText>
          <TouchableOpacity activeOpacity={0.5} style={{ width: '100%' }} onPress={submit}>
            <View style={styles.btn}>
              <SimpleText style={styles.btnText}>
                <FormattedMessage id={'common.delete'} />
              </SimpleText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  innerWrapper: {
    marginTop: 56,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  title: { fontSize: 24, fontFamily: 'Mont_SB', marginBottom: 70, textAlign: 'center', lineHeight:30 },
  valueTextWrapper: {
    width: '100%',

    paddingBottom: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
  },
  valueText: {
    fontFamily: 'Mont',
    fontSize: 16,
    color: '#262626',
  },
  bottomPlaceholder: {
    width: '100%',
    marginBottom: 40,
    paddingHorizontal: 10,
    paddingTop: 8,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.30)',
    fontSize: 12,
    letterSpacing: 0.24,
  },
  btn: {
    width: '100%',
    height: 42,
    backgroundColor: '#FC7270',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    letterSpacing: 0.8,
    color: '#fff',
    fontFamily: 'Mont_SB',
  },
});

export default DeleteScreen;
