import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState, useRef } from 'react';
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
import { AppState } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isAppGetUpdates, setIsAppGetUpdates] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // const routing = useRouting();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });
    async function prepare() {
      try {
        await Font.loadAsync({
          Mont: require('./assets/fonts/Mont_Regular.ttf'), //fontWeight=600
          Mont_SB: require('./assets/fonts/Mont_SemiBold.ttf'), //fontWeight=700
          Mont_B: require('./assets/fonts/Mont_Bold.ttf'), //fontWeight=800
        });

        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          setIsAppGetUpdates(true);
        } else {
          setIsAppGetUpdates(false);
        }

        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
    return () => {
      subscription.remove();
    };
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
