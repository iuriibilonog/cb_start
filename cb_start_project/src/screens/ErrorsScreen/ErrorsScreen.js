import { FormattedMessage } from 'react-intl';
import { Overlay } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleText from 'src/components/atoms/SimpleText';
import SimpleButton from 'src/components/atoms/SimpleButton';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { setLoaderFalseWithError } from 'src/redux/content/operations';
import { changeLoggedInSelector } from 'src/redux/user/operations';
import { useDispatch } from 'react-redux';

const ErrorsScreen = ({ route, navigation }) => {
  // const { status } = route.params;
  // return Updates.reloadAsync();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoaderFalseWithError(false));
  }, []);

  const handlePressAction = async () => {
    switch (route?.params?.status) {
      case 401:
        await dispatch(setLoaderFalseWithError(true));
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refresh');
        await AsyncStorage.removeItem('isLoggedIn');
        await dispatch(changeLoggedInSelector());

        break;

      // return Updates.reloadAsync();

      case 500:
        await dispatch(setLoaderFalseWithError(true));
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refresh');
        await AsyncStorage.removeItem('isLoggedIn');
        await dispatch(changeLoggedInSelector());
        break;

      // return navigation.navigate('DashboardScreen');

      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Overlay
        isVisible={true}
        backdropStyle={{
          backgroundColor: 'rgba(255,255,255,0.75)',
        }}
        overlayStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
          paddingHorizontal: 20,
        }}
      >
        {route?.params?.status === 401 && (
          <View>
            <SimpleText style={styles.text}>
              <FormattedMessage id={`errors.401`} />
            </SimpleText>
            <TouchableOpacity onPress={handlePressAction}>
              <SimpleButton text={'actions.to_login'} />
            </TouchableOpacity>
          </View>
        )}
        {route?.params?.status === 500 && (
          <View>
            <SimpleText style={styles.text}>
              <FormattedMessage id={`errors.500`} />
            </SimpleText>
            <TouchableOpacity onPress={handlePressAction}>
              <SimpleButton text={'actions.to_login'} />
            </TouchableOpacity>
          </View>
        )}
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 25,
    marginBottom: 50,
    lineHeight: 30,
  },
});

export default ErrorsScreen;
