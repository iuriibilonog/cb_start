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
import { showMessage } from 'react-native-flash-message';
import SimpleText from 'src/components/atoms/SimpleText';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPaymentsMethods,
  postNewPaymentsSettings,
  putNewPaymentsChain,
} from 'src/redux/content/operations';
import { FormattedMessage } from 'react-intl';
// import ModalDropdown from 'react-native-modal-dropdown';
import ModalDropdown from 'src/components/molecules/ModalDropdown';
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

  const restrictedBrands = ['empty', 'Visa', 'MasterCard', 'Visa and MasterCard'];
  const [selectedRestrictedBrand, setSelectedRestrictedBrand] = useState(restrictedBrands[0]);
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const banksList = useSelector(getBanks);
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');
  const refMethods = useRef();
  const scrollRef = useRef();
  const currentChainId = props.route.params.chainId;
  const currentChainIDs = props.route.params.chainIDs;

  useEffect(() => {
    setSelectedBank(banksList[0].name);
    preparePaymentsMethodsList(banksList[0].id);
  }, [banksList]);

  const preparePaymentsMethodsList = async (bankId) => {
    try {
      const methodsListByBank = await dispatch(getPaymentsMethods(bankId)).unwrap();
      setMethodsList(methodsListByBank.items);
      setSelectedMethod(methodsListByBank.items[0].name);
      refMethods.current?.select(-1);
    } catch (error) {
      setTimeout(() => {
        showMessage({
          message: `Something went wrong! Payments methods were not loaded properly`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 1000);
      console.warn('Error:', error);
    }
  };

  const handleBankSelect = (value) => {
    preparePaymentsMethodsList(banksList.find((item) => item.name === value).id);
    setSelectedBank(value);
  };

  const handleSetInputsValues = (data) => {
    setErrors({});
    setInputsData((prev) => ({ ...prev, ...data }));
  };

  const prepareCommissionsMasterCard = (gatheredData) => {
    if (
      (gatheredData.mastercard_netPrice && gatheredData.mastercard_netPrice !== 0) ||
      (gatheredData.mastercard_fixedNetPrice && gatheredData.mastercard_fixedNetPrice !== 0) ||
      (gatheredData.mastercard_minCommission && gatheredData.mastercard_minCommission !== 0)
    ) {
      gatheredData['commissions'] = !gatheredData['commissions'] && {};
      gatheredData['commissions']['MasterCard'] = !gatheredData['commissions']['MasterCard'] && {};
    } else {
      delete gatheredData?.mastercard_netPrice;
      delete gatheredData?.mastercard_fixedNetPrice;
      delete gatheredData?.mastercard_minCommission;
      return gatheredData;
    }

    gatheredData['commissions']['MasterCard']['netPrice'] = gatheredData.mastercard_netPrice
      ? gatheredData.mastercard_netPrice
      : 0;

    gatheredData['commissions']['MasterCard']['fixedNetPrice'] =
      gatheredData.mastercard_fixedNetPrice ? gatheredData.mastercard_fixedNetPrice : 0;

    gatheredData['commissions']['MasterCard']['minCommission'] =
      gatheredData.mastercard_minCommission ? gatheredData.mastercard_minCommission : 0;

    delete gatheredData?.mastercard_netPrice;
    delete gatheredData?.mastercard_fixedNetPrice;
    delete gatheredData?.mastercard_minCommission;

    return gatheredData;
  };

  const prepareCommissionsVisa = (gatheredData) => {
    if (
      (gatheredData.visa_netPrice && gatheredData.visa_netPrice !== 0) ||
      (gatheredData.visa_fixedNetPrice && gatheredData.visa_fixedNetPrice !== 0) ||
      (gatheredData.visa_minCommission && gatheredData.visa_minCommission !== 0)
    ) {
      gatheredData['commissions'] = !gatheredData['commissions'] ? {} : gatheredData['commissions'];
      gatheredData['commissions']['Visa'] = !gatheredData['commissions']['Visa']
        ? {}
        : gatheredData['commissions']['Visa'];
    } else {
      delete gatheredData?.visa_netPrice;
      delete gatheredData?.visa_fixedNetPrice;
      delete gatheredData?.visa_minCommission;
      return gatheredData;
    }

    gatheredData['commissions']['Visa']['netPrice'] = gatheredData.visa_netPrice
      ? gatheredData.visa_netPrice
      : 0;

    gatheredData['commissions']['Visa']['fixedNetPrice'] = gatheredData.visa_fixedNetPrice
      ? gatheredData.visa_fixedNetPrice
      : 0;

    gatheredData['commissions']['Visa']['minCommission'] = gatheredData.visa_minCommission
      ? gatheredData.visa_minCommission
      : 0;

    delete gatheredData?.visa_netPrice;
    delete gatheredData?.visa_fixedNetPrice;
    delete gatheredData?.visa_minCommission;

    return gatheredData;
  };

  const checkErrors = () => {
    if (!inputsData.name) {
      setErrors({ name: 'required' });
      return true;
    }
  };
  const handleSubmit = async () => {
    if (checkErrors()) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
      return;
    }
    let gatheredData = { ...inputsData };
    gatheredData.restrictedBrands =
      selectedRestrictedBrand === 'empty' ? [] : [selectedRestrictedBrand];
    gatheredData.restrictedCountries = gatheredData.restrictedCountries
      ? gatheredData.restrictedCountries.split(',')
      : [];

    const paymentMethodId = methodsList.find((item) => item.name === selectedMethod).id;
    gatheredData.paymentMethodId = paymentMethodId;
    gatheredData = prepareCommissionsMasterCard(gatheredData);
    gatheredData = prepareCommissionsVisa(gatheredData);

    try {
      const postResult = await dispatch(postNewPaymentsSettings(gatheredData)).unwrap();
      if (postResult && postResult.id) {
        const putResult = await dispatch(
          putNewPaymentsChain({
            key: currentChainId,
            chainData: { methods: [...currentChainIDs, postResult.id] },
          })
        ).unwrap();
        props.navigation.navigate(props.route.params.parentScreen, { isRefresh: true });
      }
    } catch (error) {
      setTimeout(() => {
        showMessage({
          message: `Attention! New Payment Settings were not added properly!`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 1000);
      console.warn('Error:', error);
    }
  };

  const handleBrandSelect = (select) => {
    setSelectedRestrictedBrand(select);
  };

  const showRestrictedBrands = () => {
    return (
      <ModalDropdown
        // ref={refLedgersModal}
        options={restrictedBrands}
        defaultIndex={0}
        defaultValue={selectedRestrictedBrand}
        // isFullWidth
        animated={false}
        onSelect={(index, option) => {
          handleBrandSelect(option);
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
          marginTop: 14,
          paddingLeft: 11,
          paddingRight: 2,
          width: width - 40,
          backgroundColor: '#F4F4F4',
          borderWidth: 0,
          borderRadius: 2,
          height: restrictedBrands.length > 4 ? 152 : restrictedBrands.length * 40,
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
              isBrandsDropdownOpen
                ? require('src/images/arrow_up.png')
                : require('src/images/arrow_down.png')
            }
            style={{ width: 26, height: 26, marginLeft: 'auto' }}
          ></Image>
        )}
        renderRowProps={{ activeOpacity: 1 }}
        renderSeparator={() => <></>}
        onDropdownWillShow={() => setIsBrandsDropdownOpen(true)}
        onDropdownWillHide={() => setIsBrandsDropdownOpen(false)}
      />
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        // Keyboard.dismiss();
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
            onPress={() =>
              props.navigation.navigate(props.route.params.parentScreen, {
                id: props.route.params?.user?.id,
              })
            }
            style={{
              marginRight: 'auto',
              backgroundColor: '#fff',
            }}
          >
            <Image source={arrowLeft} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
        <ScrollView ref={scrollRef}>
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
                        marginTop: 14,
                        paddingLeft: 11,
                        paddingRight: 2,
                        width: width - 40,
                        backgroundColor: '#F4F4F4',
                        borderWidth: 0,
                        borderRadius: 2,
                        height: banksList.length > 4 ? 152 : banksList.length * 40,
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
                        marginTop: 14,
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
                <View
                  style={{
                    pointerEvents: isMethodsDropdownOpen || isBanksDropdownOpen ? 'none' : 'auto',
                    opacity: isMethodsDropdownOpen || isBanksDropdownOpen ? 0.5 : 1,
                  }}
                >
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
                      <SimpleText style={{ ...styles.boldText, marginBottom: 12 }}>
                        {methodsList &&
                          selectedMethod &&
                          methodsList.find((i) => i.name === selectedMethod)?.mode}
                      </SimpleText>
                      <SimpleText style={styles.boldText}>
                        {methodsList &&
                          selectedMethod &&
                          methodsList.find((i) => i.name === selectedMethod)?.type}
                      </SimpleText>
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
                          style={{
                            ...styles.textInput,
                            width: width - 40,
                            borderWidth: 1,
                            borderColor:
                              errors.name && errors.name === 'required' ? '#FC7270' : '#F4F4F4',
                          }}
                          value={inputsData.settingsName}
                          onChangeText={(text) => {
                            if (errors.name) {
                              setErrors({});
                            }
                            setInputsData((prev) => ({ ...prev, name: text }));
                          }}
                          placeholder={placeholder[0]}
                        />
                      )}
                    </FormattedMessage>
                    {errors.name && errors.name === 'required' && (
                      <SimpleText
                        style={{
                          position: 'absolute',
                          top: 68,
                          left: 0,
                          color: '#FC7270',
                          marginTop: 5,
                          fontSize: 12,
                          letterSpacing: 1,
                        }}
                      >
                        <FormattedMessage id={'errors.required_field'} />
                      </SimpleText>
                    )}
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
                      <View style={styles.itemTitle}>
                        <SimpleText style={styles.itemTextTitle}>
                          <FormattedMessage id={'users.restricted_brands'} /> :
                        </SimpleText>
                      </View>
                      {selectedRestrictedBrand && showRestrictedBrands()}
                      {/* <DecrementIncrement
                        title={'users.restricted_brands'}
                        name={'restrictedBrands'}
                        setDigitsValues={handleSetInputsValues}
                      /> */}
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
                            value={inputsData.restrictedCountries}
                            onChangeText={(text) => {
                              setInputsData((prev) => ({ ...prev, restrictedCountries: text }));
                            }}
                            placeholder={placeholder[0]}
                          />
                        )}
                      </FormattedMessage>
                    </View>
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
                        title={'users.min_commission'}
                        name={'mastercard_minCommission'}
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
                        title={'users.min_commission'}
                        name={'visa_minCommission'}
                        setDigitsValues={handleSetInputsValues}
                      />
                    </View>
                  </View>
                </View>
                {/*  */}
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
  digitBlockWrapper: { marginTop: 14 },
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
