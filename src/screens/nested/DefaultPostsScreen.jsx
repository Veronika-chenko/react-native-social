import { useState, useCallback, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Feather } from "@expo/vector-icons";
import userPhoto from "../../../assets/images/user-photo.png";
// import postPhoto from '../../../assets/images/post.jpg';

SplashScreen.preventAutoHideAsync();

export const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prev) => [...prev, route.params]);
    }
  }, [route.params]);
  // console.log("route.params:", route.params);
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
    // <Text>PostsScreen</Text>
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.userItem}>
        <Image source={userPhoto} style={styles.userPhoto} />
        <View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
      {/* {posts && <Text>Posts are here</Text>} */}
      <>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.postItem}>
              <Image
                source={{ uri: item.photo.uri }}
                style={styles.postImage}
              />
              {/* <Text style={styles.postTitle}>Forest</Text> */}
              <Text style={styles.postTitle}>{item.title}</Text>
              <View style={styles.postFooter}>
                {/* <View style={styles.postCommentWrap}>
                            <Feather name="message-circle" size={24} color="#BDBDBD" style={styles.commentIcon} />
                            <Text style={styles.commentQuantity}>0</Text>
                        </View> */}
                <TouchableOpacity
                  style={styles.postCommentWrap}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("CommentsScreen")}
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#BDBDBD"
                    style={styles.commentIcon}
                  />
                  <Text style={styles.commentQuantity}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("MapScreen")}
                >
                  <Feather
                    name="map-pin"
                    size={24}
                    color="#BDBDBD"
                    style={{ marginRight: 3 }}
                  />
                  {/* <Text style={styles.postLocationText}>Location</Text> */}
                  <Text style={styles.postLocationText}>
                    {item.location.latitude}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </>
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
  postItem: {
    marginBottom: 16,
  },
  postImage: {
    flex: 1,
    height: 240,
    resizeMode: "cover",
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  postTitle: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postCommentWrap: {
    flexDirection: "row",
  },
  commentIcon: {
    transform: [{ scaleX: -1 }],
    marginRight: 6,
  },
  commentQuantity: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  postLocationText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#212121",
    textDecorationLine: "none",
  },
});
