import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/services/interceptor';
import { decode as atob, encode as btoa } from 'base-64';
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

export const getUsersByPage = createAsyncThunk(
  'content/getUsersByPage',
  async (page = 1, thunkAPI) => {
    try {
      const { data } = await api.get(`${BASE_URL}/api/users?page=${page}&pageSize=20`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
  if (!reportData.includes('startDate')) {
    reportData = `startDate=${initialDate}` + '&' + `endDate=${initialDate}` + reportData;
  }

  try {
    const { data } = await api.get(
      `${BASE_URL}/api/payments/export?${reportData}&exportFields=createdAt&exportFields=amount&exportFields=currency&exportFields=status&exportFields=mode`,
      {
        withCredentials: true,

        responseType: 'blob',
      }
    );

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getTransactionData = createAsyncThunk(
  'content/getTransactionData',
  async ({ transactionData, page = 1 }, thunkAPI) => {
    // const {
    //   startDate,
    //   endDate,
    //   userId,
    //   apiKeyId,
    //   mode,
    //   status,
    //   currency,
    //   timezone,
    //   bankName,
    //   page = 1,
    // } = transactionData;
    try {
      //https://dev.cashbulls.io/api/payments

      // ?page=1&pageSize=100
      // &includeTransactions=true
      // &startDate=2023-09-20
      // &endDate=2023-09-20
      // &userId=36
      // &apiKeyId=48
      // &mode=payin
      // &status=declined
      // &currency=EUR
      // &timezone=Etc/UTC
      // &bankName=Royal

      //startDate=2023-09-22&endDate=2023-09-22

      let setLink = JSON.stringify(transactionData)
        .replace(/:/g, '=')
        .replace(/\,/g, '&')
        .replace(/\"/g, '')
        .slice(1, -1);
      if (!setLink.includes('endDate')) {
        const initialDate = new Date().toISOString().slice(0, 10);

        setLink = `startDate=${initialDate}&endDate=${initialDate}` + setLink;
      }
      console.log('page, setLink', page, '<><>', setLink);
      const { data } = await api.get(
        `${BASE_URL}/api/payments?page=${page}&pageSize=100&includeTransactions=true&${setLink}`,
        // `${BASE_URL}/api/payments?page=${page}&pageSize=100&includeTransactions=true&startDate=${startDate}&endDate=${endDate}&userId=${userId}&apiKeyId=${apiKeyId}&mode=${mode}&status=${status}&currency=${currency}&timezone=${timezone}&bankName=${bankName}`,
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

export const getApiData = createAsyncThunk('content/getApiData', async (page = 1, thunkAPI) => {
  try {
    console.log('getApiData-Operations - page', page);
    const { data } = await api.get(`${BASE_URL}/api/api-keys?page=${page}&pageSize=100`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const putApiKey = createAsyncThunk('content/putApiKey', async ({ id, name }, thunkAPI) => {
  try {
    const { data } = await api.put(
      `${BASE_URL}/api/api-keys/${id}`,
      { name: name },
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const postApiKey = createAsyncThunk('content/postApiKey', async (newKeyData, thunkAPI) => {
  // {userId: 97, name: "aaatest"}
  try {
    const { data } = await api.post(`${BASE_URL}/api/api-keys`, newKeyData, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteApiKey = createAsyncThunk('content/deleteApiKey', async (id, thunkAPI) => {
  try {
    const { data } = await api.delete(`${BASE_URL}/api/api-keys/${id}`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteUser = createAsyncThunk('content/deleteUser', async (id, thunkAPI) => {
  try {
    const { data } = await api.delete(`${BASE_URL}/api/users/${id}`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const getLedgersData = createAsyncThunk(
  'content/getLedgersData',
  async (userId, thunkAPI) => {
    try {
      const { data } = await api.get(`${BASE_URL}/api/ledgers?filter=${userId}`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const putEditUser = createAsyncThunk(
  'content/putEditUser',
  async (editingData, thunkAPI) => {
    try {
      //updatedData =
      // email: "TestAppUser1@gmail.com"
      // password: "1122"
      // roleId: 1
      // username: "TestAppUser111"
      const { userId, updatedData } = editingData;
      console.log('putEditUser>>', editingData);
      const { data } = await api.put(`${BASE_URL}/api/users/${userId}`, updatedData, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSearchUsers = createAsyncThunk(
  'content/getSearchUsers',
  async (searchData, thunkAPI) => {
    try {
      //updatedData =
      // email: "TestAppUser1@gmail.com"
      // password: "1122"
      // roleId: 1
      // username: "TestAppUser111"
      const { page = 1, searchText } = searchData;
      console.log('searchData>>', searchData);
      const { data } = await api.get(
        `${BASE_URL}/api/users?page=${page}&pageSize=20&filter=${searchText}`,
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
