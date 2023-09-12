import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactionData } from 'src/redux/content/operations';
import { getTransactionInfo } from 'src/redux/content/selectors';
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
  TouchableOpacity,
} from 'react-native';
import SimpleText from '../components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';

const logo = require('src/images/logo.png');
const arrowDown = require('src/images/arrow_down_small.png');
const arrowUp = require('src/images/arrow_up.png');

const TransactionsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const transactionInfo = useSelector(getTransactionInfo);

  useEffect(() => {
    dispatch(getTransactionData());
  }, []);

  useEffect(() => {
    console.log('transactionInfo', transactionInfo);
  }, [transactionInfo]);

  const handleNextScreen = () => {
    console.log('nextScreen>>');
    navigation.navigate('LoginScreen');
  };

  const [isAdditDataOpen, setIsAdditDataOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  const { width } = Dimensions.get('window');
  const date = [
    {
      date: '416835',
      mode: 'in',
      create_user: 'create_user',
      status: 'approved',
      data: [
        {
          intern_id: 11111,
          order_id: 888,
          date: '2021/02/01',
          api_key: 'Testunlim',
          mode: 'payin',
          description: 'invalid api method',
          status: 'approved',
          amount: '999000 KZT',
        },
      ],
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
      data: [
        {
          intern_id: 45765,
          order_id: 822,
          date: '2021/02/01',
          api_key: 'Testunlim',
          status: 'declined',
          mode: 'payin',
          description: 'invalid api method',
          amount: '999000 KZT',
        },
      ],
    },
    {
      date: '416835',
      mode: 'out',
      create_user: '44create_user',
      status: 'approved',
    },
  ];
  const index = 1;

  const handleExpandRow = (index, isAdditData) => {
    if (isAdditData) {
      setIsAdditDataOpen((prev) => !prev);
    } else {
      setIsAdditDataOpen(false);
    }
    setSelectedIndex(index);
  };

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
        <SimpleText>Filters</SimpleText>
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
          <SimpleText key={index} style={styles.headerText}>
            <FormattedMessage id={'transactions.int_id'} />
          </SimpleText>
        </View>
        <View style={{ ...styles.tableCell, width: width / 3 }}>
          <SimpleText key={index} style={styles.headerText}>
            <FormattedMessage id={'transactions.amount'} />
          </SimpleText>
        </View>
        <View style={{ ...styles.tableCell, width: width / 8 }}>
          <SimpleText key={index} style={styles.headerText}>
            <FormattedMessage id={'transactions.mode'} />
          </SimpleText>
        </View>
        <View style={{ ...styles.tableCellStatus }}>
          <SimpleText key={index} style={styles.headerText}>
            <FormattedMessage id={'transactions.status'} />
          </SimpleText>
        </View>
      </View>
      {date &&
        date.map((value, index) => (
          <>
            <TouchableOpacity
              activeOpacity={0.5}
              key={index}
              onPress={() => handleExpandRow(index, value.data)}
            >
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
                  <Image
                    source={
                      isAdditDataOpen && value.data && selectedIndex === index ? arrowUp : arrowDown
                    }
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <View style={{ ...styles.tableCell, width: width / 6 }}>
                  <SimpleText>{value.date}</SimpleText>
                </View>
                <View style={{ ...styles.tableCell, width: width / 3 }}>
                  <SimpleText>{value.create_user}</SimpleText>
                </View>
                <View style={{ ...styles.tableCell, width: width / 8 }}>
                  <SimpleText>{value.mode}</SimpleText>
                </View>
                <View
                  style={{
                    ...styles.tableCellStatus,
                    // width: width / 4,
                    backgroundColor:
                      value.status === 'approved'
                        ? '#D2FFA4'
                        : value.status === 'declined'
                        ? '#FFCCCC'
                        : '#FDFF96',
                  }}
                >
                  <SimpleText>{value.status}</SimpleText>
                </View>
              </View>
              {isAdditDataOpen && value.data && selectedIndex === index && (
                <View style={styles.additDataHeader}>
                  <Image source={arrowUp} style={{ width: 32, height: 32 }} />
                </View>
              )}
            </TouchableOpacity>
            {isAdditDataOpen &&
              value.data &&
              selectedIndex === index &&
              value.data.map((dataItem, index) => (
                <View
                  key={index}
                  style={{
                    ...styles.tableRow,
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    borderBottomColor: 'rgba(217, 217, 217, 0.70)',
                  }}
                >
                  <View style={{ ...styles.tableCell, width: width / 3, paddingVertical: 0 }}>
                    <View style={styles.additDataCell}>
                      <SimpleText>Internal ID</SimpleText>
                    </View>
                    <View style={styles.additDataCell}>
                      <SimpleText>Order ID</SimpleText>
                    </View>
                    <View style={styles.additDataCell}>
                      <SimpleText>Date</SimpleText>
                    </View>
                    <View style={styles.additDataCell}>
                      <SimpleText>Api Key name</SimpleText>
                    </View>
                    <View style={styles.additDataCell}>
                      <SimpleText>Status</SimpleText>
                    </View>
                    <View style={styles.additDataCell}>
                      <SimpleText>Amount</SimpleText>
                    </View>
                  </View>
                  <View
                    style={{
                      ...styles.tableCellStatus,
                      paddingVertical: 0,
                    }}
                  >
                    <View style={styles.additDataCellValues}>
                      <SimpleText>{dataItem.intern_id}</SimpleText>
                    </View>
                    <View style={styles.additDataCellValues}>
                      <SimpleText>{dataItem.order_id}</SimpleText>
                    </View>
                    <View style={styles.additDataCellValues}>
                      <SimpleText>{dataItem.date}</SimpleText>
                    </View>
                    <View style={styles.additDataCellValues}>
                      <SimpleText>{dataItem.api_key}</SimpleText>
                    </View>
                    <View
                      style={{
                        ...styles.additDataCellValues,
                        backgroundColor:
                          dataItem.status === 'approved'
                            ? '#D2FFA4'
                            : dataItem.status === 'declined'
                            ? '#FFCCCC'
                            : '#FDFF96',
                      }}
                    >
                      <SimpleText>{dataItem.status}</SimpleText>
                    </View>
                    <View style={styles.additDataCellValues}>
                      <SimpleText>{dataItem.amount}</SimpleText>
                    </View>
                  </View>
                </View>
              ))}
          </>
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
  headerText: { fontFamily: 'Mont_SB' },
  tableRow: { paddingLeft: 14 },
  tableCell: { paddingVertical: 15, paddingHorizontal: 5 },
  tableCellStatus: { flex: 1, paddingVertical: 15, paddingLeft: 15, paddingRight: 5 },
  additDataCell: {
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  additDataCellValues: {
    height: 40,
    paddingLeft: 23,
    backgroundColor: '#fff',
    borderBottomColor: 'rgba(217, 217, 217, 0.40);',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  additDataHeader: {
    height: 40,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionsScreen;
