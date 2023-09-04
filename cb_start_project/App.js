import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import store from 'src/redux/store';
import { Provider } from 'react-redux';
import navigationHelper from 'src/helpers/navigationHelper';
import { AxiosInterceptor } from 'src/services/interceptor';
import { View } from 'react-native';
// import store from "./redux/store";
// import { Provider } from "react-redux";

import { useRouting } from './routing';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const routing = useRouting();

  useEffect(() => {
    async function prepare() {
      try {
        // await Font.loadAsync(Entypo.font);
        //load fonts

        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer
        onReady={onLayoutRootView}
        ref={(navigatorRef) => {
          navigationHelper.setTopLevelNavigator(navigatorRef);
        }}
      >
        <AxiosInterceptor>{routing}</AxiosInterceptor>
      </NavigationContainer>
    </Provider>
  );
}
