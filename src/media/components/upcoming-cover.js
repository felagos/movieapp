import React from 'react';
import { StyleSheet, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import { getImage, IMG_SIZE } from '../../util/util';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontWeight: "bold"
    },
    img: {
        width: 400,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgPlay: {
        width: 100,
        height: 100
    }
});

const UpcomingCover = ({ item, openVideo }) => {
    const title = item.original_name ? item.original_name : item.title;
    return (
        <Card>
            <CardItem cardBody>
                <ImageBackground resizeMode="stretch" source={{ uri: `${getImage(item.poster_path, IMG_SIZE.original)}` }} style={styles.img}>
                    <TouchableOpacity onPress={() => { openVideo(item.id); }}>
                        <Image style={styles.imgPlay} source={require('../../assets/icon-play.png')} />
                    </TouchableOpacity>
                </ImageBackground>
            </CardItem>
        </Card>
    );
}

export default UpcomingCover;