import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/services/interceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setDataToStorage, removeDataToStorage } from 'src/helpers/asyncStorageHelpers';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

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
    const { bankName } = data;
    const { startDate, endDate } = data.balancePeriod;
    console.log('data999999999999999', data);
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
  console.log('data999999999999999', reportData);
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
        `${BASE_URL}/api/payments?page=1&pageSize=100&includeTransactions=true&startDate=2023-09-12&endDate=2023-09-12&timezone=Etc/UTC`,
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
