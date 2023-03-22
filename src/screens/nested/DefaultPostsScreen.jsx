import { useState, useCallback, useEffect } from "react";
import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
// import { postsdb } from "../../posts";

import { auth } from "../../firebase/config";

import userPhoto from "../../../assets/images/user-photo.png";
import { PostItem } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import { getPosts } from "../../firebase/postsManager";
// import postPhoto from '../../../assets/images/post.jpg';

SplashScreen.preventAutoHideAsync();

export const DefaultPostsScreen = ({ route, navigation }) => {
  // const [posts, setPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   if (route.params) {
  //     setPosts((prev) => [...prev, route.params]);
  //   }
  // }, [route.params]);
  useEffect(() => {
    if (route.params) {
      setPosts((prev) => [...prev, postsdb]);
    }
  }, [route.params]);
  // useEffect(() => {
  //   // setPosts(getPosts());
  //   // setPosts(postsdb);
  // }, []);
  // useEffect(() => {
  //   console.log(postdb);
  //   const postsdb = JSON.parse(`"${postdb}"`);
  //   console.log("postsdb:", postsdb);
  //   // setPosts();
  // }, []);
  // console.log("route.params:", route.params);
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../../../assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../../../assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  const { userEmail, userNickname } = useAuth();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // useEffect(() => {}, []);

  return (
    // <Text>PostsScreen</Text>
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.userItem}>
        <Image source={userPhoto} style={styles.userPhoto} />
        <View>
          {/* <Text style={styles.userName}>{auth.currentUser?.displayName}</Text> */}
          <Text style={styles.userName}>{userNickname}</Text>
          {/* <Text style={styles.userEmail}>{auth.currentUser?.email}</Text> */}
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PostItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  userPhoto: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
