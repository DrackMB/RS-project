import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db, storage } from "../config";
import { Button } from "react-native-elements";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import {
  Icon,
  Box,
  HStack,
  FlatList,
  Heading,
  Image,
  Stack,
  Center,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { notification } from "../utils/hooks";

function AddPostScreen() {
  const user = auth.currentUser;
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  //console.log(user?.displayName);
  // Pick Image from Gallery
  const pickerImage = async function () {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        return Alert.alert(
          "Access denied 💥",
          "We don't have access to the gallery, please change your setting",
          [
            {
              text: "Open settings",
              onPress: () => Linking.openSettings(),
            },
            {
              text: "Cancel",
              style: "destructive",
            },
          ]
        );
      }

      const picker = await ImagePicker.launchImageLibraryAsync();
      if (!picker.canceled) {
        const result = picker.assets[0].uri;
        return {
          uri: result,
        };
      }
    }
  };

  // Firebase Section

  const fileRef = ref(storage, `post-${user.uid + new Date()}.jpg`);

  const uploadImage = async function (uri) {
    const image = await fetch(uri);
    const bytes = await image.blob();

    try {
      await uploadBytes(fileRef, bytes);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getImageURL = async function () {
    // await getDownloadURL(fileRef).then(async (url) => await updateProfile(user, { photoURL: url }));
    const imageURL = await getDownloadURL(fileRef);
    setImage(imageURL);
  };

  const updateImageHandler = async function () {
    const { uri } = await pickerImage();

    if (uri) {
      console.log(uri);
      const uploadImageToFirebase = await uploadImage(uri);

      if (uploadImageToFirebase) {
        getImageURL();
      }
    }
  };
  const handleAddPost = async () => {
    let post;
    if (user) {
      post = {
        users: user?.displayName,
        title: title,
        uri: image,
        content: {
          header: "header",
          subHeder: description,
        },
        likes: [],
        comments: [],
      };
    }
    try {
      await addDoc(collection(db, "posts"), post)
        .then((docRef) => {
          console.log("Post added with ID: ", docRef.id);
          setPost(docRef);
        })
        .catch((error) => {
          console.error("Error adding post: ", error);
          notification({ type: "error", message: error.message });
        });
    } catch (err) {
      notification({ type: "error", message: error.message });
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}></View>

      <Text style={styles.title}>Créer une nouvelle Post</Text>

      <Box style={styles.formContainer}>
        <Box paddingBottom={5}>
          <Center>
            <Image
              size={100}
              source={{
                uri: image,
              }}
              alt="image"
            />
          </Center>
          <Box paddingTop={2}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={updateImageHandler}
            >
              <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>
          </Box>
        </Box>
        <TextInput
          style={styles.input}
          placeholder="Titre"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description"
          multiline
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddPost()}
        >
          <Text style={styles.buttonText}>Créer le post</Text>
        </TouchableOpacity>
        <Center />
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  navbar: {
    backgroundColor: "#f5f5f5",
    alignSelf: "stretch",
    paddingHorizontal: 0,
  },

  title: {
    fontSize: 24,
    textAlign: "center",
    margin: 0,
    color: "green", // Couleur du texte du titre
  },

  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },

  descriptionInput: {
    height: 150,
  },

  image: {
    width: "100%",
    height: 200,
    marginBottom: 0,
  },

  addButton: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 4,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default AddPostScreen;
