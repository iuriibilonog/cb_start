import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';

import { StyleSheet, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import { useNavigation } from '@react-navigation/native';

const close = require('src/images/delete.png');
const arrowDown = require('src/images/arrow_down_small.png');
const arrowUp = require('src/images/arrow_up.png');
const editInactive = require('src/images/edit_inactive.png');

const UserPaymentSimpleData = ({ item }) => {
  const [isAdditDataOpen, setIsAdditDataOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  const { width } = Dimensions.get('window');
  const navigation = useNavigation();

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: '#898989',
          width: 198,
          height: 31,
          marginBottom: 36,
        }}
      >
        <View
          style={{
            height: 1,
            width: 30,
            backgroundColor: '#fff',
            marginRight: 14,
          }}
        />
        <SimpleText style={{ color: '#fff', fontSize: 12, fontFamily: 'Mont_SB' }}>
          {item.id} payments
        </SimpleText>
      </View>
      <View
        style={{
          ...styles.tableRow,
          flexDirection: 'row',

          alignItems: 'center',
        }}
      >
        <View style={{ ...styles.tableCell, width: width / 3, paddingVertical: 0 }}>
          <View style={styles.additDataCell}>
            <SimpleText>
              <FormattedMessage id={'users.payment_method_name'} />
            </SimpleText>
          </View>
          <View style={styles.additDataCell}>
            <SimpleText>ID</SimpleText>
          </View>
          <View style={styles.additDataCell}>
            <SimpleText>
              <FormattedMessage id={'users.bank_name'} />
            </SimpleText>
          </View>
          <View style={styles.additDataCell}>
            <SimpleText>
              <FormattedMessage id={'users.setting_name'} />
            </SimpleText>
          </View>
          <View style={styles.additDataCell}>
            <SimpleText>
              <FormattedMessage id={'users.net_price'} />
            </SimpleText>
          </View>
          <View style={styles.additDataCell}>
            <SimpleText>
              <FormattedMessage id={'users.fixed_net_price'} />
            </SimpleText>
          </View>
        </View>
        <View
          style={{
            ...styles.tableCellStatus,
            paddingVertical: 0,
          }}
        >
          <View style={styles.additDataCellValues}>
            <SimpleText>{item.id}</SimpleText>
          </View>
          <View style={styles.additDataCellValues}>
            <SimpleText>{item.orderId}</SimpleText>
          </View>
          <View style={styles.additDataCellValues}>
            <SimpleText>{item.orderId}</SimpleText>
          </View>
          <View style={styles.additDataCellValues}>
            <SimpleText>{item.name}</SimpleText>
          </View>
          <View style={styles.additDataCellValues}>
            <SimpleText>{item.price}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'Net Price',
                  value: item.price.toString(),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>
          <View style={styles.additDataCellValues}>
            <SimpleText>{item.fixed_price}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'Fixed Price',
                  value: item.fixed_price.toString(),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: { marginTop: 30, marginBottom: 36, paddingLeft: 20 },
  headerText: { fontFamily: 'Mont_SB' },
  // tableRow: { paddingLeft: 10 },
  tableHeaderCell: { paddingVertical: 15, paddingHorizontal: 5 },
  tableCell: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    // alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(217, 217, 217, 0.70)',
  },
  tableCellStatus: { flex: 1, lineHeight: 20, paddingLeft: 15, paddingVertical: 15 },
  additDataCell: {
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  additDataCellValues: {
    height: 40,
    paddingLeft: 23,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderBottomColor: 'rgba(217, 217, 217, 0.40);',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  additDataHeader: {
    height: 40,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadge: {
    width: 14,
    height: 14,
    backgroundColor: '#36D0BB',
    borderRadius: 7,
    position: 'absolute',
    top: -7,
    left: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editInactivePic: { width: 19, height: 19 },
});

export default UserPaymentSimpleData;