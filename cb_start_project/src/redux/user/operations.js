import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/services/interceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setDataToStorage, removeDataToStorage } from 'src/helpers/asyncStorageHelpers';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const userLogin = createAsyncThunk(
  'auth/login',

  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/auth/signin`, user, {
        withCredentials: true,
      });

      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('token', data.accessToken);
      // await AsyncStorage.setItem('refresh', data.refreshToken);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userLogout = createAsyncThunk('auth/logout', async (userData, thunkAPI) => {
  try {
    const { data } = await api.post(`${BASE_URL}/api/auth/logout`, userData, {
      withCredentials: true,
    });
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refresh');

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const removeAuthError = createAsyncThunk('auth/removeAuthError', async (_, thunkAPI) => {
  return { error: null };
});
