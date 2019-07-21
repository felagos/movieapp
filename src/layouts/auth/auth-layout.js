import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { backgroundColorBlack } from '../../styles/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        ...backgroundColorBlack
    },
});

const AuthLayout = props => {
    return (
        <SafeAreaView style={styles.container}>
            {props.children}
        </SafeAreaView>
    );
}

export default AuthLayout;