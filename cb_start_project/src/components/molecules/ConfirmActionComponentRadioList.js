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

import RadioList from 'src/components/molecules/RadioList';
import SimpleText from 'src/components/atoms/SimpleText';
import { useDispatch } from 'react-redux';
import { putApiKey } from 'src/redux/content/operations';
import { FormattedMessage } from 'react-intl';

const arrowLeft = require('src/images/header_left.png');

const EditScreen = (props) => {
  const {
    isEdit,
    isCreate,
    isDelete,
    action,
    title,
    initialValue,
    helpText,
    placeholder = '',
  } = props;
  const [radioSelect, setRadioSelect] = useState({ value: initialValue ? initialValue : 'Epmty' });

  // const [isEmptyValue, setIsEmptyValue] = useState(false);

  const { width } = Dimensions.get('window');

  const restrictedBrandsArr = [
    { id: 1, value: 'Empty', title: 'Empty' },
    { id: 2, value: 'Visa', title: 'Visa' },
    { id: 3, value: 'MasterCard', title: 'MasterCard' },
    { id: 4, value: 'Visa and MasterCard', title: 'Visa and MasterCard' },
  ];

  const submit = () => {
    console.log('radioSelect', radioSelect);
    if (action && radioSelect) {
      action(radioSelect.value);
    }
  };

  // useEffect(() => {
  //   setIsEmptyValue(false);
  // }, [value]);

  return (
    <View
      style={{
        flex: 1,
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
          {/* {!isDelete && ` ${title}`} */} {!isDelete && <FormattedMessage id={title} />}
        </SimpleText>
        <View style={{ alignItems: 'flex-start' }}>
          <RadioList
            data={restrictedBrandsArr}
            onSelect={setRadioSelect}
            defaultValue={radioSelect}
            styling={{ spaceBetween: 34 }}
          />
        </View>
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
    // paddingHorizontal: 25,
    // alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Mont_SB',
    marginBottom: 62,
    lineHeight: 26,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontFamily: 'Mont',
    fontSize: 16,
    color: '#262626',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
  },
  btn: {
    // width: '100%',
    marginHorizontal: 25,
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
});

export default EditScreen;
