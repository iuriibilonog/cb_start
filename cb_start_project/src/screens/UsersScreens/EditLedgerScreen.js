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
import { useDispatch } from 'react-redux';
import { putEditLedger } from 'src/redux/content/operations';
import { FormattedMessage } from 'react-intl';
import ConfirmActionComponent from 'src/components/molecules/ConfirmActionComponent';

const arrowLeft = require('src/images/header_left.png');

const EditLedgerScreen = (props) => {
  useEffect(() => {
    console.log('props', props.route.params);
  }, []);
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');

  const handleEditLedger = async (data) => {
    console.log('DATA', data);
    try {
      await dispatch(putEditLedger({ ledgerId: props.route.params.data.id, name: data }));
      props.navigation.navigate(props.route.params.parentScreen, {
        isRefresh: true,
        id: props.route.params.user.id,
      });
    } catch (err) {
      console.log('err', err);
    }
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
          onPress={() => props.navigation.navigate(props.route.params.parentScreen)}
          style={{
            marginRight: 'auto',
            backgroundColor: '#fff',
          }}
        >
          <Image source={arrowLeft} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        {/* </View> */}
        <FormattedMessage id={'users.ledger_name'}>
          {(placeholder) => (
            <ConfirmActionComponent
              isEdit
              title={'Ledger'}
              initialValue={props.route.params.data.name}
              action={handleEditLedger}
              placeholder={placeholder[0]}
            />
          )}
        </FormattedMessage>
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
  title: { fontSize: 24, fontFamily: 'Mont_SB', marginBottom: 70 },
  input: {
    width: '100%',
    marginBottom: 40,
    fontFamily: 'Mont',
    fontSize: 16,
    color: '#262626',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
  },
  btn: {
    width: '100%',
    height: 42,
    backgroundColor: '#D6B747',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    letterSpacing: 0.48,
    color: '#fff',
    fontFamily: 'Mont_SB',
  },
});

export default EditLedgerScreen;
