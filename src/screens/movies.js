import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../layouts/movies-detail/header';
import MovieService from '../services/movie-service';

class Movies extends Component {

    static navigationOptions = ({ navigation }) => {
        const title = navigation.getParam("title", "");
        return {
            header: null
        }
    }

    render() {
        return (
            <View></View>
        );
    }
}

export default Movies;