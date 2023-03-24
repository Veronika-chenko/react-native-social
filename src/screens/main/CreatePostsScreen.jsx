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

import { Camera } from "expo-camera";
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
//
import * as ImagePicker from "expo-image-picker";

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
  const [post, setPost] = useState(initialState);
  //  for MediaLibrary acces gallery or camera and safe photo
  const [hasCameraPermission, setHasCameraPermission] = useState();
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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoURI(result.assets[0].uri);
    }
  };

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
    const { title, region } = post;
    if (!photoURI || !title || !region) {
      alert("all fields are required");
      return;
    }

    try {
      const newPhotoURI = await uploadImage(photoURI, "images");
      const location = await getUserLocation();

      const newPost = {
        title: title.trim(),
        region: region.trim(),
        photoURI: newPhotoURI,
        location: location,
        userId: userId,
        userName: nickname,
        comments: 0,
      };

      await uploadPostToDb(newPost);
    } catch (error) {
      console.log(error.message);
    }

    setPost(initialState);
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
            <Camera style={styles.camera} ref={cameraRef}>
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
            <View style={styles.buttonsWrap}>
              <TouchableOpacity
                onPress={pickImage}
                activeOpacity={0.7}
                style={styles.uploadPhotoBtn}
              >
                <Text style={styles.uploadBtnText}>Завантажте фото</Text>
              </TouchableOpacity>
              {photoURI && (
                <TouchableOpacity
                  onPress={() => setPhotoURI(null)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.uploadBtnText}>Видалити</Text>
                </TouchableOpacity>
              )}
            </View>

            <PostInput
              placeholder="Назва..."
              name="title"
              value={post.title}
              onChangeText={(value) =>
                setPost((prev) => ({ ...prev, title: value }))
              }
              onFocus={() => setIsShowKeyboard(true)}
              marginStyle={{ marginBottom: 16 }}
            />
            <PostInput
              placeholder="Місцевість..."
              name="location"
              value={post.region}
              onChangeText={(value) =>
                setPost((prev) => ({ ...prev, region: value }))
              }
              onFocus={() => setIsShowKeyboard(true)}
              marginStyle={{ marginBottom: isShowKeyboard ? 32 : 0 }}
            />
            <SubmitButton onPress={handleSubmit}>Опублікувати</SubmitButton>
          </View>
          <View
            style={{
              ...styles.footer,
              bottom: isShowKeyboard ? "-100%" : 15,
            }}
          >
            <TouchableOpacity
              style={styles.trashButton}
              activeOpacity={0.7}
              onPress={() => {
                setPost(initialState);
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
  buttonsWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  uploadPhotoBtn: {
    width: 145,
  },
  uploadBtnText: {
    fontSize: 16,
    color: "#BDBDBD",
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
