import React from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, View, Dimensions } from 'react-native';
import { CardItem } from 'native-base';
import Icon from '../../widgets/icon-widget';
import { IMG_SIZE, getImage } from '../../util/util';
import { backgroundColorBlack, colorRed, colorWhite } from '../../styles/styles';

const width = Dimensions.get("window").width / 2.2;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'column',
        height: 300,
        width,
        margin: 5,
        ...backgroundColorBlack
    },
    item: {
        ...backgroundColorBlack
    },
    img: {
        width,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center'
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
                    <ImageBackground resizeMode="stretch" source={{ uri: img }} style={styles.img}>
                        <View style={styles.info}>
                            <TouchableOpacity onPress={() => seeDetail(item.id, item.title, item.mediaType)}>
                                <Icon name="info-circle" color="white" size={30} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </CardItem>
        </View>
    );
}

export default CoverMyList;