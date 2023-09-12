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
  async (bankName, thunkAPI) => {
    try {
      const { data } = await api.get(
        `${BASE_URL}/api/banks/conversion/${bankName}?startDate=2023-01-08&endDate=2023-09-08&timezone=Europe/Riga`,
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
