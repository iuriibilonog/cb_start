import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Keyboard,
  Dimensions,
  Pressable,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import SimpleText from 'src/components/atoms/SimpleText';
import { useDispatch } from 'react-redux';
import { putApiKey } from 'src/redux/content/operations';
import { FormattedMessage } from 'react-intl';

const arrowLeft = require('src/images/header_left.png');

const EditUserScreen = (props) => {
  const [value, setValue] = useState(props.route.params.name);
  useEffect(() => {
    console.log('props', props.route.params);
  }, []);
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');

  const submit = async () => {
    try {
      console.log('EDITED', value);
      await dispatch(putApiKey({ id: props.route.params.id, name: value }));
      props.navigation.navigate(props.route.params.parentScreen, { isRefresh: true });
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 20,
          justifyContent: 'flex-start',
          backgroundColor: '#fff',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate(props.route.params.parentScreen)}
          style={{
            marginRight: 'auto',
            backgroundColor: '#fff',
          }}
        >
          <Image source={arrowLeft} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        {/* </View> */}

        <View style={styles.innerWrapper}>
          <SimpleText style={styles.title}>
            <FormattedMessage id={'api.edit_api'} />
          </SimpleText>
          <TextInput style={styles.input} value={value} onChangeText={(text) => setValue(text)} />
          <TouchableOpacity activeOpacity={0.5} style={{ width: '100%' }} onPress={submit}>
            <View style={styles.btn}>
              <SimpleText style={styles.btnText}>
                <FormattedMessage id={'common.edit'} />
              </SimpleText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  innerWrapper: {
    marginTop: 56,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  title: { fontSize: 24, fontFamily: 'Mont_SB', marginBottom: 70 },
  input: {
    width: '100%',
    marginBottom: 40,
    fontFamily: 'Mont',
    fontSize: 16,
    color: '#262626',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
  },
  btn: {
    width: '100%',
    height: 42,
    backgroundColor: '#D6B747',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    letterSpacing: 0.48,
    color: '#fff',
    fontFamily: 'Mont_SB',
  },
});

export default EditUserScreen;
