import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { cutString, getImage, IMG_SIZE } from '../util/util';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: 200,
        height: 200,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0, .75)',
        textShadowOffset: {
            width: 2,
            height: 2
        },
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        textShadowRadius: 0,
    }
});

const Trending = ({ item, seeDetail }) => {
    const title = item.original_name ? item.original_name : item.title;
    return (
        <ImageBackground style={styles.wrapper} source={{ uri: `${getImage(item.poster_path, IMG_SIZE.w200)}` }}>
            <Text style={styles.title}>{title}</Text>
        </ImageBackground>
    );
}

export default Trending;