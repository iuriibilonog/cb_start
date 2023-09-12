import { Text, View, Image, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

const SimpleText = (props) => {
  return <Text style={{ ...styles.initialStyles, ...props.style }}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  initialStyles: { fontFamily: 'Mont', fontSize: 16, color: '#262626' },
});

export default SimpleText;
