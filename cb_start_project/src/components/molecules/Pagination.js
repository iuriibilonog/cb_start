import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import SimpleText from '../atoms/SimpleText';

const arrowLeft = require('src/images/left.png');
const arrowRight = require('src/images/right.png');

const Pagination = ({ totalPages = 10, currentPage = 1, setCurrentPage }) => {
  const [selected, setSelected] = useState(currentPage);
  const [pagesLine, setPagesLine] = useState([1, 2, 3, 4, 5, 6]);

  //   useEffect(() => {
  //     let counter = 0;
  //     const initialArray = new Array(totalPages);
  //     console.log('initialArray', initialArray);
  //     const pagesLine = initialArray.map(() => {
  //       return 3;
  //     });
  //     console.log('pagesLine', pagesLine);
  //     // setPagesLine();
  //   }, []);

  //   useEffect(() => {
  //     console.log('pagesLine', pagesLine);
  //   }, [pagesLine]);

  const arrowRightBtn = () => {
    if (pagesLine.includes(totalPages)) {
      setSelected((prev) => (prev === totalPages ? prev : prev + 1));
      return;
    }

    setPagesLine((prev) => prev.map((i) => i + 1));
    setSelected((prev) => prev + 1);
  };

  const arrowLeftBtn = () => {
    if (pagesLine.includes(1)) {
      setSelected((prev) => (prev === 1 ? prev : prev - 1));
      return;
    }

    setPagesLine((prev) => prev.map((i) => i - 1));
    setSelected((prev) => prev - 1);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity activeOpacity={0.5} onPress={arrowLeftBtn}>
        <Image source={arrowLeft} style={styles.arrow} />
      </TouchableOpacity>
      {pagesLine &&
        pagesLine.map((item, index) => (
          <TouchableOpacity key={index} activeOpacity={0.5} onPress={() => setSelected(item)}>
            <View style={styles.itemWrapper}>
              <SimpleText
                style={{
                  ...styles.itemText,
                  fontFamily: item === selected ? 'Mont_SB' : 'Mont',
                  color: item === selected ? '#212121' : '#96979B',
                }}
              >
                {item}
              </SimpleText>
            </View>
          </TouchableOpacity>
        ))}
      {/* <TouchableOpacity activeOpacity={0.5} onPress={() => setSelected((prev) => prev + 1)}> */}

      <TouchableOpacity activeOpacity={0.5} onPress={arrowRightBtn}>
        <Image source={arrowRight} style={styles.arrow} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemWrapper: { paddingHorizontal: 5 },
  itemText: { color: '#96979B' },
  arrow: { width: 24, height: 24, opacity: 0.4 },
});

export default Pagination;
