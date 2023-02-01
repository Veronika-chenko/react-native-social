import {useState, useCallback} from 'react';
import { 
  StyleSheet,
  Platform,
  View,
 } from 'react-native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

import { RegistrationScreen } from './Screens/RegistrationScreen';


export default function App() {

  const [fontsLoaded] = useFonts({
      'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <View onLayout={onLayoutRootView}>
      <RegistrationScreen onLayout={onLayoutRootView}/>
      /* <LoginScreen/> */
    // </View>

  );
}