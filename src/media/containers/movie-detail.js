import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Container, Grid, Col, Text, Row } from 'native-base';
import { CachedImage } from 'react-native-cached-image';
import { getImage, IMG_SIZE, concatGenres } from '../../util/util';
import { backgroundColorBlack, colorWhite, colorRed } from '../../styles/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        ...backgroundColorBlack
    },
    img: {
        width: Dimensions.get("window").width,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cover: {

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
    }
});

const MovieDetail = ({ movie }) => {
    console.log(movie);
    return (
        <Container style={styles.container}>
            <Grid>
                <Row size={25}>
                    <Col size={100}>
                        <CachedImage style={styles.img} source={{ uri: getImage(movie.backdrop_path, IMG_SIZE.original) }}>
                            <Text style={styles.titleCover}>{concatGenres(movie.genres)}</Text>
                        </CachedImage>
                    </Col>
                </Row>
                <Row size={50}>
                    <Col size={100}>
                        <Text style={styles.overview}>{movie.overview}</Text>
                    </Col>
                </Row>
            </Grid>

        </Container>
    );
}

export default MovieDetail;