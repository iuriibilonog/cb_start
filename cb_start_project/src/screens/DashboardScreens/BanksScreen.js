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
import { useSelector } from 'react-redux';
import { getBanks } from 'src/redux/content/selectors';
import RadioList from 'src/components/molecules/RadioList';
import CheckBoxList from 'src/components/molecules/CheckBoxList';
import SimpleText from '../../components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';

const BanksScreen = ({ setTransactionFilter }) => {
  const [checkBoxSelect, setCheckBoxSelect] = useState([]);
  const [radioSelect, setRadioSelect] = useState({ value: 'All' });
  const [banks, setBanks] = useState([{ value: 'All' }]);

  const navigation = useNavigation();
  const data = useSelector(getBanks);

  useEffect(() => {
    if (!data.length) return;
    const modifyBanks = data.map((item) => ({
      name: item.name,
      value: item.name,
      id: item.id,
    }));
    setBanks((prev) => [...prev, ...modifyBanks]);
    console.log('modifyBanks', modifyBanks);
  }, [data]);

  useEffect(() => {
    setTransactionFilter('banks', { filters: radioSelect, value: radioSelect.value });
  }, [radioSelect]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.radioBoxContainer}>
          <RadioList
            data={banks}
            onSelect={setRadioSelect}
            defaultValue={radioSelect}
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

export default BanksScreen;
