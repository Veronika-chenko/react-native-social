import { useState, useCallback } from 'react';
import { 
    View,
    ImageBackground,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    KeyboardAvoidingView,
    Button,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import mountainsImage from '../../assets/images/mountains-bg.jpg';

SplashScreen.preventAutoHideAsync();

const initialState = {
    email: '',
    password: '',
};

export const LoginScreen = ({navigation}) => {
    // console.log("navigation", navigation)
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [userData, setUserData] = useState(initialState);
    const [fontsLoaded] = useFonts({
        'Roboto-Medium': require('../../assets/fonts/Roboto/Roboto-Medium.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto/Roboto-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        // console.log(userData)
        setUserData(initialState);
    }


    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <ImageBackground source={mountainsImage} style={styles.bgImage}>
                <View style={styles.innerBox} onLayout={onLayoutRootView}>
                    <KeyboardAvoidingView 
                        behavior={Platform.OS == "ios" ? "padding" : "height"}>

                    <View style={{...styles.form, marginBottom: isShowKeyboard ? -95 : 144 }}>
                        <Text style={styles.title}>Увійти</Text>

                        <TextInput
                            style={styles.input}
                            placeholder='Електронна пошта'
                            placeholderTextColor={'#BDBDBD'}
                            onFocus={() => setIsShowKeyboard(true)}
                            value={userData.email}
                            onChangeText={(value) => setUserData(prev => ({...prev, email: value}))}
                        />
                        <View style={{ position: "relative" }}>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.input}
                                placeholder='Пароль'
                                placeholderTextColor={'#BDBDBD'}
                                onFocus={() => setIsShowKeyboard(true)}
                                value={userData.password}
                                onChangeText={(value) => setUserData(prev => ({...prev, password: value}))}
                            />
                            <TouchableOpacity style={styles.showPasswordBtn}>
                                <Text style={styles.showPasswordText}>
                                    Показати
                                </Text>
                            </TouchableOpacity>
                        </View>
                        
                    <TouchableOpacity 
                        style={styles.mainButton}
                        activeOpacity={0.7}
                        onPress={keyboardHide}
                    >
                        <Text style={styles.buttonText}>Увійти</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerText}>Не маєте акаунта?
                        <Text onPress={() => navigation.navigate('Register')}> Зареєструватися</Text>
                    </Text>
                    </View> 
                    </KeyboardAvoidingView>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    innerBox: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    form: {
        paddingTop: 32,
        marginHorizontal: 16,
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
    inputOnFocus: {
        height: 50,
        padding: 16,
        marginBottom: 16,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: '#212121',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#FF6C00',
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