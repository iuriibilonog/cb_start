import { Text, View, Image, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

const calendarIcon = require('src/images/calendar_icon.png');

const Datepicker = (props) => {
  const [value, setValue] = useState(props.value);
  const { isDisabled, isFocused } = props;

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    // <Pressable onPress={() => setIsOpen((prev) => !prev)} style={styles.container}>
    <View style={styles.container}>
      <Text style={{ ...styles.valueText, opacity: isFocused ? 1 : 0.5 }}>{value}</Text>
      <Image source={calendarIcon} style={styles.calendarIcon} />
    </View>
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
  valueText: { marginRight: 16, fontWeight: '600' },
  calendarIcon: { width: 16, height: 16 },
});

export default Datepicker;
