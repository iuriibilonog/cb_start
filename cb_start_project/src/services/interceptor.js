import axios from 'axios';
import {
  getDataFromStorage,
  setDataToStorage,
  clearAsyncStorage,
} from 'src/helpers/asyncStorageHelpers';
import navigationHelper from 'src/helpers/navigationHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  api.interceptors.response.use(
    (config) => {
      return config;
    },
    (error) => {
      const originalRequest = error.config;
      const refreshToken = getDataFromStorage('refresh');

      if (error?.response?.status === 401 && !refreshToken?.length > 0) {
        // return navigationHelper.navigate('Login');
      }

      //   if (
      //     error?.response?.status === 401 &&
      //     error?.config &&
      //     !error?.config?.secondTime &&
      //     refreshToken
      //   ) {
      //     originalRequest.secondTime = true;
      //     try {
      //       const headers = {
      //         "X-Access-Token": getDataFromStorage("token"),
      //       };
      //       const response = await axios.post(
      //         `${url}/auth/refresh`,
      //         {
      //           withCredentials: true,
      //           refresh_token: refreshToken,
      //         },
      //         {
      //           headers: headers,
      //         }
      //       );
      //       setDataToStorage("token", response.data.access_token);
      //       setDataToStorage("refresh", response.data.refresh_token);

      //       return api.request(originalRequest);
      //     } catch (err) {
      //       if (err?.response?.status === 401) {
      //
      //         throw err;
      //       }
      //
      //     }
      //   }
      //   else {
      //     context.showErrorInterceptor(error);
      //   }

      console.log('firstErr');

      throw error?.response?.data || error;
    }
  );

  return children;
};

export default api;
