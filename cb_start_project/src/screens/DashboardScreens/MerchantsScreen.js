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
import { FormattedMessage } from 'react-intl';
import SimpleText from '../../components/atoms/SimpleText';

const arrowRight = require('src/images/right.png');

const MerchantsScreen = ({ route, setPaymentsFilter, setTransactionFilter }) => {
  const [radioSelect, setRadioSelect] = useState({ value: 'All merchants' });

  const reportType = route.params.type.value;

  const data = [
    { value: 'All merchants' },
    { value: 'Getapay' },
    { value: 'XXXX' },
    { value: 'Impaya' },
    { value: 'MB' },
    { value: 'tlwsn' },
    { value: 'testCreateUser3' },
    { value: 'testCreateUser4' },
    { value: 'testCreateUser8' },
    { value: 'testCreateUser11' },
    { value: 'unlim' },
  ];

  const navigation = useNavigation();

  useEffect(() => {
    switch (reportType) {
      case 'Payments':
        setPaymentsFilter('merchant', radioSelect.value);
        break;
      case 'Transactions':
        setTransactionFilter('merchant', radioSelect.value);
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
            // defaultValue={[{ value: 'XXXX' }]}
            styling={{ size: 18, spaceBetween: 34 }}
            isFirstBoxAll={true}
          /> */}
          <RadioList
            data={data}
            onSelect={setRadioSelect}
            defaultValue={{ value: 'All merchants' }}
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

export default MerchantsScreen;
