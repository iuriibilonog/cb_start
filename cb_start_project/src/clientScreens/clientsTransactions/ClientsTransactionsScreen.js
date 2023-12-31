import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { getTransactionData, getClientsTransactionsData } from 'src/redux/content/operations';
import { getTransactionInfo, getClientsTransactionInfo } from 'src/redux/content/selectors';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import { useNavigation } from '@react-navigation/native';
import ClientsTransactionsFilters from 'src/components/molecules/ClientsTransactionsFilters';
import Pagination from 'src/components/molecules/Pagination';
import MainLoader from 'src/components/molecules/MainLoader';

const close = require('src/images/delete.png');
const arrowDown = require('src/images/arrow_down_small.png');
const arrowUp = require('src/images/arrow_up.png');
const card = require('src/images/credit_card.png');

const ClientsTransactionsScreen = ({
  genReportTransactionFilters,
  setGenReportTransactionFilters,
  filtersDots,
  inactiveFilters,
  isMerchApiKeyAvailable,
  createTransactionRequestObject,
  isTransactionsWithFilterLoading,
  clientId,
  ...props
}) => {
  const dispatch = useDispatch();
  const transactionInfo = useSelector(getClientsTransactionInfo);

  const [data, setData] = useState(null);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isAdditDataOpen, setIsAdditDataOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const { width } = Dimensions.get('window');

  const navigation = useNavigation();

  const route = useRoute();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (props.searchTxt === '' && !isKeyboardVisible) {
      props.setIsSearchVisible(false);
      Keyboard.dismiss();
    }
    if (props.searchTxt || props.searchTxt === '') {
      setCurrentPage(1);
      getTableData(1);
    }
  }, [props.searchTxt]);

  useEffect(() => {
    getTableData();
  }, [currentPage]);

  const getTableData = async (page) => {
    if (route.name === 'ClientsTransactionsScreen') {
      setIsLoading(true);
      const transactionRequestObject = createTransactionRequestObject(genReportTransactionFilters);

      if (props.searchTxt) {
        await dispatch(
          getClientsTransactionsData({
            transactionData: transactionRequestObject,
            page: page ? page : currentPage,
            userid: clientId,
            search: props.searchTxt,
          })
        );
      } else {
        await dispatch(
          getClientsTransactionsData({
            transactionData: transactionRequestObject,
            page: page ? page : currentPage,
            userid: clientId,
          })
        );
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (transactionInfo) {
      setTotalPages(Math.floor(transactionInfo.totalCount / 100));
      setData(transactionInfo.items);
    }
  }, [transactionInfo]);

  const handleExpandRow = (index) => {
    setIsAdditDataOpen((prev) => !prev);
    setIsDetailsOpen(false);

    setSelectedIndex(index);
  };

  const handleCardholderDataShow = (item) => {
    navigation.navigate('CardholderScreen', { item: item });
  };

  const validTextShow = (date) => {
    const a = date.split('T');
    return a[0] + ' ' + a[1].slice(0, 5);
  };

  const handleBlur = async () => {
    if (!props.searchTxt && isKeyboardVisible) {
      setIsLoading(true);
      props.setIsSearchVisible(false);
      const transactionRequestObject = createTransactionRequestObject(genReportTransactionFilters);
      await dispatch(
        getTransactionData({
          transactionData: transactionRequestObject,
          page: 1,
        })
      );
      setIsLoading(false);
    }
    Keyboard.dismiss();
  };

  const flatListRenderModule = (item, index) => (
    <>
      <TouchableOpacity activeOpacity={0.5} onPress={() => handleExpandRow(item.id)}>
        <View
          style={{
            ...styles.tableRow,
            flexDirection: 'row',
            // alignItems: 'center',
            backgroundColor: index % 2 !== 0 ? '#FAFAFA' : '#fff',
          }}
        >
          {/* <View style={{ width: 20 }}>
            <Image
              source={isAdditDataOpen && selectedIndex === item.id ? arrowUp : arrowDown}
              style={{ width: 20, height: 20 }}
            />
          </View> */}
          <View
            style={{
              // ...styles.tableCell,
              width: width / 4,
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: 'rgba(217, 217, 217, 0.70)',
            }}
          >
            <Image
              source={isAdditDataOpen && selectedIndex === item.id ? arrowUp : arrowDown}
              style={{ width: 20, height: 20 }}
            />
            <SimpleText
              style={{
                fontFamily: isAdditDataOpen && selectedIndex === item.id ? 'Mont_SB' : 'Mont',
              }}
            >
              {item.id}
            </SimpleText>
          </View>
          <View style={{ ...styles.tableCell, width: width / 4 }}>
            <SimpleText
              style={{
                fontFamily: isAdditDataOpen && selectedIndex === item.id ? 'Mont_SB' : 'Mont',
              }}
            >
              {item.amount ? item.amount + '.00' : '0.00'}
            </SimpleText>
          </View>
          <View style={{ ...styles.tableCell, width: 70 }}>
            <SimpleText
              style={{
                fontFamily: isAdditDataOpen && selectedIndex === item.id ? 'Mont_SB' : 'Mont',
              }}
            >
              {item.mode}
            </SimpleText>
          </View>
          <View
            style={{
              ...styles.tableCellStatus,
              // width: width / 4,
              backgroundColor:
                item.status === 'approved'
                  ? '#D2FFA4'
                  : item.status === 'declined'
                  ? '#FFCCCC'
                  : '#FDFF96',
            }}
          >
            <SimpleText
              style={{
                fontFamily: isAdditDataOpen && selectedIndex === item.id ? 'Mont_SB' : 'Mont',
              }}
            >
              {item.status}
            </SimpleText>
          </View>
        </View>
        {isAdditDataOpen && selectedIndex === item.id && (
          <View style={styles.additDataHeader}>
            <Image source={arrowUp} style={{ width: 32, height: 32 }} />
          </View>
        )}
      </TouchableOpacity>
      {isAdditDataOpen && selectedIndex === item.id && (
        <View
          onStartShouldSetResponder={() => true}
          style={{
            marginLeft: 10,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: 'rgba(217, 217, 217, 0.70)',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              ...styles.tableCell,
              width: width / 3,
              paddingVertical: 0,
              borderBottomWidth: 0,
            }}
          >
            <View style={styles.additDataCell}>
              <SimpleText>ID</SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>
                <FormattedMessage id={'transactions.merchant_order_id'} />
              </SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>
                <FormattedMessage id={'common.date'} />
              </SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>
                <FormattedMessage id={'transactions.api_key_name'} />
              </SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>
                <FormattedMessage id={'transactions.mode'} />
              </SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>
                <FormattedMessage id={'common.description'} />
              </SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>
                <FormattedMessage id={'transactions.status'} />
              </SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>
                <FormattedMessage id={'transactions.amount'} />
              </SimpleText>
            </View>
          </View>
          <View
            style={{
              ...styles.tableCellStatus,
              paddingVertical: 0,
            }}
          >
            <View style={styles.additDataCellValues}>
              <SimpleText>{item.id}</SimpleText>
            </View>
            <View style={styles.additDataCellValues}>
              <SimpleText>{item.orderId}</SimpleText>
            </View>
            <View style={styles.additDataCellValues}>
              <SimpleText>{validTextShow(item.updatedAt)}</SimpleText>
            </View>
            <View style={styles.additDataCellValues}>
              <SimpleText>{item.apiKey.name}</SimpleText>
            </View>
            <View style={styles.additDataCellValues}>
              <SimpleText>{item.mode}</SimpleText>
            </View>
            <View style={styles.additDataCellValues}>
              <SimpleText>{item.message}</SimpleText>
            </View>
            <View
              style={{
                ...styles.additDataCellValues,
                backgroundColor:
                  item.status === 'approved'
                    ? '#D2FFA4'
                    : item.status === 'declined'
                    ? '#FFCCCC'
                    : '#FDFF96',
              }}
            >
              <SimpleText>{item.status}</SimpleText>
            </View>
            <View style={{ ...styles.additDataCellValues, borderBottomWidth: 0 }}>
              <SimpleText>{`${item.amount ? item.amount + '.00' : '0.00'} ${
                item.currency
              }`}</SimpleText>
            </View>
          </View>
        </View>
      )}
    </>
  );

  return (
    // <ScrollView>
    <TouchableWithoutFeedback onPress={handleBlur}>
      <View style={styles.wrapper}>
        {!isFiltersVisible && (
          <View style={styles.title}>
            <SimpleText style={{ fontSize: 34, fontFamily: 'Mont_SB' }}>
              <FormattedMessage id={'transactions.transactions'} />
            </SimpleText>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: isFiltersVisible
              ? 'flex-start'
              : genReportTransactionFilters.length
              ? 'space-between'
              : 'center',
            paddingLeft: isFiltersVisible ? 20 : genReportTransactionFilters.length > 0 ? 30 : 0,
            paddingTop: isFiltersVisible ? 17 : genReportTransactionFilters.length > 0 ? 17 : 0,
            paddingBottom: isFiltersVisible ? 17 : genReportTransactionFilters.length > 0 ? 17 : 28,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsFiltersVisible((prev) => !prev)}
            style={{
              position: 'relative',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <SimpleText style={{ fontFamily: 'Mont_SB' }}>
              <FormattedMessage id={'common.filters'} />
            </SimpleText>
            <Image
              source={isFiltersVisible ? arrowUp : arrowDown}
              style={{ width: 20, height: 20 }}
            />
            {!isFiltersVisible && genReportTransactionFilters.length > 0 && (
              <View style={styles.filterBadge}>
                <SimpleText style={{ fontFamily: 'Mont_SB', fontSize: 10, color: '#fff' }}>
                  {genReportTransactionFilters.length}
                </SimpleText>
              </View>
            )}
          </TouchableOpacity>
          {!isFiltersVisible && genReportTransactionFilters.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setGenReportTransactionFilters([]);
              }}
              style={{ marginRight: 24 }}
            >
              <SimpleText style={{ color: '#FC595A', letterSpacing: 0.48 }}>
                <FormattedMessage id={'common.reset'} />
              </SimpleText>
            </TouchableOpacity>
          )}
        </View>

        {isFiltersVisible && (
          <ClientsTransactionsFilters
            // isActive=""
            filtersDots={filtersDots}
            isMerchApiKeyAvailable={isMerchApiKeyAvailable}
          />
        )}

        <View
          style={{
            ...styles.tableRow,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(217, 217, 217, 0.70)',
            backgroundColor: '#F4F4F4',
          }}
        >
          {/* <View style={{ width: 20 }}></View> */}
          <View style={{ ...styles.tableHeaderCell, width: width / 4, alignItems: 'center' }}>
            <SimpleText style={styles.headerText}>
              <FormattedMessage id={'transactions.int_id'} />
            </SimpleText>
          </View>
          <View style={{ ...styles.tableHeaderCell, width: width / 4, alignItems: 'center' }}>
            <SimpleText style={styles.headerText}>
              <FormattedMessage id={'transactions.amount'} />
            </SimpleText>
          </View>
          <View style={{ ...styles.tableHeaderCell, width: 70, alignItems: 'center' }}>
            <SimpleText style={styles.headerText}>
              <FormattedMessage id={'transactions.mode'} />
            </SimpleText>
          </View>
          <View style={{ ...styles.tableCellStatus, alignItems: 'center' }}>
            <SimpleText style={styles.headerText}>
              <FormattedMessage id={'transactions.status'} />
            </SimpleText>
          </View>
        </View>
        {isLoading || isTransactionsWithFilterLoading ? (
          <MainLoader isVisible={true} />
        ) : data && data.length > 0 ? (
          <FlatList
            data={data}
            refreshControl={
              <RefreshControl
                isRefreshing={isLoading}
                onRefresh={getTableData}
                colors={['transparent']} // for android
                tintColor={'transparent'} // for ios
              />
            }
            renderItem={({ item, index }) => flatListRenderModule(item, index)}
          />
        ) : (
          <View style={{ marginTop: 70, justifyContent: 'center', alignItems: 'center' }}>
            <SimpleText style={{ fontSize: 20, fontFamily: 'Mont_SB' }}>
              <FormattedMessage id={'transactions.not_found'} />
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
    </TouchableWithoutFeedback>
    // </ScrollView>
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
  tableRow: { paddingLeft: 10 },
  tableHeaderCell: { paddingVertical: 15, paddingHorizontal: 5 },
  tableCell: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    // alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(217, 217, 217, 0.70)',
  },
  tableCellStatus: { flex: 1, lineHeight: 20, paddingLeft: 15, paddingVertical: 15 },
  additDataCell: {
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  additDataCellValues: {
    height: 40,
    paddingLeft: 23,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderBottomColor: 'rgba(217, 217, 217, 0.40);',
    borderBottomWidth: 1,
    justifyContent: 'center',
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
});

export default ClientsTransactionsScreen;
