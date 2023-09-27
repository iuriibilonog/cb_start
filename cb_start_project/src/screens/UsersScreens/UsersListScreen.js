import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersByPage } from 'src/redux/content/operations';
import { usersByPage } from 'src/redux/content/selectors';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';
import Pagination from 'src/components/molecules/Pagination';
import SimpleButton from 'src/components/atoms/SimpleButton';
import { useNavigation } from '@react-navigation/native';

const deleteIcon = require('src/images/delete.png');
const deleteInactiveIcon = require('src/images/delete_inactive.png');
const arrowDown = require('src/images/arrow_down_small.png');
const arrowUp = require('src/images/arrow_up.png');
const editIcon = require('src/images/edit.png');
const editInactiveIcon = require('src/images/edit_inactive.png');

const UsersListScreen = (props) => {
  const dispatch = useDispatch();
  const usersData = useSelector(usersByPage);

  const [data, setData] = useState(null);
  const [isAdditDataOpen, setIsAdditDataOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const { width } = Dimensions.get('window');

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getUsersByPage(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (props.route.params && props.route.params.isRefresh) {
      dispatch(getUsersByPage(currentPage));
    }
  }, [props.route.params]);

  useEffect(() => {
    if (usersData) {
      console.log('totalCount', usersData.totalCount);
      const pages = Math.ceil(usersData.totalCount / 20);
      setTotalPages(pages);
      setData(usersData.items);
    }
  }, [usersData]);

  const handleExpandRow = (index) => {
    setIsAdditDataOpen((prev) => !prev);
    setSelectedIndex(index);
  };

  const handleNavigate = (user) => {
    console.log('props', user);
    navigation.navigate('UserScreen', { user: user });
  };

  const showDate = (date) => {
    return date.slice(0, 10).replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
  };

  const flatListRenderModule = (item, index) => (
    <>
      {/* <TouchableOpacity activeOpacity={0.5} onPress={() => handleExpandRow(item.id)}> */}
      <TouchableOpacity activeOpacity={0.5}>
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
          <TouchableOpacity activeOpacity={0.5} onPress={() => handleExpandRow(item.id)}>
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
          </TouchableOpacity>
          <View style={{ ...styles.tableCell, flex: 1 }}>
            <Pressable onPress={() => handleNavigate(item)}>
              <SimpleText
                style={{
                  fontFamily: isAdditDataOpen && selectedIndex === item.id ? 'Mont_SB' : 'Mont',
                }}
              >
                {item.username}
              </SimpleText>
            </Pressable>
          </View>

          <TouchableOpacity
            activeOpacity={isAdditDataOpen && selectedIndex === item.id ? 0.5 : 1}
            onPress={() => isAdditDataOpen && selectedIndex === item.id && handleDelete(item)}
          >
            <View
              style={{
                ...styles.tableCell,
                width: 100,
                // height: 40,
              }}
            >
              <SimpleText
                style={{
                  fontFamily: isAdditDataOpen && selectedIndex === item.id ? 'Mont_SB' : 'Mont',
                }}
              >
                <FormattedMessage
                  id={`common.${
                    item.roleId === 1 ? 'merchant' : item.roleId === 2 ? 'support' : 'admin'
                  }`}
                />
              </SimpleText>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {isAdditDataOpen && selectedIndex === item.id && (
        <View
          style={{
            paddingLeft: 15,
            flexDirection: 'row',
            backgroundColor: '#F4F4F4',
            alignItems: 'center',
          }}
        >
          <View style={{ ...styles.tableCell, width: width / 3, paddingVertical: 0 }}>
            <View style={styles.additDataCell}>
              <SimpleText>
                <FormattedMessage id={'users.reg_date'} />
              </SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>
                <FormattedMessage id={'users.ledgers'} />
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
              <SimpleText>{showDate(item.createdAt)}</SimpleText>
            </View>
            <View style={{ ...styles.additDataCellValues, borderBottomWidth: 0 }}>
              <SimpleText></SimpleText>
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
          <FormattedMessage id={'common.users'} />
        </SimpleText>
        <TouchableOpacity activeOpacity={0.5}>
          <SimpleButton plus text={<FormattedMessage id={'users.new_user'} />} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 50,
          paddingHorizontal: 15,
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
        <View style={{ ...styles.tableCell, width: 100 }}>
          <SimpleText style={styles.headerText}>
            <FormattedMessage id={'common.role'} />
          </SimpleText>
        </View>
      </View>
      {data && data.length > 0 ? (
        <FlatList data={data} renderItem={({ item, index }) => flatListRenderModule(item, index)} />
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
  titleWrapper: {
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: { fontFamily: 'Mont_SB', fontSize: 34 },
  headerText: { fontFamily: 'Mont_SB', textAlign: 'center' },
  tableRow: {
    height: 40,
    paddingHorizontal: 10,
    borderBottomColor: 'rgba(217, 217, 217, 0.70)',
  },
  tableCell: { height: 40, paddingHorizontal: 5, justifyContent: 'center' /* , borderWidth:1 */ },
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

export default UsersListScreen;