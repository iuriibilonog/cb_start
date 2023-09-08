import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userLogout } from './operations';

const initialState = {
  userinfo: {
    name: null,
    email: null,
    name: null,
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
      console.log('action', action.payload);
      state.userinfo = action.payload.user;
      state.token = action.payload.accessToken;
      state.refresh = action.payload.refreshToken;
      state.userinfo.isLoggedIn = true;
    }),
      builder.addCase(userLogin.rejected, (state, action) => {
        state.error = {
          message: action.payload,
        };
      });
    builder.addCase(userLogout.fulfilled, (state, action) => initialState),
      builder.addCase(userLogout.rejected, (state, action) => {
        console.log('action999', action);
        state.error = {
          status: action.payload.requestStatus,
          message: action.payload,
        };
      });
  },
});

export default userSlice.reducer;
