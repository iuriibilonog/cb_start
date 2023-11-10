import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import * as Updates from 'expo-updates';
import { store, persistor } from './src/redux/store';
import * as Font from 'expo-font';
import navigationHelper from 'src/helpers/navigationHelper';
import { AxiosInterceptor } from 'src/services/interceptor';
import FlashMessage from 'react-native-flash-message';

import { IntlProvider } from 'react-intl';
import UA from 'src/lang/ua.json';
import EN from 'src/lang/en.js';
import CheckRoleMiddleware from './checkRoleMiddleware';
import { Routing } from './routing';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isAppGetUpdates, setIsAppGetUpdates] = useState(false);

  // const routing = useRouting();

  useEffect(() => {
    async function prepare() {
      try {
        const update = await Updates.checkForUpdateAsync();
        console.log('updateCheck');

        if (update.isAvailable) {
          setIsAppGetUpdates(true);
          return;
        } else {
          setIsAppGetUpdates(false);
        }

        await Font.loadAsync({
          Mont: require('./assets/fonts/Mont_Regular.ttf'), //fontWeight=600
          Mont_SB: require('./assets/fonts/Mont_SemiBold.ttf'), //fontWeight=700
          Mont_B: require('./assets/fonts/Mont_Bold.ttf'), //fontWeight=800
        });

        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

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
              <CheckRoleMiddleware isAppGetUpdates={isAppGetUpdates} />
              <FlashMessage position="top" />
            </AxiosInterceptor>
          </NavigationContainer>
        </IntlProvider>
      </PersistGate>
    </Provider>
  );
}
