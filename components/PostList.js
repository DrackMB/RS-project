import {
  Icon,
  Box,
  HStack,
  FlatList,
  Avatar,
  Text,
  AspectRatio,
  Heading,
  Image,
  Stack,
  Center,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { auth, db } from "../config";
import { doc, updateDoc,arrayUnion } from "firebase/firestore";
const user = auth.currentUser;
const PostList = ({ posts }) => {
  const [post,setPost]=useState(posts)
  
  const RenderPostItem = (data) => {
    
    //console.log(data)
     let item = data.data.data;
     let itemId=data.data.docId;
     //console.log("iteamid",itemId)
    return (
      <Box alignItems="center" marginTop="5px">
        <Box
          maxW="90%"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box margin="5px">
            <HStack space={2}>
              <Center>
                <Avatar
                  width="40px"
                  height="40px"
                  bg="green.500"
                  
                >
                  AJ
                  <Avatar.Badge bg="green.500" />
                </Avatar>
              </Center>
              <Center>
                <Text>{item.users}</Text>
              </Center>
            </HStack>
          </Box>
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: item.uri||"https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                }}
                alt="image"
              />
            </AspectRatio>
          </Box>
          <Stack p="4" space={3}>
            <Text fontWeight="400">{item.content.subHeder}</Text>
            <HStack space={2} alignContent="center">
              <HStack space={2}>
                <Center>
                  <Icon as={Ionicons} name="heart-sharp" color="red.500" />
                </Center>
                <Center>
                  <Text color="coolGray.600" onPress={()=>likes(itemId)}>{item.liks?.length()}</Text>
                </Center>
              </HStack>
              <HStack space={2}>
                <Center>
                  <Icon as={MaterialIcons} name="comment" />
                </Center>
                <Center>
                  <Text color="coolGray.600">{item.comment?.length()}</Text>
                </Center>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    );
  };
  const likes = async (postsId) => {
    const postId = postsId;
    console.log("post id ",postId)
    // Update the likes count
    const docRef = doc(db, 'posts', postId);
    
    try{
      await updateDoc(docRef, {
        likes: arrayUnion({uid:user?.uid})
    })
    }
    catch(err){console.log("err",err)}
  };

  return (
    <Box>
      <FlatList
        mt={"4"}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={post}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return <RenderPostItem data={item} />;
        }}
      />
    </Box>
  );
};

export default PostList;
