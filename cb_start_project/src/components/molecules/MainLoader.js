import AnimatedLoader from 'react-native-animated-loader';
import { View, Image, StyleSheet } from 'react-native';

const MainLoader = ({ isVisible }) => {
  return (
    <View>
      <AnimatedLoader
        visible={isVisible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('../../images/loader2.json')}
        animationStyle={styles.lottie}
        speed={1}
      >
        <Image source={require('../../images/logo_glitch_tr.gif')} style={styles.img} />
      </AnimatedLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
  },
  img: {
    width: 100,
    height: 100,
    marginTop: -220,
  },
});

export default MainLoader;
