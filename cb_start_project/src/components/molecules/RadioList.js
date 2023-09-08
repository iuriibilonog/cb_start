import { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const radioBlank = require('src/images/radio_blank.png');
const radioFilled = require('src/images/radio_filled.png');

const RadioList = ({ data, onSelect, defaultValue, styling = {} }) => {

  const [selection, setSelection] = useState(defaultValue);

  const { size = 18, spaceBetween = 18 } = styling;
  const selectHandler = (item) => {
    setSelection(item);
    onSelect(item);
  };

  return (
    <View>
      {data.map((item, index) => {
        return (
          <Pressable
            key={index}
            style={{ ...styles.radioBoxItem, marginBottom: spaceBetween }}
            onPress={() => selectHandler(item)}
          >
            <Image
              source={selection.value === item.value ? radioFilled : radioBlank}
              style={styles.radio}
            />
            <Text
              style={{
                ...styles.itemText,
                fontSize: size,
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
  radioBoxItem: { flexDirection: 'row', alignItems: 'center' },
  radio: { width: 24, height: 24, marginRight: 14 },
  itemText: { letterSpacing: 0.3 },
});

export default RadioList;
