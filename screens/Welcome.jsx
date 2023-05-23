import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button,Stack } from "native-base";


const WelcomeScreen = ({ navigation }) => {


  return (
    <View style={styles.container}>
      <Text>Welcome screen!</Text>

      <Stack mb="2.5" mt="1.5" direction={{
        base: "row",
        md: "row"
      }} space={2} mx={{
        base: "auto",
        md: "0"
      }}>
        <Button
          size="sm"
          variant="subtle"
          onPress={() => navigation.navigate("Sign In")}
        >
          Sign in
        </Button>
        <Button
          size="sm"
          variant="subtle"
          onPress={() => navigation.navigate("Sign Up")}
        >
          Sign up
        </Button>
        </Stack>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

});

export default WelcomeScreen;
