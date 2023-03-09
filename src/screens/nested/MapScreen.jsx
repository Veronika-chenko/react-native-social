import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

export const MapScreen = ({ route }) => {
  // console.log("route.params: ", route.params);
  const { latitude, longitude } = route.params;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          // latitude: route.params.latitude,
          // longitude: route.params.longitude,
          latitude,
          longitude,
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
  },
  map: {
    flex: 1,
    backgroundColor: "#d1cbcb",
  },
});
