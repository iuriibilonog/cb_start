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
import SimpleText from '../../components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';

const arrowRight = require('src/images/right.png');

const GeneralReportsScreen = () => {
  const [selectedId, setSelectedId] = useState(3);
  const [radioSelect, setRadioSelect] = useState();
  const [filters, setFilters] = useState([
    { value: 'Select all filters' },
    { value: 'Payment Description' },
    { value: 'Payment ID' },
    { value: 'Customer Email' },
    { value: 'Type' },
  ]);
  const [isClickedOutside, setIsClickedOutside] = useState(false);

  const navigation = useNavigation();

  const handleReportSelect = (e) => {
    console.log('selectedId', e);
    setSelectedId(e);
    switch (e) {
      case 1:
        navigation.navigate('CalendarScreen');
        break;
      case 2:
        navigation.navigate('TimeZoneScreen');
        break;
      case 3:
        navigation.navigate('MerchantsScreen');
        break;
      case 4:
        navigation.navigate('MerchantsApiKeyScreen');
        break;
      case 5:
        navigation.navigate('StatusScreen');
        break;
      case 6:
        navigation.navigate('FilterColumnsScreen');
        break;
    }
  };

  useEffect(() => {
    console.log('Radio selected:', radioSelect);
  }, [radioSelect]);

  const handleDeleteFilter = (filterForDeletetion) => {
    console.log('filterForDeletetion', filterForDeletetion);
    const correctedFiltersList = filters.filter((item) => item.value !== filterForDeletetion.value);
    console.log('correctedFiltersList', correctedFiltersList);
    setFilters(correctedFiltersList);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Pressable onPress={() => setIsClickedOutside((prev) => !prev)} style={styles.container}>
        <View style={{ marginTop: 12 }}>
          <FiltersDropdown
            data={filters}
            onDelete={handleDeleteFilter}
            isClickedOutside={isClickedOutside}
          />
        </View>
        <View style={styles.radioBoxContainer}>
          <RadioList
            data={[{ value: 'Payments' }, { value: 'Transactions' }]}
            onSelect={setRadioSelect}
            defaultValue={{ value: 'Payments' }}
          />
        </View>
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
            name={2}
            style={{
              ...styles.reportContainerItem,
              backgroundColor: selectedId === 2 ? '#F4F4F4' : '#fff',
            }}
            onPress={() => handleReportSelect(2)}
          >
            <SimpleText
              style={{
                ...styles.itemText,
                fontFamily: selectedId === 2 ? 'Mont_SB' : 'Mont',
              }}
            >
              <FormattedMessage id={'dashboard.timezone'} />
            </SimpleText>
            <Image source={arrowRight} style={styles.arrowRight} />
          </TouchableOpacity>
          <TouchableOpacity
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
              <FormattedMessage id={'dashboard.merchants'} />
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
              <FormattedMessage id={'dashboard.merchants_api_key'} />
            </SimpleText>
            <Image source={arrowRight} style={styles.arrowRight} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.reportContainerItem,
              backgroundColor: selectedId === 5 ? '#F4F4F4' : '#fff',
            }}
            onPress={() => handleReportSelect(5)}
          >
            <SimpleText
              style={{
                ...styles.itemText,
                fontFamily: selectedId === 5 ? 'Mont_SB' : 'Mont',
              }}
            >
              <FormattedMessage id={'dashboard.status'} />
            </SimpleText>
            <Image source={arrowRight} style={styles.arrowRight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.reportContainerItem,
              marginTop: 80,
              backgroundColor: selectedId === 6 ? '#F4F4F4' : '#fff',
            }}
            onPress={() => handleReportSelect(6)}
          >
            <SimpleText
              style={{
                ...styles.itemText,
                fontFamily: selectedId === 6 ? 'Mont_SB' : 'Mont',
              }}
            >
              <FormattedMessage id={'dashboard.filters_columns'} />
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
  reportsContainer: { backgroundColor: '#fff' },
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

export default GeneralReportsScreen;
