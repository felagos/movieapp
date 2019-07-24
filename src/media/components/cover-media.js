import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { cutString, getImage, IMG_SIZE } from '../../util/util';

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'column',
        height: 250,
        width: 200,
        padding: 5
    },
    cardBody: {
        flexDirection: 'column'
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 230,
        width: 200,
        resizeMode: 'stretch'
    },
    title: {
        color: '#f5f5f1'
    }
});

const CoverMedia = ({ item, seeDetail, media }) => {
    const title = item.original_name ? item.original_name : item.title;
    let img = require('../../assets/no_disponible.jpg');

    if (item.poster_path) {
        const uri = getImage(item.poster_path, IMG_SIZE.w200);
        Image.prefetch(uri);
        img = { uri };
    }

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => { seeDetail(item.id, media, title); }}>
                <View style={styles.cardBody}>
                    <Image style={styles.imageThumbnail} source={img} />
                    <Text style={styles.title}>{cutString(title)}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default CoverMedia;