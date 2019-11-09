import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default function TextButton ({ children, onPress, style = {}, buttonTextStyle = {} }) {
    return (
        <TouchableOpacity onPress={onPress} style={[style]}>
            <Text style={[buttonTextStyle]}>{children}</Text>
        </TouchableOpacity>
    )
}
