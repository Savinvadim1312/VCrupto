import React, { useState } from 'react';
import { Platform, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Amplify from 'aws-amplify'
import * as WebBrowser from 'expo-web-browser';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import AppContext from './src/utils/AppContext';
// @ts-ignore
import awsConfig from './aws-exports'

const [
  productionRedirectSignIn,
  localRedirectSignIn,
] = awsConfig.oauth.redirectSignIn.split(",");

const [
  productionRedirectSignOut,
  localRedirectSignOut,
] = awsConfig.oauth.redirectSignOut.split(",");

async function urlOpener(url: string, redirectUrl: string) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if (type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}


Amplify.configure({
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    urlOpener,
    redirectSignIn: __DEV__ ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: __DEV__ ? localRedirectSignOut : productionRedirectSignOut,
  },
});



export default function App() {
  const [userId, setUserId] = useState(null);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppContext.Provider value={{userId, setUserId}}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </AppContext.Provider>
      </SafeAreaProvider>
    );
  }
}
