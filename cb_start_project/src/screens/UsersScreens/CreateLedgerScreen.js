import React, { useState, useEffect } from 'react';
import { showMessage } from 'react-native-flash-message';
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

import { postPaymethodChain, postNewLedger } from 'src/redux/content/operations';

import SimpleText from 'src/components/atoms/SimpleText';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// import ModalDropdown from 'react-native-modal-dropdown';
import ModalDropdown from 'src/components/molecules/ModalDropdown';
import { checkValidation } from 'src/utils/errorsValidation';

const arrowLeft = require('src/images/header_left.png');

const AddLedgerScreen = (props) => {
  const [value, setValue] = useState(props.route.params.name);
  const [isEmptyValue, setIsEmptyValue] = useState(false);
  const [currency, setCurrency] = useState(['EUR', 'USD', 'RUB', 'KZT', 'INR', 'BRL']);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (value) {
      setIsEmptyValue(false);
    }
  }, [value]);
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');

  const handleSubmitLedger = async (data) => {
    const validationParams = ['value', 'selectedCurrency'];
    const validationAnswer = checkValidation({ value, selectedCurrency }, validationParams);

    if (Object.keys(validationAnswer).length > 0) {
      setErrors(validationAnswer);
      return;
    }

    if (!value) {
      setIsEmptyValue(true);
      return;
    }
    try {
      const paymentChainResponse = await dispatch(postPaymethodChain({ name: value })).unwrap();
      await dispatch(
        postNewLedger({
          currency: currency[selectedCurrency],
          amount: 0,
          payinAmount: 0,
          payoutAmount: 0,
          netPrice: 0,
          lockedAmount: 0,
          name: value,
          apiKeyId: props.route.params.selectedApiKeyId,
          payMethodChainsId: paymentChainResponse.id,
        })
      );
      props.navigation.navigate(props.route.params.parentScreen, { isRefresh: true });
    } catch (error) {
      setTimeout(() => {
        showMessage({
          message: `Something went wrong! Create New Ledger failed`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 1000);
      console.warn('Error:', error);
    }
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
        {/* </View> */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: 25,
            paddingVertical: 20,
            justifyContent: 'flex-start',
            backgroundColor: '#fff',
          }}
        >
          <View style={styles.innerWrapper}>
            <SimpleText style={styles.title}>
              <FormattedMessage id={'users.add_new_ledger'} />
            </SimpleText>
            <View style={{ width: '100%' }}>
              <FormattedMessage id={'users.ledger_name'}>
                {(placeholder) => (
                  <TextInput
                    style={{
                      ...styles.input,
                      borderBottomColor: isEmptyValue ? '#FC7270' : 'rgba(0, 0, 0, 0.20)',
                    }}
                    placeholder={placeholder[0]}
                    value={value}
                    onChangeText={(text) => {
                      if (errors['value']) {
                        setErrors((prev) => {
                          delete prev['value'];
                          return prev;
                        });
                      }
                      setValue(text);
                    }}
                  />
                )}
              </FormattedMessage>
              {errors['value'] && (
                <SimpleText style={styles.error}>
                  <FormattedMessage id={`errors.${errors['value']}`} />
                </SimpleText>
              )}
            </View>
            <View style={{ width: '100%' }}>
              {currency.length > 0 && (
                <FormattedMessage id={'common.currency'}>
                  {(msg) => {
                    return (
                      <ModalDropdown
                        options={currency}
                        defaultIndex={1}
                        defaultValue={
                          [0, 1, 2, 3, 4, 5].includes(selectedCurrency)
                            ? currency[selectedCurrency]
                            : msg[0]
                        }
                        isFullWidth
                        animated={false}
                        onSelect={setSelectedCurrency}
                        textStyle={{
                          fontSize: 16,
                          lineHeight: 16,
                          fontFamily: 'Mont',
                          color: [0, 1, 2, 3, 4, 5].includes(selectedCurrency)
                            ? '#262626'
                            : 'rgba(38, 38, 38, 0.30)',
                        }}
                        style={{
                          // backgroundColor: '#F4F4F4',
                          paddingHorizontal: 10,
                          paddingBottom: 5,
                          justifyContent: 'space-between',
                          borderColor: 'rgba(0, 0, 0, 0.20)',
                          borderBottomWidth: 1,

                          width: '100%',
                        }}
                        dropdownStyle={{
                          marginLeft: -10,
                          marginTop: 12,
                          paddingLeft: 5,
                          paddingRight: 2,
                          width: width - 90,
                          height: currency.length > 4 ? 152 : currency.length * 40,
                          borderWidth: 1,
                          borderColor: 'rgba(0, 0, 0, 0.20)',
                          borderRadius: 2,
                        }}
                        dropdownTextStyle={{
                          fontSize: 16,
                          lineHeight: 16,
                          fontWeight: '600',
                          fontFamily: 'Mont',
                          // backgroundColor: '#F4F4F4',
                          color: 'rgba(38, 38, 38, 0.50)',
                        }}
                        renderRightComponent={() => (
                          <Image
                            source={
                              isDropdownOpen
                                ? require('src/images/arrow_up.png')
                                : [0, 1, 2, 3, 4, 5].includes(selectedCurrency)
                                ? require('src/images/arrow_down.png')
                                : require('src/images/arrow_down_inactive.png')
                            }
                            style={{ width: 26, height: 26, marginLeft: 'auto' }}
                          />
                        )}
                        renderRowProps={{ activeOpacity: 1 }}
                        renderSeparator={() => <></>}
                        onDropdownWillShow={() => {
                          if (errors['selectedCurrency']) {
                            setErrors((prev) => {
                              delete prev['selectedCurrency'];
                              return prev;
                            });
                          }

                          setIsDropdownOpen(true);
                        }}
                        onDropdownWillHide={() => setIsDropdownOpen(false)}
                      />
                    );
                  }}
                </FormattedMessage>
              )}
              {errors['selectedCurrency'] && (
                <SimpleText style={styles.error}>
                  <FormattedMessage id={`errors.${errors['selectedCurrency']}`} />
                </SimpleText>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{ width: '100%' }}
              onPress={handleSubmitLedger}
            >
              <View
                style={{
                  ...styles.btn,
                  backgroundColor: '#0BA39A',
                }}
              >
                <SimpleText style={{ ...styles.btnText, color: '#fff' }}>
                  <FormattedMessage id={'common.create'} />
                </SimpleText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  innerWrapper: {
    marginTop: 56,
    alignItems: 'center',
  },
  title: { fontSize: 24, fontFamily: 'Mont_SB', marginBottom: 70 },
  input: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
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
    marginTop: 40,
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
  error: {
    position: 'absolute',
    top: 38,
    left: 0,
    color: 'red',
    marginTop: 5,
    fontSize: 12,
    letterSpacing: 1,
  },
});

export default AddLedgerScreen;
