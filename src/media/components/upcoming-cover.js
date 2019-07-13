import React from 'react';
import { StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Card, CardItem } from 'native-base';
import { getImage, IMG_SIZE } from '../../util/util';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    img: {
        width: 400,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgPlay: {
        width: 200,
        height: 200,
        marginRight: 30
    }
});

const UpcomingCover = ({ item, openVideo }) => {
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