import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { getBanks } from 'src/redux/content/selectors';

import { StyleSheet, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import { useNavigation } from '@react-navigation/native';

const close = require('src/images/delete.png');
const arrowDown = require('src/images/arrow_down_small.png');
const arrowUp = require('src/images/arrow_up.png');
const editInactive = require('src/images/edit_inactive.png');

const UserPaymentSimpleData = ({ item, index }) => {
  const [isAdditDataOpen, setIsAdditDataOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  const banks = useSelector(getBanks);

  const { width } = Dimensions.get('window');
  const navigation = useNavigation();

  const getRestrictedCountries = (countries) => {
    return Array.isArray(countries) && countries.length === 0 ? (
      <FormattedMessage id={'common.empty'} />
    ) : (
      'not empty :)'
    );
  };
  const getRestrictedBrands = (brands) => {
    return Array.isArray(brands) && brands.length === 0 ? (
      <FormattedMessage id={'common.empty'} />
    ) : (
      'not empty :)'
    );
  };

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
          marginVertical: 40,
          marginHorizontal: -20,
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
          {index + 1} <FormattedMessage id={'common.payments'} />
        </SimpleText>
      </View>
      <View
        style={{
          ...styles.tableRow,
          flexDirection: 'row',

          alignItems: 'center',
        }}
      >
        <View style={{ ...styles.tableCell, width: width / 2.5, paddingVertical: 0 }}>
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
          <View style={styles.additDataCell}>
            <SimpleText>
              <FormattedMessage id={'users.min_amount'} />
            </SimpleText>
          </View>
          <View style={styles.additDataCell}>
            <SimpleText>
              <FormattedMessage id={'users.max_amount'} />
            </SimpleText>
          </View>
          <View style={styles.additDataCell}>
            <SimpleText>
              <FormattedMessage id={'users.min_commission'} />
            </SimpleText>
          </View>
          <View style={styles.additDataCell}>
            <SimpleText>
              <FormattedMessage id={'users.limit'} />
            </SimpleText>
          </View>
          <View style={styles.additDataCell}>
            <SimpleText>
              <FormattedMessage id={'users.rate_commission'} />
            </SimpleText>
          </View>
          <View style={styles.additDataCell}>
            <SimpleText>
              <FormattedMessage id={'users.restricted_countries'} />
            </SimpleText>
          </View>
          <View style={styles.additDataCell}>
            <SimpleText>
              <FormattedMessage id={'users.restricted_brands'} />
            </SimpleText>
          </View>
        </View>
        <View
          style={{
            ...styles.tableCellStatus,
            paddingVertical: 0,
          }}
        >
          <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
            <SimpleText>{item?.paymentMethod?.name}</SimpleText>
          </View>
          <View style={styles.additDataCellValues}>
            <SimpleText>{item.id}</SimpleText>
          </View>
          <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
            {/* {console.log('banks', banks)} */}
            {banks && item && item.paymentMethod && (
              <SimpleText>
                {banks.find((bank) => bank.id === item.paymentMethod.bankId).name}
              </SimpleText>
            )}
          </View>
          <View style={styles.additDataCellValues}>
            <SimpleText>{item.name}</SimpleText>
          </View>
          <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
            <SimpleText>{item.netPrice}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',

                  name: 'users.net_price',
                  value: item.netPrice.toString(),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>
          <View style={styles.additDataCellValues}>
            <SimpleText>{item.fixedNetPrice}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'users.fixed_net_price',
                  value: item.fixedNetPrice.toString(),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>

          <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
            <SimpleText>{item.minAmount}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'users.min_amount',
                  value: item.minAmount.toString(),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>
          <View style={styles.additDataCellValues}>
            <SimpleText>{item.maxAmount}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'users.max_amount',
                  value: item.maxAmount.toString(),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
            <SimpleText>{item.minCommission}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'users.min_commission',
                  value: item.minCommission.toString(),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>
          <View style={styles.additDataCellValues}>
            <SimpleText>{item.limit}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'users.limit',
                  value: item.limit.toString(),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
            <SimpleText>{item.rateCommission}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'users.rate_commission',
                  value: item.rateCommission.toString(),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>
          <View style={styles.additDataCellValues}>
            <SimpleText>{getRestrictedCountries(item.restrictedCountries)}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'users.restricted_countries',
                  value: getRestrictedCountries(item.restrictedCountries),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
            <SimpleText>{getRestrictedBrands(item.restrictedBrands)}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'users.restricted_brands',
                  value: getRestrictedBrands(item.restrictedBrands),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.subTitle}>
        <SimpleText style={{ fontFamily: 'Mont_SB' }}>MasterCard</SimpleText>
      </View>

      <View
        style={{
          ...styles.tableRow,
          flexDirection: 'row',

          alignItems: 'center',
        }}
      >
        <View style={{ ...styles.tableCell, width: width / 2.5, paddingVertical: 0 }}>
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
          <View style={styles.additDataCell}>
            <SimpleText>
              <FormattedMessage id={'users.min_commission'} />
            </SimpleText>
          </View>
        </View>
        <View
          style={{
            ...styles.tableCellStatus,
            paddingVertical: 0,
          }}
        >
          <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
            <SimpleText>{item?.commissions?.MasterCard?.netPrice}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'users.net_price',
                  value: item?.commissions?.MasterCard?.netPrice?.toString(),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>
          <View style={styles.additDataCellValues}>
            <SimpleText>{item?.commissions?.MasterCard?.fixedNetPrice}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'users.fixed_net_price',
                  value: item?.commissions?.MasterCard?.fixedNetPrice?.toString(),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
            <SimpleText>{item?.commissions?.MasterCard?.minCommission}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'users.min_commission',
                  value: item?.commissions?.MasterCard?.minCommission?.toString(),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.subTitle}>
        <SimpleText style={{ fontFamily: 'Mont_SB' }}>Visa</SimpleText>
      </View>

      <View
        style={{
          ...styles.tableRow,
          flexDirection: 'row',

          alignItems: 'center',
        }}
      >
        <View style={{ ...styles.tableCell, width: width / 2.5, paddingVertical: 0 }}>
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
          <View style={styles.additDataCell}>
            <SimpleText>
              <FormattedMessage id={'users.min_commission'} />
            </SimpleText>
          </View>
        </View>
        <View
          style={{
            ...styles.tableCellStatus,
            paddingVertical: 0,
          }}
        >
          <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
            <SimpleText>{item?.commissions?.Visa?.netPrice}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'users.net_price',
                  value: item?.commissions?.Visa?.netPrice?.toString(),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>
          <View style={styles.additDataCellValues}>
            <SimpleText>{item?.commissions?.Visa?.fixedNetPrice}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'users.fixed_net_price',
                  value: item?.commissions?.Visa?.fixedNetPrice?.toString(),
                })
              }
            >
              <Image source={editInactive} style={styles.editInactivePic} />
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
            <SimpleText>{item?.commissions?.Visa?.minCommission}</SimpleText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPaymentsSettingsScreen', {
                  parentScreen: 'UserScreen',
                  name: 'users.min_commission',
                  value: item?.commissions?.Visa?.minCommission?.toString(),
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
    // borderBottomWidth: 1,
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
    paddingRight: 20,
    backgroundColor: '#fff',
    borderBottomColor: 'rgba(217, 217, 217, 0.40);',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: -20,
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
  subTitle: { alignItems: 'center', marginTop: 40, marginBottom: 16 },
});

export default UserPaymentSimpleData;
