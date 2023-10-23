import { FormattedMessage } from 'react-intl';
import SimpleText from 'src/components/atoms/SimpleText';
import SimpleButton from 'src/components/atoms/SimpleButton';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { setLoaderFalseWithError } from 'src/redux/content/operations';
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

        return Updates.reloadAsync();

      case 500:
        await dispatch(setLoaderFalseWithError(true));

        return navigation.navigate('DashboardScreen');

      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {route?.params?.status === 401 && (
        <View>
          <SimpleText>
            <FormattedMessage id={`errors.401`} />
          </SimpleText>
          <TouchableOpacity onPress={handlePressAction}>
            <SimpleButton text={'actions.to_login'} />
          </TouchableOpacity>
        </View>
      )}
      {route?.params?.status === 500 && (
        <View>
          <SimpleText>
            <FormattedMessage id={`errors.401`} />
          </SimpleText>
          <TouchableOpacity onPress={handlePressAction}>
            <SimpleButton text={'actions.to_login'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ErrorsScreen;
