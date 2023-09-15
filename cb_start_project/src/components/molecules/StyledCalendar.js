import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import React, { useState, useEffect, cloneElement } from 'react';
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import SimpleText from '../atoms/SimpleText';
import { MaskedTextInput } from 'react-native-mask-text';

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

const StyledCalendar = ({initialDay, setSelectedDay}) => {
  // const [selectedDay, setSelectedDay] = useState(
  //   props.initialDay ? { dateString: props.initialDay } : ''
  // );

  // useEffect(() => {
  //   if (props.setSelectedDay) {
  //     let correctedDateString = '';
  //     if (selectedDay.dateString) {
  //       correctedDateString = selectedDay.dateString;
  //       selectedDay.dateString;
  //     }
  //     props.setSelectedDay({ ...selectedDay, dateString: correctedDateString });
  //   }
  // }, [selectedDay]);

  // useEffect(() => {
  //   if (props.initialDay) {
  //     setSelectedDay({ dateString: props.initialDay });
  //   }
  // }, [props.initialDay]);

  return (
    <View style={styles.container}>
      <View style={styles.startEndContainer}></View>
      <View style={styles.calendarContainer}>
        <Calendar
          // dayComponent={({ date, state }) => {
          //   return (
          //     <View style={{ paddingHorizontal: 13, paddingVertical: 13 }}>
          //       <Text
          //         style={{
          //           textAlign: 'center',
          //           color: state === 'disabled' ? 'gray' : 'black',
          //         }}
          //       >
          //         {date.day}
          //       </Text>
          //     </View>
          //   );
          // }}
          markingType={'custom'}
          markedDates={{
            // '2023-09-20'
            [initialDay.dateString]: {
              customStyles: {
                container: {
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  // alignContent:'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(11, 163, 154, 0.50)',
                },
                text: {
                  color: 'black',
                  // fontWeight: 'bold',
                },
              },
            },
          }}
          theme={{
            'stylesheet.calendar.header': {
              week: {
                marginTop: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 6,
                borderBottomWidth: 1,
                borderColor: 'rgba(38, 38, 38, 0.10)',
              },
            },
            'stylesheet.day.basic': {
              // selected: {
              //   backgroundColor: 'red',
              //   borderRadius: 20,
              // },
              // today: {
              //   // backgroundColor: 'green',
              //   borderRadius: 20,
              // },
              base: {
                width: 40,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              },
              // selectedText: {
              //   color: 'red',
              // },
            },
            weekVerticalMargin: 0,
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: 'red',
            selectedDayTextColor: 'green',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            // arrowColor: 'orange',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontFamily: 'Mont',
            textMonthFontFamily: 'Mont_B',
            textDayHeaderFontFamily: 'Mont_SB',
            // textDayFontWeight: '300',
            // textMonthFontWeight: 'bold',
            // textDayHeaderFontWeight: '700',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 12,
          }}
          // Initially visible month. Default = now
          // initialDate={'2021-01-01'}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          // minDate={'2012-05-10'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          // maxDate={'2023-12-01'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            // console.log('selected day', day);
            setSelectedDay(day);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            // console.log('Loong selected day', day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMMM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            // console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={false}
          // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
          // firstDay={1}
          // Hide day names. Default = false
          hideDayNames={false}
          // Show week numbers to the left. Default = false
          showWeekNumbers={false}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={false}
          // Disable right arrow. Default = false
          disableArrowRight={false}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          // Replace default month and year title with custom one. the function receive a date as parameter
          // renderHeader={(date) => {
          //   /*Return JSX*/
          // }}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          renderArrow={(direction) =>
            direction === 'left' ? (
              <Image
                source={leftArrow}
                style={{
                  marginLeft: Dimensions.get('window').width - 150,
                  width: 22,
                  height: 22,
                }}
              />
            ) : (
              <Image source={rightArrow} style={{ width: 22, height: 22 }} />
            )
          }
          renderHeader={(date) => {
            return (
              <View
                style={{
                  position: 'absolute',
                  left: -Dimensions.get('window').width + 110,

                  top: Platform.OS === 'ios' ? -13 : -20,
                }}
              >
                <SimpleText
                  style={{
                    // height: 50,
                    fontSize: 26,
                    fontFamily: 'Mont_SB',
                    letterSpacing: 0.78,
                  }}
                >
                  {date.toString('MMMM')}
                </SimpleText>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  startEndContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarContainer: { flex: 1 },
});

export default StyledCalendar;
