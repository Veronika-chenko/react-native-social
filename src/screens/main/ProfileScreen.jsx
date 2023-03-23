import { useState, useCallback, useEffect } from "react";
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

import mountainsImage from "../../../assets/images/mountains-bg.jpg";
import userPhoto from "../../../assets/images/user-photo.png";
import union from "../../../assets/images/union.png";
import cross from "../../../assets/images/cross.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSelectors";
import { getUserPosts } from "../../firebase/helpers/postsManager";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { PostItem } from "../../components";

SplashScreen.preventAutoHideAsync();

export const ProfileScreen = ({ navigation }) => {
  const { userId } = useSelector(selectUser);
  const [isPhoto, setIsPhoto] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../../../assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

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
      console.log("error in get post on Profile", error.message);
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
    // <Text>ProfileScreen</Text>
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground source={mountainsImage} style={styles.bgImage}>
        <View style={styles.innerBox}>
          <View style={styles.photoWrap}>
            {isPhoto ? (
              <>
                <Image source={userPhoto} />
                <TouchableOpacity
                  style={{ ...styles.addPhotoBtn, borderColor: "#E8E8E8" }}
                  activeOpacity={0.7}
                  onPress={() => setIsPhoto(false)}
                >
                  <Image source={cross} />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.addPhotoBtn}
                activeOpacity={0.7}
                onPress={() => setIsPhoto(true)}
              >
                <Image source={union} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.profileName}>Natali Romanova</Text>
          <View style={{ paddingHorizontal: 16 }}>
            <FlatList
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
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: 'flex-end',
    marginBottom: -65,
  },
  innerBox: {
    flex: 1,
    marginTop: 103,
    paddingTop: 92,
    position: "relative",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
});
