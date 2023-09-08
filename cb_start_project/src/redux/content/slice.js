import { createSlice } from '@reduxjs/toolkit';
import { getAllBanks, getBankConversion } from './operations';

const initialState = {
  content: {
    banks: [],
    // email: null,
    // name: null,
    // isLoggedIn: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllBanks.fulfilled, (state, action) => {
      state.content.banks = action.payload;
    }),
      builder.addCase(getAllBanks.rejected, (state, action) => {
        state.error = {
          message: action.payload,
        };
      });
    builder.addCase(getBankConversion.fulfilled, (state, action) => {
      state.content.currentBankConversion = action.payload;
    }),
      builder.addCase(getBankConversion.rejected, (state, action) => {
        state.error = {
          message: action.payload,
        };
      });
  },
});

export default userSlice.reducer;
