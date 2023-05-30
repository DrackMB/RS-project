import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground } from "react-native";
import { ErrorMessage, InputField } from "../components";
import {
  Box,
  Input,
  Icon,
  Link,
  VStack,
  Text,
  Flex,
  Pressable,
  Center,
  Button,
} from "native-base";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth, db } from "../config";
import { addDoc, collection } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [show, setShow] = useState(false);

  async function signUp() {
    try {
      if (email !== "" && password !== "") {
        try {
          await createUserWithEmailAndPassword(auth, email, password).then(
            async (res) => {
              const user = res.user;
              const docRef = await addDoc(collection(db, "users"), {
                email: email,
                uids: user.uid,
                names: name,
              });
              await updateProfile(user, { displayName: name })
              console.log("Document written with ID: ", docRef.id);
              //navigation.navigate("Sign In");
            }
          );
        } catch (err) {
          console.log(err);
        }
      }
      if (email === "" || password === "") {
        setSignupError("Email and password are mandatory.");
        return;
      }
    } catch (error) {
      console.log(error);
      setSignupError(error.message);
    }
  }

  return (
    <ImageBackground
      source={require("../assets/images/Background.png")}
      style={styles.imageBackground}
    >
      <StatusBar style="auto" />
      <Center flex={1} px="3">
        <VStack space={3} justifyContent="center">
          <Text style={styles.title}>Create new account</Text>
          <Box alignSelf="center">
            <Input
              variant="underlined"
              w={{
                base: "95%",
                md: "25%",
              }}
              marginBottom={5}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="badge" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              color="#fff"
              placeholder="Name"
              autoFocus={true}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Input
              variant="underlined"
              w={{
                base: "95%",
                md: "25%",
              }}
              marginBottom={5}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              color="#fff"
              placeholder="Email"
              autoFocus={false}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              variant="underlined"
              w={{
                base: "95%",
                md: "25%",
              }}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="lock" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              color="#fff"
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              marginBottom={3.5}
              onChangeText={(text) => setPassword(text)}
            />
            {signupError ? (
              <ErrorMessage error={signupError} visible={true} />
            ) : null}
            <Button
              marginBottom={2.5}
              size="md"
              onPress={signUp}
              tileColor="#fff"
              backgroundColor={COLORS.primary}
              fontFamily="Alegreya"
            >
              Login
            </Button>
            <Flex direction="row" color="#fff">
              <Text fontFamily="Alegreya" color="#fff">
                Already have an account?{" "}
              </Text>
              <Link
                _text={{
                  color: "#fff",
                  bold: "1",
                  fontFamily: "Alegreya",
                }}
                onPress={() => navigation.navigate("Sign In")}
              >
                Go to Go to Login
              </Link>
            </Flex>
          </Box>
        </VStack>
      </Center>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 60,
    //flex:0.5,
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    alignSelf: "center",
    padding: 2.5,
    fontFamily: "Alegreya",
  },
  imageBackground: {
    flex: 1,
  },
});

export default SignUpScreen;
