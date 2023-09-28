import { View, Image, StyleSheet } from 'react-native';

const addIcon = require('src/images/add.png');
const deleteIcon = require('src/images/delete.png');
const editIcon = require('src/images/edit.png');
const IconButton = (props) => {
  const { add, del, edit, style = {} } = props;
  return (
    <View
      style={{
        ...styles.wrapper,
        backgroundColor: add
          ? 'rgba(54, 208, 187, 0.40)'
          : del
          ? '#FFF0F0'
          : edit
          ? '#FFED8B'
          : addIcon,
        ...style,
      }}
    >
      <Image
        source={add ? addIcon : del ? deleteIcon : edit ? editIcon : addIcon}
        style={edit? styles.editImage : styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0BA39A',
    borderRadius: 2,
    width: 52,
    height: 45,
  },
  image: { width: 24, height: 24 },
  editImage:{ width: 19, height: 19 },
});

export default IconButton;
