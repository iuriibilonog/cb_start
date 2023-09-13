import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactionData } from 'src/redux/content/operations';
import { getTransactionInfo } from 'src/redux/content/selectors';
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
} from 'react-native';
import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';

const cardholder = require('src/images/master_card.png');

const CardholderScreen = ({ navigation, id = 416989 }) => {
  const dispatch = useDispatch();
  const transactionInfo = useSelector(getTransactionInfo);

  const [data, setData] = useState(null);

  useEffect(() => {
    dispatch(getTransactionData());
  }, []);

  useEffect(() => {
    if (transactionInfo) {
      setData(transactionInfo.find((item) => item.id === id));
    }
  }, [transactionInfo]);

  const { width } = Dimensions.get('window');

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View
          style={{
            alignItems: 'left',
            justifyContent: 'center',
            paddingVertical: 28,
          }}
        >
          <SimpleText style={{ fontFamily: 'Mont_SB', fontSize: 24 }}>Details payment</SimpleText>
          <View style={{ position: 'relative' }}>
            <Image source={cardholder} style={{ width: 350, height: 197, marginTop: 30 }} />
            {data && (
              <View style={{ position: 'absolute', top: 135, left: 22 }}>
                <SimpleText
                  style={{
                    color: 'rgba(189, 189, 189, 0.60)',
                    fontSize: 20,
                    fontFamily: 'Mont_SB',
                    letterSpacing: 9,
                  }}
                >
                  {data.cardNumber}
                </SimpleText>
              </View>
            )}
            {data && (
              <View style={{ position: 'absolute', top: 190, left: 22 }}>
                <SimpleText
                  style={{
                    color: 'rgba(190, 190, 190, 0.60)',
                    fontSize: 13,
                    fontFamily: 'Mont_SB',
                    textTransform: 'uppercase'
                  }}
                >
                  {data.customerFirstName} {data.customerLastName}
                </SimpleText>
              </View>
            )}
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              ...styles.tableCol,
              width: width / 2,
              backgroundColor: '#fff',
            }}
          >
            <SimpleText style={styles.titlesTxt}>
              <FormattedMessage id={'transactions.card.number'} />:
            </SimpleText>

            <SimpleText style={styles.titlesTxt}>
              <FormattedMessage id={'transactions.card.card_holder'} />:
            </SimpleText>

            <SimpleText style={styles.titlesTxt}>
              <FormattedMessage id={'transactions.customer.first_name'} />:
            </SimpleText>

            <SimpleText style={styles.titlesTxt}>
              <FormattedMessage id={'transactions.customer.last_name'} />:
            </SimpleText>

            <SimpleText style={styles.titlesTxt}>
              <FormattedMessage id={'transactions.customer.email'} />:
            </SimpleText>

            <SimpleText style={styles.titlesTxt}>
              <FormattedMessage id={'transactions.customer.phone'} />:
            </SimpleText>

            <SimpleText style={styles.titlesTxt}>
              <FormattedMessage id={'transactions.card.bin'} />:
            </SimpleText>

            <SimpleText style={styles.titlesTxt}>
              <FormattedMessage id={'transactions.card.brand'} />:
            </SimpleText>

            <SimpleText style={styles.titlesTxt}>
              <FormattedMessage id={'transactions.card.country'} />:
            </SimpleText>

            <SimpleText style={styles.titlesTxt}>
              <FormattedMessage id={'transactions.card.issuer'} />:
            </SimpleText>
          </View>
          {data && (
            <View
              style={{
                ...styles.tableCol,
                width: width / 2,
                backgroundColor: '#fff',
              }}
            >
              <SimpleText style={styles.valuesTxt}>{data.cardNumber}</SimpleText>

              <SimpleText style={styles.valuesTxt}>{data.cardHolder}</SimpleText>

              <SimpleText style={styles.valuesTxt}>{data.customerFirstName}</SimpleText>

              <SimpleText style={styles.valuesTxt}>{data.customerLastName}</SimpleText>

              <SimpleText style={styles.valuesTxt}>{data.customerEmail}</SimpleText>

              <SimpleText style={styles.valuesTxt}>{data.customerPhone}</SimpleText>

              <SimpleText style={styles.valuesTxt}>{data.bin.bin}</SimpleText>

              <SimpleText style={styles.valuesTxt}>{data.bin.brand}</SimpleText>

              <SimpleText style={styles.valuesTxt}>{data.bin.country}</SimpleText>

              <SimpleText style={styles.valuesTxt}>{data.bin.issuer}</SimpleText>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  titlesTxt: { height: 50, paddingRight: 20 },
  valuesTxt: { height: 50, paddingRight: 30, fontFamily: 'Mont_SB' },
  tableCol: {},

  tableCell: { paddingVertical: 15, paddingHorizontal: 5 },
  tableCellStatus: { flex: 1, paddingVertical: 15, paddingLeft: 15 },
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
});

export default CardholderScreen;