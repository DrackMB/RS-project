import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
} from "react-native";
import { Button, Box, HStack,  Text} from "native-base";

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/images/Background.png")}
      style={styles.imageBackground}
    >
      <StatusBar style="auto" />
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          // backgroundColor: "green",
        }}
      >
        <View style={styles.container}>
          <Text italic fontSize="lg" style={{color:"white"}}> Welcome screen </Text>
          <Box>
            <HStack
              space={2}
              alignItems={{
                base: "center",
                md: "flex-start",
              }}
            >
              <Button
                size="md"
                variant="subtle"
                onPress={() => navigation.navigate("Sign In")}
              >
                Sign in
              </Button>
              <Button
                size="md"
                variant="subtle"
                onPress={() => navigation.navigate("Sign Up")}
              >
                Sign up
              </Button>
            </HStack>
          </Box>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;
