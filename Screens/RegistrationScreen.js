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
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import bgImage from '../assets/images/mountains-bg.jpg' ;

// SplashScreen.preventAutoHideAsync();

const initialState = {
    login: '',
    email: '',
    password: '',
};

export const RegistrationScreen = () => {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [userData, setUserData] = useState(initialState);

    // const [fontsLoaded] = useFonts({
    //     'Roboto-Medium': require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
    //     'Roboto-Regular': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
    // });

    // const onLayoutRootView = useCallback(async () => {
    //     if (fontsLoaded) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [fontsLoaded]);

    // if (!fontsLoaded) {
    //     return null;
    // }
    // console.log("Platform: ", Platform.OS)
    // console.log("isShowKeyboard: ", isShowKeyboard)

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        // console.log(userData)
        setUserData(initialState);
    }

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <ImageBackground source={bgImage} style={styles.image}>
                {/* <View style={styles.innerBox} onLayout={onLayoutRootView}> */}
                <View style={styles.innerBox}>
                    <KeyboardAvoidingView 
                        behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    {/* user image */}
                    
                    <View style={{...styles.form }}>
                        <Text style={styles.title}>Реєстрація</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Логін'
                            placeholderTextColor={'#BDBDBD'}
                            onFocus={() => setIsShowKeyboard(true)}
                            value={userData.login}
                            onChangeText={(value) => setUserData(prev => ({...prev, login: value}))}
                        />
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
                        
                        {/* Button */}
                    <TouchableOpacity 
                        style={styles.button}
                        activeOpacity={0.7}
                        onPress={keyboardHide}
                    >
                        <Text style={styles.buttonText}>Зареєструватися</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>Вже маєте акаунт?
                        <Text> Увійти</Text>
                    </Text>
                    </View>
                    {/* white container closer: */}
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
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    innerBox: {
        // paddingTop: 92,
        // paddingBottom: 72,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    form: {
        paddingTop: 92,
        marginBottom: 72,
        marginHorizontal: 16,
    },
    title: {
        marginBottom: 33,
        textAlign: 'center',
        fontSize: 30,
        color: '#212121',
        fontFamily: 'Roboto-Medium',
    },
    input: {
        borderWidth: 1,
        borderColor: '#BDBDBD',
        height: 50,
        borderRadius: 5,
        color: '#212121',
        padding: 16,
        backgroundColor: '#F6F6F6',
        marginBottom: 16,
        fontFamily: 'Roboto-Regular',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF6C00',
        height: 50,
        borderRadius: 100,
        marginHorizontal: 16,
        marginTop: 27,
        marginBottom: 16,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff'
    },
    text: {
        textAlign: 'center',
        color: '#1B4371',
        fontSize: 16,
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
})