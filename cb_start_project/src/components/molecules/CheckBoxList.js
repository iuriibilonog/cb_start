import { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const checkboxBlank = require('src/images/dark_box_empty.png');
const checkboxFilled = require('src/images/dark_box_checked.png');

const CheckBoxList = ({
  data,
  onSelect,
  defaultValue = [],
  styling = {},
  isFirstBoxAll = false,
}) => {
  const [selection, setSelection] = useState(defaultValue);

  const { size = 18, spaceBetween = 18 } = styling;
  const selectHandler = (item, index) => {
    console.log('selection', selection);
    console.log('item', item);
    const isItemPresent = selection.find((i) => i.value === item.value);
    const withoutItem = selection.filter((i) => i.value !== item.value);
    switch (isFirstBoxAll) {
      case true:
        if (index !== 0) {
          setSelection((prev) =>
            isItemPresent ? withoutItem.filter((i) => i.value !== data[0].value) : [...prev, item]
          );
          onSelect((prev) =>
            isItemPresent ? withoutItem.filter((i) => i.value !== data[0].value) : [...prev, item]
          );
        } else {
          setSelection((prev) => (isItemPresent ? [] : [...data]));
          onSelect((prev) => (isItemPresent ? [] : [...data]));
        }
        break;
      case false:
        setSelection((prev) => (isItemPresent ? withoutItem : [...prev, item]));
        onSelect((prev) => (isItemPresent ? withoutItem : [...prev, item]));
        break;
    }
    // setSelection((prev) =>
    //   prev.find((i) => item.value === item.value)
    //     ? [prev.filter((i) => i.value !== item.value)]
    //     : [...prev, item]
    // );
    // onSelect([...selection, item]);
  };

  return (
    <View>
      {data.map((item, index) => {
        return (
          <Pressable
            key={index}
            style={{ ...styles.checkboxItem, marginBottom: spaceBetween }}
            onPress={() => selectHandler(item, index)}
          >
            <Image
              source={
                selection.find((i) => i.value === item.value) ? checkboxFilled : checkboxBlank
              }
              style={styles.checkbox}
            />
            <Text
              style={{
                ...styles.itemText,
                fontSize: size,
                opacity: selection.find((i) => i.value === item.value) ? 1 : 0.5,
                fontWeight: selection.find((i) => i.value === item.value) ? '700' : '600',
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
  checkboxItem: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 24, height: 24, marginRight: 14 },
  itemText: { letterSpacing: 0.3 },
});

export default CheckBoxList;
