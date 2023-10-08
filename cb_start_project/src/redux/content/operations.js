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

    console.log('Date-getBankConversion ', data);

    // UTC+0 - UTC+5.5, UTC+6 //
    // timezone = Europe / London;
    // timezone = Europe / Paris;
    // Europe / Riga;
    // Europe / Moscow;
    // Asia / Baku;
    // Asia / Tashkent;
    // Asia / Kolkata;
    // Asia / Omsk;

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
    try {
      let setLink;
      let timezone;
      // console.log('-1', transactionData);
      if (transactionData.timezone) {
        // UTC+0 - UTC+5.5, UTC+6 //
        // timezone = Europe / London;
        // timezone = Europe / Paris;
        // Europe / Riga;
        // Europe / Moscow;
        // Asia / Baku;
        // Asia / Tashkent;
        // Asia / Kolkata;
        // Asia / Omsk;

        timezone =
          transactionData.timezone.indexOf('+0') > 0
            ? 'Europe/London'
            : transactionData.timezone.indexOf('+1') > 0
            ? 'Europe/Paris'
            : transactionData.timezone.indexOf('+2') > 0
            ? 'Europe/Riga'
            : transactionData.timezone.indexOf('+3') > 0
            ? 'Europe/Moscow'
            : transactionData.timezone.indexOf('+4') > 0
            ? 'Asia/Baku'
            : transactionData.timezone.indexOf('+5.5') > 0
            ? 'Asia/Kolkata'
            : transactionData.timezone.indexOf('+5') > 0
            ? 'Asia/Tashkent'
            : transactionData.timezone.indexOf('+6') > 0
            ? 'Asia/Omsk'
            : '';

        transactionData.timezone = timezone;
      }
      setLink = JSON.stringify(transactionData);

      // console.log('-2', timezone);
      // console.log('-3', setLink);

      setLink = setLink.replace(/:/g, '=').replace(/\,/g, '&').replace(/\"/g, '').slice(1, -1);
      if (!setLink.includes('endDate')) {
        const initialDate = new Date().toISOString().slice(0, 10);

        setLink = `startDate=${initialDate}&endDate=${initialDate}&` + setLink;
      }
      console.log('page,setLink', page, '<><>', setLink);
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

// /api/ledgers?apiKeyId=92

export const getLedgersByApiKeyID = createAsyncThunk(
  'content/getLedgersByApiKeyID',
  async (apiKeyId, thunkAPI) => {
    try {
      const { data } = await api.get(`${BASE_URL}/api/ledgers?apiKeyId=${apiKeyId}`, {
        withCredentials: true,
      });
      console.log('>>', apiKeyId, '<>', data);
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

export const cleanUserLedgers = createAsyncThunk(
  'content/cleanUserLedgers',
  async (_, thunkAPI) => {
    console.log('CLEAN LEDGERS');
    try {
      return [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// /api/ledgers/51
// {name: "317socialmedia.comm"}
export const putEditLedger = createAsyncThunk(
  'content/putEditLedger',
  async (editingData, thunkAPI) => {
    try {
      const { ledgerId, name } = editingData;
      // console.log('putEditUser>>', editingData);
      const { data } = await api.put(
        `${BASE_URL}/api/ledgers/${ledgerId}`,
        { name },
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

// /api/paymethod-chains/15
export const getUserPayments = createAsyncThunk(
  'content/getUserPayments',
  async (apiKey, thunkAPI) => {
    try {
      console.log('getUserPaymentsCHAIN -> apiKey>>', apiKey);
      const { data } = await api.get(`${BASE_URL}/api/paymethod-chains/${apiKey}`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const confirmUserPaymentData = createAsyncThunk(
  'content/confirmUserPaymentData',
  async (data, thunkAPI) => {
    const { paymentData, id } = data;
    console.log('data', data);
    console.log('id', id);
    try {
      const { data } = await api.put(`${BASE_URL}/api/paymethod-settings/${id}`, paymentData, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setEditedPaymentsSettings = createAsyncThunk(
  'content/setEditedPaymentsSettings',
  async (data, thunkAPI) => {
    return data;
  }
);
export const skipEditedPaymentsSettings = createAsyncThunk(
  'content/skipEditedPaymentsSettings',
  async (data, thunkAPI) => {
    return [];
  }
);

export const getPaymentsMethods = createAsyncThunk(
  'content/getPaymentsMethods',
  async (bankId, thunkAPI) => {
    try {
      console.log('getPaymentsMethods -> bankId>>', bankId);
      const { data } = await api.get(`${BASE_URL}/api/payment-methods?page=1&pageSize=100&filter=${bankId}`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
