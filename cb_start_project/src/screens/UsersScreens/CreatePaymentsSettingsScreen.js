import React, { useState, useEffect, useRef } from 'react';
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
  ScrollViewBase,
} from 'react-native';
import { getBanks, paymentsMethods } from 'src/redux/content/selectors';
import SimpleText from 'src/components/atoms/SimpleText';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentsMethods } from 'src/redux/content/operations';
import { FormattedMessage } from 'react-intl';
import ModalDropdown from 'react-native-modal-dropdown';
import ConfirmActionComponent from 'src/components/molecules/ConfirmActionComponent';
import DecrementIncrement from 'src/components/atoms/DecrementIncrement';
import SimpleButton from '../../components/atoms/SimpleButton';

const arrowLeft = require('src/images/header_left.png');

const CreatePaymentsSettingsScreen = (props) => {
  const [isBanksDropdownOpen, setIsBanksDropdownOpen] = useState(false);
  const [isMethodsDropdownOpen, setIsMethodsDropdownOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState();
  const [selectedMethod, setSelectedMethod] = useState();
  const [methodsList, setMethodsList] = useState();
  const [inputsData, setInputsData] = useState({});

  const banksList = useSelector(getBanks);
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');
  const refMethods = useRef();

  useEffect(() => {
    setSelectedBank(banksList[0].name);
    preparePaymentsMethodsList(banksList[0].id);
  }, [banksList]);

  // useEffect(() => {
  //   console.log('<<inputsData>>', inputsData);
  // }, [inputsData]);

  const preparePaymentsMethodsList = async (bankId) => {
    try {
      // {userId: 97, name: "aaatest"}
      const methodsListByBank = await dispatch(getPaymentsMethods(bankId));
      // console.log('methodsListByBank', methodsListByBank.payload.items);
      setMethodsList(methodsListByBank.payload.items);
      setSelectedMethod(methodsListByBank.payload.items[0].name);
      refMethods.current?.select(-1);
    } catch (err) {
      console.log('CreatePaymentSettingsScreen -err', err);
    }
  };

  const handleBankSelect = (value) => {
    preparePaymentsMethodsList(banksList.find((item) => item.name === value).id);
    setSelectedBank(value);
  };

  const handleSetInputsValues = (data) => {
    setInputsData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = () => {
    console.log('SUBMIT:', inputsData);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <>
        <View
          style={{
            // flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20,
            justifyContent: 'flex-start',
            backgroundColor: '#fff',
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate(props.route.params.parentScreen)}
            style={{
              marginRight: 'auto',
              backgroundColor: '#fff',
            }}
          >
            <Image source={arrowLeft} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              paddingBottom: 60,
              justifyContent: 'flex-start',
              backgroundColor: '#fff',
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                backgroundColor: '#fff',
              }}
            >
              <View style={styles.innerWrapper}>
                <SimpleText style={styles.title}>
                  <FormattedMessage id={'users.add_new_payments_settings'} />
                </SimpleText>
                <View style={styles.itemWrapper}>
                  <View style={styles.itemTitle}>
                    <SimpleText style={styles.itemTextTitle}>
                      <FormattedMessage id={'dashboard.banks'} />
                    </SimpleText>
                  </View>
                  {banksList && selectedBank && (
                    <ModalDropdown
                      // ref={refLedgersModal}
                      options={banksList.map((item) => item.name)}
                      defaultIndex={0}
                      defaultValue={selectedBank}
                      // isFullWidth
                      animated={false}
                      onSelect={(index, option) => {
                        // console.log(index, '<>', option);
                        handleBankSelect(option);
                      }}
                      textStyle={{
                        fontSize: 16,
                        fontFamily: 'Mont',
                        fontWeight: '600',
                        lineHeight: 16,
                      }}
                      style={{
                        backgroundColor: '#F4F4F4',
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        borderRadius: 2,
                        justifyContent: 'space-between',
                        // height:40,
                        width: width - 40,
                      }}
                      dropdownStyle={{
                        marginLeft: -16,
                        marginTop: Platform.OS === 'ios' ? 14 : -14,
                        paddingLeft: 11,
                        paddingRight: 2,
                        width: width - 40,
                        backgroundColor: '#F4F4F4',
                        borderWidth: 0,
                        borderRadius: 2,
                        height: 220,
                      }}
                      dropdownTextStyle={{
                        fontSize: 16,
                        lineHeight: 16,
                        fontWeight: '600',
                        fontFamily: 'Mont',
                        backgroundColor: '#F4F4F4',
                        color: 'rgba(38, 38, 38, 0.50)',
                      }}
                      renderRightComponent={() => (
                        <Image
                          source={
                            isBanksDropdownOpen
                              ? require('src/images/arrow_up.png')
                              : require('src/images/arrow_down.png')
                          }
                          style={{ width: 26, height: 26, marginLeft: 'auto' }}
                        ></Image>
                      )}
                      renderRowProps={{ activeOpacity: 1 }}
                      renderSeparator={() => <></>}
                      onDropdownWillShow={() => setIsBanksDropdownOpen(true)}
                      onDropdownWillHide={() => setIsBanksDropdownOpen(false)}
                    />
                  )}
                </View>
                <View style={styles.itemWrapper}>
                  <View style={styles.itemTitle}>
                    <SimpleText style={styles.itemTextTitle}>
                      <FormattedMessage id={'users.payment_method'} />
                    </SimpleText>
                  </View>
                  {methodsList && selectedMethod && (
                    <ModalDropdown
                      ref={refMethods}
                      options={methodsList.map((item) => item.name)}
                      defaultIndex={0}
                      defaultValue={selectedMethod}
                      // isFullWidth
                      animated={false}
                      onSelect={(index, option) => {
                        // console.log(index, '<>', option);
                        setSelectedMethod(option);
                      }}
                      textStyle={{
                        fontSize: 16,
                        fontFamily: 'Mont',
                        fontWeight: '600',
                        lineHeight: 16,
                      }}
                      style={{
                        backgroundColor: '#F4F4F4',
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        borderRadius: 2,
                        justifyContent: 'space-between',

                        width: width - 40,
                      }}
                      dropdownStyle={{
                        marginLeft: -16,
                        marginTop: Platform.OS === 'ios' ? 14 : -14,
                        paddingLeft: 11,
                        paddingRight: 2,
                        width: width - 40,
                        backgroundColor: '#F4F4F4',
                        borderWidth: 0,
                        borderRadius: 2,
                        height: methodsList.length > 6 ? 220 : methodsList.length * 40,
                      }}
                      dropdownTextStyle={{
                        fontSize: 16,
                        lineHeight: 16,
                        fontWeight: '600',
                        fontFamily: 'Mont',
                        backgroundColor: '#F4F4F4',
                        color: 'rgba(38, 38, 38, 0.50)',
                      }}
                      renderRightComponent={() => (
                        <Image
                          source={
                            isMethodsDropdownOpen
                              ? require('src/images/arrow_up.png')
                              : require('src/images/arrow_down.png')
                          }
                          style={{ width: 26, height: 26, marginLeft: 'auto' }}
                        ></Image>
                      )}
                      renderRowProps={{ activeOpacity: 1 }}
                      renderSeparator={() => <></>}
                      onDropdownWillShow={() => setIsMethodsDropdownOpen(true)}
                      onDropdownWillHide={() => setIsMethodsDropdownOpen(false)}
                    />
                  )}
                </View>
                <View style={{ ...styles.itemWrapper, flexDirection: 'row' }}>
                  <View style={{ width: 65 }}>
                    <SimpleText style={{ ...styles.boldText, marginBottom: 12 }}>
                      <FormattedMessage id={'transactions.mode'} />:
                    </SimpleText>
                    <SimpleText style={styles.boldText}>
                      <FormattedMessage id={'common.type'} />:
                    </SimpleText>
                  </View>
                  <View>
                    <SimpleText style={{ ...styles.boldText, marginBottom: 12 }}>payin</SimpleText>
                    <SimpleText style={styles.boldText}>card</SimpleText>
                  </View>
                </View>
                <View style={styles.itemWrapper}>
                  <View style={styles.itemTitle}>
                    <SimpleText style={styles.itemTextTitle}>
                      <FormattedMessage id={'users.setting_name'} />
                    </SimpleText>
                  </View>
                  <FormattedMessage id={'users.setting_name'}>
                    {(placeholder) => (
                      <TextInput
                        style={{ ...styles.textInput, width: width - 40 }}
                        value={inputsData.settingsName}
                        onChangeText={(text) => {
                          setInputsData((prev) => ({ ...prev, settingsName: text }));
                        }}
                        placeholder={placeholder[0]}
                      />
                    )}
                  </FormattedMessage>
                </View>
                <View style={styles.digitBlockWrapper}>
                  <View style={styles.digitItemWrapper}>
                    <DecrementIncrement
                      title={'users.net_price'}
                      name={'netPrice'}
                      setDigitsValues={handleSetInputsValues}
                    />
                  </View>
                  <View style={styles.digitItemWrapper}>
                    <DecrementIncrement
                      title={'users.fixed_net_price'}
                      name={'fixedNetPrice'}
                      setDigitsValues={handleSetInputsValues}
                    />
                  </View>
                  <View style={styles.digitItemWrapper}>
                    <DecrementIncrement
                      title={'users.min_commission'}
                      name={'minCommission'}
                      setDigitsValues={handleSetInputsValues}
                    />
                  </View>
                  <View style={styles.digitItemWrapper}>
                    <DecrementIncrement
                      title={'users.limit'}
                      name={'limit'}
                      setDigitsValues={handleSetInputsValues}
                    />
                  </View>
                  <View style={styles.digitItemWrapper}>
                    <DecrementIncrement
                      title={'users.min_amount'}
                      name={'minAmount'}
                      setDigitsValues={handleSetInputsValues}
                    />
                  </View>
                  <View style={styles.digitItemWrapper}>
                    <DecrementIncrement
                      title={'users.max_amount'}
                      name={'maxAmount'}
                      setDigitsValues={handleSetInputsValues}
                    />
                  </View>
                  <View style={styles.digitItemWrapper}>
                    <DecrementIncrement
                      title={'users.rate_commission'}
                      name={'rateCommission'}
                      setDigitsValues={handleSetInputsValues}
                    />
                  </View>
                  <View style={styles.digitItemWrapper}>
                    <DecrementIncrement
                      title={'users.restricted_brands'}
                      name={'restrictedBrands'}
                      setDigitsValues={handleSetInputsValues}
                    />
                  </View>
                </View>
                <View style={{ marginBottom: 60 }}>
                  <View style={styles.itemTitle}>
                    <SimpleText style={styles.itemTextTitle}>
                      <FormattedMessage id={'users.restricted_countries'} />
                    </SimpleText>
                  </View>
                  <FormattedMessage id={'users.restricted_countries'}>
                    {(placeholder) => (
                      <TextInput
                        style={{ ...styles.textInput, width: width - 40 }}
                        value={inputsData.restrtictedCountries}
                        onChangeText={(text) => {
                          setInputsData((prev) => ({ ...prev, restrtictedCountries: text }));
                        }}
                        placeholder={placeholder[0]}
                      />
                    )}
                  </FormattedMessage>
                </View>
                <View style={{ marginBottom: 60 }}>
                  <SimpleText style={{ fontSize: 24, marginBottom: 40, lineHeight: 30 }}>
                    <FormattedMessage id={'users.addit_setting_mastercard'} />
                  </SimpleText>
                  <View style={styles.digitItemWrapper}>
                    <DecrementIncrement
                      title={'users.net_price'}
                      name={'mastercard_netPrice'}
                      setDigitsValues={handleSetInputsValues}
                    />
                  </View>
                  <View style={styles.digitItemWrapper}>
                    <DecrementIncrement
                      title={'users.fixed_net_price'}
                      name={'mastercard_fixedNetPrice'}
                      setDigitsValues={handleSetInputsValues}
                    />
                  </View>
                  <View style={{ ...styles.digitItemWrapper, marginBottom: 0 }}>
                    <DecrementIncrement
                      title={'users.max_amount'}
                      name={'mastercard_maxAmount'}
                      setDigitsValues={handleSetInputsValues}
                    />
                  </View>
                </View>
                <View style={{ marginBottom: 50 }}>
                  <SimpleText style={{ fontSize: 24, marginBottom: 40, lineHeight: 30 }}>
                    <FormattedMessage id={'users.addit_setting_visa'} />
                  </SimpleText>
                  <View style={styles.digitItemWrapper}>
                    <DecrementIncrement
                      title={'users.net_price'}
                      name={'visa_netPrice'}
                      setDigitsValues={handleSetInputsValues}
                    />
                  </View>
                  <View style={styles.digitItemWrapper}>
                    <DecrementIncrement
                      title={'users.fixed_net_price'}
                      name={'visa_fixedNetPrice'}
                      setDigitsValues={handleSetInputsValues}
                    />
                  </View>
                  <View style={{ ...styles.digitItemWrapper, marginBottom: 0 }}>
                    <DecrementIncrement
                      title={'users.max_amount'}
                      name={'visa_maxAmount'}
                      setDigitsValues={handleSetInputsValues}
                    />
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={handleSubmit}>
              <SimpleButton
                text={'common.create'}
                style={{ width: width - 90, marginHorizontal: 25 }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  innerWrapper: {
    marginTop: 30,
    // paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 34,
    fontFamily: 'Mont_SB',
    marginBottom: 40,
    lineHeight: 45,
    // textAlign: 'center',
  },
  itemWrapper: { marginBottom: 36 },
  digitItemWrapper: { marginBottom: 32 },
  digitBlockWrapper: { marginTop: 14, marginBottom: 32 },
  itemTitle: { marginBottom: 12 },
  itemTextTitle: { fontSize: 14 },
  boldText: { letterSpacing: 0.8, fontFamily: 'Mont_SB' },
  textInput: {
    backgroundColor: '#F4F4F4',
    paddingVertical: 11,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Mont',
  },
});

export default CreatePaymentsSettingsScreen;
