import { Text, View, Image, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import SimpleText from './SimpleText';
import moment from 'moment';
import { MaskedTextInput } from 'react-native-mask-text';
import { FormattedMessage } from 'react-intl';

const calendarIcon = require('src/images/calendar_icon.png');

const Datepicker = (props) => {
  const { minDateInDays, maxDateInDays } = props;
  const [value, setValue] = useState();
  const [formatError, setFormatError] = useState(false);
  // const { isDisabled, isFocused } = props;

  useEffect(() => {
    setValue(props.value ? props.value : new Date().toISOString().slice(0, 10));
  }, [props.value]);

  const handleValue = (value) => {
    setFormatError(false);

    setValue(value);
  };

  const handleLostFocus = () => {
    if (value.length !== 10) {
      setFormatError('invalid_data');
    } else if (moment(value, 'YYYY/MM/DD').isValid()) {
      const valueFormatted = value.split(value.includes('/') ? '/' : '-');
      const currentFormatted = moment().format('YYYY/MM/DD').split('/');
      const difference = moment(currentFormatted).diff(moment(valueFormatted), 'days');

      // console.log('---', moment(['2023', '10', '11']).diff(moment(['2023', '10', '9']), 'days'));
      // console.log('+++', moment(['2023', '10', '9']).diff(moment(['2023', '10', '15']), 'days'));
      setFormatError(false);
      console.log('difference', difference);
      console.log('maxDateInDays', maxDateInDays);
      console.log('minDateInDays', minDateInDays);
      if (
        (maxDateInDays === 0 || maxDateInDays) &&
        difference < 0 &&
        Math.abs(difference) > maxDateInDays
      ) {
        setFormatError('period_in_future');
        // console.log('1');
        // props.setValue({
        //   dateString: moment().add(maxDateInDays, 'days').format('YYYY/MM/DD').replace(/\//g, '-'),
        // });
      } else if ((minDateInDays === 0 || minDateInDays) && difference > minDateInDays) {
        // console.log('2');
        // props.setValue({
        //   dateString: moment()
        //     .subtract(minDateInDays, 'days')
        //     .format('YYYY/MM/DD')
        //     .replace(/\//g, '-'),
        // });
        setFormatError('period_90_days');
      } else {
        console.log('3');
        props.setValue({ dateString: value.replace(/\//g, '-') });
      }
    } else {
      setFormatError('invalid_data');
    }
  };

  return (
    // <Pressable onPress={() => setIsOpen((prev) => !prev)} style={styles.container}>
    <View style={styles.container}>
      <MaskedTextInput
        mask="9999/99/99"
        placeholder="YYYY/MM/DD"
        onChangeText={handleValue}
        onBlur={handleLostFocus}
        value={value}
        keyboardType="numeric"
        style={{ ...styles.valueText, color: formatError ? '#FC7270' : '#262626' }}
      />
      {formatError && (
        <SimpleText style={styles.error}>
          <FormattedMessage id={`errors.${formatError}`} />
        </SimpleText>
      )}
    </View>

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
    position: 'relative',
    // height: 40,
    // // width: '100%',
    // width: 150,
    // backgroundColor: '#F4F4F4',
    // paddingHorizontal: 16,
    // paddingVertical: 10,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  error: {
    // borderWidth: 1,
    fontSize: 12,
    position: 'absolute',
    top: 33,
    left: -15,
    color: '#FC7270',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  valueText: { width: 100, fontFamily: 'Mont' },
});

export default Datepicker;
