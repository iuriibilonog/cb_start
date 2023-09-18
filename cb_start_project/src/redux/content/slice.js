import { createSlice } from '@reduxjs/toolkit';
import {
  getAllBanks,
  getBankConversion,
  getAllUsers,
  getBankBalance,
  getTransactionData,
  getMerchantsApiKeys,
} from './operations';

const initialState = {
  content: {
    banks: [],
    allUsers: [],
    balance: [],
    transactionData: [],
    merchantApiKeys: [],
    error: null,
  },
};

const userSlice = createSlice({
  name: 'content',
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

    // builder.addCase(getBankBalance.fulfilled, (state, action) => {
    //   state.content.banks = action.payload;
    // }),
    //   builder.addCase(getBankBalance.rejected, (state, action) => {
    //     console.log('first', first)
    //     state.error = {
    //       message: action.payload,
    //     };
    //   });
    // builder.addCase(getBankConversion.fulfilled, (state, action) => {
    //   state.content.currentBankConversion = action.payload;
    // }),
    //   builder.addCase(getBankConversion.rejected, (state, action) => {
    //     state.error = {
    //       message: action.payload,
    //     };
    //   });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.content.allUsers = action.payload.items;
    }),
      builder.addCase(getAllUsers.rejected, (state, action) => {
        state.error = {
          message: action.payload,
        };
      });
    builder.addCase(getMerchantsApiKeys.fulfilled, (state, action) => {
      state.content.merchantApiKeys = action.payload.items;
    }),
      builder.addCase(getMerchantsApiKeys.rejected, (state, action) => {
        state.error = {
          message: action.payload,
        };
      });
    builder.addCase(getTransactionData.fulfilled, (state, action) => {
      state.content.transactionData = action.payload.items;
    }),
      builder.addCase(getTransactionData.rejected, (state, action) => {
        state.error = {
          message: action.payload,
        };
      });
  },
});

export default userSlice.reducer;
