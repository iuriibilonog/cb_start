import { useEffect, useState } from 'react';
import { View, ImageBackground, Alert, StyleSheet, Dimensions } from 'react-native';
import * as Updates from 'expo-updates';
import MainLoader from 'src/components/molecules/MainLoader';
const logoBack = require('src/images/logo_back.png');

const UpdateScreen = () => {
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    Alert.alert('Update App', 'To proceed, please update the application', [
      {
        text: 'Update',
        onPress: handleUpdate,
      },
    ]);
  }, []);

  const handleUpdate = async () => {
    setIsloading(true);
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();

      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      setTimeout(() => {
        alert(`Error fetching latest Expo update: ${error}`);
      }, 1000);
    }
    // console.log('first');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={logoBack} resizeMode="contain" style={styles.background}>
        <MainLoader isVisible={isLoading} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242834',
  },
  background: {
    flex: 1,

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default UpdateScreen;
