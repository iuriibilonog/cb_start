import { Text, View, Image, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import SimpleText from '../atoms/SimpleText';

const arrowDown = require('src/images/arrow_down.png');
const deleteIcon = require('src/images/delete.png');

const FiltersDropdown = (props) => {
  const [isOpen, setIsOpen] = useState(props.isVisible ? true : false);
  const [value, setValue] = useState({});
  const [data, setData] = useState([]);

  const { WIDTH = 167, HEIGHT = 42 } = props;

  useEffect(() => {
    if (props.data) {
      setData(props.data);
      // setValue(props.data[0]);
    }
  }, [props.data]);

  useEffect(() => {
    setIsOpen(props.isVisible ? true : false);
  }, [props.isClickedOutside]);

  const handleDelete = (index, item) => {
    props.onDelete(item);
    // setValue(item);
    // setIsOpen(false);
  };

  // useEffect(() => {
  //   props.value(value);
  // }, [value]);

  return (
    <View>
      <Pressable
        onPress={() => setIsOpen((prev) => (props.isVisible ? true : !prev))}
        style={styles.container}
      >
        <SimpleText style={{ paddingVertical: 3 }}>
          {isOpen ? 'Filters' : 'Selected filters'}
        </SimpleText>
        <View style={styles.arrows}>
          {isOpen ? (
            <SimpleText style={{ letterSpacing: 0.48, color: '#FC595A' }}>
              <FormattedMessage id={'dashboard.reset'} />
            </SimpleText>
          ) : (
            <Image source={isOpen ? arrowUp : arrowDown} style={{ width: 26, height: 26 }} />
          )}
        </View>
      </Pressable>
      {isOpen && (
        <View
          style={{
            ...styles.dropdownMenu,
            maxHeight: 360,
          }}
        >
          <ScrollView nestedScrollEnabled={true}>
            {data &&
              data.map((item, index) => (
                <View key={index} style={styles.itemWrapper}>
                  <SimpleText style={styles.textItem}>
                    {typeof item === 'string'
                      ? item
                      : Array.isArray(item)
                      ? item.join(',')
                      : item.value}
                  </SimpleText>
                  <Pressable
                    onPress={() => handleDelete(index, item)}
                    // style={styles.itemWrapper}
                  >
                    <Image source={deleteIcon} style={{ width: 24, height: 24 }} />
                  </Pressable>
                </View>
              ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 40,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 20,
    paddingVertical: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrows: {},
  dropdownMenu: {
    paddingHorizontal: 20,
    backgroundColor: '#F4F4F4',
    paddingBottom: 16,
  },
  textItem: {
    paddingVertical: 8,
    color: 'rgba(38, 38, 38, 0.50)',
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
});

export default FiltersDropdown;
