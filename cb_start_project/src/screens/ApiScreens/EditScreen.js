import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { putApiKey } from 'src/redux/content/operations';
import { FormattedMessage } from 'react-intl';
import MainLoader from 'src/components/molecules/MainLoader';
import ConfirmActionComponent from 'src/components/molecules/ConfirmActionComponent';

const arrowLeft = require('src/images/header_left.png');

const EditScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const submit = async (data) => {
    try {
      setIsLoading(true);
      await dispatch(putApiKey({ id: props.route.params.id, name: data }));
      setIsLoading(false);
      await props.navigation.navigate(props.route.params.parentScreen, { isRefresh: true });
      setTimeout(() => {
        showMessage({
          message: `Edit Api key ${data} successfully`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'success',
        });
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      showMessage({
        message: `Something went wrong! Api key ${data} does't edit`,
        titleStyle: {
          textAlign: 'center',
        },
        type: 'success',
      });
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
        <MainLoader isVisible={isLoading} />
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
        <FormattedMessage id={'api.api_key_name'}>
          {(placeholder) => (
            <ConfirmActionComponent
              isEdit
              title={'api.api_key_name'}
              initialValue={props.route.params.name}
              action={submit}
              placeholder={placeholder[0]}
            />
          )}
        </FormattedMessage>
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
    backgroundColor: '#FFE13A',
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

export default EditScreen;
