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
import { putApiKey } from 'src/redux/content/operations';
import { FormattedMessage } from 'react-intl';

const arrowLeft = require('src/images/header_left.png');

const EditScreen = (props) => {
  const { isEdit, isCreate, isDelete, action, title, initialValue, helpText } = props;
  const [value, setValue] = useState(initialValue);

  const { width } = Dimensions.get('window');

  const submit = () => {
    action(value);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
      }}
    >
      <View style={styles.innerWrapper}>
        <SimpleText style={styles.title}>
          <FormattedMessage
            id={
              isEdit
                ? 'common.edit'
                : isDelete
                ? 'common.delete_confirm'
                : isCreate
                ? 'common.add'
                : 'common.edit'
            }
          />
          {!isDelete && ` ${title}`}
        </SimpleText>
        {isEdit && (
          <TextInput style={styles.input} value={value} onChangeText={(text) => setValue(text)} />
        )}
        {isDelete && (
          <>
            <View style={styles.valueTextWrapper}>
              <SimpleText style={styles.valueText}>{value}</SimpleText>
            </View>
            {helpText && <SimpleText style={styles.bottomPlaceholder}>{helpText}</SimpleText>}
          </>
        )}
        <TouchableOpacity activeOpacity={0.5} style={{ width: '100%' }} onPress={submit}>
          <View
            style={{
              ...styles.btn,
              backgroundColor: isDelete ? '#FC7270' : isCreate ? '#0BA39A' : '#FFE13A',
            }}
          >
            <SimpleText style={{ ...styles.btnText, color: isEdit ? '#262626' : '#fff' }}>
              <FormattedMessage
                id={
                  isEdit
                    ? 'common.edit'
                    : isDelete
                    ? 'common.delete'
                    : isCreate
                    ? 'common.create'
                    : 'common.edit'
                }
              />
            </SimpleText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: '#FFE13A',
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

export default EditScreen;
