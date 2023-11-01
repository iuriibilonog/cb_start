import { useEffect, useState } from 'react';
import { Image, StyleSheet, TextInput, View, TouchableOpacity, Dimensions } from 'react-native';
import SimpleText from 'src/components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';

const plusIcon = require('src/images/plus.png');
const minusIcon = require('src/images/minus.png');

const DecrementIncrement = (props) => {
  const { title, initialValue = 0, style = {}, name, setDigitsValues } = props;
  const [value, setValue] = useState(0);

  const { width } = Dimensions.get('window');

  useEffect(() => {
    // setValue(initialValue);
  }, []);

  useEffect(() => {
    setDigitsValues({ [name]: value });
  }, [value]);

  const handleSetValue = (text) => {
    if (!text) {
      setValue(0);
      return;
    } else if (text.length > 1 && text.slice(0, 1) === '0') {
      text = text.slice(1);
    }

    if (/^\d+$/.test(text)) {
      setValue(text);
    }
  };

  return (
    <View
      style={{
        justifyContent: 'flex-start',
      }}
    >
      <View style={styles.itemTitle}>
        {title && (
          <SimpleText style={styles.itemTextTitle}>
            <FormattedMessage id={title} /> :
          </SimpleText>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: '#FAFAFA',
          width: width - 40,
        }}
      >
        <TextInput
          style={{ ...styles.textInput }}
          //   autoFocus={false}
          //   keyboardType="numeric"
          value={'' + value}
          onChangeText={handleSetValue}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setValue((prev) => (prev !== 0 ? +prev - 1 : 0))}
        >
          <Image source={minusIcon} style={styles.image} />
        </TouchableOpacity>
        <SimpleText style={{ marginHorizontal: 30, color: 'rgba(0, 0, 0, 0.20)' }}>|</SimpleText>
        <View style={{ marginRight: 9 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => setValue((prev) => +prev + 1)}>
            <Image source={plusIcon} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: { width: 24, height: 24 },
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
    paddingVertical: 13,
    lineHeight: 16,
    fontSize: 16,
    fontFamily: 'Mont',
    color: '#262626',
  },
  itemTitle: { marginBottom: 12 },
  itemTextTitle: { fontSize: 14 },
  image: { width: 24, height: 24 },
});

export default DecrementIncrement;
