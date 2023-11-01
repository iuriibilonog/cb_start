import { Image, StyleSheet } from 'react-native';

const emptyBox = require('src/images/dark_box_empty.png');
const checkedBox = require('src/images/green_box_checked.png');

const SimpleCheckBox = (props) => {
  const { empty, checked, disable, style = {} } = props;
  if (disable) {
    return <Image source={emptyBox} style={{ ...styles.image, ...style }} />;
  }
  return (
    <Image
      source={empty ? emptyBox : checked ? checkedBox : emptyBox}
      style={{ ...styles.image, ...style }}
    />
  );
};

const styles = StyleSheet.create({
  image: { width: 24, height: 24 },
});

export default SimpleCheckBox;
