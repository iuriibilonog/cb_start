import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RadioList from 'src/components/molecules/RadioList';
import CheckBoxList from 'src/components/molecules/CheckBoxList';
import SimpleText from '../../components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';

const arrowRight = require('src/images/right.png');

const StatusScreen = ({ route, setPaymentsFilter, setTransactionFilter }) => {
  const [radioSelect, setRadioSelect] = useState({ value: 'All' });
  const reportType = route.params.type.value;
  const data = [
    { value: 'All' },
    { value: 'declined' },
    { value: 'approved' },
    { value: 'procesing' },
    { value: 'new' },
  ];

  const navigation = useNavigation();

  useEffect(() => {
    switch (reportType) {
      case 'Payments':
        setPaymentsFilter('status', radioSelect.value);
        break;
      case 'Transactions':
        setTransactionFilter('status', radioSelect.value);
        break;

      default:
        break;
    }
  }, [radioSelect]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.radioBoxContainer}>
          {/* <CheckBoxList
            data={data}
            onSelect={setCheckBoxSelect}
            styling={{ size: 18, spaceBetween: 34 }}
            isFirstBoxAll={true}
          /> */}
          <RadioList
            data={data}
            onSelect={setRadioSelect}
            defaultValue={{ value: 'All' }}
            styling={{ size: 18, spaceBetween: 34 }}
          />
        </View>

        <TouchableOpacity activeOpacity={0.5} onPress={() => {}} style={{ width: 140 }}>
          <View style={styles.submitBtn}>
            <SimpleText style={styles.submitBtnText}>
              <FormattedMessage id={'dashboard.download'} />
            </SimpleText>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,

    paddingVertical: 50,
  },
  radioBoxContainer: {
    backgroundColor: '#fff',
    maxWidth: Dimensions.get('window').width - 80,
  },

  submitBtn: {
    height: 44,
    width: 175,
    marginTop: 16,
    borderRadius: 2,
    backgroundColor: '#0BA39A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    letterSpacing: 0.48,
    fontFamily: 'Mont_SB',
    color: '#fff',
  },
});

export default StatusScreen;
