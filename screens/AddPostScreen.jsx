import React, { useState } from "react";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc, arrayUnion
} from "firebase/firestore";
import { auth, db } from "../config";
import { Button } from "react-native-elements";
import { View, Text } from "react-native";
const user = auth.currentUser;
function AddPostScreen() {

  const creatPost = async () => {
    let post
    if (user){
     post = {
      users:user.uid,
      title: "My Post",
      uri:"",
      content: {
        header: "header",
        subHeder: "subHeader",
      },
      likes: [],
      comments: [],
    };}
    try {
       await addDoc(collection(db, "posts"), post)
        .then((docRef) => {
          console.log("Post added with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding post: ", error);
        });
      likes()
    } catch (err) {
      console.log(err);
    }


  };
  
  return (
    <View>
      <Text>AddPostScreen</Text>
      <Button
        title="mypost"
        onPress={() => {
          creatPost();
        }}
      ></Button>
    </View>
  );
}

export default AddPostScreen;
