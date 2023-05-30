import 'react-native-gesture-handler';
import Routes from "./navigation/index";
import React from "react";
import { NativeBaseProvider} from "native-base";
import { useFonts } from 'expo-font'


export default function App() {
  const [fontsLoaded] = useFonts({
    'Alegreya': require('./assets/fonts/Alegreya-VariableFont_wght.ttf'),
  });
  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      console.log(fontsLoaded)
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NativeBaseProvider  onLayout={onLayoutRootView}> 
      <Routes />
    </NativeBaseProvider>
  );
}
