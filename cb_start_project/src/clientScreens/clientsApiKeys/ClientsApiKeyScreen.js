import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { getApiData } from 'src/redux/content/operations';
import { getApiInfo } from 'src/redux/content/selectors';

import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import Pagination from 'src/components/molecules/Pagination';
import { useNavigation } from '@react-navigation/native';
import MainLoader from 'src/components/molecules/MainLoader';
import { useState, useEffect } from 'react';

const arrowDown = require('src/images/arrow_down_small.png');
const arrowUp = require('src/images/arrow_up.png');

const ClientsApiKeys = (props) => {
  const dispatch = useDispatch();
  const apiData = useSelector(getApiInfo);

  const [data, setData] = useState(null);
  const [isAdditDataOpen, setIsAdditDataOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const { width } = Dimensions.get('window');

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
    if (props.searchApi === '' && !isKeyboardVisible) {
      props.setIsSearchVisible(false);
      Keyboard.dismiss();
    }
    if (
      (props.route.params && props.route.params.isRefresh) ||
      props.searchApi ||
      props.searchApi === ''
    ) {
      setCurrentPage(1);
      getCurrentPageData(1);
    }
  }, [props.route.params, props.searchApi]);

  useEffect(() => {
    getCurrentPageData();
  }, [currentPage]);

  const getCurrentPageData = async (page) => {
    setIsLoading(true);
    if (props.searchApi) {
      await dispatch(getApiData({ page: page ? page : currentPage, searchText: props.searchApi }));
    } else {
      await dispatch(getApiData({ page: page ? page : currentPage }));
    }
  };

  useEffect(() => {
    if (apiData) {
      const pages = Math.ceil(apiData.totalCount / 100);
      setTotalPages(pages);
      setData(apiData.items);
      setIsLoading(false);
    }
  }, [apiData]);

  const handleExpandRow = (index) => {
    setIsAdditDataOpen((prev) => !prev);
    setSelectedIndex(index);
  };

  const handleBlur = async () => {
    if (!props.searchApi && isKeyboardVisible) {
      setIsLoading(true);
      props.setIsSearchVisible(false);
      await dispatch(getApiData({ page: 1 }));
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
            height: isAdditDataOpen && selectedIndex === item.id ? 45 : 40,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor:
              isAdditDataOpen && selectedIndex === item.id
                ? '#F4F4F4'
                : index % 2 !== 0
                ? '#FAFAFA'
                : '#fff',
            borderBottomWidth: isAdditDataOpen && selectedIndex === item.id ? 0 : 1,
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
            <SimpleText
              style={{
                fontFamily: isAdditDataOpen && selectedIndex === item.id ? 'Mont_SB' : 'Mont',
              }}
            >
              {item.name}
            </SimpleText>
          </View>
        </View>
      </TouchableOpacity>
      {isAdditDataOpen && selectedIndex === item.id && (
        <View
          onStartShouldSetResponder={() => true}
          style={{
            paddingLeft: 15,
            paddingVertical: 5,

            backgroundColor: '#F4F4F4',
            alignItems: 'center',
          }}
        >
          <View style={styles.additDataLabel}>
            <SimpleText style={{ fontFamily: 'Mont_SB' }}>
              <FormattedMessage id={'api.api_product'} />
            </SimpleText>
          </View>

          <View
            style={{
              paddingLeft: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{ ...styles.tableCell, width: width / 3, paddingVertical: 0 }}>
              <View style={styles.additDataCell}>
                <SimpleText>
                  <FormattedMessage id={'api.api_id'} />
                </SimpleText>
              </View>
            </View>
            <View
              style={{
                paddingVertical: 0,
                flex: 1,
              }}
            >
              <View style={styles.additDataCellValues}>
                <SimpleText>{item.id}</SimpleText>
              </View>
            </View>
          </View>
          <View style={styles.additDataLabel}>
            <SimpleText style={{ fontFamily: 'Mont_SB', marginTop: 10 }}>
              <FormattedMessage id={'api.api_info'} />
            </SimpleText>
          </View>
          <View
            style={{
              paddingLeft: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{ ...styles.tableCell, width: width / 3, paddingVertical: 0 }}>
              <View style={styles.additDataCell}>
                <SimpleText>
                  <FormattedMessage id={'api.api_key'} />
                </SimpleText>
              </View>
              <View style={styles.additDataCell}>
                <SimpleText>
                  <FormattedMessage id={'api.api_secret'} />
                </SimpleText>
              </View>
            </View>
            <View
              style={{
                paddingVertical: 0,
                flex: 1,
              }}
            >
              <View style={styles.additDataCellValues}>
                <SimpleText>{item.apiKey}</SimpleText>
              </View>
              <View style={{ ...styles.additDataCellValues }}>
                <SimpleText>{item.apiSecret}</SimpleText>
              </View>
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
              <FormattedMessage id={'common.name'} />
            </SimpleText>
          </View>
        </View>
        {isLoading ? (
          <MainLoader isVisible={isLoading} />
        ) : data && data.length > 0 ? (
          <FlatList
            data={data}
            refreshControl={
              <RefreshControl
                isRefreshing={isLoading}
                onRefresh={getCurrentPageData}
                colors={['transparent']} // for android
                tintColor={'transparent'} // for ios
              />
            }
            renderItem={({ item, index }) => flatListRenderModule(item, index)}
          />
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
  titleWrapper: { marginTop: 30, marginBottom: 30, paddingLeft: 20 },
  titleText: { fontFamily: 'Mont_SB', fontSize: 34 },
  headerText: { fontFamily: 'Mont_SB', textAlign: 'center' },
  tableRow: {
    height: 40,
    paddingLeft: 15,
    borderBottomColor: 'rgba(217, 217, 217, 0.70)',
  },
  tableCell: { height: 40, paddingHorizontal: 0, justifyContent: 'center' },
  actionsCell: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  additDataCell: {
    height: 50,
    paddingLeft: 0,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
  },
  additDataCellValues: {
    flex: 1,
    height: 50,
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 5,
    backgroundColor: '#F4F4F4',
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
  additDataLabel: {
    // marginTop: 10,
    // marginBottom: 10,
    width: '100%',
  },
});

export default ClientsApiKeys;
