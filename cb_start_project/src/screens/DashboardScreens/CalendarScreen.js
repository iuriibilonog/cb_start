import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import React, { useState, useEffect, cloneElement } from 'react';
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import StyledCalendar from 'src/components/molecules/StyledCalendar';
import Datepicker from 'src/components/atoms/Datepicker';
import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import { MaskedTextInput } from 'react-native-mask-text';

const calendarIcon = require('src/images/calendar_icon.png');

const CalendarScreen = ({ navigation }) => {
  const [selectedStartDay, setSelectedStartDay] = useState('');
  const [selectedEndDay, setSelectedEndDay] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [focusedDay, setFocusedDay] = useState('');

  const initialDate = new Date().toISOString().slice(0, 10).replace(/-/g, '/');

  // useEffect(() => {
  //   //example selectedDay: {"dateString": "2023-09-24", "day": 24, "month": 9, "timestamp": 1695513600000, "year": 2023}
  //   console.log('StartDay>>> ', selectedStartDay);
  //   console.log('EndDay>>> ', selectedEndDay);
  // }, [selectedStartDay, selectedEndDay]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsCalendarVisible(false);
        }}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.startEndContainer}>
            <View>
              <SimpleText style={styles.startEndItemTitle}>
                <FormattedMessage id={'dashboard.start_date'} />
              </SimpleText>
              <Pressable
                onPress={() => {
                  setIsCalendarVisible((prev) => !prev);
                  setFocusedDay('start');
                }}
                style={styles.datePickerWrapper}
              >
                <Datepicker
                  isFocused={focusedDay === 'start' && isCalendarVisible}
                  value={selectedStartDay.dateString ? selectedStartDay.dateString : initialDate}
                  setValue={setSelectedStartDay}
                />
                <Image source={calendarIcon} style={styles.calendarIcon} />
              </Pressable>
            </View>
            <View>
              <SimpleText style={styles.startEndItemTitle}>
                <FormattedMessage id={'dashboard.end_date'} />
              </SimpleText>
              <Pressable
                onPress={() => {
                  setIsCalendarVisible((prev) => !prev);
                  setFocusedDay('end');
                }}
                style={styles.datePickerWrapper}
              >
                <Datepicker
                  isFocused={focusedDay === 'end' && isCalendarVisible}
                  value={selectedEndDay.dateString ? selectedEndDay.dateString : initialDate}
                  setValue={setSelectedEndDay}
                />
                <Image source={calendarIcon} style={styles.calendarIcon} />
              </Pressable>
            </View>
          </View>
          {isCalendarVisible && (
            <StyledCalendar
              setSelectedDay={focusedDay === 'start' ? setSelectedStartDay : setSelectedEndDay}
              initialDay={
                focusedDay === 'start'
                  ? selectedStartDay?.dateString?.replace(/\//g, '-')
                  : selectedEndDay?.dateString?.replace(/\//g, '-')
              }
            />
          )}
          <TouchableOpacity activeOpacity={0.5} style={{ marginTop: 80 }}>
            <View style={styles.submitBtn}>
              <SimpleText style={styles.submitBtnText}>
                <FormattedMessage id={'dashboard.download'} />
              </SimpleText>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 48,
  },
  datePickerWrapper: {
    height: 40,
    width: 150,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  startEndContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 80,
  },
  startEndItemTitle: { marginBottom: 12, color: 'rgba(38, 38, 38, 0.60)' },
  calendarContainer: { flex: 1 },
  dateWrapper: { height: 40, backgroundColor: '#F4F4F4' },
  submitBtn: {
    height: 44,
    width: 175,
    marginTop: 16,
    borderRadius: 2,
    backgroundColor: '#0BA39A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    fontFamily: 'Mont_SB',
    letterSpacing: 0.48,
    color: '#fff',
  },
  calendarIcon: { width: 16, height: 16 },
});

export default CalendarScreen;
