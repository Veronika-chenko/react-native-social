import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import "react-native-get-random-values";
import { PostInput, SubmitButton } from "../../components";
import { uploadImage } from "../../firebase/helpers/storeManager";
// firestore
import { uploadPostToDb } from "../../firebase/helpers/postsManager";
// get current user info from redux
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSelectors";

const initialState = {
  photoURI: null,
  title: "",
  region: "",
  location: null,
};

export const CreatePostsScreen = ({ navigation }) => {
  const cameraRef = useRef();
  const { userId, nickname } = useSelector(selectUser);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [newPost, setNewPost] = useState(initialState);
  //  for MediaLibrary acces gallery or camera and safe photo
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaPermission, setHasMediaPermission] = useState();
  const [photoURI, setPhotoURI] = useState(null);
  // maybe for location error
  const [errorMsg, setErrorMsg] = useState(null);

  // camera permission
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  // location permission
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        // or:
        // setErrorMsg("Permission to access location was denied");
        // return;
      }
    })();
  }, []);

  async function getPhotosFromDevice() {
    const { assets } = await MediaLibrary.getAssetsAsync({
      mediaType: "photo",
    });
    console.log("assets:", assets);
    return assets;
  }

  function renderPhoto(asset) {
    return (
      <Image source={{ uri: asset.uri }} style={{ width: 200, height: 200 }} />
    );
  }

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const getUserLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    return coords;
  };

  const takePic = async () => {
    const newPhoto = await cameraRef.current.takePictureAsync();
    setPhotoURI(newPhoto.uri);
  };

  // submitForm
  const handleSubmit = async () => {
    const { title, region } = newPost;
    if (!photoURI || !title || !region) {
      alert("all fields are required");
      return;
    }

    try {
      const newPhotoURI = await uploadImage(photoURI, "images");
      const location = await getUserLocation();

      console.log("after photo and location");
      const newPost = {
        ...newPost,
        userId: userId,
        userName: nickname,
        photoURI: newPhotoURI,
        location: location,
      };
      // call postManager fn
      await uploadPostToDb(newPost);
    } catch (error) {
      console.log("error on created", error.message);
    }

    setNewPost(initialState);
    setPhotoURI(null);
    navigation.navigate("DefaultPosts");
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={keyboardHide} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ marginTop: isShowKeyboard ? -32 : 32 }}>
            <Camera
              style={styles.camera}
              ref={cameraRef}
              // type={type}
            >
              <View style={styles.photoWrap}>
                {!photoURI && (
                  <TouchableOpacity
                    style={styles.photoButton}
                    activeOpacity={0.7}
                    onPress={takePic}
                  >
                    <FontAwesome5 name="camera" size={24} color="#BDBDBD" />
                  </TouchableOpacity>
                )}
                {photoURI && (
                  <Image style={styles.preview} source={{ uri: photoURI }} />
                )}
              </View>
            </Camera>
            <Text style={styles.helpText}>Завантажте фото</Text>
            {/* <TouchableOpacity onPress={getPhotosFromDevice}>
              <Text style={styles.helpText}>Завантажте фото</Text>
            </TouchableOpacity> */}

            <PostInput
              placeholder="Назва..."
              name="title"
              value={newPost.title}
              onChangeText={(value) =>
                setNewPost((prev) => ({ ...prev, title: value }))
              }
              onFocus={() => setIsShowKeyboard(true)}
              marginStyle={{ marginBottom: 16 }}
            />
            <PostInput
              placeholder="Місцевість..."
              name="location"
              value={newPost.region}
              onChangeText={(value) =>
                setNewPost((prev) => ({ ...prev, region: value }))
              }
              onFocus={() => setIsShowKeyboard(true)}
              marginStyle={{ marginBottom: isShowKeyboard ? 32 : 0 }}
            />
            <SubmitButton onPress={handleSubmit}>Опублікувати</SubmitButton>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.trashButton}
              activeOpacity={0.7}
              onPress={() => {
                setNewPost(initialState);
                setPhotoURI(null);
              }}
            >
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  camera: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  photoWrap: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 240,
    marginBottom: 8,
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  photoButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  helpText: {
    fontSize: 16,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  mainButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 27,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  footer: {
    position: "absolute",
    bottom: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginHorizontal: 16,
  },
  trashButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});
