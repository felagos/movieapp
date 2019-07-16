import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Text, Button } from 'native-base';
import { CachedImage } from 'react-native-cached-image';
import { getImage, IMG_SIZE, concatGenres } from '../../util/util';
import { backgroundColorBlack, colorWhite, colorRed, backgroundColorRed } from '../../styles/styles';
import Icon from '../../widgets/icon-widget';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        ...backgroundColorBlack,
        flexDirection: 'column'
    },
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
    },
    overview: {
        ...colorWhite,
        textAlign: 'justify'
    },
    buttonAction: {
        ...backgroundColorRed,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    icon: {
        paddingLeft: 5
    },
    containerOverview: {
        paddingTop: 20
    }
});

const MovieDetail = ({ movie, share, handleMyList }) => {
    console.log(movie);
    return (
        <View style={styles.container}>
            <View>
                <CachedImage style={styles.img} source={{ uri: getImage(movie.backdrop_path, IMG_SIZE.original) }}>
                    <Text style={styles.titleCover}>{concatGenres(movie.genres)}</Text>
                </CachedImage>
            </View>
            <View style={styles.buttonContainer}>
                <Button rounded iconLeft style={styles.buttonAction} onPress={() => handleMyList(movie.id)}>
                    <Icon name='check' color={colorWhite.color} style={styles.icon} />
                    <Text>Mi Lista</Text>
                </Button>
                <Button rounded iconLeft style={styles.buttonAction} onPress={() => share(movie.title, movie.imdb_id)}>
                    <Icon name='share-alt' color={colorWhite.color} style={styles.icon} />
                    <Text>Compartir</Text>
                </Button>
            </View>
            <View style={styles.containerOverview}>
                <Text style={styles.overview}>{movie.overview}</Text>
            </View>
        </View>
    );
}

export default MovieDetail;