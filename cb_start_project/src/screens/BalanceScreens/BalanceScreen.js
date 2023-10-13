import React, { useState, useEffect, useRef, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import {
  getAllUsers,
  getLedgersData,
  getBalanceLogs,
  putBalanceDeposit,
} from 'src/redux/content/operations';
import { getUsers } from 'src/redux/content/selectors';

import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import MainLoader from 'src/components/molecules/MainLoader';
import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import Pagination from 'src/components/molecules/Pagination';
import { useNavigation } from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import IconButton from 'src/components/atoms/IconButton';
import SimpleCheckBox from 'src/components/atoms/SimpleCheckBox';
import SimpleButton from 'src/components/atoms/SimpleButton';
import UserPaymentSimpleData from 'src/components/molecules/UserPaymentSimpleData';
import { checkValidation } from 'src/utils/errorsValidation';

const deleteIcon = require('src/images/delete.png');
const deleteInactiveIcon = require('src/images/delete_inactive.png');
const arrowDown = require('src/images/arrow_down.png');
const arrowUp = require('src/images/arrow_up.png');
const editIcon = require('src/images/edit.png');
const editInactiveIcon = require('src/images/edit_inactive.png');

const BalanceScreen = (props) => {
  const dispatch = useDispatch();
  const allUsers = useSelector(getUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [merchantsList, setMerchantsList] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState();
  const [isMerchantsDropdownOpen, setIsMerchantsDropdownOpen] = useState(false);

  const [ledgersList, setLedgersList] = useState([]);
  const [selectedLedger, setSelectedLedger] = useState();
  const [isLedgersDropdownOpen, setIsLedgersDropdownOpen] = useState(false);

  const [selectedBalanceName, setSelectedBalanceName] = useState();
  const [selectedBalanceObject, setSelectedBalanceObject] = useState();
  const [isBalanceDropdownOpen, setIsBalanceDropdownOpen] = useState(false);
  const [balanceLogs, setBalanceLogs] = useState([]);

  const [amount, setAmount] = useState('');

  const { width } = Dimensions.get('window');

  const navigation = useNavigation();

  // const refBalanceModal = useRef();
  const refLedgersModal = useRef();
  const refBalanceModal = useRef();

  useEffect(() => {
    if (allUsers) {
      const merchants = allUsers.filter((item) => item.roleId === 1);
      // console.log('allMerchants', allMerchants);
      setMerchantsList(merchants);
      setSelectedMerchant(merchants[0].username);
      getLedgersByMechantId(merchants[0].id);
    }
  }, [allUsers]);

  const getLedgersByMechantId = async (userId) => {
    try {
      const ledgers = await dispatch(getLedgersData(userId)).unwrap();
      if (ledgers.items && ledgers.items.length > 0) {
        setLedgersList(ledgers.items);
        setSelectedLedger(ledgers.items[0].name);
        setSelectedBalanceName(ledgers.items[0].name);
        setSelectedBalanceObject(ledgers.items[0]);
        // console.log('setSelectedBalanceObject', ledgers.items[0]);
        refLedgersModal.current?.select(-1);
        refBalanceModal.current?.select(-1);
        const logs = await dispatch(getBalanceLogs(ledgers.items[0].id)).unwrap();
        // console.log('logs', logs);
        setBalanceLogs(logs.items);
      } else {
        setLedgersList([' ']);
        setSelectedLedger(' ');
        setSelectedBalanceName(' ');
        refLedgersModal.current?.select(-1);
        refBalanceModal.current?.select(-1);
        setBalanceLogs([]);
      }
    } catch (error) {
      setIsLoading(false);
      setTimeout(() => {
        showMessage({
          message: `Something went wrong! Ledgers loading error`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 1000);
      console.warn('Error:', error);
    }
  };

  const handleMerchantSelect = (text) => {
    setSelectedMerchant(text);
    getLedgersByMechantId(merchantsList.find((item) => item.username === text).id);
  };

  const handleLedgerSelect = (text) => {
    setSelectedLedger(text);
    setSelectedBalanceName(text);
    setSelectedBalanceObject(ledgersList.find((item) => item.name === text));
  };

  useEffect(() => {
    if (refBalanceModal.current && refBalanceModal.current.select) {
      refBalanceModal.current.select(-1);
    }
  }, [selectedBalanceName]);

  const handleBalanceSelect = (text) => {
    // console.log('Text', text);
    setSelectedBalanceName(text);
    setSelectedBalanceObject(ledgersList.find((item) => item.name === text));
    // getLedgersByMechantId(merchantsList.find((item) => item.username === text).id);
  };

  const acceptPayIn = () => {
    if (errorsCheck()) {
      return;
    } else {
      putDeposit('payin');
    }
  };

  const acceptPayOut = () => {
    if (errorsCheck()) {
      return;
    } else {
      putDeposit('payout');
    }
  };

  const putDeposit = async (type) => {
    try {
      const ledgerId = ledgersList.find((item) => item.name === selectedLedger).id;
      const depositResult = await dispatch(
        putBalanceDeposit({
          id: ledgerId,
          amountData: {
            payinAmount: type === 'payout' ? 0 : +amount,
            payoutAmount: type === 'payout' ? +amount : 0,
          },
        })
      ).unwrap();
      const selectedMerchantId = merchantsList.find(
        (item) => item.username === selectedMerchant
      ).id;
      // console.log('merchantsList', merchantsList);
      // console.log('selectedMerchantId', selectedMerchantId);
      await getLedgersByMechantId(
        merchantsList.find((item) => item.username === selectedMerchant).id
      );
      setTimeout(() => {
        showMessage({
          message: `Deposit successfully added`,
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
          message: `Something went wrong! Putting the Deposit amount error`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }, 1000);
      console.warn('Error:', error);
    }
  };

  const errorsCheck = () => {
    if (isNaN(amount)) {
      setErrors({ amount: 'invalid_data' });
      return true;
    } else if (!amount) {
      setErrors({ amount: 'required_field' });
      return true;
    } else return false;
  };

  const getDate = (createdAt) => {
    createdAt = createdAt.split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
    return createdAt;
  };

  const getTime = (createdAt) => {
    createdAt = createdAt.split('T')[1].slice(0, 8);
    return createdAt;
  };

  const flatListRenderRow = (item, index) => (
    <View
      key={index}
      style={{
        ...styles.tableRow,
        backgroundColor: item.diffPayoutAmount
          ? 'rgba(11, 163, 154, 0.15)'
          : item.diffPayinAmount
          ? 'rgba(255, 199, 0, 0.15)'
          : '#fff',
      }}
    >
      <View
        style={{
          ...styles.tableCell,
          paddingRight: 0,
          width: width / 4,
        }}
      >
        <SimpleText>{getDate(item.createdAt)}</SimpleText>
      </View>
      <View
        style={{
          ...styles.tableCell,
          width: width / 5,
        }}
      >
        <SimpleText>{getTime(item.createdAt)}</SimpleText>
      </View>
      <View
        style={{
          ...styles.tableCell,
          paddingLeft: 10,
          flex: 1,
        }}
      >
        <SimpleText>
          {item.diffPayoutAmount
            ? item.diffPayoutAmount.toFixed(2)
            : item.diffPayinAmount
            ? item.diffPayinAmount.toFixed(2)
            : ''}
        </SimpleText>
      </View>
    </View>
  );

  return (
    <ScrollView>
      <MainLoader isVisible={isLoading} />
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <SimpleText style={styles.titleText}>
            <FormattedMessage id={'common.balance'} />
          </SimpleText>
        </View>
        <View style={styles.itemWrapper}>
          <View style={styles.itemTitle}>
            <SimpleText style={styles.itemTextTitle}>
              <FormattedMessage id={'common.merchant'} />
            </SimpleText>
          </View>
          {merchantsList && selectedMerchant && (
            <ModalDropdown
              // ref={refLedgersModal}
              options={merchantsList.map((item) => item.username)}
              defaultIndex={0}
              defaultValue={selectedMerchant}
              // isFullWidth
              animated={false}
              onSelect={(index, option) => {
                // console.log(index, '<>', option);
                handleMerchantSelect(option);
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
                    isMerchantsDropdownOpen
                      ? require('src/images/arrow_up.png')
                      : require('src/images/arrow_down.png')
                  }
                  style={{ width: 26, height: 26, marginLeft: 'auto' }}
                ></Image>
              )}
              renderRowProps={{ activeOpacity: 1 }}
              renderSeparator={() => <></>}
              onDropdownWillShow={() => setIsMerchantsDropdownOpen(true)}
              onDropdownWillHide={() => setIsMerchantsDropdownOpen(false)}
            />
          )}
        </View>
        <View style={styles.itemWrapper}>
          <View style={styles.itemTitle}>
            <SimpleText style={styles.itemTextTitle}>
              <FormattedMessage id={'users.ledger'} />
            </SimpleText>
          </View>
          {ledgersList && selectedLedger && (
            <View style={{ pointerEvents: ledgersList[0] === ' ' ? 'none' : 'all' }}>
              <ModalDropdown
                ref={refLedgersModal}
                options={ledgersList.map((item) => item.name)}
                defaultIndex={0}
                defaultValue={selectedLedger}
                // isFullWidth
                animated={false}
                onSelect={(index, option) => {
                  // console.log(index, '<>', option);
                  handleLedgerSelect(option);
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
                      isLedgersDropdownOpen
                        ? require('src/images/arrow_up.png')
                        : require('src/images/arrow_down.png')
                    }
                    style={{ width: 26, height: 26, marginLeft: 'auto' }}
                  ></Image>
                )}
                renderRowProps={{ activeOpacity: 1 }}
                renderSeparator={() => <></>}
                onDropdownWillShow={() => setIsLedgersDropdownOpen(true)}
                onDropdownWillHide={() => setIsLedgersDropdownOpen(false)}
              />
            </View>
          )}
        </View>
        <View style={{ marginBottom: 30 }}>
          <View style={styles.itemTitle}>
            <SimpleText style={styles.itemTextTitle}>
              <FormattedMessage id={'transactions.amount'} />
            </SimpleText>
          </View>

          <TextInput
            style={{
              ...styles.textInput,
              width: width - 40,
              borderWidth: 1,
              borderRadius: 2,
              borderColor: errors.amount ? '#FC7270' : '#F4F4F4',
            }}
            value={'' + amount}
            onChangeText={(text) => {
              if (errors.amount) {
                setErrors({});
              }
              setAmount(text);
            }}
          />

          {errors.amount && (
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
              <FormattedMessage id={`errors.${errors.amount}`} />
            </SimpleText>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity activeOpacity={0.5} onPress={acceptPayIn}>
            <SimpleButton
              text={'users.payin'}
              style={{ width: width / 2 - 30, backgroundColor: '#FFC700' }}
              // textStyle={{ color: '#262626' }}
            />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5} onPress={acceptPayOut}>
            <SimpleButton
              text={'users.payout'}
              style={{ width: width / 2 - 30 }}
              // textStyle={{ color: '#262626' }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.merchantTitleWrapper}>
          <SimpleText style={styles.merchantTextTitle}>{selectedMerchant}</SimpleText>
        </View>
        <View style={styles.userBalance}>
          <SimpleText style={{ fontFamily: 'Mont_SB', marginBottom: 14 }}>
            <FormattedMessage id={'common.balance'} />
          </SimpleText>
          {ledgersList && selectedBalanceName && (
            <View style={{ pointerEvents: ledgersList[0] === ' ' ? 'none' : 'all' }}>
              <ModalDropdown
                options={ledgersList.map((item) => item.name)}
                ref={refBalanceModal}
                defaultIndex={0}
                defaultValue={selectedBalanceName}
                isFullWidth
                animated={false}
                onSelect={(index, option) => {
                  handleBalanceSelect(option);
                }}
                textStyle={{ fontSize: 16, fontFamily: 'Mont', lineHeight: 16 }}
                style={{
                  backgroundColor: '#F4F4F4',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  justifyContent: 'space-between',
                }}
                dropdownStyle={{
                  marginLeft: -16,
                  marginTop: Platform.OS === 'ios' ? 14 : -14,
                  paddingLeft: 11,
                  paddingRight: 2,
                  width: width - 40,
                  backgroundColor: '#F4F4F4',
                  borderWidth: 0,
                }}
                dropdownTextStyle={{
                  fontSize: 16,
                  lineHeight: 16,
                  fontWeight: '600',
                  backgroundColor: '#F4F4F4',
                  color: 'rgba(38, 38, 38, 0.50)',
                }}
                renderRightComponent={() => (
                  <Image
                    source={
                      isBalanceDropdownOpen
                        ? require('src/images/arrow_up.png')
                        : require('src/images/arrow_down.png')
                    }
                    style={{ width: 26, height: 26, marginLeft: 'auto' }}
                  ></Image>
                )}
                renderRowProps={{ activeOpacity: 1 }}
                renderSeparator={() => <></>}
                onDropdownWillShow={() => setIsBalanceDropdownOpen(true)}
                onDropdownWillHide={() => setIsBalanceDropdownOpen(false)}
              />
            </View>
          )}
        </View>
        <View style={styles.userPayInOut}>
          <View style={styles.payInOutTitles}>
            <SimpleText style={{ ...styles.payInOutTitlesText, marginBottom: 12 }}>
              <FormattedMessage id={'users.payin'} />:
            </SimpleText>
            <SimpleText style={styles.payInOutTitlesText}>
              <FormattedMessage id={'users.payout'} />:
            </SimpleText>
          </View>
          <View style={styles.payInOutValues}>
            <SimpleText style={{ ...styles.payInOutValuesText, marginBottom: 12 }}>
              {selectedBalanceObject
                ? selectedBalanceObject.payinAmount.toFixed(2) +
                  ' ' +
                  selectedBalanceObject.currency
                : ''}
            </SimpleText>
            <SimpleText style={styles.payInOutValuesText}>
              {selectedBalanceObject
                ? selectedBalanceObject.payoutAmount.toFixed(2) +
                  ' ' +
                  selectedBalanceObject.currency
                : ''}
            </SimpleText>
          </View>
        </View>

        <View>
          <SimpleText style={{ fontSize: 24, marginBottom: 14 }}>
            <FormattedMessage id={'balance.history'} />:
          </SimpleText>

          <SimpleText style={styles.merchantTextTitle}>{selectedMerchant}</SimpleText>
        </View>

        <View
          style={{
            height: 50,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(217, 217, 217, 0.70)',
            backgroundColor: '#F4F4F4',
            marginTop: 35,
            paddingHorizontal: 20,
            marginHorizontal: -20,
          }}
        >
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{ ...styles.tableCell, width: width / 2.22 }}>
              <SimpleText style={styles.headerText}>
                <FormattedMessage id={'common.date'} />
              </SimpleText>
            </View>
            <View style={{ ...styles.tableCell, flex: 1 }}>
              <SimpleText style={styles.headerText}>
                <FormattedMessage id={'transactions.amount'} />,{' '}
                {selectedBalanceObject && selectedBalanceObject.currency}
              </SimpleText>
            </View>
          </View>
        </View>
        {balanceLogs && balanceLogs.length > 0 ? (
          balanceLogs.map((item, index) => (
            <View key={item.id}>{flatListRenderRow(item, index)}</View>
          ))
        ) : (
          <View style={{ marginVertical: 70, justifyContent: 'center', alignItems: 'center' }}>
            <SimpleText style={{ fontSize: 20, fontFamily: 'Mont_SB' }}>
              <FormattedMessage id={'common.data_not_found'} />
            </SimpleText>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginBottom:30,
  },
  itemWrapper: { marginBottom: 36 },
  itemTitle: { marginBottom: 12 },
  itemTextTitle: { fontSize: 14 },
  titleWrapper: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userBlockWrapper: { paddingHorizontal: 20 },
  titleText: { fontFamily: 'Mont_SB', fontSize: 34 },
  headerText: { fontFamily: 'Mont_SB', textAlign: 'center' },
  textInput: {
    backgroundColor: '#F4F4F4',
    paddingVertical: 11,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Mont',
  },
  merchantTitleWrapper: {
    marginTop: 45,
    marginBottom: 37,
  },
  merchantTextTitle: {
    fontSize: 24,
    fontFamily: 'Mont_SB',
  },
  userBalance: {
    marginBottom: 45,
  },
  userPayInOut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.40)',
    paddingBottom: 30,
    marginBottom: 60,
  },
  payInOutTitles: { width: 96, marginRight: 21 },
  payInOutValues: {},
  payInOutTitlesText: { fontSize: 24, lineHeight: 31 },
  payInOutValuesText: { fontSize: 24, lineHeight: 31, fontFamily: 'Mont_SB' },

  tableCell: { height: 40, paddingHorizontal: 5, justifyContent: 'center' },
  tableRow: {
    height: 40,
    // paddingLeft: 15,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(217, 217, 217, 0.40)',
  },
  tableCell: { height: 40, paddingHorizontal: 5, justifyContent: 'center' /* borderWidth: 1 */ },
});

export default BalanceScreen;
