import { useState, useCallback } from 'react';
import { Image, StyleSheet, Text, View } from "react-native";

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import userPhoto from '../../../assets/images/user-photo.png'; 
// import postPhoto from '../../../assets/images/post.jpg'; 

SplashScreen.preventAutoHideAsync();

export const PostsScreen = () => {
    const [fontsLoaded] = useFonts({
        'Roboto-Bold': require('../../../assets/fonts/Roboto/Roboto-Bold.ttf'),
        'Roboto-Medium': require('../../../assets/fonts/Roboto/Roboto-Medium.ttf'),
        'Roboto-Regular': require('../../../assets/fonts/Roboto/Roboto-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return( 
        // <Text>PostsScreen</Text>
        <View style={styles.container} onLayout={onLayoutRootView}>
            <View style={styles.userItem}>
                <Image source={userPhoto} style={styles.userPhoto}/>
                <View>
                    <Text style={styles.userName}>Natali Romanova</Text>
                    <Text style={styles.userEmail}>email@example.com</Text>
                </View>
            </View>
            {/* <View>
                <View>
                    <Image source={postPhoto} style={styles.postImage}/>
                    <Text style={styles.postTitle}>Ліс</Text>
                    <View style={styles.postFooter}>
                        <Text style={styles.postLocation}>Ivano-Frankivs'k Region, Ukraine</Text>
                    </View>
                </View>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    userPhoto: {
        width: 60,
        height: 60,
        marginRight: 8,
    },
    userName: {
        fontFamily: 'Roboto-Bold',
        fontSize: 13,
        color: '#212121',
    },
    userEmail: {
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        color: 'rgba(33, 33, 33, 0.8)',
    },
    // postItem: {

    // },
    // postImage: {
    //     width: '100%',
    //     marginBottom: 8,
    //     borderRadius: 8,
    //     borderWidth: 1,
    // },
    // postTitle: {
    //     marginBottom: 8,
    //     fontFamily: 'Roboto-Medium',
    //     fontSize: 16,
    //     color: '#212121',
    // },
    // postFooter: {
    //     justifyContent: 'space-between',
    // },
    // postLocation: {
    //     fontFamily: 'Roboto-Regular',
    //     fontSize: 16,
    //     textDecorationLine: 'underline',
    //     color: '#212121',
    // },


})

