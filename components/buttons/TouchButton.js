import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function TouchButton({
    children,
    onPress,
    btnStyle = {},
    txtStyle = {},
    disabled = false,
}) {
    const disabledButton = disabled ? styles.btnDisabled : {};
    const disabledButtonText = disabled ? styles.btnTextDisabled : {};
    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity
                style={[styles.btn, btnStyle, disabledButton]}
                onPress={onPress}
                disabled={disabled}>
                <Text style={[styles.btnText, txtStyle, disabledButtonText]}>
                    {children}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    btn: {
        width: 220,
        height: 48,
        borderColor: '#9C7178',
        backgroundColor: 'red',
        borderRadius: 4,
        justifyContent: `center`,
        alignItems: `center`,
    },
    btnDisabled: {
        backgroundColor: 'gray',
        borderColor: '#222',
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#BBC8CA',
    },
    btnTextDisabled: {
        color: '#222',
    },
});
