import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Radio from 'src/components/molecules/Radio';

const arrowRight = require('src/images/right.png');

const GeneralReportsScreen = () => {
  const [selectedId, setSelectedId] = useState(3);
  const [radioSelect, setRadioSelect] = useState();

  const navigation = useNavigation();

  const handleReportSelect = (e) => {
    setSelectedId(e);
    // switch (e) {
    //   case 1:
    //     navigation('');
    //   case 2:
    //     navigation('');
    //   case 3:
    //     navigation('');
    //   case 4:
    //     navigation('');
    //   case 5:
    //     navigation('');
    //   case 6:
    //     navigation('');
    // }
  };

  useEffect(() => {
    console.log('Radio selected:', radioSelect);
  }, [radioSelect]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.radioBoxContainer}>
        <Radio
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
          <Text
            style={{
              ...styles.itemText,
              fontWeight: selectedId === 1 ? '700' : '600',
            }}
          >
            Calendar
          </Text>
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
          <Text
            style={{
              ...styles.itemText,
              fontWeight: selectedId === 2 ? '700' : '600',
            }}
          >
            Timezone
          </Text>
          <Image source={arrowRight} style={styles.arrowRight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.reportContainerItem,
            backgroundColor: selectedId === 3 ? '#F4F4F4' : '#fff',
          }}
          onPress={() => handleReportSelect(3)}
        >
          <Text
            style={{
              ...styles.itemText,
              fontWeight: selectedId === 3 ? '700' : '600',
            }}
          >
            Merchants
          </Text>
          <Image source={arrowRight} style={styles.arrowRight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.reportContainerItem,
            backgroundColor: selectedId === 4 ? '#F4F4F4' : '#fff',
          }}
          onPress={() => handleReportSelect(4)}
        >
          <Text
            style={{
              ...styles.itemText,
              fontWeight: selectedId === 4 ? '700' : '600',
            }}
          >
            Merchant’s api key
          </Text>
          <Image source={arrowRight} style={styles.arrowRight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.reportContainerItem,
            backgroundColor: selectedId === 5 ? '#F4F4F4' : '#fff',
          }}
          onPress={() => handleReportSelect(5)}
        >
          <Text
            style={{
              ...styles.itemText,
              fontWeight: selectedId === 5 ? '700' : '600',
            }}
          >
            Status
          </Text>
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
          <Text
            style={{
              ...styles.itemText,
              fontWeight: selectedId === 6 ? '700' : '600',
            }}
          >
            Filters columns
          </Text>
          <Image source={arrowRight} style={styles.arrowRight} />
        </TouchableOpacity>
      </View>
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
