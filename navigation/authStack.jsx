import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/Welcome";
import SignInScreen from "../screens/SignInScreen";
import SignOutScreen from "../screens/SignUpScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
        headerMode: 'float',
        headerStyle: { backgroundColor: 'transparent' },
      }}>
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen  name="Sign In" options={{ headerTransparent:true ,headerTitleStyle:{color:"#fff"}}}  component={SignInScreen} />
        <Stack.Screen  name="Sign Up" options={{ headerTransparent:true,headerTitleStyle:{color:"#fff"} }} component={SignOutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
