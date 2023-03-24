import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Feather } from "@expo/vector-icons";

import mountainsImage from "../../../assets/images/mountains-bg.jpg";

import { selectUser } from "../../redux/auth/authSelectors";

import { db } from "../../firebase/config";
import { PostItem } from "../../components";
import { authSignOutUser } from "../../redux/auth/authOperations";

SplashScreen.preventAutoHideAsync();

export const ProfileScreen = ({ navigation }) => {
  const { userId, avatar } = useSelector(selectUser);
  const [userPosts, setUserPosts] = useState([]);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../../../assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(authSignOutUser())
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((err) => alert(err.message));
  };

  const getUserPosts = () => {
    try {
      const q = query(collection(db, "posts"), where("userId", "==", userId));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setUserPosts([
          ...querySnapshot.docs.map((doc) => ({
            postId: doc.id,
            ...doc.data(),
          })),
        ]);
      });
      return unsubscribe;
    } catch (error) {
      console.log(error.message);
      return () => {};
    }
  };

  useEffect(() => {
    (async () => {
      const unsubscribe = await getUserPosts();
      return () => unsubscribe();
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground source={mountainsImage} style={styles.bgImage}>
        <View style={styles.innerBox}>
          <View style={styles.photoWrap}>
            <Image source={{ uri: avatar }} style={styles.userPhoto} />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.logoutBtn}
            onPress={handleLogOut}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.profileName}>Natali Romanova</Text>
          <View style={{ paddingHorizontal: 16 }}>
            {userPosts.length === 0 && (
              <Text style={styles.infoMessage}>
                You haven't created any posts yet
              </Text>
            )}
            <FlatList
              style={styles.postList}
              data={userPosts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <PostItem item={item} navigation={navigation} />
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    marginBottom: -65,
  },
  innerBox: {
    position: "relative",
    flex: 1,
    marginTop: 103,
    paddingTop: 92,
    position: "relative",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logoutBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  photoWrap: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    overflow: "hidden",
  },
  userPhoto: {
    width: "100%",
    height: "100%",
  },
  addPhotoBtn: {
    position: "absolute",
    top: 81,
    right: -12.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 50,
  },
  profileName: {
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  infoMessage: {
    marginRight: "auto",
    fontSize: 16,
  },
  postList: {
    height: 430,
  },
});
