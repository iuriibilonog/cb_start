// import {auth} from "../../firebase/config";
// import db from "../../firebase/config";
const authLoginUser = (data) => async(dispatch, getState) => {
     console.log('Login data in redux>>', data)
};
const authRegisterUser = (data) => async(dispatch, getState) => {
    console.log('Register data in redux>>', data)
    // console.log('auth in reduc>>', auth)
    // try{
    //     const user = await db.auth().createUserWithEmailAndPassword(data.email, data.password);
    //     console.log('user', user);
    // }catch (error) 
    // { console.log('error', error); console.log('error.message', error.message)}
};

const authLogoutUser = () => async(dispatch, getState) => {};

export {authLoginUser,
    authRegisterUser,
    authLogoutUser};