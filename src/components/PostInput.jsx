import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import PropTypes from 'prop-types';

export const PostInput = ({
    placeholder,
    value,
    onChangeText,
    marginStyle,
    onFocus,
    secureTextEntry=false
}) => {
    const [isFocus, setIsFocus] = useState(false);

    return(
        <TextInput 
            style={{
                ...styles.input, 
                ...marginStyle,
                borderBottomColor: isFocus ? '#FF6C00' : '#E8E8E8',
                // backgroundColor: isFocus ? '#fff' : '#F6F6F6',
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
        paddingTop: 16,
        paddingBottom: 16,
        // marginBottom: 16,
        // fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: '#212121',
        // backgroundColor: '#F6F6F6',
        borderBottomWidth: 1,
        // borderColor: '#BDBDBD',
        // borderRadius: 5,
    },
})

PostInput.propTypes = {
    // placeholder: PropTypes.string.isRequired,
    // value: PropTypes.string.isRequired,
    // onChangeText: PropTypes.func.isRequired,
    // onFocus: PropTypes.func.isRequired,
    // secureTextEntry: PropTypes.bool,
}