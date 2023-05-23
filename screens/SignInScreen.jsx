import { StatusBar } from "expo-status-bar";

import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  Button as ButtonComponent,
  ErrorMessage,
  InputField,
} from "../components";
import { auth } from "../config";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [loginError, setLoginError] = useState("");

  const handlePasswordVisibility = async () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  async function signIn() {
    try {
      if (email !== "" && password !== "") {
        await signInWithEmailAndPassword(auth, email, password).then((user)=>{
          console.log(user)
        });
      }
      if (email === "" || password === "") {
        setLoginError("'Email and password are mandatory.'");
        return;
      }
    } catch (error) {
      console.log(error);
      setLoginError(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <Text style={styles.title}>Login</Text>
      <View style={styles.controls}>
        <InputField
          inputStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginBottom: 20,
          }}
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => {
            if (loginError.length > 0) {
              setLoginError("");
              setEmail(text);
            } else setEmail(text);
          }}
        />
        <InputField
          inputStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginBottom: 20,
          }}
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          value={password}
          onChangeText={(text) => {
            if (loginError.length > 0) {
              setLoginError("");
              setPassword(text);
            } else setPassword(text);
          }}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
        <ButtonComponent
          onPress={signIn}
          backgroundColor="#f57c00"
          title="Login"
          tileColor="#fff"
          titleSize={20}
          containerStyle={{
            marginBottom: 24,
          }}
        />
        <Button
          onPress={() => navigation.navigate("Sign Up")}
          title="Go to Signup"
          color="#fff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e93b81",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    alignSelf: "center",
    paddingBottom: 24,
  },
});

export default SignInScreen;
