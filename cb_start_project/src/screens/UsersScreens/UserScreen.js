import React, { useState, useEffect, useRef, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import {
  getMerchantsApiKeys,
  getLedgersData,
  getLedgersByApiKeyID,
  cleanUserLedgers,
  getUserPayments,
  setEditedPaymentsSettings,
  confirmUserPaymentData,
  getAllUsers,
  putNewPaymentsChain,
} from 'src/redux/content/operations';
import {
  getApiKeys,
  ledgersData,
  ledgersByApiKeyID,
  userPayments,
  getEditedPaymentsSettings,
} from 'src/redux/content/selectors';

import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import MainLoader from 'src/components/molecules/MainLoader';
import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import Pagination from 'src/components/molecules/Pagination';
import { useNavigation } from '@react-navigation/native';
// import ModalDropdown from 'react-native-modal-dropdown';
import ModalDropdown from 'src/components/molecules/ModalDropdown';
import IconButton from 'src/components/atoms/IconButton';
import SimpleCheckBox from 'src/components/atoms/SimpleCheckBox';
import SimpleButton from 'src/components/atoms/SimpleButton';
import UserPaymentSimpleData from 'src/components/molecules/UserPaymentSimpleData';

const deleteIcon = require('src/images/delete.png');
const deleteInactiveIcon = require('src/images/delete_inactive.png');
const arrowDown = require('src/images/arrow_down.png');
const arrowUp = require('src/images/arrow_up.png');
const editIcon = require('src/images/edit.png');
const editInactiveIcon = require('src/images/edit_inactive.png');

const UserScreen = (props) => {
  const dispatch = useDispatch();

  const allPaymentData = useSelector(getEditedPaymentsSettings);

  const [allUsers, setAllUsers] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [apiKeysData, setApiKeysData] = useState(null);
  const [isAdditDataOpen, setIsAdditDataOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [initialBalance, setInitialBalance] = useState('');
  const [initialLedger, setInitialLedger] = useState('');
  const [selectedBalance, setSelectedBalance] = useState('0');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPersonalOpen, setIsPersonalOpen] = useState(false);
  const [isUseBalancer, setIsUseBalancer] = useState(false);
  const [ledgersByApiDataNames, setLedgersByApiDataNames] = useState([]);
  const [ledgersByApiData, setLedgersByApiData] = useState([]);
  const [selectedLedger, setSelectedLedger] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [paymentsData, setPaymentsData] = useState([]);

  const [chainIdOfCurrentLedger, setChainIdOfCurrentLedger] = useState([]);

  const [balancesNames, setBalancesNames] = useState([]);
  const [balances, setBalances] = useState([]);

  const { width } = Dimensions.get('window');

  const navigation = useNavigation();

  const refBalanceModal = useRef();
  const refLedgersModal = useRef();

  useEffect(() => {
    handleCleanUserLedgers();
    getApiData();
    getBalanceData();
  }, []);

  const getApiData = async () => {
    try {
      const merchApiData = await dispatch(getMerchantsApiKeys(props.route.params.id)).unwrap();

      if (merchApiData?.items?.length > 0) {
        setApiKeysData(merchApiData.items);
      }
    } catch (error) {
      setIsLoading(false);
      setTimeout(() => {
        showMessage({
          message: `Something went wrong! getMerchantsApiKeys failed`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 1000);
      console.warn('Error:', error);
    }
  };

  const getBalanceData = async () => {
    try {
      const balanceData = await dispatch(getLedgersData(props.route.params.id)).unwrap();

      if (balanceData?.items?.length > 0) {
        const data = balanceData.items.map((item) => item.name);
        setBalances(balanceData.items);
        setBalancesNames(data);
        setInitialBalance(data[0]);
        refBalanceModal.current?.select(-1);
      } else {
        setBalances([]);
        setInitialBalance('');
        refBalanceModal.current?.select(-1);
      }
    } catch (error) {
      setIsLoading(false);
      setTimeout(() => {
        showMessage({
          message: `Something went wrong! getLedgersData(Balance) failed`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 1000);
      console.warn('Error:', error);
    }
  };

  const getLedgersByApiData = async (keyId) => {
    setIsLoading(true);
    try {
      const byApiKey = await dispatch(
        getLedgersByApiKeyID(keyId ? keyId : props.route.params.id)
      ).unwrap();

      if (byApiKey?.items?.length > 0) {
        const data = byApiKey.items.map((item) => item.name);

        setChainIdOfCurrentLedger(byApiKey.items[0].payMethodChainsId);
        setLedgersByApiData(byApiKey.items);
        setLedgersByApiDataNames(data);
        setInitialLedger(data[0]);

        getPaymentsData(byApiKey.items[0].payMethodChainsId);
        refLedgersModal.current?.select(-1);
      } else {
        setLedgersByApiData([]);
        setLedgersByApiDataNames([]);
        setInitialLedger('');
        setPaymentsData([]);
        setIsUseBalancer(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setTimeout(() => {
        showMessage({
          message: `Something went wrong! getLedgersByApiKeyID failed`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 1000);
      console.warn('Error:', error);
    }
  };

  const getBrands = (data) => {
    if (Array.isArray(data) && data.includes('Visa') && data.includes('MasterCard'))
      data = 'Visa and MasterCard';

    switch (data) {
      case 'Empty':
        return [];
      case []:
        return [];
      case 'Visa and MasterCard':
        return ['Visa', 'MasterCard'];

      default:
        return Array.isArray(data) ? data : [data];
    }
  };

  const confirmEditPayment = async (id) => {
    setIsLoading(true);
    const currentPaymentData = allPaymentData.filter((item) => item.id === id)[0];
    const paymentData = {
      name: currentPaymentData.name,
      netPrice: +currentPaymentData.netPrice,
      fixedNetPrice: +currentPaymentData.fixedNetPrice,
      minCommission: +currentPaymentData.minCommission,
      limit: +currentPaymentData.limit,
      minAmount: +currentPaymentData.minAmount,
      maxAmount: +currentPaymentData.maxAmount,
      restrictedCountries: currentPaymentData.restrictedCountries,
      active: currentPaymentData.active,
      chance: +currentPaymentData.chance,
      rateCommission: currentPaymentData.rateCommission,
      restrictedBrands: getBrands(currentPaymentData.restrictedBrands),
      useWhitelist: currentPaymentData.useWhitelist,
      minConfirmations: currentPaymentData.minConfirmations,
    };

    const commissionsData = {};
    const netPriceMaster = currentPaymentData.commissions?.MasterCard?.netPrice || 0;
    const fixedNetPriceMaster = currentPaymentData.commissions?.MasterCard?.fixedNetPrice || 0;
    const minCommissionMaster = currentPaymentData.commissions?.MasterCard?.minCommission || 0;
    const netPriceVisa = currentPaymentData.commissions?.Visa?.netPrice || 0;
    const fixedNetPriceVisa = currentPaymentData.commissions?.Visa?.fixedNetPrice || 0;
    const minCommissionVisa = currentPaymentData.commissions?.Visa?.minCommission || 0;

    if (netPriceMaster > 0 || fixedNetPriceMaster > 0 || minCommissionMaster > 0) {
      commissionsData.MasterCard = {
        netPrice: netPriceMaster ? +netPriceMaster : 0,
        fixedNetPrice: fixedNetPriceMaster ? +fixedNetPriceMaster : 0,
        minCommission: minCommissionMaster ? +minCommissionMaster : 0,
      };
    }
    if (netPriceVisa > 0 || fixedNetPriceVisa > 0 || minCommissionVisa > 0) {
      commissionsData.Visa = {
        netPrice: netPriceVisa ? +netPriceVisa : 0,
        fixedNetPrice: fixedNetPriceVisa ? +fixedNetPriceVisa : 0,
        minCommission: minCommissionVisa ? +minCommissionVisa : 0,
      };
    }

    if (Object.keys(commissionsData).length !== 0) {
      paymentData.commissions = commissionsData;
    } else {
      paymentData.commissions = {};
    }

    try {
      const confirm = await dispatch(confirmUserPaymentData({ paymentData, id })).unwrap();
      const update = await dispatch(getUserPayments(chainIdOfCurrentLedger)).unwrap();
      await dispatch(
        setEditedPaymentsSettings(
          Array.isArray(update.paymentMethodSettings)
            ? update.paymentMethodSettings
            : [update.paymentMethodSettings]
        )
      );
      setPaymentsData(
        Array.isArray(update.paymentMethodSettings)
          ? update.paymentMethodSettings
          : [update.paymentMethodSettings]
      );

      setIsLoading(false);
      setTimeout(() => {
        showMessage({
          message: `Edit settings successfully`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'success',
        });
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      setTimeout(() => {
        showMessage({
          message: `Something went wrong! Settings does't edit`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 1000);
      console.warn('Error:', error);
    }
  };

  const handleCleanUserLedgers = async () => {
    // setIsLoading(true);
    try {
      const clean = await dispatch(cleanUserLedgers()).unwrap();
      setLedgersByApiData([]);
      // setIsLoading(false);
    } catch (error) {
      // setIsLoading(false);
      setTimeout(() => {
        showMessage({
          message: `Ooops, something went wrong!`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 1000);
      console.warn('Error:', error);
    }
  };

  useEffect(() => {
    if (props.route.params?.isRefresh) {
      setPaymentsData([]);
      getLedgersByApiData(selectedIndex || apiKeysData[0].id);
    }
  }, [props.route.params, currentUser]);

  useEffect(() => {
    dispatch(getAllUsers()).then((res) => {
      setAllUsers(res.payload.items);
      if (props.route.params.id) {
        setCurrentUser(res.payload.items.find((item) => item.id === +props.route.params.id));
      }
    });
  }, [props.route.params?.id, props.route.params?.isNewUserCreated]);

  const getPaymentsData = async (chainIdOfCurrentLedger) => {
    try {
      const payments = await dispatch(getUserPayments(chainIdOfCurrentLedger)).unwrap();
      setIsUseBalancer(payments.useBalancer);
      const edited = await dispatch(
        setEditedPaymentsSettings(
          Array.isArray(payments.paymentMethodSettings)
            ? payments.paymentMethodSettings
            : [payments.paymentMethodSettings]
        )
      ).unwrap();
      setPaymentsData(
        Array.isArray(payments.paymentMethodSettings)
          ? payments.paymentMethodSettings
          : [payments.paymentMethodSettings]
      );
      // setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setTimeout(() => {
        showMessage({
          message: `Ooops, something went wrong!`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 1000);
      console.warn('Error:', error);
    }
  };

  useEffect(() => {
    if (selectedLedger !== '') {
      setInitialLedger(ledgersByApiData[selectedLedger].name);
      setChainIdOfCurrentLedger(ledgersByApiData[selectedLedger].payMethodChainsId);
    }
  }, [selectedLedger]);

  //************************************************************************* */

  const handleExpandRow = async (itemId) => {
    if (!isAdditDataOpen) {
      // setIsLoading(true);
      setSelectedIndex(itemId);

      try {
        // const data = await dispatch(getLedgersByApiKeyID(itemId)).unwrap();
        getLedgersByApiData(itemId);
        // setIsLoading(false);
      } catch (error) {
        // setIsLoading(false);
        setTimeout(() => {
          showMessage({
            message: `Ooops, something went wrong!`,
            titleStyle: {
              textAlign: 'center',
            },
            type: 'danger',
          });
        }, 1000);
        console.warn('Error:', error);
      }
    } else {
      setSelectedIndex('');
      setLedgersByApiData([]);
    }
    setIsAdditDataOpen((prev) => !prev);
  };

  const handleApiEdit = ({ id, name }) => {
    //done
    navigation.navigate('EditScreen', { id, name, parentScreen: 'UserScreen' });
  };

  const handleApiDelete = ({ id, name }) => {
    //done
    navigation.navigate('DeleteScreen', { id, name, parentScreen: 'UserScreen' });
  };

  const handleUserEdit = () => {
    //done
    navigation.navigate('EditUserScreen', { user: currentUser, parentScreen: 'UserScreen' });
  };

  const handleUserDelete = () => {
    navigation.navigate('DeleteUserScreen', { user: currentUser, parentScreen: 'UserScreen' });
  };

  const handlePaymentsCreate = () => {
    const paymentsChainIDs = paymentsData.map((item) => item.id);
    navigation.navigate('CreatePaymentsSettingsScreen', {
      user: currentUser,
      chainId: chainIdOfCurrentLedger,
      chainIDs: paymentsChainIDs,
      parentScreen: 'UserScreen',
    });
  };

  const handleLedgerEdit = () => {
    navigation.navigate('EditLedgerScreen', {
      user: currentUser,
      data: ledgersByApiData[selectedLedger ? selectedLedger : 0],
      parentScreen: 'UserScreen',
    });
  };

  const handleLedgerCreate = () => {
    navigation.navigate('CreateLedgerScreen', {
      user: currentUser,
      selectedApiKeyId: selectedIndex,
      parentScreen: 'UserScreen',
    });
  };

  const handleNavigate = () => {
    navigation.navigate('UserScreen');
  };

  const handleNewApiKey = () => {
    navigation.navigate('CreateApiKeyScreen', {
      user: currentUser,
      parentScreen: 'UserScreen',
    });
  };

  const handleSetUseBalancer = async (item) => {
    // setIsLoading(true);
    try {
      const paymentsChainIDs = paymentsData.map((item) => item.id);

      const putResult = await dispatch(
        putNewPaymentsChain({
          key: chainIdOfCurrentLedger,
          chainData: { methods: [...paymentsChainIDs], useBalancer: !isUseBalancer },
        })
      ).unwrap();
      setIsUseBalancer((prev) => !prev);
      // setIsLoading(false);
      setTimeout(() => {
        showMessage({
          message: `Use Balancer was edit successfully!`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'success',
        });
      }, 1000);
    } catch (error) {
      // setIsLoading(false);
      setTimeout(() => {
        showMessage({
          message: `Attention! Use Balancer was not edit!`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 1000);
      console.warn('Error:', error);
    }
  };

  const flatListRenderModule = (item, index) => (
    <>
      <TouchableOpacity activeOpacity={0.5} onPress={() => handleExpandRow(item.id)}>
        <View
          key={index}
          style={{
            ...styles.tableRow,
            height: isAdditDataOpen && selectedIndex === item.id ? 45 : 40,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor:
              isAdditDataOpen && selectedIndex === item.id
                ? '#F4F4F4'
                : index % 2 !== 0
                ? '#FAFAFA'
                : '#fff',
          }}
        >
          <View
            style={{
              ...styles.tableCell,
              width: width / 6,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{ marginRight: 5 }}>
              <Image
                source={isAdditDataOpen && selectedIndex === item.id ? arrowUp : arrowDown}
                style={{ width: 26, height: 26 }}
              />
            </View>
            <SimpleText
              style={{
                fontFamily: isAdditDataOpen && selectedIndex === item.id ? 'Mont_SB' : 'Mont',
              }}
            >
              {item.id}
            </SimpleText>
          </View>
          <View style={{ ...styles.tableCell, flex: 1 }}>
            <Pressable onPress={handleNavigate}>
              <SimpleText
                style={{
                  fontFamily: isAdditDataOpen && selectedIndex === item.id ? 'Mont_SB' : 'Mont',
                }}
              >
                {item.name}
              </SimpleText>
            </Pressable>
          </View>
          <TouchableOpacity
            activeOpacity={isAdditDataOpen && selectedIndex === item.id ? 0.5 : 1}
            onPress={() => isAdditDataOpen && selectedIndex === item.id && handleApiEdit(item)}
          >
            <View
              style={{
                ...styles.actionsCell,
                width: isAdditDataOpen && selectedIndex === item.id ? 52 : 46,
                // width: 46,
                // height: 40,
                backgroundColor: isAdditDataOpen && selectedIndex === item.id ? '#FFED8B' : '#fff',
              }}
            >
              <Image
                source={isAdditDataOpen && selectedIndex === item.id ? editIcon : editInactiveIcon}
                style={{ width: 19, height: 19 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={isAdditDataOpen && selectedIndex === item.id ? 0.5 : 1}
            onPress={() => isAdditDataOpen && selectedIndex === item.id && handleApiDelete(item)}
          >
            <View
              style={{
                ...styles.actionsCell,
                // width: 52,
                // height: 40,

                backgroundColor: isAdditDataOpen && selectedIndex === item.id ? '#FFF0F0' : '#fff',
              }}
            >
              <Image
                source={
                  isAdditDataOpen && selectedIndex === item.id ? deleteIcon : deleteInactiveIcon
                }
                style={{ width: 24, height: 24 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {isAdditDataOpen && selectedIndex === item.id && ledgersByApiData && (
        <View onStartShouldSetResponder={() => true}>
          <View
            style={{
              paddingVertical: 10,
              flex: 1,
              alignItems: 'center',
              borderBottomWidth: isAdditDataOpen && selectedIndex === item.id ? 0 : 1,
              borderBottomColor: 'rgba(217, 217, 217, 0.70)',
              backgroundColor:
                isAdditDataOpen && selectedIndex === item.id
                  ? '#F4F4F4'
                  : index % 2 !== 0
                  ? '#FAFAFA'
                  : '#fff',
            }}
          >
            <SimpleText>{item.apiKey}</SimpleText>
          </View>
          <View
            style={{
              paddingVertical: 40,
              paddingHorizontal: 20,
              flex: 1,
            }}
          >
            <View style={{ ...styles.userWrapper, marginBottom: 16 }}>
              <SimpleText style={{ fontSize: 24, maxWidth: width / 1.5 }}>
                <FormattedMessage id={'users.ledgers'} />
              </SimpleText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                {ledgersByApiData.length !== 0 && (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => handleLedgerEdit()}
                    style={{ marginRight: 1 }}
                  >
                    <IconButton edit />
                  </TouchableOpacity>
                )}
                <TouchableOpacity activeOpacity={0.5} onPress={() => handleLedgerCreate()}>
                  <IconButton add />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: ledgersByApiData.length === 0 ? 1 : 0,
                borderColor: 'rgba(0, 0, 0, 0.10)',
                // paddingBottom: 10,
                marginBottom: 32,
                width: width / 1.7,
              }}
            >
              {ledgersByApiData.length === 0 ? (
                <SimpleText style={{ paddingBottom: 10 }}>
                  <FormattedMessage id={'users.ledgers_not_found'} />
                </SimpleText>
              ) : (
                <ModalDropdown
                  ref={refLedgersModal}
                  options={ledgersByApiDataNames}
                  defaultIndex={0}
                  defaultValue={initialLedger}
                  isFullWidth
                  animated={false}
                  onSelect={(index, option) => {
                    setSelectedLedger(index);
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
                  }}
                  dropdownStyle={{
                    marginLeft: -16,
                    marginTop: 14,
                    paddingLeft: 11,
                    paddingRight: 2,
                    // width: 167,
                    height:
                      ledgersByApiDataNames.length > 4 ? 152 : ledgersByApiDataNames.length * 40,
                    width: width / 1.7,
                    backgroundColor: '#F4F4F4',
                    borderWidth: 0,
                    borderRadius: 2,
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
                        isDropdownOpen
                          ? require('src/images/arrow_up.png')
                          : require('src/images/arrow_down.png')
                      }
                      style={{ width: 26, height: 26, marginLeft: 'auto' }}
                    ></Image>
                  )}
                  renderRowProps={{ activeOpacity: 1 }}
                  renderSeparator={() => <></>}
                  onDropdownWillShow={() => setIsDropdownOpen(true)}
                  onDropdownWillHide={() => setIsDropdownOpen(false)}
                />
              )}
            </View>
            <View style={{ ...styles.userWrapper, marginBottom: 16, alignItems: 'center' }}>
              <SimpleText style={{ fontSize: 24, maxWidth: width / 1.5 }}>
                <FormattedMessage id={'users.payments_settings'} />
              </SimpleText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                {ledgersByApiDataNames.length > 0 ? (
                  <TouchableOpacity activeOpacity={0.5} onPress={() => handlePaymentsCreate()}>
                    <IconButton add />
                  </TouchableOpacity>
                ) : (
                  <View>
                    <IconButton add style={{ backgroundColor: 'rgba(176, 176, 176, 0.4)' }} />
                  </View>
                )}
              </View>
            </View>

            {currentUser && paymentsData && paymentsData.length > 0 ? (
              <View>
                {paymentsData.map((item, index) => (
                  <View key={index}>
                    <UserPaymentSimpleData
                      item={item}
                      index={index}
                      id={item?.id}
                      confirmEditPayment={confirmEditPayment}
                      currentUser={currentUser}
                    />
                  </View>
                ))}
              </View>
            ) : (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'rgba(0, 0, 0, 0.10)',
                  paddingBottom: 10,
                  marginVertical: 40,
                  width: width / 1.7,
                }}
              >
                <SimpleText>
                  <FormattedMessage id={'users.settings_not_found'} />
                </SimpleText>
              </View>
            )}

            {/* ============================================== */}
            <View
              style={{
                height: 1,
                // width: 30,
                backgroundColor: 'rgba(0, 0, 0, 0.40)',
                // marginRight: 14,
                marginTop: 45,
              }}
            />
            <View
              style={{
                ...styles.userWrapper,
                marginBottom: 16,
                marginTop: 45,
                // alignItems: 'center',
              }}
            >
              <SimpleText style={{ fontFamily: 'Mont_SB', maxWidth: width / 1.5 }}>
                <FormattedMessage id={'users.current_chains'} />
              </SimpleText>
              <SimpleText
                style={{
                  fontFamily: 'Mont_SB',
                  maxWidth: width / 2,
                  paddingRight: 40,
                  paddingLeft: 10,
                }}
              >
                {paymentsData &&
                  paymentsData.length > 0 &&
                  paymentsData.map((item) => item?.id).join(', ')}
              </SimpleText>
              {paymentsData && paymentsData.length > 0 ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ marginTop: -15 }}
                  onPress={() => {
                    navigation.navigate('EditPaymentsSettingsScreen', {
                      parentScreen: 'UserScreen',
                      name: 'users.currentChains',
                      value: paymentsData.map((item) => item?.id).join(', '),
                      // index,
                      chainId: chainIdOfCurrentLedger,
                      isUseBalancer,
                      id: currentUser.id,
                      dataName: 'currentChains',
                      currentUser,
                    });
                  }}
                >
                  <IconButton edit />
                </TouchableOpacity>
              ) : (
                <View style={{ marginTop: -15 }}>
                  <IconButton edit style={{ backgroundColor: 'rgba(176, 176, 176, 0.4)' }} />
                </View>
              )}
            </View>
            <View
              style={{
                paddingBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              {paymentsData && paymentsData.length > 0 ? (
                <TouchableOpacity activeOpacity={0.5} onPress={handleSetUseBalancer}>
                  <SimpleCheckBox checked={isUseBalancer} style={{ marginRight: 13 }} />
                </TouchableOpacity>
              ) : (
                <View>
                  <SimpleCheckBox
                    checked={isUseBalancer}
                    disable={true}
                    style={{ marginRight: 13 }}
                  />
                </View>
              )}
              <SimpleText style={{ paddingTop: 4 }}>
                <FormattedMessage id={'users.use_balancer'} />
              </SimpleText>
            </View>
          </View>
        </View>
      )}
    </>
  );

  return (
    // <ScrollView>
    <ScrollView>
      <MainLoader isVisible={isLoading} />
      {!isLoading && (
        <View style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <SimpleText style={styles.titleText}>
              <FormattedMessage id={'common.users'} />
            </SimpleText>
          </View>

          <View style={styles.userBlockWrapper}>
            <View style={{ ...styles.userWrapper, alignItems: 'center' }}>
              <SimpleText style={{ fontFamily: 'Mont_SB', fontSize: 24, maxWidth: width / 1.5 }}>
                {currentUser && currentUser.username}
              </SimpleText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity activeOpacity={0.5} onPress={() => handleUserEdit()}>
                  <IconButton edit />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => handleUserDelete()}>
                  <IconButton del />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.userBalance}>
              <SimpleText style={{ fontFamily: 'Mont_SB', marginBottom: 14 }}>
                <FormattedMessage id={'common.balance'} />
              </SimpleText>
              {balancesNames && initialBalance && (
                <ModalDropdown
                  options={balancesNames}
                  ref={refBalanceModal}
                  defaultIndex={0}
                  defaultValue={initialBalance}
                  isFullWidth
                  animated={false}
                  onSelect={setSelectedBalance}
                  textStyle={{ fontSize: 16, fontFamily: 'Mont', lineHeight: 16 }}
                  style={{
                    backgroundColor: '#F4F4F4',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    justifyContent: 'space-between',
                  }}
                  dropdownStyle={{
                    marginLeft: -16,
                    marginTop: 14,
                    paddingLeft: 11,
                    paddingRight: 2,
                    width: width - 40,
                    height: balancesNames.length > 4 ? 152 : balancesNames.length * 40,
                    backgroundColor: '#F4F4F4',
                    borderWidth: 0,
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
                        isDropdownOpen
                          ? require('src/images/arrow_up.png')
                          : require('src/images/arrow_down.png')
                      }
                      style={{ width: 26, height: 26, marginLeft: 'auto' }}
                    ></Image>
                  )}
                  renderRowProps={{ activeOpacity: 1 }}
                  renderSeparator={() => <></>}
                  onDropdownWillShow={() => setIsDropdownOpen(true)}
                  onDropdownWillHide={() => setIsDropdownOpen(false)}
                />
              )}
            </View>
            <View style={styles.userPayInOut}>
              <View style={styles.payInOutTitles}>
                <SimpleText
                  style={{ ...styles.payInOutTitlesText, marginBottom: 12 }}
                  numberOfLines={1}
                >
                  <FormattedMessage id={'users.payin'} />:
                </SimpleText>
                <SimpleText style={styles.payInOutTitlesText} numberOfLines={1}>
                  <FormattedMessage id={'users.payout'} />:
                </SimpleText>
              </View>
              <View style={styles.payInOutValues}>
                <SimpleText style={{ ...styles.payInOutValuesText, marginBottom: 12 }}>
                  {balances && balances.length > 0 && balances[+selectedBalance]
                    ? balances[+selectedBalance].payinAmount.toFixed(2) +
                      ' ' +
                      balances[+selectedBalance].currency
                    : ''}
                </SimpleText>
                <SimpleText style={styles.payInOutValuesText}>
                  {balances && balances.length > 0 && balances[+selectedBalance]
                    ? balances[+selectedBalance].payoutAmount.toFixed(2) +
                      ' ' +
                      balances[+selectedBalance].currency
                    : ''}
                </SimpleText>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setIsPersonalOpen((prev) => !prev)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <SimpleText
                  style={{
                    fontFamily: 'Mont_SB',
                  }}
                >
                  <FormattedMessage id={'users.personal_info'} />
                </SimpleText>
                <View style={{ marginRight: 26 }}>
                  <Image
                    source={isPersonalOpen ? arrowUp : arrowDown}
                    style={{ width: 26, height: 26 }}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {isPersonalOpen && currentUser && (
              <View style={styles.userPersonal}>
                <View style={styles.personalTitles}>
                  <SimpleText style={{ marginBottom: 12 }}>Name</SimpleText>
                  <SimpleText>Email</SimpleText>
                </View>
                <View style={styles.personalValues}>
                  <SimpleText style={{ marginBottom: 12 }}>{currentUser.username}</SimpleText>
                  <SimpleText>{currentUser.email}</SimpleText>
                </View>
              </View>
            )}
          </View>

          <View style={styles.titleWrapper}>
            <SimpleText style={styles.titleText}>
              <FormattedMessage id={'api.api_keys'} />
            </SimpleText>
            <TouchableOpacity activeOpacity={0.5} onPress={handleNewApiKey}>
              <SimpleButton plus text={'api.new_api_key'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 50,
              paddingLeft: 15,
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(217, 217, 217, 0.70)',
              backgroundColor: '#F4F4F4',
            }}
          >
            <View style={{ ...styles.tableCell, width: width / 6 }}>
              <SimpleText style={styles.headerText}>ID</SimpleText>
            </View>
            <View style={{ ...styles.tableCell, flex: 1 }}>
              <SimpleText style={styles.headerText}>
                <FormattedMessage id={'common.user'} />
              </SimpleText>
            </View>
            <View style={{ ...styles.tableCell, width: 52 }}>
              <SimpleText style={styles.headerText}>
                <FormattedMessage id={'common.edit'} />
              </SimpleText>
            </View>
            <View style={{ ...styles.tableCell, width: 52 }}>
              <SimpleText style={styles.headerText}>
                <FormattedMessage id={'common.del'} />
              </SimpleText>
            </View>
          </View>
          {apiKeysData && apiKeysData.length > 0 ? (
            apiKeysData.map((item, index) => (
              <View key={item.id}>{flatListRenderModule(item, index)}</View>
            ))
          ) : (
            <View style={{ marginTop: 70, justifyContent: 'center', alignItems: 'center' }}>
              <SimpleText style={{ fontSize: 20, fontFamily: 'Mont_SB' }}>
                <FormattedMessage id={'common.data_not_found'} />
              </SimpleText>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleWrapper: {
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userBlockWrapper: { paddingHorizontal: 20 },
  titleText: { fontFamily: 'Mont_SB', fontSize: 34 },
  headerText: { fontFamily: 'Mont_SB', textAlign: 'center' },
  tableRow: {
    height: 40,
    paddingLeft: 15,
  },
  tableCell: { height: 40, paddingHorizontal: 5, justifyContent: 'center' },
  userActionsCell: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 45,
  },

  actionsCell: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  additDataCell: {
    height: 40,
    paddingLeft: 5,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
  },
  additDataCellValues: {
    flex: 1,
    height: 40,
    paddingLeft: 23,
    paddingRight: 10,
    backgroundColor: '#F4F4F4',
    borderBottomColor: 'rgba(217, 217, 217, 0.40);',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },

  userWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  userBalance: { marginTop: 37 },
  userPayInOut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 45,
    marginBottom: 40,
  },
  payInOutTitles: { width: 100, marginRight: 10 },
  payInOutValues: { flex: 1 },
  payInOutTitlesText: { fontSize: 24 },
  payInOutValuesText: { fontSize: 24, fontFamily: 'Mont_SB' },
  userPersonal: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  personalTitles: { width: 51, marginRight: 61 },
});

export default UserScreen;
