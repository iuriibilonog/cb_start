import { Text, View, Image, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import SimpleText from '../atoms/SimpleText';

const arrowDown = require('src/images/arrow_down.png');
const arrowUp = require('src/images/arrow_up.png');

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState({});
  const [data, setData] = useState([]);

  const { WIDTH = 167, HEIGHT = 42 } = props;

  useEffect(() => {
    if (props.data) {
      setData(props.data);
      setValue(props.data[0]);
    }
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [props.isOpen]);

  const handleSelect = (index, item) => {
    setValue(item);
    setIsOpen(false);
  };

  useEffect(() => {
    props.value(value);
  }, [value]);

  return (
    <View>
      <Pressable
        onPress={() => setIsOpen((prev) => !prev)}
        style={{ ...styles.container, width: WIDTH, marginBottom: 2 }}
      >
        <SimpleText>{value.title}</SimpleText>
        <View style={styles.arrows}>
          <Image source={isOpen ? arrowUp : arrowDown} style={{ width: 26, height: 26 }} />
        </View>
      </Pressable>
      {isOpen && (
        <View style={{ position: 'relative', zIndex: 999 }}>
          <View
            style={{
              ...styles.dropdownMenu,
              width: WIDTH,
              maxHeight: 226,
              zIndex: 999,
              position: 'absolute',
            }}
          >
            <ScrollView nestedScrollEnabled={true} onScroll={() => console.log('first')}>
              {data &&
                data.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleSelect(index, item)}
                    onBlur={() => {
                      console.log('AAA');
                      setIsOpen(false);
                    }}
                  >
                    <SimpleText
                      style={
                        JSON.stringify(value) === JSON.stringify(item)
                          ? styles.textItemActive
                          : styles.textItem
                      }
                    >
                      {item.title}
                    </SimpleText>
                  </Pressable>
                ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 16,
    paddingVertical: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrows: {},
  dropdownMenu: {
    // flex: 1,
    // position: 'absolute',
    zIndex: 999,
    left: 0,
    top: 0,
    padding: 16,
    // left: 0,
    // top: 44,
    // padding: 16,
    backgroundColor: '#F4F4F4',
  },
  textItem: { padding: 3, color: 'rgba(38, 38, 38, 0.50)' },
  textItemActive: { padding: 3, color: '#262626', fontFamily: 'Mont_SB' },
});

export default Dropdown;
