import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import PropTypes from "prop-types";

import union from "../../assets/images/union.png";
import cross from "../../assets/images/cross.png";

export const AvatarUpload = ({ passAvatar }) => {
  const [avatar, setAvatar] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      passAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.photoContainer}>
      <View style={styles.photoWrap}>
        {avatar && (
          <Image source={{ uri: avatar }} style={{ width: 120, height: 120 }} />
        )}
      </View>
      {!avatar && (
        <TouchableOpacity
          style={{
            ...styles.addPhotoBtn,
            borderColor: "#E8E8E8",
          }}
          activeOpacity={0.7}
          onPress={pickImage}
        >
          {<Image source={union} />}
        </TouchableOpacity>
      )}
      {avatar && (
        <TouchableOpacity
          style={{
            ...styles.addPhotoBtn,
            borderColor: "#E8E8E8",
          }}
          activeOpacity={0.7}
          onPress={() => setAvatar(null)}
        >
          <Image source={cross} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    position: "absolute",
    top: -152,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
  },
  photoWrap: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    overflow: "hidden",
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
});

AvatarUpload.propTypes = {
  passAvatar: PropTypes.func.isRequired,
};
