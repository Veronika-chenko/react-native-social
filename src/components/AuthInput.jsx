import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import PropTypes from 'prop-types';

export const AuthInput = ({
    placeholder,
    value,
    onChangeText,
    onFocus,
    secureTextEntry=false
}) => {
    const [isFocus, setIsFocus] = useState(false);

    return(
        <TextInput 
            style={{
                ...styles.input, 
                borderColor: isFocus ? '#FF6C00' : '#BDBDBD',
                backgroundColor: isFocus ? '#fff' : '#F6F6F6',
            }}
            placeholder={placeholder}
            placeholderTextColor={'#BDBDBD'}
            onChangeText={onChangeText}
            value={value}
            onFocus={() => {
                setIsFocus(true)
                onFocus()
            }}
            onBlur={() => setIsFocus(false)}
            secureTextEntry={secureTextEntry}
            />
    );
}

const styles = StyleSheet.create({
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
})

AuthInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    secureTextEntry: PropTypes.bool,
}