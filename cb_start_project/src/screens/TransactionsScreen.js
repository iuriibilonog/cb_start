import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Keyboard,
  Dimensions,
  Pressable,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
} from 'react-native';

const logo = require('src/images/logo.png');
const arrowDown = require('src/images/arrow_down_small.png');

const TransactionsScreen = ({ navigation }) => {
  const handleNextScreen = () => {
    console.log('nextScreen>>');
    navigation.navigate('LoginScreen');
  };

  const { width } = Dimensions.get('window');
  const date = [
    {
      date: '416835',
      mode: 'in',
      create_user: 'create_user',
      status: 'approved',
    },
    {
      date: '416835',
      mode: 'out',
      create_user: 'create_user2',
      status: 'processing',
    },
    {
      date: '416835',
      mode: 'in',
      create_user: '3create_user',
      status: 'declined',
    },
    {
      date: '416835',
      mode: 'out',
      create_user: '44create_user',
      status: 'approved',
    },
  ];
  const index = 1;

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 28,
          paddingTop: 19,
        }}
      >
        <Text>Filters</Text>
        <Image source={arrowDown} style={{ width: 20, height: 20 }} />
      </View>
      <View
        style={{
          ...styles.tableRow,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(217, 217, 217, 0.70)',
          backgroundColor: '#F4F4F4',
        }}
      >
        <View style={{ width: 20 }}></View>
        <View style={{ ...styles.tableCell, width: width / 6 }}>
          <Text key={index} style={styles.headerText}>
            Int.ID
          </Text>
        </View>
        <View style={{ ...styles.tableCell, width: width / 3 }}>
          <Text key={index} style={styles.headerText}>
            Amount
          </Text>
        </View>
        <View style={{ ...styles.tableCell, width: width / 7 }}>
          <Text key={index} style={styles.headerText}>
            Mode
          </Text>
        </View>
        <View style={{ ...styles.tableCellStatus }}>
          <Text key={index} style={styles.headerText}>
            Status
          </Text>
        </View>
      </View>
      {date &&
        date.map((value, index) => (
          <View
            key={index}
            style={{
              ...styles.tableRow,
              flexDirection: 'row',
              borderBottomWidth: 1,
              alignItems: 'center',
              borderBottomColor: 'rgba(217, 217, 217, 0.70)',
              backgroundColor: index % 2 !== 0 ? '#FAFAFA' : '#fff',
            }}
          >
            <View style={{ width: 20 }}>
              <Image source={arrowDown} style={{ width: 20, height: 20 }} />
            </View>

            <View style={{ ...styles.tableCell, width: width / 6 }}>
              <Text style={[styles.bgColorData]}>{value.date}</Text>
            </View>
            <View style={{ ...styles.tableCell, width: width / 3 }}>
              <Text style={[styles.bgColorData]}>{value.create_user}</Text>
            </View>
            <View style={{ ...styles.tableCell, width: width / 7 }}>
              <Text style={[styles.bgColorData]}>{value.mode}</Text>
            </View>
            <View
              style={{
                ...styles.tableCellStatus,
                // width: width / 4,
                backgroundColor:
                  value.status === 'approved'
                    ? '#C3FFD0'
                    : value.status === 'declined'
                    ? '#FDD7C0'
                    : '#FDFF9A',
              }}
            >
              <Text style={[styles.bgColorData]}>{value.status}</Text>
            </View>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: { fontWeight: '700' },
  tableRow: { paddingLeft: 14 },
  tableCell: { paddingVertical: 10, paddingHorizontal: 5 },
  tableCellStatus: { flex: 1, paddingVertical: 10, paddingHorizontal: 15 },
});

export default TransactionsScreen;
