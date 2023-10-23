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
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { getEditedPaymentsSettings } from 'src/redux/content/selectors';
import { setEditedPaymentsSettings, putNewPaymentsChain } from 'src/redux/content/operations';
import SimpleText from 'src/components/atoms/SimpleText';
import { useDispatch, useSelector } from 'react-redux';
import { putEditLedger } from 'src/redux/content/operations';
import { FormattedMessage } from 'react-intl';
import ConfirmActionComponent from 'src/components/molecules/ConfirmActionComponent';
import ConfirmActionComponentRadioList from 'src/components/molecules/ConfirmActionComponentRadioList';

const arrowLeft = require('src/images/header_left.png');

const EditPaymentsSettingsScreen = (props) => {
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');
  const { dataName, id, keyBoard, currentUser } = props.route.params;
  const paymentSettings = useSelector(getEditedPaymentsSettings);

  const handleEditLedger = async (value) => {
    getNewPaymentValue(id, dataName, value);
  };

  const handleChangeCurrentChains = async (value) => {
    const data = value.split(', ');
    const chainsArr = data.map((item) => parseInt(item));

    try {
      const putResult = await dispatch(
        putNewPaymentsChain({
          key: props.route.params.chainId,
          chainData: { methods: chainsArr, useBalancer: props.route.params.isUseBalancer },
        })
      ).unwrap();

      props.navigation.navigate('UserScreen', {
        id: props.route.params?.currentUser?.id,
        isRefresh: true,
      });

      setTimeout(() => {
        showMessage({
          message: `Current chains was edit successfully!`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'success',
        });
      }, 500);
    } catch (error) {
      setTimeout(() => {
        showMessage({
          message: `Attention! Current chains was not edit!`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 1000);
      console.warn('Error:', error);
    }
  };

  const getNewPaymentValue = async (id, dataName, value) => {
    if (dataName === 'currentChains') {
      handleChangeCurrentChains(value);

      return;
    }
    const data = paymentSettings.map((item) => {
      if (item.id === id) {
        switch (dataName) {
          case 'NetPriceMasterCard':
            let obj = { ...item.commissions.MasterCard, netPrice: value };
            return { ...item, ['commissions']: { ...item.commissions, MasterCard: obj } };

          case 'fixedNetPriceMasterCard':
            obj = { ...item.commissions.MasterCard, fixedNetPrice: value };
            return { ...item, ['commissions']: { ...item.commissions, MasterCard: obj } };

          case 'minCommissionMasterCard':
            obj = { ...item.commissions.MasterCard, minCommission: value };
            return { ...item, ['commissions']: { ...item.commissions, MasterCard: obj } };

          case 'NetPriceVisa':
            obj = { ...item.commissions.Visa, netPrice: value };
            return { ...item, ['commissions']: { ...item.commissions, Visa: obj } };

          case 'fixedNetPriceVisa':
            obj = { ...item.commissions.Visa, fixedNetPrice: value };
            return { ...item, ['commissions']: { ...item.commissions, Visa: obj } };

          case 'minCommissionVisa':
            obj = { ...item.commissions.Visa, minCommission: value };
            return { ...item, ['commissions']: { ...item.commissions, Visa: obj } };

          default:
            return { ...item, [dataName]: dataName === 'restrictedCountries' ? [value] : value };
        }
      }

      return item;
    });

    await dispatch(setEditedPaymentsSettings(data));
    props.navigation.navigate('UserScreen', { id: props.route.params?.currentUser?.id });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 20,
          justifyContent: 'flex-start',
          backgroundColor: '#fff',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            props.navigation.navigate(props.route.params.parentScreen, { id: currentUser.id })
          }
          style={{
            marginRight: 'auto',
            backgroundColor: '#fff',
          }}
        >
          <Image source={arrowLeft} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>

        {dataName === 'restrictedBrands' ? (
          <FormattedMessage id={`${props.route.params.name}`}>
            {(placeholder) => (
              <ConfirmActionComponentRadioList
                isEdit
                editPayments
                title={props.route.params.name}
                initialValue={props.route.params.value}
                action={handleEditLedger}
                placeholder={placeholder[0]}
              />
            )}
          </FormattedMessage>
        ) : (
          <FormattedMessage id={`${props.route.params.name}`}>
            {(placeholder) => (
              <ConfirmActionComponent
                isEdit
                editPayments
                title={props.route.params.name}
                initialValue={props.route.params.value}
                action={handleEditLedger}
                placeholder={placeholder[0]}
                keyBoard={keyBoard}
                dataName={dataName}
              />
            )}
          </FormattedMessage>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  innerWrapper: {
    marginTop: 56,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  title: { fontSize: 24, fontFamily: 'Mont_SB', marginBottom: 70 },
  input: {
    width: '100%',
    marginBottom: 40,
    fontFamily: 'Mont',
    fontSize: 16,
    color: '#262626',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
  },
  btn: {
    width: '100%',
    height: 42,
    backgroundColor: '#D6B747',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    letterSpacing: 0.48,
    color: '#fff',
    fontFamily: 'Mont_SB',
  },
});

export default EditPaymentsSettingsScreen;
