import { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const radioBlank = require('src/images/radio_blank.png');
const radioFilled = require('src/images/radio_filled.png');
const Radio = ({ data, onSelect, defaultValue }) => {
  const [selection, setSelection] = useState(defaultValue);
  const selectHandler = (item) => {
    setSelection(item);
    onSelect(item);
  };

  return (
    <View>
      {data.map((item, index) => {
        return (
          <Pressable key={index} style={styles.radioBoxItem} onPress={() => selectHandler(item)}>
            <Image
              source={selection.value === item.value ? radioFilled : radioBlank}
              style={styles.radio}
            />
            <Text
              style={{
                ...styles.itemText,
                opacity: selection.value === item.value ? 1 : 0.5,
                fontWeight: selection.value === item.value ? '700' : '600',
              }}
            >
              {item.value}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  radioBoxContainer: {
    backgroundColor: '#fff',
  },
  radioBoxItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  radio: { width: 24, height: 24, marginRight: 14 },
  itemText: { fontSize: 18, letterSpacing: 0.3 },
});

export default Radio;
