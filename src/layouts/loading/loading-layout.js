import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator, StatusBar } from 'react-native';
import { backgroundColorBlack, colorRed, colorBlack } from '../../styles/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        ...backgroundColorBlack
    },
    logo: {
        width: 200,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 10
    }
})

const LoadingLayout = props => {
    StatusBar.setBackgroundColor(colorBlack.color);
    const { showIcon = true } = props;
    return (
        <View style={styles.container}>
            {
                showIcon &&
                <Image
                    source={require('../../assets/movie-icon.png')}
                    style={styles.logo}
                />
            }
            <ActivityIndicator color={colorRed.color} />
        </View>
    );
}

export default LoadingLayout;