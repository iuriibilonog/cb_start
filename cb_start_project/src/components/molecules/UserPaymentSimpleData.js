import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { getBanks } from 'src/redux/content/selectors';

import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
} from 'react-native';
import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import { useNavigation } from '@react-navigation/native';
import { getEditedPaymentsSettings } from 'src/redux/content/selectors';
import { skipEditedPaymentsSettings } from 'src/redux/content/operations';
import SimpleCheckBox from 'src/components/atoms/SimpleCheckBox';
import SimpleButton from 'src/components/atoms/SimpleButton';

const close = require('src/images/delete.png');
const arrowDown = require('src/images/arrow_down.png');
const arrowUp = require('src/images/arrow_up.png');
const editInactive = require('src/images/edit_inactive.png');

const UserPaymentSimpleData = ({ item, index, id, currentUser, confirmEditPayment }) => {
  const [isAdditDataOpen, setIsAdditDataOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  const [isUseWhiteList, setIsUseWhiteList] = useState(false);
  const [isUseAcive, setIsUseAcive] = useState(true);
  const [minConfirmation, setMinConfirmation] = useState(1);
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);

  const banks = useSelector(getBanks);
  const editedPayments = useSelector(getEditedPaymentsSettings);

  const { width } = Dimensions.get('window');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsUseAcive(item.active);
    return () => {
      dispatch(skipEditedPaymentsSettings());
    };
  }, []);

  const getRestrictedCountries = (countries) => {
    // countries = [
    //   'WS',
    //   'SM',
    //   'ST',
    //   'SA',
    //   'SN',
    //   'RS',
    //   'SC',
    //   'SL',
    //   'SG',
    //   'SX',
    //   'SB',
    //   'SO',
    //   'ZA',
    //   'GS',
    //   'SS',
    //   'LK',
    //   'SD',
    //   'SR',
    //   'SJ',
    //   'SZ',
    //   'SY',
    //   'TW',
    // ];
    return Array.isArray(countries) && countries.length === 0 ? (
      <FormattedMessage id={'common.empty'} />
    ) : (
      countries.join(', ')
    );
  };
  const getRestrictedBrands = (brands) => {
    return Array.isArray(brands) && brands.length === 0
      ? 'Empty'
      : Array.isArray(brands) && brands.length > 0
      ? brands.join(', ')
      : brands;
  };
  const handleOnBlur = () => {
    setIsCountriesOpen(false);
    setIsBrandsOpen(false);
  };

  console.log('editedPayments[index]', editedPayments.length > 0, editedPayments[index]);
  console.log('item', item.id);

  return (
    editedPayments.length > 0 && (
      <TouchableWithoutFeedback onPress={() => handleOnBlur()}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              backgroundColor: '#898989',
              width: 198,
              height: 31,
              marginTop: 40,
              marginBottom: isUseAcive ? 40 : 20,
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
            style={
              !isUseAcive
                ? {
                    backgroundColor: 'rgba(217, 217, 217, 0.50)',
                    marginHorizontal: -20,
                    paddingTop: 20,
                    paddingHorizontal: 20,
                  }
                : {}
            }
          >
            <View style={!isUseAcive ? { opacity: 0.4, pointerEvents: 'none' } : {}}>
              <View
                style={{
                  ...styles.tableRow,
                  flexDirection: 'row',
                  zIndex: 1,
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
                        {banks.find((bank) => bank.id === item.paymentMethod.bankId)?.name}
                      </SimpleText>
                    )}
                  </View>
                  <View style={styles.additDataCellValues}>
                    <SimpleText>{item.name}</SimpleText>
                  </View>
                  <View
                    style={{
                      ...styles.additDataCellValues,
                      backgroundColor: '#FAFAFA',
                      position: 'relative',
                    }}
                  >
                    <SimpleText>
                      {editedPayments[index]['netPrice'] &&
                      +editedPayments[index]['netPrice'] !== item?.netPrice
                        ? editedPayments[index]['netPrice']
                        : item.netPrice}
                    </SimpleText>
                    {+editedPayments[index]['netPrice'] !== item?.netPrice && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 14,
                          width: 10,
                          height: 10,
                          backgroundColor: '#36D0BB',
                          borderRadius: 5,
                        }}
                      />
                    )}

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditPaymentsSettingsScreen', {
                          parentScreen: 'UserScreen',
                          name: 'users.net_price',
                          value: item.netPrice.toString(),
                          index,
                          id,
                          dataName: 'netPrice',
                          keyBoard: 'numeric',
                          currentUser,
                        })
                      }
                    >
                      <Image source={editInactive} style={styles.editInactivePic} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.additDataCellValues}>
                    <SimpleText>
                      {editedPayments[index]['fixedNetPrice'] &&
                      +editedPayments[index]['fixedNetPrice'] !== +item.fixedNetPrice
                        ? editedPayments[index]['fixedNetPrice']
                        : item.fixedNetPrice}
                    </SimpleText>
                    {+editedPayments[index]['fixedNetPrice'] !== +item.fixedNetPrice && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 14,
                          width: 10,
                          height: 10,
                          backgroundColor: '#36D0BB',
                          borderRadius: 5,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditPaymentsSettingsScreen', {
                          parentScreen: 'UserScreen',
                          name: 'users.fixed_net_price',
                          value: item.fixedNetPrice.toString(),
                          index,
                          id,
                          dataName: 'fixedNetPrice',
                          currentUser,
                        })
                      }
                    >
                      <Image source={editInactive} style={styles.editInactivePic} />
                    </TouchableOpacity>
                  </View>

                  <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
                    <SimpleText>
                      {editedPayments[index]['minAmount'] &&
                      +editedPayments[index]['minAmount'] !== +item.minAmount
                        ? editedPayments[index]['minAmount']
                        : item.minAmount}
                    </SimpleText>
                    {+editedPayments[index]['minAmount'] !== +item.minAmount && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 14,
                          width: 10,
                          height: 10,
                          backgroundColor: '#36D0BB',
                          borderRadius: 5,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditPaymentsSettingsScreen', {
                          parentScreen: 'UserScreen',
                          name: 'users.min_amount',
                          value: item.minAmount.toString(),
                          index,
                          id,
                          dataName: 'minAmount',
                          currentUser,
                        })
                      }
                    >
                      <Image source={editInactive} style={styles.editInactivePic} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.additDataCellValues}>
                    <SimpleText>
                      {editedPayments[index]['maxAmount'] &&
                      +editedPayments[index]['maxAmount'] !== +item.maxAmount
                        ? editedPayments[index]['maxAmount']
                        : item.maxAmount}
                    </SimpleText>
                    {+editedPayments[index]['maxAmount'] !== +item.maxAmount && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 14,
                          width: 10,
                          height: 10,
                          backgroundColor: '#36D0BB',
                          borderRadius: 5,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditPaymentsSettingsScreen', {
                          parentScreen: 'UserScreen',
                          name: 'users.max_amount',
                          value: item.maxAmount.toString(),
                          index,
                          id,
                          dataName: 'maxAmount',
                          currentUser,
                        })
                      }
                    >
                      <Image source={editInactive} style={styles.editInactivePic} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
                    <SimpleText>
                      {editedPayments[index]['minCommission'] &&
                      +editedPayments[index]['minCommission'] !== +item.minCommission
                        ? editedPayments[index]['minCommission']
                        : item.minCommission}
                    </SimpleText>
                    {+editedPayments[index]['minCommission'] !== +item.minCommission && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 14,
                          width: 10,
                          height: 10,
                          backgroundColor: '#36D0BB',
                          borderRadius: 5,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditPaymentsSettingsScreen', {
                          parentScreen: 'UserScreen',
                          name: 'users.min_commission',
                          value: item.minCommission.toString(),
                          index,
                          id,
                          dataName: 'minCommission',
                          currentUser,
                        })
                      }
                    >
                      <Image source={editInactive} style={styles.editInactivePic} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.additDataCellValues}>
                    <SimpleText>
                      {editedPayments[index]['limit'] &&
                      +editedPayments[index]['limit'] !== +item.limit
                        ? editedPayments[index]['limit']
                        : item.limit}
                    </SimpleText>
                    {+editedPayments[index]['limit'] !== +item.limit && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 14,
                          width: 10,
                          height: 10,
                          backgroundColor: '#36D0BB',
                          borderRadius: 5,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditPaymentsSettingsScreen', {
                          parentScreen: 'UserScreen',
                          name: 'users.limit',
                          value: item.limit.toString(),
                          index,
                          id,
                          dataName: 'limit',
                          currentUser,
                        })
                      }
                    >
                      <Image source={editInactive} style={styles.editInactivePic} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
                    <SimpleText>
                      {editedPayments[index]['rateCommission'] &&
                      +editedPayments[index]['rateCommission'] !== +item.rateCommission
                        ? editedPayments[index]['rateCommission']
                        : item.rateCommission}
                    </SimpleText>
                    {+editedPayments[index]['rateCommission'] !== +item.rateCommission && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 14,
                          width: 10,
                          height: 10,
                          backgroundColor: '#36D0BB',
                          borderRadius: 5,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditPaymentsSettingsScreen', {
                          parentScreen: 'UserScreen',
                          name: 'users.rate_commission',
                          value: item.rateCommission.toString(),
                          index,
                          id,
                          dataName: 'rateCommission',
                          currentUser,
                        })
                      }
                    >
                      <Image source={editInactive} style={styles.editInactivePic} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ ...styles.additDataCellValues, position: 'relative', zIndex: 1 }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        width: '80%',
                        fontFamily: 'Mont',
                        fontSize: 16,
                        color: '#262626',
                        flex: 1,
                      }}
                    >
                      {editedPayments[index]['restrictedCountries'] &&
                      editedPayments[index]['restrictedCountries'] !== item.restrictedCountries
                        ? getRestrictedCountries(editedPayments[index]['restrictedCountries'])
                        : getRestrictedCountries(item.restrictedCountries)}
                    </Text>
                    {editedPayments[index]['restrictedCountries'] !== item.restrictedCountries && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 14,
                          width: 10,
                          height: 10,
                          backgroundColor: '#36D0BB',
                          borderRadius: 5,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        item.restrictedCountries && item.restrictedCountries.length > 6
                          ? setIsCountriesOpen((prev) => !prev)
                          : navigation.navigate('EditPaymentsSettingsScreen', {
                              parentScreen: 'UserScreen',
                              name: 'users.restricted_countries',
                              value: getRestrictedCountries(item.restrictedCountries),
                              index,
                              id,
                              dataName: 'restrictedCountries',
                              currentUser,
                            })
                      }
                    >
                      <Image
                        source={
                          item.restrictedCountries &&
                          item.restrictedCountries.length > 6 &&
                          !isCountriesOpen
                            ? arrowDown
                            : item.restrictedCountries &&
                              item.restrictedCountries.length > 6 &&
                              isCountriesOpen
                            ? arrowUp
                            : editInactive
                        }
                        style={styles.editInactivePic}
                      />
                    </TouchableOpacity>
                    {isCountriesOpen && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 40,
                          left: 0,
                          width: '120%',
                          minHeight: 100,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          backgroundColor: '#fff',
                          paddingVertical: 5,
                          paddingLeft: 13,
                          paddingRight: 18,
                          borderColor: 'rgba(217, 217, 217, 0.40)',
                          borderRadius: 2,
                          borderWidth: 1,
                        }}
                      >
                        <SimpleText style={{ width: '85%' }}>
                          {editedPayments[index]['restrictedCountries'] &&
                          editedPayments[index]['restrictedCountries'] !== item.restrictedCountries
                            ? getRestrictedCountries(editedPayments[index]['restrictedCountries'])
                            : getRestrictedCountries(item.restrictedCountries)}
                        </SimpleText>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('EditPaymentsSettingsScreen', {
                              parentScreen: 'UserScreen',
                              name: 'users.restricted_countries',
                              value: getRestrictedCountries(item.restrictedCountries),
                              index,
                              id,
                              dataName: 'restrictedCountries',
                              currentUser,
                            })
                          }
                        >
                          <Image source={editInactive} style={styles.editInactivePic} />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                  <View
                    style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA', zIndex: 0 }}
                  >
                    <Text
                      numberOfLines={2}
                      style={{
                        width: '80%',
                        fontFamily: 'Mont',
                        fontSize: 16,
                        color: '#262626',
                        flex: 1,
                      }}
                    >
                      {/* {console.log('first', editedPayments[index]['restrictedBrands'])}
                      {console.log('first', item.restrictedBrands)} */}
                      {editedPayments[index]['restrictedBrands'] &&
                      editedPayments[index]['restrictedBrands'] !== item.restrictedBrands
                        ? getRestrictedBrands(editedPayments[index]['restrictedBrands'])
                        : getRestrictedBrands(item.restrictedBrands)}
                      {/* {getRestrictedBrands(item.restrictedBrands)} */}
                    </Text>
                    {editedPayments[index]['restrictedBrands'] !== item.restrictedBrands && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 14,
                          width: 10,
                          height: 10,
                          backgroundColor: '#36D0BB',
                          borderRadius: 5,
                        }}
                      />
                    )}

                    <TouchableOpacity
                      onPress={() =>
                        item.restrictedBrands && item.restrictedBrands.length > 6
                          ? setIsBrandsOpen((prev) => !prev)
                          : navigation.navigate('EditPaymentsSettingsScreen', {
                              parentScreen: 'UserScreen',
                              name: 'users.restricted_brands',
                              value: getRestrictedBrands(item.restrictedBrands),
                              index,
                              id,
                              dataName: 'restrictedBrands',
                              currentUser,
                            })
                      }
                    >
                      <Image
                        source={
                          item.restrictedBrands && item.restrictedBrands.length > 6 && !isBrandsOpen
                            ? arrowDown
                            : item.restrictedBrands &&
                              item.restrictedBrands.length > 6 &&
                              isBrandsOpen
                            ? arrowUp
                            : editInactive
                        }
                        style={styles.editInactivePic}
                      />
                    </TouchableOpacity>
                    {isBrandsOpen && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 40,
                          left: 0,
                          width: '120%',
                          minHeight: 100,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          backgroundColor: '#fff',
                          paddingVertical: 5,
                          paddingLeft: 13,
                          paddingRight: 18,
                          borderColor: 'rgba(217, 217, 217, 0.40)',
                          borderRadius: 2,
                          borderWidth: 1,
                        }}
                      >
                        <SimpleText style={{ width: '85%' }}>
                          {getRestrictedBrands(item.restrictedBrands)}
                        </SimpleText>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('EditPaymentsSettingsScreen', {
                              parentScreen: 'UserScreen',
                              name: 'users.restricted_brands',
                              value: getRestrictedBrands(item.restrictedBrands),
                              index,
                              id,
                              dataName: 'restrictedBrands',
                              currentUser,
                            })
                          }
                        >
                          <Image source={editInactive} style={styles.editInactivePic} />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              <View style={{ ...styles.subTitle, zIndex: 0 }}>
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
                    <SimpleText>
                      {editedPayments[index].commissions?.MasterCard?.netPrice &&
                      +editedPayments[index].commissions?.MasterCard?.netPrice !==
                        item?.commissions?.MasterCard?.netPrice
                        ? +editedPayments[index].commissions?.MasterCard?.netPrice
                        : item?.commissions?.MasterCard?.netPrice}
                    </SimpleText>
                    {editedPayments[index].commissions?.MasterCard?.netPrice !==
                      item?.commissions?.MasterCard?.netPrice && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 14,
                          width: 10,
                          height: 10,
                          backgroundColor: '#36D0BB',
                          borderRadius: 5,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditPaymentsSettingsScreen', {
                          parentScreen: 'UserScreen',
                          name: 'users.net_price',
                          value: item?.commissions?.MasterCard?.netPrice?.toString(),
                          index,
                          id,
                          dataName: 'NetPriceMasterCard',
                          currentUser,
                        })
                      }
                    >
                      <Image source={editInactive} style={styles.editInactivePic} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.additDataCellValues}>
                    <SimpleText>
                      {editedPayments[index].commissions?.MasterCard?.fixedNetPrice &&
                      +editedPayments[index].commissions?.MasterCard?.fixedNetPrice !==
                        item?.commissions?.MasterCard?.fixedNetPrice
                        ? +editedPayments[index].commissions?.MasterCard?.fixedNetPrice
                        : item?.commissions?.MasterCard?.fixedNetPrice}
                    </SimpleText>

                    {editedPayments[index].commissions?.MasterCard?.fixedNetPrice !==
                      item?.commissions?.MasterCard?.fixedNetPrice && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 14,
                          width: 10,
                          height: 10,
                          backgroundColor: '#36D0BB',
                          borderRadius: 5,
                        }}
                      />
                    )}

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditPaymentsSettingsScreen', {
                          parentScreen: 'UserScreen',
                          name: 'users.fixed_net_price',
                          value: item?.commissions?.MasterCard?.fixedNetPrice?.toString(),
                          index,
                          id,
                          dataName: 'fixedNetPriceMasterCard',
                          currentUser,
                        })
                      }
                    >
                      <Image source={editInactive} style={styles.editInactivePic} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
                    <SimpleText>
                      {editedPayments[index].commissions?.MasterCard?.minCommission &&
                      +editedPayments[index].commissions?.MasterCard?.minCommission !==
                        item?.commissions?.MasterCard?.minCommission
                        ? +editedPayments[index].commissions?.MasterCard?.minCommission
                        : item?.commissions?.MasterCard?.minCommission}
                    </SimpleText>
                    {editedPayments[index].commissions?.MasterCard?.minCommission !==
                      item?.commissions?.MasterCard?.minCommission && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 14,
                          width: 10,
                          height: 10,
                          backgroundColor: '#36D0BB',
                          borderRadius: 5,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditPaymentsSettingsScreen', {
                          parentScreen: 'UserScreen',
                          name: 'users.min_commission',
                          value: item?.commissions?.MasterCard?.minCommission?.toString(),
                          index,
                          id,
                          dataName: 'minCommissionMasterCard',
                          currentUser,
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
                    <SimpleText>
                      {editedPayments[index].commissions?.Visa?.netPrice &&
                      +editedPayments[index].commissions?.Visa?.netPrice !==
                        item?.commissions?.Visa?.netPrice
                        ? +editedPayments[index].commissions?.Visa?.netPrice
                        : item?.commissions?.Visa?.netPrice}
                    </SimpleText>
                    {editedPayments[index].commissions?.Visa?.netPrice !==
                      item?.commissions?.Visa?.netPrice && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 14,
                          width: 10,
                          height: 10,
                          backgroundColor: '#36D0BB',
                          borderRadius: 5,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditPaymentsSettingsScreen', {
                          parentScreen: 'UserScreen',
                          name: 'users.net_price',
                          value: item?.commissions?.Visa?.netPrice?.toString(),
                          index,
                          id,
                          dataName: 'NetPriceVisa',
                          currentUser,
                        })
                      }
                    >
                      <Image source={editInactive} style={styles.editInactivePic} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.additDataCellValues}>
                    <SimpleText>
                      {editedPayments[index].commissions?.Visa?.fixedNetPrice &&
                      +editedPayments[index].commissions?.Visa?.fixedNetPrice !==
                        item?.commissions?.Visa?.fixedNetPrice
                        ? +editedPayments[index].commissions?.Visa?.fixedNetPrice
                        : item?.commissions?.Visa?.fixedNetPrice}
                    </SimpleText>
                    {editedPayments[index].commissions?.Visa?.fixedNetPrice !==
                      item?.commissions?.Visa?.fixedNetPrice && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 14,
                          width: 10,
                          height: 10,
                          backgroundColor: '#36D0BB',
                          borderRadius: 5,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditPaymentsSettingsScreen', {
                          parentScreen: 'UserScreen',
                          name: 'users.fixed_net_price',
                          value: item?.commissions?.Visa?.fixedNetPrice?.toString(),
                          index,
                          id,
                          dataName: 'fixedNetPriceVisa',
                          currentUser,
                        })
                      }
                    >
                      <Image source={editInactive} style={styles.editInactivePic} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ ...styles.additDataCellValues, backgroundColor: '#FAFAFA' }}>
                    <SimpleText>
                      {editedPayments[index].commissions?.Visa?.minCommission &&
                      +editedPayments[index].commissions?.Visa?.minCommission !==
                        item?.commissions?.Visa?.minCommission
                        ? +editedPayments[index].commissions?.Visa?.minCommission
                        : item?.commissions?.Visa?.minCommission}
                    </SimpleText>

                    {editedPayments[index].commissions?.Visa?.minCommission !==
                      item?.commissions?.Visa?.minCommission && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 14,
                          width: 10,
                          height: 10,
                          backgroundColor: '#36D0BB',
                          borderRadius: 5,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditPaymentsSettingsScreen', {
                          parentScreen: 'UserScreen',
                          name: 'users.min_commission',
                          value: item?.commissions?.Visa?.minCommission?.toString(),
                          index,
                          id,
                          dataName: 'minCommissionVisa',
                          currentUser,
                        })
                      }
                    >
                      <Image source={editInactive} style={styles.editInactivePic} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* ============================================== */}
              <View
                style={{
                  marginTop: 40,
                  marginBottom: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => setIsUseWhiteList((prev) => !prev)}
                >
                  <SimpleCheckBox checked={isUseWhiteList} style={{ marginRight: 13 }} />
                </TouchableOpacity>
                <SimpleText style={{ paddingTop: 4 }}>
                  <FormattedMessage id={'users.use_whitelist'} />
                </SimpleText>
              </View>
              {isUseWhiteList && (
                <View
                  style={{
                    // marginTop: 24,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginBottom: 15,
                  }}
                >
                  <SimpleText>
                    <FormattedMessage id={'users.min_confirmation'} /> :
                  </SimpleText>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      backgroundColor: '#FAFAFA',
                      height: 40,
                      marginLeft: 24,
                      width: width / 3,
                      // flex: 1,
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => setMinConfirmation((prev) => prev + 1)}
                    >
                      <SimpleText>+</SimpleText>
                    </TouchableOpacity>
                    <SimpleText>{minConfirmation}</SimpleText>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => setMinConfirmation((prev) => (prev !== 1 ? prev - 1 : 1))}
                    >
                      <SimpleText>-</SimpleText>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              marginHorizontal: -20,
              backgroundColor: isUseAcive ? '#fff' : 'rgba(217, 217, 217, 0.50)',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <TouchableOpacity activeOpacity={0.5} onPress={() => setIsUseAcive((prev) => !prev)}>
                <SimpleCheckBox checked={isUseAcive} style={{ marginRight: 13 }} />
              </TouchableOpacity>
              <SimpleText style={{ paddingTop: 4 }}>
                <FormattedMessage id={'common.active'} />
              </SimpleText>
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: isUseAcive ? 1 : 0.4,
                pointerEvents: isUseAcive ? 'all' : 'none',
              }}
            >
              <SimpleText style={{ paddingTop: 4, width: width / 2.5 }}>
                <FormattedMessage id={'common.chance'} />, % :
              </SimpleText>

              <TouchableOpacity
                style={{ marginRight: 'auto' }}
                onPress={() =>
                  navigation.navigate('EditPaymentsSettingsScreen', {
                    parentScreen: 'UserScreen',
                    name: 'common.chance',
                    value: item?.chance?.toString(),
                    index,
                    id,
                    dataName: 'chance',
                    currentUser,
                  })
                }
              >
                <View
                  style={{
                    width: 126,
                    height: 40,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    backgroundColor: '#FAFAFA',
                  }}
                >
                  <SimpleText
                    style={{
                      textAlign: 'center',
                      width: 126,
                    }}
                  >
                    {editedPayments[index].chance && +editedPayments[index].chance !== item?.chance
                      ? +editedPayments[index].chance
                      : item?.chance}
                  </SimpleText>
                  {editedPayments[index].chance !== item?.chance && (
                    <View
                      style={{
                        position: 'absolute',
                        top: -5,
                        right: -5,
                        width: 10,
                        height: 10,
                        backgroundColor: '#36D0BB',
                        borderRadius: 5,
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginVertical: 40,
                // opacity: isUseAcive ? 1 : 0.4,
                // pointerEvents: isUseAcive ? 'all' : 'none',
              }}
            >
              <TouchableOpacity onPress={() => confirmEditPayment(item.id)}>
                <SimpleButton
                  text={'common.edit'}
                  style={{ backgroundColor: '#FFE13A', width: 174 }}
                  textStyle={{ color: '#262626' }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
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
    // backgroundColor: '#fff',
    justifyContent: 'center',
  },
  additDataCellValues: {
    height: 40,
    paddingLeft: 14,
    paddingRight: 20,
    // backgroundColor: '#fff',
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
  editChevron: { width: 26, height: 26 },
  subTitle: { alignItems: 'center', marginTop: 40, marginBottom: 16 },
  //   overflow: hidden;
  // text-overflow: ellipsis;
  // display: -webkit-box;
  // -webkit-line-clamp: 3;
  // -webkit-box-orient: vertical;
  wrapText: { overflow: 'hidden' },
});

export default UserPaymentSimpleData;
