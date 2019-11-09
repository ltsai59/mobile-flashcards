import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native"
import React from "react"
import { lightPurple, purple } from "../utils/colors"

export function SubmitBtn({onPress, disabled}) {
    return (
        <TouchableOpacity
            style={disabled ? styles.disabledBtn : Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={disabled ? styles.DisabledSubmitBtnText : styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iosSubmitBtn: {
        opacity: 1,
        backgroundColor: purple,
        fontSize: 22,
        padding: 10,
        borderRadius: 7,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 40,
    },
    androidSubmitBtn: {
        opacity: 1,
        backgroundColor: purple,
        fontSize: 22,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 20,
        height: 45,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    disabledBtn: {
        opacity: 0.3,
        backgroundColor: lightPurple,
        fontSize: 22,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 20,
        height: 45,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    DisabledSubmitBtnText: {
        color: purple,
        fontSize: 22,
        textAlign: 'center',
    },
    submitBtnText: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
    },
})
