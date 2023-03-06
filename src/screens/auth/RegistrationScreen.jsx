import { useState, useCallback } from 'react';
import { 
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    KeyboardAvoidingView,
    Image,
    Dimensions,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import mountainsImage from '../../../assets/images/mountains-bg.jpg';
import userPhoto from '../../../assets/images/user-photo.png'; 
import union from '../../../assets/images/union.png';
import cross from '../../../assets/images/cross.png';
import { AuthInput } from '../../components/AuthInput';

SplashScreen.preventAutoHideAsync();

const initialState = {
    login: '',
    email: '',
    password: '',
};

export const RegistrationScreen = ({navigation}) => {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [userData, setUserData] = useState(initialState);
    const [hidePassword, setHidePassword] = useState(true);
    const [isPhoto, setIsPhoto] = useState(false);
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

    // console.log("isShowKeyboard: ", isShowKeyboard)
    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    }

    const handleSubmit = () => {
        // console.log("userData(Reg): ", userData);
        setUserData(initialState);
        navigation.navigate("Home")
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"} 
            style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <ImageBackground source={mountainsImage} style={styles.bgImage}>
                <View style={{...styles.innerBox, marginTop: isShowKeyboard ? 128 : 220}} onLayout={onLayoutRootView}>
                    {/* <KeyboardAvoidingView 
                        behavior={Platform.OS == "ios" ? "padding" : "height"} > */}
                        <View style={{...styles.form, paddingBottom: 78}}>
                            <View style={styles.photoWrap}>
                                {isPhoto ? (
                                    <>
                                        <Image source={userPhoto} />
                                        <TouchableOpacity 
                                        style={{...styles.addPhotoBtn, borderColor: '#E8E8E8' }} 
                                        activeOpacity={0.7}
                                        onPress={() => setIsPhoto(false)}>
                                            <Image source={cross}/>
                                        </TouchableOpacity>
                                    </>
                                    
                                ) : (
                                    <TouchableOpacity 
                                    style={styles.addPhotoBtn} 
                                    activeOpacity={0.7}
                                    onPress={() => setIsPhoto(true)}>
                                        <Image source={union}/>
                                    </TouchableOpacity>
                                )
                                }
                            </View>

                            <Text style={styles.title}>Реєстрація</Text>
                            <AuthInput 
                                placeholder='Логін'
                                value={userData.login}
                                onChangeText={(value) => setUserData(prev => ({...prev, login: value}))}
                                onFocus={() => setIsShowKeyboard(true)}
                                />
                            <AuthInput 
                                placeholder='Електронна пошта'
                                value={userData.email}
                                onChangeText={(value) => setUserData(prev => ({...prev, email: value}))}
                                onFocus={() => setIsShowKeyboard(true)}
                                />
                            <View style={{ position: "relative" }}>
                                <AuthInput 
                                    placeholder='Пароль'
                                    value={userData.password}
                                    onChangeText={(value) => setUserData(prev => ({...prev, password: value}))}
                                    onFocus={() => setIsShowKeyboard(true)}
                                    secureTextEntry={hidePassword}
                                    />
                                <TouchableOpacity 
                                    style={styles.showPasswordBtn}
                                    activeOpacity={0.7}
                                    onPress={() => setHidePassword(!hidePassword)}>
                                    <Text style={styles.showPasswordText}>
                                        {hidePassword ? "Показати" : "Cкрити"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            
                        <TouchableOpacity 
                            style={styles.mainButton}
                            activeOpacity={0.7}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>Зареєструватися</Text>
                        </TouchableOpacity>
                        
                        <Text style={{...styles.footerText}}>Вже маєте акаунт?
                            <Text style={styles.footerText} onPress={() => navigation.navigate('Login')}> Увійти</Text>
                        </Text>
                        </View>
                    {/* </KeyboardAvoidingView> */}
                </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    bgImage: {
        justifyContent: 'flex-end',
        position: 'absolute',
        top: 0,
        left: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    innerBox: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff',

        paddingTop: 92,
        paddingHorizontal: 16,

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    form: {
        // paddingTop: 92,
        // marginHorizontal: 16,
    },
    photoWrap: {
        position: 'absolute',
        top: -152,
        left: '50%',
        transform: [{ translateX: -50 }],
        width: 120,
        height: 120,
        borderRadius: 16,
        backgroundColor: '#F6F6F6',
    },
    addPhotoBtn: {
        position: 'absolute',
        top: 81,
        right: -12.5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 25,
        height: 25,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#FF6C00',
        borderRadius: 50,
    },
    title: {
        marginBottom: 32,
        textAlign: 'center',
        fontFamily: 'Roboto-Medium',
        fontSize: 30,
        lineHeight: 35,
        color: '#212121',
    },
    input: {
        height: 50,
        padding: 16,
        marginBottom: 16,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: '#212121',
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderColor: '#BDBDBD',
        borderRadius: 5,
    },
    showPasswordBtn: {
        position: 'absolute',
        top: 16,
        right: 16,
        
    },
    showPasswordText: {
        color: '#1B4371',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
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
    footerText: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 19,
        color: '#1B4371',
    },   
})