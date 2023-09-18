import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/services/interceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setDataToStorage, removeDataToStorage } from 'src/helpers/asyncStorageHelpers';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const initialDate = new Date().toISOString().slice(0, 10);

export const getAllUsers = createAsyncThunk('content/getAllUsers', async (_, thunkAPI) => {
  try {
    const { data } = await api.get(`${BASE_URL}/api/users?page=1&pageSize=1000`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getBankBalance = createAsyncThunk('content/getBankBalance', async (bank, thunkAPI) => {
  try {
    const { data } = await api.get(`${BASE_URL}/api/banks/balance/${bank}`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getMerchantsApiKeys = createAsyncThunk(
  'content/getMerchantsApiKeys',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`${BASE_URL}/api/api-keys?page=1&pageSize=100&filter=${id}`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllBanks = createAsyncThunk('content/getAllBanks', async (_, thunkAPI) => {
  try {
    const { data } = await api.get(`${BASE_URL}/api/banks`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getBankConversion = createAsyncThunk(
  'content/getBankConversion',
  async (data, thunkAPI) => {
    const initialDate = new Date().toISOString().slice(0, 10);
    const { bankName } = data;
    let { startDate, endDate } = data.balancePeriod;
    startDate = startDate ? startDate : initialDate;
    endDate = endDate ? endDate : initialDate;

    try {
      const { data } = await api.get(
        `${BASE_URL}/api/banks/conversion/${bankName}?startDate=${startDate}&endDate=${endDate}&timezone=Europe/Riga`,
        {
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getReport = createAsyncThunk('content/getReport', async (reportData, thunkAPI) => {
  if (!reportData.includes('startDate'))
    reportData = `startDate=${initialDate}` + '&' + `endDate=${initialDate}` + reportData;
  try {
    const { data } = await api.get(
      `${BASE_URL}/api/payments/export?${reportData}&exportFields=createdAt&exportFields=amount&exportFields=currency&exportFields=status&exportFields=mode`,
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getTransactionData = createAsyncThunk(
  'content/getTransactionData',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get(
        `${BASE_URL}/api/payments?page=1&pageSize=100&includeTransactions=true&startDate=2022-09-12&endDate=2023-09-15&timezone=Etc/UTC`,
        {
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const getAllModes = createAsyncThunk('content/getAllModes', async (_, thunkAPI) => {
//   try {
//     // const { data } = await api.get(`${BASE_URL}/api/modes`, {
//     //   withCredentials: true,
//     // });
//     // return data;
//   } catch (error) {
//     // return thunkAPI.rejectWithValue(error);
//   }
// });

// export const getAllCurrencies = createAsyncThunk(
//   'content/getAllCurrencies',
//   async (_, thunkAPI) => {
//     try {
//       // const { data } = await api.get(`${BASE_URL}/api/currencies`, {
//       //   withCredentials: true,
//       // });
//       // return data;
//     } catch (error) {
//       // return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
