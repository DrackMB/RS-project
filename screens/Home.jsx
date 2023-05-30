import React from "react";
import { StyleSheet } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomePost from "./HomePost";
import SettingsScreen from "./SettingsScreen";
import { Box } from "native-base";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const { user } = useAuthentication();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Homes") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Homes" options={{ headerShown: false }} component={HomePost} />
      <Tab.Screen name="Settings"  component={SettingsScreen} />
    </Tab.Navigator>

  );
}


