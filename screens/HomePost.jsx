import { React, useState, useEffect } from "react";
import { Text, View } from "react-native";
import AddPostScreen from "./AddPostScreen";
import PostList from "../components/PostList";
import { collection, getDocs, query, where, getDoc } from "firebase/firestore";
import { auth, db } from "../config";
import {
  HStack,
  Spinner,
  Heading,
  Box,
  Modal,
  Input,
  Button,
} from "native-base";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { CustomDrawer, Header } from "../components";
const user = auth.currentUser;
export default function HomePost({ navigation }) {
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  async function getdata() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((res) => {
      setData(data.push({ docId: res.id, data: res.data() }));
    });
  }

  useState(() => {
    getdata();
  }, []);
  const HomePostsList = ({ navigation, route }) => {
    //console.log("myData===>",route.params.data)
    return (
      <View >
        <Header user={auth.currentUser} navigation={navigation} />
        <Box>
          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Body>
                <AddPostScreen/>
              </Modal.Body>
            </Modal.Content>
          </Modal>
          <HStack  justifyContent="flex-end">
            <Button
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              Add POST
            </Button>
          </HStack>
        </Box>
        <PostList posts={route.params.data} />
      </View>
    );
  };
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="homePostsList"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#aa18ea",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: "Alegreya",
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="homePostsList"
        initialParams={{ data: data }}
        component={HomePostsList}
      />
    </Drawer.Navigator>
  );
}
