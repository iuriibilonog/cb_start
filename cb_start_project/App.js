import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { store, persistor } from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import navigationHelper from 'src/helpers/navigationHelper';
import { AxiosInterceptor } from 'src/services/interceptor';
import { Text } from 'react-native';
import { IntlProvider } from 'react-intl';
import UA from 'src/lang/ua.json';
import EN from 'src/lang/en.js';

import { Routing } from './routing';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // const routing = useRouting();

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

  // console.log('language', navigator.language);
  // const locale = navigator.language;
  const locale = 'en';
  let lang = UA;
  if (locale === 'en') {
    lang = EN;
  } else {
    if (locale === 'uk') {
      lang = UA;
    } else {
      lang = EN;
    }
  }

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
      <PersistGate loading={null} persistor={persistor}>
        <IntlProvider locale={locale} messages={lang}>
          <NavigationContainer
            onReady={onLayoutRootView}
            ref={(navigatorRef) => {
              navigationHelper.setTopLevelNavigator(navigatorRef);
            }}
          >
            <AxiosInterceptor>
              <Routing />
            </AxiosInterceptor>
          </NavigationContainer>
        </IntlProvider>
      </PersistGate>
    </Provider>
  );
}
