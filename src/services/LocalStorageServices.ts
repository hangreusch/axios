import AsyncStorage from '@react-native-community/async-storage';

const fetchState = (key: string) => {
  return AsyncStorage.getItem(key).then((serializedState) => {
    if (serializedState) {
      JSON.parse(serializedState);
    }
  });
};

const saveState = (key: string, state: {}) => {
  const serializedState = JSON.stringify(state);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  AsyncStorage.setItem(key, serializedState).catch((err) => {
    //TODO log error
  });
};

const clearState = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    //TODO log error
  }
};

export {clearState, saveState, fetchState};
