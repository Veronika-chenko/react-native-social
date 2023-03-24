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
  TextInput,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSelectors";
import {
  addCommentToPost,
  getAllComments,
} from "../../firebase/helpers/commentsManager";
import { PostComment } from "../../components/PostComment";

SplashScreen.preventAutoHideAsync();

export const CommentsScreen = ({ route }) => {
  const { postId, photoURI } = route.params;
  const { userId, nickname, avatar } = useSelector(selectUser);

  const [userComment, setUserComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    (async () => {
      const fetchedComments = await getAllComments(postId);

      setAllComments([...fetchedComments]);
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

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = async () => {
    keyboardHide();

    if (!userComment) return;

    const newComment = {
      text: userComment.trim(),
      postId,
      user: {
        userId,
        nickname,
        avatar,
      },
      createdAt: new Date(),
    };

    setUserComment("");

    await addCommentToPost(newComment, postId);
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={keyboardHide} style={{ flex: 1 }}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <View style={styles.innerBox}>
            <View style={styles.imageWrap}>
              <Image source={{ uri: photoURI }} style={styles.postImage} />
            </View>
            {allComments.length === 0 && (
              <Text style={styles.infoMessage}>No comments yet</Text>
            )}
            <FlatList
              style={{ width: "100%", height: 240 }}
              data={allComments}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <PostComment comment={item} />}
            />
          </View>
          <View
            style={{
              ...styles.inputWrap,
              position: isShowKeyboard ? "absolute" : "absolute",
              bottom: isShowKeyboard ? -100 : 8,
            }}
          >
            <TextInput
              style={styles.input}
              value={userComment}
              onChangeText={setUserComment}
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
    paddingHorizontal: 16,
  },
  innerBox: {
    alignItems: "center",
  },
  imageWrap: {
    width: "100%",
  },
  postImage: {
    height: 240,
    width: "100%",
    marginBottom: 32,

    borderRadius: 8,
    borderWidth: 1,
  },
  inputWrap: {
    position: "relative",
    width: "100%",
    height: 50,
    justifyContent: "flex-end",
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  input: {
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
  infoMessage: {
    marginRight: "auto",
    fontSize: 16,
  },
});
