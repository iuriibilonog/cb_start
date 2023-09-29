import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getMerchantsApiKeys,
  getLedgersData,
  getLedgersByApiKeyID,
  cleanUserLedgers,
} from 'src/redux/content/operations';
import { getApiKeys, ledgersData, getUsers, ledgersByApiKeyID } from 'src/redux/content/selectors';
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
import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import Pagination from 'src/components/molecules/Pagination';
import { useNavigation } from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import IconButton from 'src/components/atoms/IconButton';
import SimpleCheckBox from '../../components/atoms/SimpleCheckBox';
import SimpleButton from '../../components/atoms/SimpleButton';

const deleteIcon = require('src/images/delete.png');
const deleteInactiveIcon = require('src/images/delete_inactive.png');
const arrowDown = require('src/images/arrow_down_small.png');
const arrowUp = require('src/images/arrow_up.png');
const editIcon = require('src/images/edit.png');
const editInactiveIcon = require('src/images/edit_inactive.png');

const UserScreen = (props) => {
  const dispatch = useDispatch();
  const apiData = useSelector(getApiKeys);
  const balanceData = useSelector(ledgersData);
  const allUsers = useSelector(getUsers);
  const ledgersByApi = useSelector(ledgersByApiKeyID);

  const [currentUser, setCurrentUser] = useState();
  const [apiKeysData, setApiKeysData] = useState(null);
  const [isAdditDataOpen, setIsAdditDataOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [initialBalance, setInitialBalance] = useState();
  const [selectedBalance, setSelectedBalance] = useState('0');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPersonalOpen, setIsPersonalOpen] = useState(false);
  const [isUseBalancer, setIsUseBalancer] = useState(false);
  const [ledgersByApiData, setLedgersByApiData] = useState([]);
  const [selectedLedger, setSelectedLedger] = useState('');

  const [balances, setBalances] = useState([]);

  const { width } = Dimensions.get('window');

  const navigation = useNavigation();

  useEffect(() => {
    // console.log('START', ledgersByApiData);
    // console.log('-Selector-ledgersByApi', ledgersByApi);
    dispatch(cleanUserLedgers());
    setLedgersByApiData([]);
  }, []);

  useEffect(() => {
    // console.log('props-route', props.route);
    if ((props.route.params && props.route.params.isRefresh) || props.route.params) {
      dispatch(getMerchantsApiKeys(props.route.params.id));
      dispatch(getLedgersData(props.route.params.id));
    }
  }, [props.route.params]);

  useEffect(() => {
    if (apiData) {
      setApiKeysData(apiData);
    }
  }, [apiData]);

  useEffect(() => {
    if (ledgersByApi && ledgersByApi.length > 0) {
      setLedgersByApiData(ledgersByApi.map((item) => item.name));
    } else setLedgersByApiData([]);
  }, [ledgersByApi]);

  useEffect(() => {
    if (balanceData) {
      console.log('balanceData>', balanceData);
      setBalances(balanceData.map((item) => item.name));
      setInitialBalance(balanceData[0]?.name);
    }
  }, [balanceData]);

  useEffect(() => {
    if (allUsers && props.route.params.id) {
      // console.log('props.route.params.id', props.route.params.id);
      setCurrentUser(allUsers.find((item) => item.id === +props.route.params.id));
    }
  }, [allUsers]);

  const handleExpandRow = async (itemId) => {
    if (!isAdditDataOpen) {
      setSelectedIndex(itemId);
      await dispatch(getLedgersByApiKeyID(itemId));
      console.log('Dispatch');
    } else {
      setSelectedIndex('');
      setLedgersByApiData([]);
    }
    console.log('open');
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

  const handleLedgerEdit = () => {
    console.log('ledgersByApi', ledgersByApi[selectedLedger ? selectedLedger : 0]);
    // console.log('selectedLedger', selectedLedger);
    navigation.navigate('EditLedgerScreen', {
      user: currentUser,
      data: ledgersByApi[selectedLedger ? selectedLedger : 0],
      parentScreen: 'UserScreen',
    });
  };

  const handleLedgerCreate = () => {
    navigation.navigate('CreateLedgerScreen', { user: currentUser, parentScreen: 'UserScreen' });
  };

  const handleNavigate = () => {
    navigation.navigate('UserScreen');
  };

  const handleNewApiKey = () => {
    navigation.navigate('CreateApiKeyScreen', { user: currentUser, parentScreen: 'UserScreen' });
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
            <View style={{ width: 20, marginRight: 5 }}>
              <Image
                source={isAdditDataOpen && selectedIndex === item.id ? arrowUp : arrowDown}
                style={{ width: 20, height: 20 }}
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
        <>
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
                <>
                  {console.log('array:', ledgersByApiData.join(', '))}
                  <ModalDropdown
                    options={ledgersByApiData}
                    defaultIndex={0}
                    defaultValue={ledgersByApiData[0]}
                    isFullWidth
                    animated={false}
                    onSelect={setSelectedLedger}
                    textStyle={{ fontSize: 16, fontFamily: 'Mont', fontWeight: '600' }}
                    style={{
                      backgroundColor: '#F4F4F4',
                      paddingHorizontal: 16,
                      // paddingVertical: 11,
                      borderRadius: 2,
                      justifyContent: 'space-between',
                    }}
                    dropdownStyle={{
                      marginLeft: -16,
                      marginTop: Platform.OS === 'ios' ? 2 : -2,
                      paddingLeft: 11,
                      paddingRight: 2,
                      // width: 167,
                      width: width / 1.7,
                      backgroundColor: '#F4F4F4',
                      borderWidth: 0,
                      borderRadius: 2,
                    }}
                    dropdownTextStyle={{
                      fontSize: 16,
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
                        style={{ width: 26, height: 36, marginLeft: 'auto' }}
                      ></Image>
                    )}
                    renderRowProps={{ activeOpacity: 1 }}
                    renderSeparator={() => <></>}
                    onDropdownWillShow={() => setIsDropdownOpen(true)}
                    onDropdownWillHide={() => setIsDropdownOpen(false)}
                  />
                </>
              )}
            </View>
            <View style={{ ...styles.userWrapper, marginBottom: 16 }}>
              <SimpleText style={{ fontSize: 24, maxWidth: width / 1.5 }}>
                <FormattedMessage id={'users.payments_settings'} />
              </SimpleText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity activeOpacity={0.5} onPress={() => handleUserDelete()}>
                  <IconButton add />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: 'rgba(0, 0, 0, 0.10)',
                paddingBottom: 10,
                marginBottom: 32,
                width: width / 1.7,
              }}
            >
              <SimpleText>
                <FormattedMessage id={'users.settings_not_found'} />
              </SimpleText>
            </View>
            <View style={{ ...styles.userWrapper, marginBottom: 16 }}>
              <SimpleText style={{ fontSize: 24, maxWidth: width / 1.5 }}>
                <FormattedMessage id={'users.chains'} />
              </SimpleText>
            </View>
            <View
              style={{
                paddingBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setIsUseBalancer((prev) => !prev)}
              >
                <SimpleCheckBox checked={isUseBalancer} style={{ marginRight: 13 }} />
              </TouchableOpacity>
              <SimpleText style={{ paddingTop: 4 }}>
                <FormattedMessage id={'users.use_balancer'} />
              </SimpleText>
            </View>
            {isUseBalancer && (
              <View style={{ marginTop: 40 }}>
                <SimpleText
                  style={{
                    fontFamily: 'Mont_SB',
                    fontSize: 20,
                    color: '#FF6765',
                    textAlign: 'center',
                    letterSpacing: 1,
                    lineHeight: 25,
                  }}
                >
                  <FormattedMessage id={'users.validation_error'} />
                </SimpleText>
              </View>
            )}
          </View>
        </>
      )}
    </>
  );

  return (
    // <ScrollView>
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <SimpleText style={styles.titleText}>
            <FormattedMessage id={'common.users'} />
          </SimpleText>
        </View>

        <View style={styles.userBlockWrapper}>
          <View style={styles.userWrapper}>
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
            {balances && initialBalance && (
              <ModalDropdown
                options={balances}
                defaultIndex={0}
                defaultValue={initialBalance}
                isFullWidth
                animated={false}
                onSelect={setSelectedBalance}
                textStyle={{ fontSize: 16, fontFamily: 'Mont' }}
                style={{
                  backgroundColor: '#F4F4F4',
                  paddingHorizontal: 16,
                  paddingVertical: 11,
                  justifyContent: 'space-between',
                }}
                dropdownStyle={{
                  marginLeft: -16,
                  marginTop: Platform.OS === 'ios' ? 14 : -14,
                  paddingLeft: 11,
                  paddingRight: 2,
                  // width: 167,
                  backgroundColor: '#F4F4F4',
                  borderWidth: 0,
                }}
                dropdownTextStyle={{
                  fontSize: 16,
                  fontWeight: '600',
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
                    style={{ width: 26, height: 36, marginLeft: 'auto' }}
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
              <SimpleText style={{ ...styles.payInOutTitlesText, marginBottom: 12 }}>
                <FormattedMessage id={'users.payin'} />:
              </SimpleText>
              <SimpleText style={styles.payInOutTitlesText}>
                <FormattedMessage id={'users.payout'} />:
              </SimpleText>
            </View>
            <View style={styles.payInOutValues}>
              <SimpleText style={{ ...styles.payInOutValuesText, marginBottom: 12 }}>
                {balanceData && balanceData.length > 0 && balanceData[+selectedBalance]
                  ? balanceData[+selectedBalance].payinAmount.toFixed(2) +
                    ' ' +
                    balanceData[+selectedBalance].currency
                  : ''}
              </SimpleText>
              <SimpleText style={styles.payInOutValuesText}>
                {balanceData && balanceData.length > 0 && balanceData[+selectedBalance]
                  ? balanceData[+selectedBalance].payoutAmount.toFixed(2) +
                    ' ' +
                    balanceData[+selectedBalance].currency
                  : ''}
              </SimpleText>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.5} onPress={() => setIsPersonalOpen((prev) => !prev)}>
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
              <View style={{ width: 20, marginRight: 26 }}>
                <Image
                  source={isPersonalOpen ? arrowUp : arrowDown}
                  style={{ width: 34, height: 34 }}
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
            <FormattedMessage id={'api.new_api_key'}>
              {(text) => <SimpleButton plus text={text} />}
            </FormattedMessage>
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

  userWrapper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  userBalance: { marginTop: 37 },
  userPayInOut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 45,
    marginBottom: 40,
  },
  payInOutTitles: { width: 96, marginRight: 21 },
  payInOutValues: {},
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
