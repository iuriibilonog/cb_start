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
import CheckBoxList from 'src/components/molecules/CheckBoxList';
import SimpleText from '../../components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';

const BanksScreen = () => {
  const [checkBoxSelect, setCheckBoxSelect] = useState([]);
  const data = [
    { value: 'All' },
    { value: 'Royal' },
    { value: 'Unlimited' },
    { value: 'Munzen' },
    { value: 'Forta' },
  ];

  const navigation = useNavigation();

  useEffect(() => {
    console.log('Checkbox selected:', checkBoxSelect);
  }, [checkBoxSelect]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.radioBoxContainer}>
          <CheckBoxList
            data={data}
            onSelect={setCheckBoxSelect}
            styling={{ size: 18, spaceBetween: 34 }}
            isFirstBoxAll={true}
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
