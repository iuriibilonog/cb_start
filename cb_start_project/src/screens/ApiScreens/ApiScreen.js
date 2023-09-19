import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactionData } from 'src/redux/content/operations';
import { getTransactionInfo } from 'src/redux/content/selectors';
import { StyleSheet, View, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import Pagination from '@cherry-soft/react-native-basic-pagination';
import { useNavigation } from '@react-navigation/native';

const deleteIcon = require('src/images/delete.png');
const deleteInactiveIcon = require('src/images/delete_inactive.png');
const arrowDown = require('src/images/arrow_down_small.png');
const arrowUp = require('src/images/arrow_up.png');
const editIcon = require('src/images/edit.png');
const editInactiveIcon = require('src/images/edit_inactive.png');

const ApiScreen = (props) => {
  const dispatch = useDispatch();
  const transactionInfo = useSelector(getTransactionInfo);
  const [data, setData] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    console.log('ApiScreen');

    dispatch(getTransactionData());
  }, []);

  useEffect(() => {
    if (transactionInfo) {
      setData(transactionInfo);
    }
  }, [transactionInfo]);

  const [isAdditDataOpen, setIsAdditDataOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const { width } = Dimensions.get('window');

  //=================================
  //=================================
  const index = 1;

  const handleExpandRow = (index) => {
    setIsAdditDataOpen((prev) => !prev);
    setSelectedIndex(index);
  };

  const handleEdit = (item) => {
    navigation.navigate('EditScreen', { item });
  };

  const handleDelete = (item) => {
    navigation.navigate('DeleteScreen', { item });
  };

  const flatListRenderModule = (item, index) => (
    <>
      <TouchableOpacity activeOpacity={0.5} onPress={() => handleExpandRow(item.id)}>
        <View
          style={{
            ...styles.tableRow,
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
              {item.amount}
            </SimpleText>
          </View>
          <View style={{ ...styles.tableCell, flex: 1 }}>
            <SimpleText
              style={{
                fontFamily: isAdditDataOpen && selectedIndex === item.id ? 'Mont_SB' : 'Mont',
              }}
            >
              {item.status}
            </SimpleText>
          </View>
          <TouchableOpacity
            activeOpacity={isAdditDataOpen && selectedIndex === item.id ? 0.5 : 1}
            onPress={() => isAdditDataOpen && selectedIndex === item.id && handleEdit(item)}
          >
            <View
              style={{
                ...styles.tableCell,
                width: 52,
                alignItems: 'center',
                backgroundColor: isAdditDataOpen && selectedIndex === item.id ? '#FFEFB4' : '#fff',
              }}
            >
              <Image
                source={isAdditDataOpen && selectedIndex === item.id ? editIcon : editInactiveIcon}
                style={{ width: 20, height: 20 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={isAdditDataOpen && selectedIndex === item.id ? 0.5 : 1}
            onPress={() => isAdditDataOpen && selectedIndex === item.id && handleDelete(item)}
          >
            <View
              style={{
                ...styles.tableCell,
                width: 52,
                alignItems: 'center',
                backgroundColor: isAdditDataOpen && selectedIndex === item.id ? '#FFF0F0' : '#fff',
              }}
            >
              <Image
                source={
                  isAdditDataOpen && selectedIndex === item.id ? deleteIcon : deleteInactiveIcon
                }
                style={{ width: 20, height: 20 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {isAdditDataOpen && selectedIndex === item.id && (
        <View
          style={{
            ...styles.tableRow,
            flexDirection: 'row',
            backgroundColor: '#F4F4F4',
            alignItems: 'center',
          }}
        >
          <View style={{ ...styles.tableCell, width: width / 3, paddingVertical: 0 }}>
            <View style={styles.additDataCell}>
              <SimpleText>
                <FormattedMessage id={'api.api_key_name'} />
              </SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>
                <FormattedMessage id={'api.api_key'} />
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
            <View style={{ ...styles.additDataCellValues, borderBottomWidth: 0 }}>
              <SimpleText>{item.orderId}</SimpleText>
            </View>
          </View>
        </View>
      )}
    </>
  );

  return (
    // <ScrollView>

    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <SimpleText style={styles.titleText}>
          <FormattedMessage id={'api.api_keys'} />
        </SimpleText>
      </View>
      <View
        style={{
          ...styles.tableRow,
          flexDirection: 'row',
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
      <FlatList data={data} renderItem={({ item, index }) => flatListRenderModule(item, index)} />
      <Pagination
        totalItems={100}
        pageSize={5}
        currentPage={page}
        // pagesToDisplay={2}
        onPageChange={setPage}
      />
    </View>
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
  tableRow: { paddingLeft: 15 },
  tableCell: { paddingVertical: 15, paddingHorizontal: 5 },
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
  additDataHeader: {
    height: 40,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(ApiScreen);
