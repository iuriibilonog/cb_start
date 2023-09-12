import { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import SimpleText from '../atoms/SimpleText';

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
      {data.length > 0 &&
        data.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={{ ...styles.radioBoxItem, marginBottom: spaceBetween }}
              onPress={() => selectHandler(item)}
            >
              <Image
                source={selection.username === item.username ? radioFilled : radioBlank}
                style={styles.radio}
              />
              <SimpleText
                style={{
                  ...styles.itemText,
                  fontSize: size,
                  opacity: selection.username === item.username ? 1 : 0.5,
                  fontFamily: selection.username === item.username ? 'Mont_SB' : 'Mont',
                }}
              >
                {item.username}
              </SimpleText>
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
  itemText: { letterSpacing: 0.3, fontSize: 16, lineHeight: 18 },
});

export default RadioList;
