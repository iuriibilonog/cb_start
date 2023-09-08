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

const arrowRight = require('src/images/right.png');

const MerchantsScreen = () => {
  const [checkBoxSelect, setCheckBoxSelect] = useState([]);
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
    console.log('Checkbox selected:', checkBoxSelect);
  }, [checkBoxSelect]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.radioBoxContainer}>
          <CheckBoxList
            data={data}
            onSelect={setCheckBoxSelect}
            // defaultValue={[{ value: 'XXXX' }]}
            styling={{ size: 18, spaceBetween: 34 }}
            isFirstBoxAll={true}
          />
        </View>

        <TouchableOpacity activeOpacity={0.5} onPress={() => {}} style={{ width: 140 }}>
          <View style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Download</Text>
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
    fontSize: 16,
    letterSpacing: 0.48,
    fontWeight: '700',
    color: '#fff',
  },
});

export default MerchantsScreen;
