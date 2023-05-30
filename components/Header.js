import React from "react";
import { Text, View, Avatar } from "native-base";
import { TouchableOpacity } from "react-native";
import { useState } from "react";

export const Header = ({ user, navigation }) => {
  const [email, setEmail] = useState(user.email);
  const abr =
    email.charAt(0) + email.charAt(email.indexOf(".") + 1) ||
    email.charAt(email.indexOf("@") + 1);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 15,
      }}
    >
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        {user.photoURL ? (
          <Avatar
            source={{
              uri: user.photoURL,
            }}
            size={"sm"}
          >
            <Avatar.Badge bg="green.500" />
          </Avatar>
        ) : (
          <Avatar size={"sm"}>
            {abr}
            <Avatar.Badge bg="green.500" />
          </Avatar>
        )}
      </TouchableOpacity>
      <Text style={{ fontSize: 18 }}>Hello {user.displayName}</Text>
    </View>
  );
};
