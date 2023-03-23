import { useEffect, useCallback, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import postPhoto from "../../../assets/images/post.jpg";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSelectors";
import { uploadCommnetToDb } from "../../firebase/helpers/commentsManager";

SplashScreen.preventAutoHideAsync();

export const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const { userId, nickname } = useSelector(selectUser);
  // console.log("user:", userId, nickname);
  // console.log("in comments:", postId);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // console.log("route.params:", route.params.photo.uri)
  const [fontsLoaded] = useFonts({
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

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = async () => {
    if (!comment) return;
    const newComment = {
      comment: comment.trim(),
      postId,
      user: {
        userId,
        nickname,
      },
      createdAt: new Date(),
    };
    // setComment("");
    await uploadCommnetToDb(newComment, postId);
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <View style={styles.innerBox}>
            {/* image */}
            <Image source={postPhoto} style={styles.postImage} />
            {/* comment list */}
            <View style={{ paddingHorizontal: 16 }}>
              <View style={styles.commentItem}>
                <Image style={styles.commentAvatar} />
                <View style={styles.commentTextWrap}>
                  <Text style={styles.commentText}>
                    Really love your most recent photo. I’ve been trying to
                    capture the same thing for a few months and would love some
                    tips!
                  </Text>
                  <Text style={styles.commetsDate}>09 июня, 2020 | 08:40</Text>
                </View>
              </View>
            </View>
          </View>
          {/* input */}
          <View
            style={{
              ...styles.inputWrap,
              position: isShowKeyboard ? "absolute" : "absolute",
              bottom: isShowKeyboard ? -100 : 0,
            }}
          >
            <TextInput
              style={styles.input}
              onChangeText={setComment}
              placeholder="Коментувати..."
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TouchableOpacity
              style={styles.sendButton}
              activeOpacity={0.7}
              onPress={handleSubmit}
            >
              <AntDesign name="arrowup" size={18} color="white" />
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
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingTop: 32,
  },
  innerBox: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  postImage: {
    height: 240,
    // resizeMode: "cover",
    marginBottom: 32,

    borderRadius: 8,
    borderWidth: 1,
  },
  commentItem: {
    flexDirection: "row",
    // marginHorizontal: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  commentAvatar: {
    width: 28,
    height: 28,
    marginRight: 16,
    borderRadius: 50,
    backgroundColor: "#757575",
  },
  commentTextWrap: {
    alignItems: "flex-end",
    // width: 300,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  commentText: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
  },
  commetsDate: {
    fontSize: 10,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },
  inputWrap: {
    position: "relative",
    width: "100%",
    height: 50,
    justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  input: {
    // width,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 50,
  },
  sendButton: {
    position: "absolute",
    top: 8,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
});
