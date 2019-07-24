import React from 'react';
import { StyleSheet, Text, Dimensions, ImageBackground } from 'react-native';
import { colorWhite, colorRed } from '../../styles/styles';

const styles = StyleSheet.create({
    img: {
        width: Dimensions.get("window").width,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleCover: {
        ...colorWhite,
        fontSize: 18,
        textShadowColor: colorRed.color,
        textShadowRadius: 10,
        top: 85
    }
});

const CoverTitle = ({ uri, title }) => {
    return (
        <ImageBackground style={styles.img} source={uri}>
            {title && <Text style={styles.titleCover}>{title}</Text>}
        </ImageBackground>
    );
}

export default CoverTitle;