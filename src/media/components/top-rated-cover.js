import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import { cutString, getImage, IMG_SIZE } from '../../util/util';

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'column',
        margin: 5,
        height: 250,
        width: 200
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

const TopRated = ({ item, seeDetail, media }) => {
    const title = item.original_name ? item.original_name : item.title;
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => { seeDetail(item.id, media, title); }}>
                <View style={styles.cardBody}>
                    <CachedImage style={styles.imageThumbnail} source={{ uri: `${getImage(item.poster_path, IMG_SIZE.w200)}` }} />
                    <Text style={styles.title}>{cutString(title)}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default TopRated;