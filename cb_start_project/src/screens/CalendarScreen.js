import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect, cloneElement } from 'react';
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import StyledCalendar from '../components/molecules/StyledCalendar';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'June',
    'July',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thirsday', 'Friday', 'Satuday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

const leftArrow = require('src/images/left.png');
const rightArrow = require('src/images/right.png');

const CalendarScreen = ({ navigation }) => {
  const calendarIcon = require('src/images/calendar_icon.png');
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    //example selectedDay: {"dateString": "2023-09-24", "day": 24, "month": 9, "timestamp": 1695513600000, "year": 2023}
    console.log('selectedDay>>> ', selectedDay);
  }, [selectedDay]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        onPress={() => {
          // setIsShowDiagramCount(false);
        }}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <StyledCalendar selectedDay={setSelectedDay} />
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
