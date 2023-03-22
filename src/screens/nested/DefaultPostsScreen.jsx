import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { selectUser } from "../../redux/auth/authSelectors";
import { PostItem } from "../../components";
import { getPosts } from "../../firebase/postsManager";

import userPhoto from "../../../assets/images/user-photo.png";

SplashScreen.preventAutoHideAsync();

export const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  // get current user info from redux:
  const { email, nickname } = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      const allPosts = await getPosts();
      // console.log(21, allPosts);
      // setPosts((prev) => [...prev, ...allPosts]);
      setPosts([...allPosts]);
    })();
  }, []);

  useEffect(() => {});
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../../../assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../../../assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

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
      <View style={styles.userItem}>
        <Image source={userPhoto} style={styles.userPhoto} />
        <View>
          <Text style={styles.userName}>{nickname}</Text>
          <Text style={styles.userEmail}>{email}</Text>
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
