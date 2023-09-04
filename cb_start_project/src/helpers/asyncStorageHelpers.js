import AsyncStorage from "@react-native-async-storage/async-storage";

export const getDataFromStorage = async (name) => {
  try {
    const value = await AsyncStorage.getItem(`${name}`);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    console.warn("Error:", e);
  }
};

export const setDataToStorage = async (name, value) => {
  try {
    await AsyncStorage.setItem(`${name}`, value);
  } catch (e) {
    console.warn("Error:", e);
  }
};

export const clearAsyncStorage = async () => {
  AsyncStorage.clear();
};
