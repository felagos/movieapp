import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { backgroundColorBlack } from '../../styles/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...backgroundColorBlack
    },
});

const MediaLayout = props => {
    return (
        <SafeAreaView style={styles.container}>
            {props.children}
        </SafeAreaView>
    );
}

export default MediaLayout;