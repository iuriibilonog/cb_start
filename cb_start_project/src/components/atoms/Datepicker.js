import { Text, View, Image, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import SimpleText from './SimpleText';
import moment from 'moment';
import { MaskedTextInput } from 'react-native-mask-text';

const calendarIcon = require('src/images/calendar_icon.png');

const Datepicker = (props) => {
  const [value, setValue] = useState();
  const [isFormatError, setIsFormatError] = useState(false);
  // const { isDisabled, isFocused } = props;

  useEffect(() => {
    setValue(props.value ? props.value : new Date().toISOString().slice(0, 10));
  }, [props.value]);

  const handleValue = (value) => {
    setIsFormatError(false);
    setValue(value);
  };

  const handleLostFocus = () => {
    if (value.length !== 10) {
      setIsFormatError(true);
    } else if (moment(value, 'YYYY/MM/DD').isValid()) {
      setIsFormatError(false);
      props.setValue({ dateString: value.replace(/\//g, '-') });
    } else {
      setIsFormatError(true);
    }
  };

  return (
    // <Pressable onPress={() => setIsOpen((prev) => !prev)} style={styles.container}>
    // <View style={styles.container}>

    <MaskedTextInput
      mask="9999/99/99"
      placeholder="YYYY/MM/DD"
      onChangeText={handleValue}
      onBlur={handleLostFocus}
      value={value}
      keyboardType="numeric"
      style={{ ...styles.valueText, color: isFormatError ? '#FC7270' : '#262626' }}
    />

    // </View>

    // <TextInputMask
    //   type={'datetime'}
    //   options={{
    //     format: 'YYYY/MM/DD',
    //   }}
    //   value={value}
    //   onChangeText={(text) => handleValue(text)}
    // />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    // width: '100%',
    width: 150,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueText: { width: 100, fontFamily: 'Mont' },
});

export default Datepicker;
