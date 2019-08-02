import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Card, CardItem } from 'native-base';
import { getImage, IMG_SIZE } from '../../util/util';
import Icon from '../../widgets/icon-widget';
import CachedImage from 'react-native-image-cache-wrapper';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        borderColor: "black"
    },
    img: {
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'stretch'
    },
    imgPlay: {
        width: 200,
        height: 200,
        marginRight: 30
    },
    info: {
        position: 'absolute',
        bottom: 0,
        right: 30,
        alignItems: 'flex-end'
    }
});

const UpcomingCover = ({ item, openVideo, seeDetail, width }) => {
    const img = getImage(item.poster_path, IMG_SIZE.original);
    return (
        <Card style={styles.card}>
            <CardItem cardBody>
                <CachedImage source={{ uri: img }} style={[styles.img, { width }]}>
                    <TouchableOpacity onPress={() => { openVideo(item.id); }}>
                        <Image style={styles.imgPlay} source={require('../../assets/icon-play.png')} />
                    </TouchableOpacity>
                    <View style={styles.info}>
                        <TouchableOpacity onPress={() => seeDetail(item.id, item.title)}>
                            <Icon name="info-circle" color="white" size={30} />
                        </TouchableOpacity>
                    </View>
                </CachedImage>
            </CardItem>
        </Card>
    );
}

export default UpcomingCover;