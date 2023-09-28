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
import ModalDropdown from 'react-native-modal-dropdown';
import { useDispatch } from 'react-redux';
import { putEditUser } from 'src/redux/content/operations';
import { FormattedMessage } from 'react-intl';

const arrowLeft = require('src/images/header_left.png');
const eyeOff = require('src/images/eye_inactive_dark.png');
const eyeOn = require('src/images/eye_active_dark.png');
const eyeOnCross = require('src/images/eye_active_dark_cross.png');

const EditUserScreen = (props) => {
  // const [value, setValue] = useState(props.route.params.name);
  const [inputValue, setInputValue] = useState('');
  const [isPassShown, setIsPassShown] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState();

  useEffect(() => {
    console.log('props-edituser', props.route.params);
    const roles = ['Merchant', 'Support', 'Admin'];
    if (props.route.params && props.route.params.user) {
      const { username, email, roleId } = props.route.params.user;
      setInputValue({ username, email, role: roles[+roleId - 1] });
      setSelectedRole(+roleId - 1);
    }
    setRoles(['Merchant', 'Support', 'Admin']);
  }, []);
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');

  const submit = async () => {
    console.log('EDIT');
    try {
      //updatedData =
      // email: "TestAppUser1@gmail.com"
      // password: "1122"
      // roleId: 1
      // username: "TestAppUser111"
      const updatedData = inputValue.password
        ? {
            email: inputValue.email,
            password: inputValue.password,
            roleId: selectedRole + 1,
            username: inputValue.username,
          }
        : {
            email: inputValue.email,
            roleId: selectedRole + 1,
            username: inputValue.username,
          };
      await dispatch(putEditUser({ userId: props.route.params.user.id, updatedData }));
      props.navigation.navigate('UsersListScreen', { isRefresh: true });
    } catch (err) {
      console.log('EditUserError', err);
    }
  };
  const handlePassShowBtn = () => {
    setIsPassShown((prev) => !prev);
  };

  const handleInput = (data) => {
    setInputValue((prev) => ({ ...prev, ...data }));
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
            <FormattedMessage id={'users.edit_user'} />
          </SimpleText>
          <FormattedMessage id={'common.e_mail'}>
            {(msg) => (
              <TextInput
                style={{ ...styles.input, marginBottom: 30 }}
                placeholder={msg[0]}
                placeholderTextColor={'grey'}
                value={inputValue?.email}
                onChangeText={(text) => handleInput({ email: text })}
              />
            )}
          </FormattedMessage>
          <FormattedMessage id={'common.user_name'}>
            {(msg) => (
              <TextInput
                style={{ ...styles.input, marginBottom: 30 }}
                placeholder={msg[0]}
                placeholderTextColor={'grey'}
                value={inputValue?.username}
                onChangeText={(text) => handleInput({ username: text })}
              />
            )}
          </FormattedMessage>
          <View style={styles.passInputWrapper}>
            <FormattedMessage id={'common.password'}>
              {(msg) => {
                return (
                  <TextInput
                    style={{ ...styles.input, marginBottom: 30 }}
                    placeholder={msg[0]}
                    placeholderTextColor={'grey'}
                    value={inputValue?.password}
                    onChangeText={(text) => handleInput({ password: text })}
                    secureTextEntry={!isPassShown}
                  />
                );
              }}
            </FormattedMessage>
            <Pressable
              onPress={handlePassShowBtn}
              style={{ position: 'absolute', right: 10, top: 6 }}
            >
              <Image
                source={
                  isPassShown && inputValue.password
                    ? eyeOnCross
                    : inputValue.password
                    ? eyeOn
                    : eyeOff
                }
                style={{ width: 25, height: 25 }}
              />
            </Pressable>
          </View>
          <View style={{ height: 42, marginBottom: 55, width: '100%' }}>
            {roles.length > 0 && (
              <FormattedMessage id={'common.role'}>
                {(msg) => {
                  console.log('selectedRole', selectedRole);
                  console.log('role', roles[selectedRole]);
                  return (
                    <ModalDropdown
                      options={roles}
                      defaultIndex={1}
                      defaultValue={[0, 1, 2].includes(selectedRole) ? roles[selectedRole] : msg[0]}
                      isFullWidth
                      animated={false}
                      onSelect={setSelectedRole}
                      textStyle={{
                        fontSize: 16,
                        fontFamily: 'Mont',
                        color: [0, 1, 2].includes(selectedRole)
                          ? '#262626'
                          : 'rgba(38, 38, 38, 0.6)',
                      }}
                      style={{
                        // backgroundColor: '#F4F4F4',
                        paddingHorizontal: 10,
                        paddingBottom: 5,
                        justifyContent: 'space-between',
                        borderColor: 'rgba(0, 0, 0, 0.20)',
                        borderBottomWidth: 1,

                        width: '100%',
                      }}
                      dropdownStyle={{
                        marginLeft: -10,
                        marginTop: Platform.OS === 'ios' ? 12 : -12,
                        paddingLeft: 5,
                        paddingRight: 2,
                        // width: '100%',
                        width: width - 90,
                        height:160,
                        borderWidth: 1,
                        borderColor:'rgba(0, 0, 0, 0.20)',
                        borderRadius:2,
                      }}
                      dropdownTextStyle={{
                        fontSize: 16,
                        lineHeight:30,
                        fontWeight: '600',
                        fontFamily: 'Mont',
                        // backgroundColor: '#F4F4F4',
                        color: 'rgba(38, 38, 38, 0.50)',
                      }}
                      renderRightComponent={() => (
                        <Image
                          source={
                            isDropdownOpen
                              ? require('src/images/arrow_up.png')
                              : [0, 1, 2].includes(selectedRole)
                              ? require('src/images/arrow_down.png')
                              : require('src/images/arrow_down_inactive.png')
                          }
                          style={{ width: 26, height: 26, marginLeft: 'auto' }}
                        />
                      )}
                      renderRowProps={{ activeOpacity: 1 }}
                      renderSeparator={() => <></>}
                      onDropdownWillShow={() => setIsDropdownOpen(true)}
                      onDropdownWillHide={() => setIsDropdownOpen(false)}
                    />
                  );
                }}
              </FormattedMessage>
            )}
          </View>
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
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '100%',
    marginBottom: 40,
    fontFamily: 'Mont',
    fontSize: 16,
    color: '#262626',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
  },
  passInputWrapper: { width: '100%', position: 'relative' },
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
    color: '#262626',
    fontFamily: 'Mont_SB',
  },
});

export default EditUserScreen;
