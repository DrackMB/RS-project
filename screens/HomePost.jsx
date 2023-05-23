import { React, useState, useEffect } from "react";
import { Text, View } from "react-native";
import AddPostScreen from "./AddPostScreen";
import PostList from "../components/PostList";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../config";
import { Loading } from "../components";
import { HStack, Spinner, Heading } from "native-base";


export default function HomePost({ user }) {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    (async () => {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((res) => {
        setData(data.push({ docId: res.id, data: res.data() }));
      });
    })().then(()=>{setLoading(false)}).catch((err) => console.log(err));
    // make sure to catch any error
  }, []);
  return (
    <View>
       <PostList posts={data} />
      
    </View>
  );
}
