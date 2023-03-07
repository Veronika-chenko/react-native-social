import { Text, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

export const MapScreen = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.innerWrap}>
        <Text>Text</Text>
      </View> */}
      <MapView
        style={styles.innerWrap}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        minZoomLevel={15}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
    // paddingBottom: 32,
    paddingHorizontal: 16,
  },
  innerWrap: {
    flex: 1,
    //   height:
    backgroundColor: "#757575",
    borderRadius: 8,
  },
});
