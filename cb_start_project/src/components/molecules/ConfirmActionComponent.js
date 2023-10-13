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
import { checkValidation } from 'src/utils/errorsValidation';

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
    keyBoard,
    dataName,
  } = props;
  const [value, setValue] = useState(initialValue);
  const [isEmptyValue, setIsEmptyValue] = useState(false);
  const [errors, setErrors] = useState({});

  const { width } = Dimensions.get('window');

  useEffect(() => {
    return () => {
      setErrors({});
    };
  }, []);

  const submit = () => {
    const validationParams = [dataName];
    const validationAnswer = checkValidation(value, validationParams);

    if (Object.keys(validationAnswer).length > 0) {
      setErrors(validationAnswer);
      return;
    }

    if (action && value) {
      action(value);
    } else if (isDelete) {
      action();
    } else {
      setIsEmptyValue(true);
    }
  };

  useEffect(() => {
    setIsEmptyValue(false);
    // if (value && value.includes(',')) value.replace(/\,/g, '.');
    // setValue(...value);
  }, [value]);

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

        {isEdit && (
          <View style={{ position: 'relative', width: '100%' }}>
            <TextInput
              style={{
                ...styles.input,

                borderColor: errors[dataName] ? 'red' : 'rgba(0, 0, 0, 0.20)',
              }}
              value={value}
              placeholder={placeholder}
              onChangeText={(text) => setValue(text)}
              keyboardType={keyBoard === 'numeric' ? 'numeric' : 'default'}
            />
            {errors[dataName] && (
              <SimpleText style={styles.error}>
                <FormattedMessage id={`errors.${errors[dataName]}`} />
              </SimpleText>
            )}
          </View>
        )}
        {isDelete && (
          <>
            <View style={styles.valueTextWrapper}>
              <SimpleText style={styles.valueText}>{value}</SimpleText>
            </View>
            {helpText && (
              <SimpleText style={styles.bottomPlaceholder}>
                <FormattedMessage id={helpText} />
              </SimpleText>
            )}
          </>
        )}
        {isCreate && (
          <TextInput
            style={{
              ...styles.input,
              borderBottomColor: isEmptyValue ? '#FC7270' : 'rgba(0, 0, 0, 0.20)',
            }}
            placeholder={placeholder}
            value={value}
            onChangeText={(text) => setValue(text)}
          />
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
  title: {
    fontSize: 24,
    fontFamily: 'Mont_SB',
    marginBottom: 70,
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
  error: {
    position: 'absolute',
    top: 38,
    left: 0,
    color: 'red',
    marginTop: 5,
    fontSize: 12,
    letterSpacing: 1,
  },
});

export default EditScreen;
