import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../layouts/movies-detail/header';
import MovieService from '../services/movie-service';
import * as Toast from '../util/toast';

class MoviesDetail extends Component {

    state = {
        movie: {}
    };

    static navigationOptions = ({ navigation }) => {
        console.log(navigation);
        const title = navigation.getParam("title", "");
        return {
            header: <Header title={title} goBack={navigation.goBack} />
        }
    }

    async componentDidMount() {
        try {
            const id = this.props.navigation.getParam("id");
            const movie = await MovieService.getDetail(id);

            this.setState({ movie });
        } catch(err) {
            Toast.dangerToast("Error al obtener la película seleccionada");
        }
    }

    render() {
        return (
            <View></View>
        );
    }
}

export default MoviesDetail;