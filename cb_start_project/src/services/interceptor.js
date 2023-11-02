import axios from 'axios';
import {
  getDataFromStorage,
  setDataToStorage,
  clearAsyncStorage,
} from 'src/helpers/asyncStorageHelpers';
import navigationHelper from 'src/helpers/navigationHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { showMessage } from 'react-native-flash-message';

const url = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  withCredentials: true,
  baseURL: `${url}`,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  const lang = await AsyncStorage.getItem('lang');
  config.headers = {
    'Content-Language': lang || 'en',
    // 'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Bearer ${token}` || null,
    // 'X-Client-Version': window.COMMIT_SHA || null,
    'Content-Type': 'application/json',
  };

  return config;
});

export const AxiosInterceptor = ({ children }) => {
  // getReqData();

  api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    const refresh = await AsyncStorage.getItem('refresh');
    const lang = await AsyncStorage.getItem('lang');
    config.headers = {
      'Content-Language': lang || 'en',

      Authorization: `Bearer ${token}` || null,

      'Content-Type': 'application/json',
    };

    return config;
  });

  api.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
      const token = await AsyncStorage.getItem('token');
      const refresh = await AsyncStorage.getItem('refresh');
      const originalRequest = error.config;

      if (error?.response?.status === 401 && !refresh?.length > 0) {
        return navigationHelper.navigate('Login');
      }

      if (
        error?.response?.status === 401 &&
        error?.config &&
        !error?.config?.secondTime &&
        refresh
      ) {
        originalRequest.secondTime = true;
        try {
          const headers = {
            Authorization: `Bearer ${token}` || null,
          };

          const response = await axios.post(
            `${url}/api/auth/refresh`,
            {
              withCredentials: true,
              refreshToken: refresh,
            },
            {
              headers: headers,
            }
          );

          await setDataToStorage('token', response.data.accessToken);

          return api.request(originalRequest);
        } catch (err) {
          if (err?.response?.status === 401) {
            return navigationHelper.navigate('ErrorsScreen', { status: err?.response?.status });

            // throw err;
          }
        }
      }

      if (error?.response?.status === 504) {
        return showMessage({
          message: 'Gateway Time-out. Try again later',
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }
      if (error?.response?.status === 409) {
        return showMessage({
          message: `${error?.response?.data?.message}`,
          titleStyle: {
            textAlign: 'center',
          },
          type: 'danger',
        });
      }
      if (error?.response?.status === 500) {
        return navigationHelper.navigate('ErrorsScreen', { status: error?.response?.status });
      }
      if (error?.response?.status === 404) {
        throw error;
      }

      throw error?.response?.data || error;
    }
  );

  return children;
};

export default api;
