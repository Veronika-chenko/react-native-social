import { Image, StyleSheet, Text, View } from "react-native";

export const PostComment = ({ comment }) => {
  // const data = route.params;
  const {
    text,
    createdAt,
    user: { nickname },
  } = comment;
  return (
    <View style={styles.commentItem}>
      <Image style={styles.commentAvatar} />
      <View style={styles.commentTextWrap}>
        {/* <Text style={styles.commentText}>
          Really love your most recent photo. I’ve been trying to capture the
          same thing for a few months and would love some tips!
        </Text> */}
        <Text style={styles.commentText}>
          {nickname}: {text}
        </Text>
        <Text style={styles.commetsDate}>09 июня, 2020 | 08:40</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentItem: {
    flexDirection: "row",
    marginBottom: 24,
  },
  commentAvatar: {
    width: 28,
    height: 28,
    marginRight: 16,
    borderRadius: 50,
    backgroundColor: "#757575",
  },
  commentTextWrap: {
    width: "90%",
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
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
    marginLeft: "auto",
  },
});
