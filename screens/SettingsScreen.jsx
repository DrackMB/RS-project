import React from 'react'

import { useState } from 'react';
import { Avatar, Button, Center, Divider, Icon, Image, Input, Stack, Text } from 'native-base';
import { updateProfile } from 'firebase/auth';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { signOut } from "firebase/auth";

import { auth, storage } from '../config';
import { COLORS } from '../constants';
import { notification } from '../utils/hooks';
import { Alert, Linking, Platform } from 'react-native';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function SettingsScreen() {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const user = auth.currentUser;
   const signout = async function(){
    await signOut(auth)
   }
  const updateProfileHandler = async function () {
    try {
      await updateProfile(user, { displayName: name });

      setName('');
      notification({ type: 'success', message: 'User profile is updated !' });
    } catch (error) {
      return notification({ type: 'error', message: error.message });
    }
  };

  // Pick Image from Gallery 
  const pickerImage = async function () {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        return Alert.alert(
          'Access denied 💥',
          "We don't have access to the gallery, please change your setting",
          [
            {
              text: 'Open settings',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'Cancel',
              style: 'destructive',
            },
          ]
        );
      }

      const picker = await ImagePicker.launchImageLibraryAsync();

      if (!picker.canceled) {
        const result = picker.assets[0].uri;

        /*
        const resultArray = result.split('/');

        const fileName = resultArray.at(-1).split('.');
        const extensionFile = fileName.at(-1);
        */

        return {
          uri: result,
          // extension: extensionFile,
        };
      }
    }
  };

  // Firebase Section

  const fileRef = ref(storage, `avatar-${user.uid}.jpg`);

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

    await updateProfile(user, { photoURL: imageURL });

    setProfileImage(imageURL);
  };

  const updateImageProfileHandler = async function () {
    const { uri } = await pickerImage();

    if (uri) {
      const uploadImageToFirebase = await uploadImage(uri);

      if (uploadImageToFirebase) {
        getImageURL();
      }
    }
  };

  return (
    <Stack safeArea safeAreaX="6" space={'4'}>
      <Text color={COLORS.white} fontSize={'lg'}>
        User Information
      </Text>
      <Input
        placeholder={user.displayName || 'user name'}
        onChangeText={(textEntered) => setName(textEntered)}
        value={name}
        color={COLORS.white}
      />
      <Button onPress={updateProfileHandler} bgColor={COLORS.secondary}>
        Save
      </Button>
      <Divider my="6" />
      <Text color={COLORS.white} fontSize={'lg'}>
        User Image
      </Text>
      {/* Image */}
      {user?.photoURL && (
        <Center>
          <Avatar
            source={{
              uri: profileImage || user.photoURL,
            }}
            size={'xl'}
          />
        </Center>
      )}
      <Button
        onPress={updateImageProfileHandler}
        leftIcon={
          <Icon as={<MaterialIcons name="photo-camera" />} size={'6'} color={COLORS.white} />
        }
        bgColor={COLORS.secondary}>
        Add an image profile
      </Button>
      <Button onPress={signout} bgColor={COLORS.secondary}>
        signout
      </Button>
    </Stack>
  );
}



  