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
import TransactionsFilters from 'src/components/molecules/TransactionsFilters';
import { FormattedMessage } from 'react-intl';
import ModalDropdown from 'src/components/molecules/ModalDropdown';
import MainLoader from 'src/components/molecules/MainLoader';

const calendarIcon = require('src/images/calendar_icon.png');

const CalendarScreen = ({
  navigation,
  route,
  setPaymentsFilter,
  setTransactionFilter,
  paymentFilter,
  transactionFilter,
  isFiltersVisible,
  filtersDots,
  isMerchApiKeyAvailable,
  confirmReport,
  balancePeriod,
  setBalancePeriod,
  isLoading,
}) => {
  const initialDate = new Date().toISOString().slice(0, 10);
  const [selectedStartDay, setSelectedStartDay] = useState();
  const [selectedEndDay, setSelectedEndDay] = useState();
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [focusedDay, setFocusedDay] = useState('');
  const reportType = route.params?.type?.value;

  useEffect(() => {
    if (route.params?.isBalancePeriod) {
      setSelectedStartDay({ dateString: route.params.balancePeriod.startDate });
      setSelectedEndDay({ dateString: route.params.balancePeriod.endDate });
    } else {
      switch (reportType) {
        case 'Payments':
          let date = paymentFilter.find((item) => item.name === 'date');
          setSelectedStartDay({ dateString: date ? date.filters.startDate : initialDate });
          setSelectedEndDay({ dateString: date ? date.filters.endDate : initialDate });

          break;
        case 'Transactions':
          date = transactionFilter.find((item) => item.name === 'date');
          setSelectedStartDay({ dateString: date ? date.filters.startDate : initialDate });
          setSelectedEndDay({ dateString: date ? date.filters.endDate : initialDate });
          break;

        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    if (route.params?.isBalancePeriod) return;
    if (selectedStartDay && selectedEndDay) {
      const start = selectedStartDay.dateString || selectedStartDay;
      const end = selectedEndDay.dateString || selectedEndDay;
      switch (reportType) {
        case 'Payments':
          setPaymentsFilter('date', {
            filters: { startDate: start, endDate: end },
            value: `${start}, ${end}`,
          });

          break;
        case 'Transactions':
          setTransactionFilter('date', {
            filters: { startDate: start, endDate: end },
            value: `${start}, ${end}`,
          });
          break;

        default:
          break;
      }
    }
  }, [selectedStartDay, selectedEndDay]);

  const handlePressDownload = () => {
    if (route.params?.isBalancePeriod) {
      const start = selectedStartDay.dateString || selectedStartDay;
      const end = selectedEndDay.dateString || selectedEndDay;
      setBalancePeriod({ startDate: start, endDate: end });
      navigation.navigate('DashboardScreen');
    } else {
      confirmReport();
    }
    setIsCalendarVisible(false);
  };

  const handleSelectedDay = (data) => {
    switch (focusedDay) {
      case 'start':
        if (!data.dateString) return;
        setSelectedStartDay(data);
        break;
      case 'end':
        if (!data.dateString) return;
        setSelectedEndDay(data);

        break;

      default:
        break;
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <MainLoader isVisible={isLoading} />
      {isFiltersVisible && (
        <TransactionsFilters
          isActive={'date'}
          filtersDots={filtersDots}
          isMerchApiKeyAvailable={isMerchApiKeyAvailable}
        />
      )}
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
                {selectedStartDay && selectedEndDay && (
                  <Datepicker
                    isFocused={focusedDay === 'start' && isCalendarVisible}
                    value={selectedStartDay.dateString}
                    setValue={setSelectedStartDay}
                  />
                )}
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
                {selectedStartDay && selectedEndDay && (
                  <Datepicker
                    isFocused={focusedDay === 'end' && isCalendarVisible}
                    value={selectedEndDay.dateString}
                    setValue={setSelectedEndDay}
                  />
                )}
                <Image source={calendarIcon} style={styles.calendarIcon} />
              </Pressable>
            </View>
          </View>
          {isCalendarVisible && (
            <StyledCalendar
              setSelectedDay={handleSelectedDay}
              initialDay={focusedDay === 'start' ? selectedStartDay : selectedEndDay}
            />
          )}
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ marginTop: 80 }}
            onPress={handlePressDownload}
          >
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
