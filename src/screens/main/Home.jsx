import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// main screens
import { PostsScreen } from '../main/PostsScreen';
import { CreatePostsScreen } from '../main/CreatePostsScreen2';
import { ProfileScreen } from '../main/ProfileScreen';
// 
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
//  icons
import { SimpleLineIcons, Ionicons, Feather, AntDesign } from '@expo/vector-icons';

const BottomMenu = createBottomTabNavigator();

export const Home = ({ navigation }) => {
    return( 
        <BottomMenu.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: "#FF6C00",
                tabBarItemStyle: { borderRadius: 20, width: 10, position: "relative"},
                tabBarStyle: { height: 65, paddingTop: 9, paddingBottom: 15, paddingHorizontal: 82 },
            }}
        >
            {/* 1 */}
            <BottomMenu.Screen 
                name="Posts" 
                component={PostsScreen}
                
                options={{
                    title: "Публікації",
                    headerTintColor: "#212121",
                    headerTitleAlign: 'center',
                    headerStyle: {
                        borderBottomColor: "rgba(0, 0, 0, 0.3)",
                        borderBottomWidth: 0.5,
                    },
                    tabBarIcon:({focused}) => (
                        <SimpleLineIcons 
                            name="grid" 
                            size={24} 
                            color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"} />
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={{ marginRight: 10 }}
                          onPress={() => navigation.navigate("Login")}
                        >
                          <Ionicons name="exit-outline" size={28} color="#BDBDBD" />
                        </TouchableOpacity>)
                }} />
            {/* 2 */}
            <BottomMenu.Screen
                name='Create Post' 
                component={CreatePostsScreen}
                options={{
                    tabBarStyle: {
                        display: "none"
                    },
                    title: "Створити публкацію",
                    headerTintColor: "#212121",
                    headerTitleAlign: 'center',
                    headerStyle: {
                        borderBottomColor: "rgba(0, 0, 0, 0.3)",
                        borderBottomWidth: 0.5,
                    },
                    tabBarIcon: ({focused}) => (
                        <Ionicons name="add" 
                        size={24} 
                        color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"} />
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={{ marginLeft: 16 }}
                          onPress={() => navigation.navigate("Posts")}
                        >
                            <AntDesign name="arrowleft" size={24} color="rgba(33, 33, 33, 0.8)" />
                        </TouchableOpacity>)
                }}
                />
            {/* 3 */}
            <BottomMenu.Screen
                name='Profile' 
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <Feather 
                        name="user" 
                        size={24} 
                        color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"} />
                    ),
                }}
                />
            
        </BottomMenu.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
    },
})