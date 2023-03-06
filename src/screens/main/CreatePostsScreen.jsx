import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera, CameraType } from 'expo-camera';
import { FontAwesome5 } from '@expo/vector-icons';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

export const CreatePostsScreen = () => {
    const [camera, setCamera] = useState(null); // takes a link on photo
    const [photo, setPhoto] = useState('')
     // const [type, setType] = useState(CameraType.back);
    const [type, setType] = useState(Camera.Constants.Type.back);
   
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [fontsLoaded] = useFonts({
        'Roboto-Medium': require('../../../assets/fonts/Roboto/Roboto-Medium.ttf'),
        'Roboto-Regular': require('../../../assets/fonts/Roboto/Roboto-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null;
    }

    const takePhoto = async() => {
        console.log('photo', camera)
        const photo = await camera.takePictureAsync()
        // setPhoto(photo.uri)
    }
    // let takePic = async() => {
    //     let options = {
    //         quality: 1,

    //     }
    // }

    return(
        <View style={styles.container} onLayout={onLayoutRootView}>
            {/* <Text>CreatePostsScreen</Text> */}
            <Camera 
                style={styles.camera} 
                ref={setCamera}
                type={type}>
                <View style={styles.photoWrap}>
                    <TouchableOpacity 
                        style={styles.cameraIconWrap}
                        activeOpacity={0.7}
                        onPress={takePhoto}>
                        <FontAwesome5 name="camera" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                </View>
            </Camera>
            <Text style={styles.helpText}>Завантажте фото</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    camera: {
        height: 240,
        marginTop: 50,
        borderRadius: 8,
        // backgroundColor: '#fff',
    },
    photoWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 240,
        marginBottom: 8,
        backgroundColor: '#F6F6F6',
        borderRadius: 8,
    },
    cameraIconWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#fff',
    },
    cameraIcon: {

    },
    helpText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#BDBDBD',
        // borderWidth: 1,
        // borderColor: 'red',
    },
})