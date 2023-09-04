import axios from 'axios';
import {
  getDataFromStorage,
  setDataToStorage,
  clearAsyncStorage,
} from '../helpers/asyncStorageHelpers';
import navigationHelper from 'src/helpers/navigationHelper';
// import { useContext } from 'react';
// import { UIContext } from 'contexts/UIContext';

const url = 'https://httpstat.us/401';

const api = axios.create({
  withCredentials: true,
  baseURL: `${url}`,
});

export const AxiosInterceptor = ({ children }) => {
  api.interceptors.request.use((config) => {
    config.headers = {
      'Content-Language': getDataFromStorage('lang') || 'en',
      // 'X-Requested-With': 'XMLHttpRequest',
      'X-Access-Token': getDataFromStorage('token') || null,
      // 'X-Client-Version': window.COMMIT_SHA || null,
      'Content-Type': 'application/json',
    };

    return config;
  });

  api.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = getDataFromStorage('refresh');

      if (error?.response?.status === 401 && !refreshToken?.length > 0) {
        return navigationHelper.navigate('Login');
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
      //         window.location = "/session-expired";

      //         clearAsyncStorage();
      //         throw err;
      //       }
      //       //   else {
      //       //     context.showErrorInterceptor(err);
      //       //   }
      //     }
      //   }
      //   else {
      //     context.showErrorInterceptor(error);
      //   }
    }
  );

  return children;
};

export default api;
