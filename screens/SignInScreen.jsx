import { StatusBar } from "expo-status-bar";

import { useState, useRef } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ErrorMessage } from "../components";
import { notification } from "../utils/hooks";
import { auth } from "../config";
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
  AlertDialog,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [show, setShow] = useState(false);
  const cancelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(!isOpen);

  const recoveryPassword = async function () {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        notification({
          type: "success",
          message: "An email to reset your password has been sent",
        });
        onClose();
      })
      .catch((error) => {
        return notification({ type: "error", message: error.message });
      });
  };
  async function signIn() {
    try {
      if (email !== "" && password !== "") {
        await signInWithEmailAndPassword(auth, email, password)
          .then((user) => {
            notification({
              type: "success",
              message: "Welcome " + (user?.displayName ? user.displayName : ""),
            });
          })
          .catch((err) => {
            console.log(err)
            return notification({ type: "error", message: err.message });
          });
      }
      if (email === "" || password === "") {
        setLoginError("Email and password are mandatory.");
        return;
      }
    } catch (error) {
      console.log(error);
      setLoginError(error.message);
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
          <Text style={styles.title}>Login</Text>
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
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              fontFamily="Alegreya"
              color="#fff"
              placeholder="Name"
              autoFocus={true}
              value={email}
              onChangeText={(text) => {
                if (loginError.length > 0) {
                  setLoginError("");
                  setEmail(text);
                } else setEmail(text);
              }}
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
              fontFamily="Alegreya"
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
              onChangeText={(text) => {
                if (loginError.length > 0) {
                  setLoginError("");
                  setPassword(text);
                } else setPassword(text);
              }}
            />
            <Flex alignItems="flex-end">
              <Link onPress={onClose}>
                <Text
                  marginBottom={3.5}
                  mt="2"
                  fontSize={12}
                  fontWeight="medium"
                  color="muted.400"
                >
                  Forgot Password?
                </Text>
              </Link>
            </Flex>
            {loginError ? (
              <ErrorMessage error={loginError} visible={true} />
            ) : null}
            <Button
              marginBottom={2.5}
              size="md"
              onPress={signIn}
              tileColor="#fff"
              backgroundColor={COLORS.primary}
            >
              Login
            </Button>
            <Flex direction="row" color="#fff">
              <Text color="#fff" fontFamily="Alegreya">
                Don't have an account?{" "}
              </Text>
              <Link
                _text={{
                  color: "#fff",
                  bold: "1",
                  fontFamily: "Alegreya",
                }}
                onPress={() => navigation.navigate("Sign Up")}
              >
                Go to Sign Up
              </Link>
            </Flex>
          </Box>
        </VStack>
      </Center>

      {/* Modal */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content fontFamily='Alegreya'>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Recovery Password</AlertDialog.Header>
          <AlertDialog.Body fontFamily= 'Alegreya'>
            An email to reset your password has been sent. Please check your
            inbox and follow the instructions to proceed with the password reset
            process.
            <Input
            
              mt="6"
              placeholder="Enter your email"
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="email" />}
                  color={COLORS.secondary}
                  size="md"
                  ml="2"
                />
              }
              keyboardType="email-address"
              onChangeText={(textEntered) => setEmail(textEntered)}
              value={email}
            />
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={recoveryPassword}>
                Recovery
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    alignSelf: "center",
    padding: 2,
    marginTop: 5,
    fontFamily: "Alegreya",
  },
  imageBackground: {
    flex: 1,
  },
});

export default SignInScreen;
