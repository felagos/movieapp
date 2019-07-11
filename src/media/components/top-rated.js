import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { cutString, getImage, IMG_SIZE } from '../../util/util';

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'column',
        margin: 5,
        height: 250
    },
    cardBody: {
        flexDirection: 'column'
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 230,
        width: 200
    },
    title: {
        color: 'black',
        fontWeight: 'bold'
    }
});

const TopRated = ({ item, seeDetail, media }) => {
    const title = item.original_name ? item.original_name : item.title;
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => { seeDetail(item.id, media); }}>
                <View style={styles.cardBody}>
                    <Image style={styles.imageThumbnail} source={{ uri: `${getImage(item.poster_path, IMG_SIZE.w200)}` }} />
                    <Text style={styles.title}>{cutString(title)}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default TopRated;