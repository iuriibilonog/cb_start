import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import store from 'src/redux/store';
import { Provider } from 'react-redux';
import navigationHelper from 'src/helpers/navigationHelper';
import { AxiosInterceptor } from 'src/services/interceptor';
import { View } from 'react-native';
import { IntlProvider } from 'react-intl';
import UA from 'src/lang/ua.json';
import EN from 'src/lang/en.json';

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
  // console.log('language', navigator.language);
  // const locale = navigator.language;
  const locale = 'uk';
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
      <IntlProvider locale={locale} messages={lang}>
        <NavigationContainer
          onReady={onLayoutRootView}
          ref={(navigatorRef) => {
            navigationHelper.setTopLevelNavigator(navigatorRef);
          }}
        >
          <AxiosInterceptor>{routing}</AxiosInterceptor>
        </NavigationContainer>
      </IntlProvider>
    </Provider>
  );
}
