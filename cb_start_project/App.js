import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import store from "src/redux/store";
import { Provider } from "react-redux";

import { useRouting } from './routing';

export default function App() {
  const routing = useRouting();
  return (
    <Provider store={store}>
    <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
