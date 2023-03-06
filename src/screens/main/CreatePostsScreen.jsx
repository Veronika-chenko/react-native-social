import { useCallback, useState, useEffect, useRef } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    Image, 
    SafeAreaView, 
    Keyboard, 
    Platform,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ScrollView,
    Dimensions,
} from "react-native";
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import * as Location from "expo-location";
import { PostInput } from '../../components/PostInput';
// import { SafeAreaView } from 'react-native-safe-area-context';

export const CreatePostsScreen = ({navigation}) => {
    let cameraRef = useRef();
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState();
    //  for MediaLibrary acces gallery or camera and safe photo
    const [hasMediaPermission, setHasMediaPermission] = useState();
    const [photo, setPhoto] = useState(null);
    const [location, setLocation] = useState(null);

    // camera permission
    useEffect(() => {
        (async() => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === 'granted');
            setHasMediaPermission(mediaLibraryPermission.status === 'granted');
        })()
    }, [])

    // location permission
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.log("Permission to access location was denied");
          }
    
          let location = await Location.getCurrentPositionAsync({});
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setLocation(coords);
        })();
      }, []);

    if(hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if(!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }

    let takePic = async() => {
        let options = {
            quality: 1,
            base64: true, //baes
            exif: false,
        }
        
        let newPhoto = await cameraRef.current.takePictureAsync(options)
        setPhoto(newPhoto);
    };

    // submitForm
    const publicPhoto = () => {
        // console.log("navigation:", navigation)
        // navigation.navigate('Posts', {photo})
        navigation.navigate('DefaultPosts', {photo})
    }

    // if(photo) {
    //     let sharePic = () => {

    //     }
    //     let savePhoto = () => {

    //     }
    //     return (
    //         <View style={styles.photoWrap}>
    //             <Image style={styles.preview} source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}/>
    //         </View>
    //     )
    // }
    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    }

    return(
        <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"} 
            style={{flex: 1}}
            >
                {/* <ScrollView style={{borderWidth: 1}}> */}
            <TouchableWithoutFeedback onPress={keyboardHide} style={{flex: 1, borderWidth: 1}}>
            
            <View style={{...styles.container}}>
                <View style={{marginTop: isShowKeyboard ? -32 : 32}}>
                    <Camera 
                        style={styles.camera} 
                        ref={cameraRef}
                        // type={type}
                        >
                        <View style={styles.photoWrap}>
                            {!photo && <TouchableOpacity 
                                style={styles.photoButton}
                                activeOpacity={0.7}
                                onPress={takePic}
                                >
                                <FontAwesome5 name="camera" size={24} color="#BDBDBD" />
                            </TouchableOpacity>}
                            {photo && 
                                <Image style={styles.preview} source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}/>
                            }
                        </View>
                    </Camera>
                    <Text style={styles.helpText}>Завантажте фото</Text>
                    <PostInput 
                        marginStyle={{marginBottom: 16}}
                        placeholder='Назва...'
                        onFocus={() => setIsShowKeyboard(true)}
                        />
                    {/* <View style={{marginBottom: isShowKeyboard ? 32: 0}}> */}
                        <PostInput
                            placeholder='Місцевість...'
                            onFocus={() => setIsShowKeyboard(true)}
                            marginStyle={{marginBottom: isShowKeyboard ? 32: 0}}
                            />
                    {/* </View> */}
                    
                    <TouchableOpacity 
                        style={styles.mainButton}
                        activeOpacity={0.7}
                        onPress={publicPhoto}
                        >
                        <Text style={styles.buttonText}>Опублікувати</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity 
                        style={styles.trashButton}
                        activeOpacity={0.7}
                        >
                        <Feather name="trash-2" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                </View>
            </View>
            </TouchableWithoutFeedback>
            {/* </ScrollView> */}
        
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height - 60,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        // borderWidth: 1,
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    camera: {
        height: 240,
        // marginTop: 32,
        borderRadius: 8,
        marginBottom: 8,
    },
    photoWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 240,
        marginBottom: 8,
        // backgroundColor: '#F6F6F6',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    photoButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#fff',
    },
    helpText: {
        // fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#BDBDBD',
        marginBottom: 32,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1,
    },
    mainButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 27,
        marginBottom: 16,
        backgroundColor: '#FF6C00',
        borderRadius: 100,
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 19,
        color: '#fff'
    },
    footer: { 
        position: 'absolute',
        bottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginHorizontal: 16,
        // borderWidth: 1,
    },
    trashButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 40,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
    }
    
})
