import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getApiData } from 'src/redux/content/operations';
import { getApiInfo } from 'src/redux/content/selectors';
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

const deleteIcon = require('src/images/delete.png');
const deleteInactiveIcon = require('src/images/delete_inactive.png');
const arrowDown = require('src/images/arrow_down_small.png');
const arrowUp = require('src/images/arrow_up.png');
const editIcon = require('src/images/edit.png');
const editInactiveIcon = require('src/images/edit_inactive.png');

const UserScreen = (props) => {
  const dispatch = useDispatch();
  const apiData = useSelector(getApiInfo);
  const [currentUser, setCurrentUser] = useState(props?.route?.params?.user);
  const [apiKeysData, setApiKeysData] = useState(null);
  const [isAdditDataOpen, setIsAdditDataOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [initialBalance, setInitialBalance] = useState('Royal');
  const [selectedBalance, setSelectedBalance] = useState('0');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPersonalOpen, setIsPersonalOpen] = useState(false);

  const [balances, setBalances] = useState([
    'Royal',
    'Unliminted',
    'AppexMoney',
    'Munzen',
    'Forta',
    'Stripe',
    'Impaya',
    'Paybrokers',
    'IPague',
    'Betpay',
  ]);

  const { width } = Dimensions.get('window');

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getApiData(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (props.route.params && props.route.params.isRefresh) {
      dispatch(getApiData(currentPage));
    }
  }, [props.route.params]);

  useEffect(() => {
    const user = props?.route?.params?.user;
    if (apiData) {
      console.log('totalCount', apiData.totalCount);
      const pages = Math.ceil(apiData.totalCount / 100);
      setTotalPages(pages);
      setApiKeysData(apiData.items);
    }
  }, [apiData]);

  const handleExpandRow = (index) => {
    setIsAdditDataOpen((prev) => !prev);
    setSelectedIndex(index);
  };

  const handleApiEdit = ({ id, name }) => {
    navigation.navigate('EditScreen', { id, name, parentScreen: 'UserScreen' });
  };

  const handleApiDelete = ({ id, name }) => {
    navigation.navigate('DeleteScreen', { id, name, parentScreen: 'UserScreen' });
  };

  const handleUserEdit = () => {
    navigation.navigate('EditUserScreen', { user: currentUser });
  };

  const handleUserDelete = () => {
    navigation.navigate('DeleteUserScreen', { user: currentUser });
  };

  const handleNavigate = () => {
    navigation.navigate('UserScreen');
  };

  const flatListRenderModule = (item, index) => (
    <>
      <TouchableOpacity key={index} activeOpacity={0.5} onPress={() => handleExpandRow(item.id)}>
        <View
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
                backgroundColor: isAdditDataOpen && selectedIndex === item.id ? '#FFEFB4' : '#fff',
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
      {isAdditDataOpen && selectedIndex === item.id && (
        <View
          style={{
            paddingVertical: 10,
            flex: 1,
            alignItems: 'center',
            height: 100,
          }}
        ></View>
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
              {currentUser.username}
            </SimpleText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity activeOpacity={0.5} onPress={() => handleUserEdit()}>
                <View style={{ ...styles.userActionsCell, backgroundColor: '#FFEFB4' }}>
                  <Image source={editIcon} style={{ width: 19, height: 19 }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={() => handleUserDelete()}>
                <View
                  style={{
                    ...styles.userActionsCell,
                    backgroundColor: '#FFF0F0',
                  }}
                >
                  <Image source={deleteIcon} style={{ width: 24, height: 24 }} />
                </View>
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
                PayIn:
              </SimpleText>
              <SimpleText style={styles.payInOutTitlesText}>PayOut:</SimpleText>
            </View>
            <View style={styles.payInOutValues}>
              <SimpleText style={{ ...styles.payInOutValuesText, marginBottom: 12 }}>
                88.00 EUR
              </SimpleText>
              <SimpleText style={styles.payInOutValuesText}>99.00 EUR</SimpleText>
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

          {isPersonalOpen && (
            <View style={styles.userPersonal}>
              <View style={styles.personalTitles}>
                <SimpleText style={{ marginBottom: 12 }}>Name</SimpleText>
                <SimpleText>Email</SimpleText>
              </View>
              <View style={styles.personalValues}>
                <SimpleText style={{ marginBottom: 12 }}>Dmytro</SimpleText>
                <SimpleText>Dm@dm</SimpleText>
              </View>
            </View>
          )}
        </View>

        <View style={styles.titleWrapper}>
          <SimpleText style={styles.titleText}>
            <FormattedMessage id={'api.api_keys'} />
          </SimpleText>
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
          apiKeysData.map((item, index) => flatListRenderModule(item, index))
        ) : (
          <View style={{ marginTop: 70, justifyContent: 'center', alignItems: 'center' }}>
            <SimpleText style={{ fontSize: 20, fontFamily: 'Mont_SB' }}>
              <FormattedMessage id={'common.data_not_found'} />
            </SimpleText>
          </View>
        )}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
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
  titleWrapper: { marginTop: 30, marginBottom: 30, paddingLeft: 20 },
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
