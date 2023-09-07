import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const arrowRight = require('src/images/right.png');
const GeneralReportsScreen = () => {
  const [selectedId, setSelectedId] = useState(3);

  const handleReportSelect = (e) => {
    setSelectedId(e);
  };
  return (
    <View>
      <View style={styles.radioBoxContainer}>
        <View style={styles.radioBoxItem}>
          <Text>Payments</Text>
        </View>
        <View style={styles.radioBoxItem}>
          <Text>Transactions</Text>
        </View>
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
          <Text>Calendar</Text>
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
          <Text>Timezone</Text>
          <Image source={arrowRight} style={styles.arrowRight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.reportContainerItem,
            backgroundColor: selectedId === 3 ? '#F4F4F4' : '#fff',
          }}
          onPress={() => handleReportSelect(3)}
        >
          <Text>Merchants</Text>
          <Image source={arrowRight} style={styles.arrowRight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.reportContainerItem,
            backgroundColor: selectedId === 4 ? '#F4F4F4' : '#fff',
          }}
          onPress={() => handleReportSelect(4)}
        >
          <Text>Merchant’s api key</Text>
          <Image source={arrowRight} style={styles.arrowRight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.reportContainerItem,
            backgroundColor: selectedId === 5 ? '#F4F4F4' : '#fff',
          }}
          onPress={() => handleReportSelect(5)}
        >
          <Text>Status</Text>
          <Image source={arrowRight} style={styles.arrowRight} />
        </TouchableOpacity>

        <View style={{ ...styles.reportContainerItem, marginTop: 80 }}>
          <Text>Filters columns</Text>
          <Image source={arrowRight} style={styles.arrowRight} />
        </View>
      </View>
    </View>
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
  reportsContainer: { backgroundColor: '#fff' },
  arrowRight: { width: 24, height: 24 },
  reportContainerItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingVertical: 10,
    marginVertical: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default GeneralReportsScreen;
