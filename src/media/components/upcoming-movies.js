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
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgPlay: {
        width: 150,
        height: 150
    }
});

const UpcomingMovie = ({ item, openVideo }) => {
    const title = item.original_name ? item.original_name : item.title;
    return (
        <Card>
            <CardItem>
                <Body>
                    <Text style={styles.title}>{title}</Text>
                </Body>
            </CardItem>
            <CardItem cardBody>
                <ImageBackground source={{ uri: `${getImage(item.poster_path, IMG_SIZE.original)}` }} style={styles.img}>
                    <TouchableOpacity onPress={() => { openVideo(item.id); }}>
                        <Image resizeMode="center" style={styles.imgPlay} source={require('../../assets/icon-play.png')} />
                    </TouchableOpacity>
                </ImageBackground>
            </CardItem>
        </Card>
    );
}

export default UpcomingMovie;