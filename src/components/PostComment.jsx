import { Image, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { formatDate } from "../helpers/formatDate";

export const PostComment = ({ comment }) => {
  if (!comment) return;

  const {
    text,
    createdAt,
    user: { nickname, avatar },
  } = comment;

  return (
    <View style={styles.commentItem}>
      {avatar && (
        <Image style={styles.commentAvatar} source={{ uri: avatar }} />
      )}
      {!avatar && (
        <View style={styles.commentAvatar}>
          <Feather name="user" size={24} color="black" />
        </View>
      )}
      <View style={styles.commentTextWrap}>
        <Text style={styles.commentText}>
          {nickname}: {text}
        </Text>
        <Text style={styles.commetsDate}>{formatDate(createdAt)}</Text>
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
    justifyContent: "center",
    alignItems: "center",
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

PostComment.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }),
};
