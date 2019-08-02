import React from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, View, Dimensions } from 'react-native';
import { CardItem } from 'native-base';
import Icon from '../../widgets/icon-widget';
import { IMG_SIZE, getImage } from '../../util/util';
import { backgroundColorBlack } from '../../styles/styles';
import CachedImage from 'react-native-image-cache-wrapper';

const width = Dimensions.get("window").width / 2.2;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'column',
        height: 290,
        width,
        margin: 5,
        ...backgroundColorBlack
    },
    item: {
        ...backgroundColorBlack
    },
    img: {
        width,
        height: 290,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'stretch'
    },
    info: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        alignItems: 'flex-end'
    }
});

const CoverMyList = ({ item, handleDelete, seeDetail }) => {
    const img = getImage(item.poster_path, IMG_SIZE.original);
    return (
        <View style={styles.card}>
            <CardItem cardBody style={styles.item}>
                <TouchableOpacity onPress={() => handleDelete(item.id, item.mediaType)}>
                    <CachedImage source={{ uri: img }} style={styles.img}>
                        <View style={styles.info}>
                            <TouchableOpacity onPress={() => seeDetail(item.id, item.title, item.mediaType)}>
                                <Icon name="info-circle" color="white" size={30} />
                            </TouchableOpacity>
                        </View>
                    </CachedImage>
                </TouchableOpacity>
            </CardItem>
        </View>
    );
}

export default CoverMyList;