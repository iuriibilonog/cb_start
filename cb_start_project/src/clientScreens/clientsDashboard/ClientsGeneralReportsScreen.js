import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RadioList from 'src/components/molecules/RadioList';
import FiltersDropdown from 'src/components/molecules/FiltersDropdown';
import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';

const arrowRight = require('src/images/right.png');
const arrowRightDisable = require('src/images/arrowRightDisable.png');

const ClientsGeneralReportsScreen = ({
  genReportPaymentsFilters,
  genReportTransactionFilters,
  handleDeleteFilter,
  handleDeleteAllFilters,
  setReportType,
}) => {
  const [selectedId, setSelectedId] = useState(3);
  const [radioSelect, setRadioSelect] = useState({ value: 'Payments' });
  const [isMerchantApiKeyAvaible, setIsMerchantApiKeyAvaible] = useState(false);
  const [filters, setFilters] = useState([]);
  const [isClickedOutside, setIsClickedOutside] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setReportType(radioSelect.value);
  }, [radioSelect]);

  useEffect(() => {
    switch (radioSelect.value) {
      case 'Payments':
        let merchantObj = genReportPaymentsFilters.find((item) => item.name === 'merchants');

        if (!merchantObj || (merchantObj && merchantObj.value === 'All merchants')) {
          setIsMerchantApiKeyAvaible(false);
        } else {
          setIsMerchantApiKeyAvaible(true);
        }
        setFilters(genReportPaymentsFilters);
        break;
      case 'Transactions':
        merchantObj = genReportTransactionFilters.find((item) => item.name === 'merchants');
        if (!merchantObj || (merchantObj && merchantObj.value === 'All merchants')) {
          setIsMerchantApiKeyAvaible(false);
        } else {
          setIsMerchantApiKeyAvaible(true);
        }
        setFilters(genReportTransactionFilters);
        break;

      default:
        break;
    }
  }, [genReportPaymentsFilters, genReportTransactionFilters, radioSelect]);

  const handleReportSelect = (e) => {
    setSelectedId(e);
    switch (e) {
      case 1:
        const minDate = new Date(new Date().getTime() - 86400000 * 90).toISOString();
        navigation.navigate('CalendarScreen', { type: radioSelect, minDate: minDate });
        break;

      case 2:
        navigation.navigate('MerchantsApiKeyScreen', { type: radioSelect });
        break;
      case 3:
        navigation.navigate('TimeZoneScreen', { type: radioSelect });
        break;
      case 4:
        navigation.navigate('StatusScreen', { type: radioSelect });
        break;
    }
  };

  const handleDeleteSelectedFilter = (filterForDeletetion) => {
    if (filterForDeletetion === 'all') {
      handleDeleteAllFilters(radioSelect.value);
    } else handleDeleteFilter(radioSelect.value, filterForDeletetion);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Pressable onPress={() => setIsClickedOutside((prev) => !prev)} style={styles.container}>
        {filters.length > 0 && (
          <View style={{ marginTop: 12 }}>
            <FiltersDropdown
              isVisible={true}
              data={filters}
              onDelete={handleDeleteSelectedFilter}
              isClickedOutside={isClickedOutside}
            />
          </View>
        )}
        <View style={styles.reportsContainer}>
          {/* <View style={{...styles.reportContainerItem, backgroundColor:selectedId ===1 ?'#F4F4F4':'#fff'}}> */}
          <TouchableOpacity
            style={{
              ...styles.reportContainerItem,
              backgroundColor: selectedId === 1 ? '#F4F4F4' : '#fff',
            }}
            onPress={() => handleReportSelect(1)}
          >
            <SimpleText
              style={{
                ...styles.itemText,
                fontFamily: selectedId === 1 ? 'Mont_SB' : 'Mont',
              }}
            >
              <FormattedMessage id={'dashboard.calendar'} />
            </SimpleText>
            <Image source={arrowRight} style={styles.arrowRight} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.reportContainerItem,
              backgroundColor: '#fff',
            }}
            onPress={() => handleReportSelect(2)}
          >
            <SimpleText
              style={{
                ...styles.itemText,
                fontFamily: selectedId === 2 ? 'Mont_SB' : 'Mont',
              }}
            >
              <FormattedMessage id={'api.api_key'} />
            </SimpleText>
            <Image source={arrowRight} style={styles.arrowRight} />
          </TouchableOpacity>
          <TouchableOpacity
            name={2}
            style={{
              ...styles.reportContainerItem,
              backgroundColor: selectedId === 3 ? '#F4F4F4' : '#fff',
            }}
            onPress={() => handleReportSelect(3)}
          >
            <SimpleText
              style={{
                ...styles.itemText,
                fontFamily: selectedId === 3 ? 'Mont_SB' : 'Mont',
              }}
            >
              <FormattedMessage id={'dashboard.timezone'} />
            </SimpleText>
            <Image source={arrowRight} style={styles.arrowRight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.reportContainerItem,
              backgroundColor: selectedId === 4 ? '#F4F4F4' : '#fff',
            }}
            onPress={() => handleReportSelect(4)}
          >
            <SimpleText
              style={{
                ...styles.itemText,
                fontFamily: selectedId === 4 ? 'Mont_SB' : 'Mont',
              }}
            >
              <FormattedMessage id={'dashboard.status'} />
            </SimpleText>
            <Image source={arrowRight} style={styles.arrowRight} />
          </TouchableOpacity>
        </View>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  radioBoxContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingTop: 48,
    paddingBottom: 80,
  },
  radioBoxItem: { flexDirection: 'row', alignItems: 'center' },
  reportsContainer: { paddingTop: 48, backgroundColor: '#fff' },
  arrowRight: { width: 24, height: 24 },
  radio: { width: 24, height: 24, marginRight: 14 },
  reportContainerItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingVertical: 10,
    marginVertical: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: { fontSize: 18, letterSpacing: 0.3 },
});

export default ClientsGeneralReportsScreen;
