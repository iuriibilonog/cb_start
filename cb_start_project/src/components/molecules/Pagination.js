import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import SimpleText from '../atoms/SimpleText';

const arrowLeft = require('src/images/left.png');
const arrowRight = require('src/images/right.png');

const Pagination = ({ totalPages = 20, currentPage = 1, setCurrentPage }) => {
  const [selected, setSelected] = useState(currentPage);
  const [pagesLine, setPagesLine] = useState([2, 3, 4, 5]);
  const [isFirstDotsShow, setIsFirstDotsShow] = useState(false);
  const [isLastDotsShow, setIsLastDotsShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isShowInput, setIsShowInput] = useState(false);

  const headerHeight = useHeaderHeight();

  useEffect(() => {
    let res = [];
    if (totalPages > 6) return;
    for (let i = 2; i <= totalPages - 1; i++) {
      res.push(i);
    }

    setPagesLine(res);
  }, [totalPages]);

  useEffect(() => {
    console.log('selected', selected);
    if (totalPages <= 6) return;
    if (selected >= 5 && totalPages - selected >= 4) {
      setPagesLine([selected - 1, selected, selected + 1]);
      setIsFirstDotsShow(true);
      setIsLastDotsShow(true);
    } else if (selected < 5 && totalPages - selected >= 4) {
      setIsFirstDotsShow(false);
      setIsLastDotsShow(true);
      setPagesLine([2, 3, 4]);
    } else if (selected >= totalPages - 4) {
      setPagesLine([totalPages - 3, totalPages - 2, totalPages - 1]);
      setIsFirstDotsShow(true);
      setIsLastDotsShow(false);
    }
  }, [selected]);

  const arrowRightBtn = () => {
    if (selected === totalPages) return;
    setSelected((prev) => prev + 1);
  };
  const arrowLeftBtn = () => {
    if (selected === 1) return;
    setSelected((prev) => prev - 1);
  };

  const handleOnBlur = () => {
    console.log('inputValue', inputValue);
    setSelected(parseInt(inputValue));
    setIsShowInput(false);
    // Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleOnBlur}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // behavior="position"
        // style={{ flex: 1 }}
      >
        <View style={styles.wrapper}>
          <TouchableOpacity activeOpacity={0.5} onPress={arrowLeftBtn}>
            <Image source={arrowLeft} style={styles.arrow} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => setSelected(1)}>
            <View style={styles.itemWrapper}>
              <SimpleText
                style={{
                  ...styles.itemText,
                  fontFamily: selected === 1 ? 'Mont_SB' : 'Mont',
                  color: selected === 1 ? '#212121' : '#96979B',
                }}
              >
                1
              </SimpleText>
            </View>
          </TouchableOpacity>

          {isFirstDotsShow &&
            (isShowInput ? (
              <TextInput
                style={styles.dots}
                autoFocus={true}
                value={inputValue}
                onChangeText={setInputValue}
              />
            ) : (
              <TouchableOpacity onPress={() => setIsShowInput(true)}>
                <SimpleText style={styles.dots}>...</SimpleText>
              </TouchableOpacity>
            ))}
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
          {isLastDotsShow && <SimpleText style={styles.dots}>...</SimpleText>}
          {totalPages > 1 && (
            <TouchableOpacity activeOpacity={0.5} onPress={() => setSelected(totalPages)}>
              <View style={styles.itemWrapper}>
                <SimpleText
                  style={{
                    ...styles.itemText,
                    fontFamily: selected === totalPages ? 'Mont_SB' : 'Mont',
                    color: selected === totalPages ? '#212121' : '#96979B',
                  }}
                >
                  {totalPages}
                </SimpleText>
              </View>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity activeOpacity={0.5} onPress={() => setSelected((prev) => prev + 1)}> */}

          <TouchableOpacity activeOpacity={0.5} onPress={arrowRightBtn}>
            <Image source={arrowRight} style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  itemWrapper: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  //   dots: { marginRight: 30 },
  itemText: { color: '#96979B' },
  arrow: { width: 24, height: 24, opacity: 0.4 },
});

export default Pagination;
