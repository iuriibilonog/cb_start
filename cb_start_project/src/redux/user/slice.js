import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userLogout, changeLoggedInSelector } from './operations';

const initialState = {
  userinfo: {
    name: null,
    email: null,
    isLoggedIn: false,
  },
  token: null,
  refresh: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.userinfo = action.payload.user;
      state.token = action.payload.accessToken;
      state.refresh = action.payload.refreshToken;
      state.userinfo.isLoggedIn = true;
      state.error = null;
    }),
     
    builder.addCase(userLogout.fulfilled, (state, action) => initialState),
      builder.addCase(userLogout.rejected, (state, action) => {
        state.error = {
          status: action.payload.requestStatus,
          message: action.payload,
        };
      });
   
    builder.addCase(changeLoggedInSelector.fulfilled, (state, action) => {
      state.userinfo.isLoggedIn = false;
    });
  },
});

export default userSlice.reducer;
