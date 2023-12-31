import { Text, View, Image, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import SimpleText from './SimpleText';
import { FormattedMessage } from 'react-intl';

const plusIcon = require('src/images/plus_white.png');
const SimpleButton = (props) => {
  const { text, plus, style = {}, textStyle = {} } = props;
  return (
    <View style={{ ...styles.wrapper, ...style }}>
      {plus && <Image source={plusIcon} style={styles.image} />}
      <SimpleText style={{ ...styles.text, ...textStyle }}>
        <FormattedMessage id={text} />
      </SimpleText>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0BA39A',
    borderRadius: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height:44,
  },
  text: { fontFamily: 'Mont_SB', color: '#fff' },
  image: { width: 24, height: 24, marginRight: 8 },
});

export default SimpleButton;
