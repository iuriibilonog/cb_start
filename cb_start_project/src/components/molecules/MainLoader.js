import { Overlay } from '@rneui/themed';
import { Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { isMainLoaderOnSelector } from 'src/redux/content/selectors';

const MainLoader = ({ isVisible }) => {
  const isLoaderOn = useSelector(isMainLoaderOnSelector);

  return (
    <Overlay
      isVisible={isVisible && isLoaderOn}
      backdropStyle={{
        backgroundColor: 'rgba(255,255,255,0.75)',
      }}
      overlayStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
      }}
    >
      <Image source={require('../../images/logo_glitch_tr.gif')} style={styles.img} />
      <Image source={require('../../images/loader2.gif')} style={styles.lottie} />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 150,
    height: 150,
    marginTop: -50,
  },
  img: {
    width: 100,
    height: 100,
  },
});

export default MainLoader;
