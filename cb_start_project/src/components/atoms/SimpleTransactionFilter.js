import { View, Text, StyleSheet, Image } from 'react-native';
import SimpleText from './SimpleText';
import { FormattedMessage } from 'react-intl';

const calendarActive = require('src/images/filters/calendar_active.png');
const calendar = require('src/images/filters/calendar.png');
const banksActive = require('src/images/filters/bank_active.png');
const banks = require('src/images/filters/bank.png');
const statusActive = require('src/images/filters/status_active.png');
const status = require('src/images/filters/status.png');
const clockActive = require('src/images/filters/clock_active.png');
const clock = require('src/images/filters/clock.png');
const keyActive = require('src/images/filters/key_active.png');
const key = require('src/images/filters/key.png');
const userActive = require('src/images/filters/user_active.png');
const user = require('src/images/filters/user.png');
const moneyActive = require('src/images/filters/money_active.png');
const money = require('src/images/filters/money.png');
const transactionActive = require('src/images/filters/transaction_active.png');
const transaction = require('src/images/filters/transaction.png');

const SimpleTransactionFilter = ({ type, isActive, isDot }) => {
  let imgSource;
  let activeImgSource;
  switch (type) {
    case 'date':
      imgSource = calendar;
      activeImgSource = calendarActive;
      break;
    case 'banks':
      imgSource = banks;
      activeImgSource = banksActive;
      break;
    case 'status':
      imgSource = status;
      activeImgSource = statusActive;
      break;
    case 'gmt':
      imgSource = clock;
      activeImgSource = clockActive;
      break;
    case 'key':
      imgSource = key;
      activeImgSource = keyActive;
      break;
    case 'merchants':
      imgSource = user;
      activeImgSource = userActive;
      break;
    case 'currency':
      imgSource = money;
      activeImgSource = moneyActive;
      break;
    case 'mode':
      imgSource = transaction;
      activeImgSource = transactionActive;
      break;
  }
  return (
    <View style={styles.filterWrapper}>
      {activeImgSource && imgSource && (
        <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <View
            style={{
              position: 'relative',
              width: 28,
              height: 28,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={isActive ? activeImgSource : imgSource}
              style={{ ...styles.image, width: isActive ? 27 : 24, height: isActive ? 27 : 24 }}
            />
            {isDot && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 10,
                  height: 10,
                  backgroundColor: '#36D0BB',
                  borderRadius: 5,
                }}
              />
            )}
          </View>
          <SimpleText
            style={{
              ...styles.text,
              color: isActive ? '#36D0BB' : '#BAC0D0',
              marginTop: 7,
              textAlign: 'center',
            }}
          >
            <FormattedMessage id={`filters.${type}`} />
          </SimpleText>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242834',
    height: 174,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  filterWrapper: { alignItems: 'center' },

  filtersCol: {},
  image: { width: 24, height: 24, marginBottom: 7 },
  text: { color: '#BAC0D0', fontSize: 10, letterSpacing: 0.5 },
});

export default SimpleTransactionFilter;
