import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { auth } from "../../../firebase/config";
// icons
import { Ionicons } from "@expo/vector-icons";
import { CommentsScreen, DefaultPostsScreen, MapScreen } from "../nested";
//
const NestedScreen = createStackNavigator();

export const PostsScreen = ({ navigation }) => {
  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        // navigation.navigate("Login");
        navigation.replace("Login");
      })
      .catch((err) => alert(err.message));
  };
  return (
    // <NestedScreen.Navigator screenOptions={{ headerShown: false }}>
    <NestedScreen.Navigator>
      {/* 1 */}
      <NestedScreen.Screen
        name="DefaultPosts"
        // component={DefaultPostsScreen}
        component={DefaultPostsScreen}
        options={{
          title: "Публікації",
          headerTintColor: "#212121",
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
            borderBottomWidth: 0.5,
          },
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ marginRight: 10 }}
              onPress={handleLogOut}
            >
              <Ionicons name="exit-outline" size={28} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerLeft: () => null,
        }}
      />
      {/* 2 */}
      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          tabBarStyle: {
            display: "none",
          },
          title: "Коментарі",
          headerTintColor: "#212121",
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
            borderBottomWidth: 0.5,
          },
        }}
      />
      {/* 3 */}
      <NestedScreen.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Карта",
          headerTintColor: "#212121",
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
            borderBottomWidth: 0.5,
          },
        }}
      />
    </NestedScreen.Navigator>
  );
};
