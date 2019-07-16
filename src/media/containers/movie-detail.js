import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'native-base';
import { getImage, IMG_SIZE, concatGenres } from '../../util/util';
import { backgroundColorBlack, colorWhite, backgroundColorRed } from '../../styles/styles';
import Icon from '../../widgets/icon-widget';
import CoverTitle from '../components/cover-title';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        ...backgroundColorBlack,
        flexDirection: 'column'
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
                <CoverTitle uri={getImage(movie.backdrop_path, IMG_SIZE.original)} title={concatGenres(movie.genres)} />
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