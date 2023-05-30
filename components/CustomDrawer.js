import { ImageBackground, Image, TouchableOpacity } from "react-native";
import { Text, View, Avatar } from "native-base";
import { signOut } from "firebase/auth";
import { useState } from "react";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import Ionicons from "react-native-vector-icons/Ionicons";
import { auth } from "../config";

const user = auth.currentUser;
const CustomDrawer = (props) => {
    console.log(user)
  const [email, setEmail] = useState(user?.email);
  const abr =
    email?.charAt(0) +
    (email?.charAt(email.indexOf(".") + 1) ||
      email?.charAt(email.indexOf("@") + 1));
  const signout = async function () {
    await signOut(auth)
      .then()
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#8200d6" }}
      >
        <ImageBackground
          source={require("../assets/images/menu-bg.jpeg")}
          style={{ padding: 20 }}
        >
          {user?.photoURL ? (
            <Avatar
              source={{
                uri: user?.photoURL,
              }}
              size={"md"}
            >
              <Avatar.Badge bg="green.500" />
            </Avatar>
          ) : (
            <Avatar size={"md"}>
              {abr}
              <Avatar.Badge bg="green.500" />
            </Avatar>
          )}
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              marginBottom: 5,
            }}
          >
            {user.displayName}
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={signout} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
