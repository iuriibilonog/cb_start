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
} from 'react-native';
import { getBanks, paymentsMethods } from 'src/redux/content/selectors';
import SimpleText from 'src/components/atoms/SimpleText';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentsMethods } from 'src/redux/content/operations';
import { FormattedMessage } from 'react-intl';
import ModalDropdown from 'react-native-modal-dropdown';
import ConfirmActionComponent from 'src/components/molecules/ConfirmActionComponent';

const arrowLeft = require('src/images/header_left.png');

const CreatePaymentsSettingsScreen = (props) => {
  const [isBanksDropdownOpen, setIsBanksDropdownOpen] = useState(false);
  const [isMethodsDropdownOpen, setIsMethodsDropdownOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState();
  const [selectedMethod, setSelectedMethod] = useState();
  const [methodsList, setMethodsList] = useState();

  const banksList = useSelector(getBanks);
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');
  const refMethods = useRef();

  useEffect(() => {
    setSelectedBank(banksList[0].name);
    preparePaymentsMethodsList(banksList[0].id);
  }, [banksList]);

  const preparePaymentsMethodsList = async (bankId) => {
    try {
      // {userId: 97, name: "aaatest"}
      const methodsListByBank = await dispatch(getPaymentsMethods(bankId));
      console.log('methodsListByBank', methodsListByBank.payload.items);
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
          onPress={() => props.navigation.navigate(props.route.params.parentScreen)}
          style={{
            marginRight: 'auto',
            backgroundColor: '#fff',
          }}
        >
          <Image source={arrowLeft} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
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
          </View>
        </View>
      </View>
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
  itemTitle: { marginBottom: 12 },
  itemTextTitle: { fontSize: 14 },
});

export default CreatePaymentsSettingsScreen;
