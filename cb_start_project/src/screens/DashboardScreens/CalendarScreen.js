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
import StyledCalendar from '../../components/molecules/StyledCalendar';
import Datepicker from '../../components/atoms/Datepicker';

const CalendarScreen = ({ navigation }) => {
  const calendarIcon = require('src/images/calendar_icon.png');
  const [selectedStartDay, setSelectedStartDay] = useState('');
  const [selectedEndDay, setSelectedEndDay] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [focusedDay, setFocusedDay] = useState('');

  useEffect(() => {
    //example selectedDay: {"dateString": "2023-09-24", "day": 24, "month": 9, "timestamp": 1695513600000, "year": 2023}
    console.log('StartDay>>> ', selectedStartDay);
    console.log('EndDay>>> ', selectedEndDay);
  }, [selectedStartDay, selectedEndDay]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsCalendarVisible(false);
        }}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.startEndContainer}>
            <View>
              <Text style={styles.startEndItemTitle}>Start date</Text>
              <Pressable
                onPress={() => {
                  setIsCalendarVisible((prev) => !prev);
                  setFocusedDay('start');
                }}
              >
                <Datepicker
                  isFocused={focusedDay === 'start' && isCalendarVisible}
                  value={selectedStartDay.dateString ? selectedStartDay.dateString : '____/__/__'}
                />
              </Pressable>
            </View>
            <View>
              <Text style={styles.startEndItemTitle}>End date</Text>
              <Pressable
                onPress={() => {
                  setIsCalendarVisible((prev) => !prev);
                  setFocusedDay('end');
                }}
              >
                <Datepicker
                  isFocused={focusedDay === 'end' && isCalendarVisible}
                  value={selectedEndDay.dateString ? selectedEndDay.dateString : '____/__/__'}
                />
              </Pressable>
            </View>
          </View>
          {isCalendarVisible && (
            <StyledCalendar
              setSelectedDay={focusedDay === 'start' ? setSelectedStartDay : setSelectedEndDay}
              initialDay={
                focusedDay === 'start' ? selectedStartDay.dateString : selectedEndDay.dateString
              }
            />
          )}
          <TouchableOpacity activeOpacity={0.5} style={{ marginTop: 80 }}>
            <View style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>Download</Text>
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
  startEndContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 80,
  },
  startEndItemTitle: { marginBottom: 12, color: 'rgba(38, 38, 38, 0.60)', fontSize: 16 },
  calendarContainer: { flex: 1 },

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
    fontSize: 16,
    letterSpacing: 0.48,
    fontWeight: '700',
    color: '#fff',
  },
});

export default CalendarScreen;
