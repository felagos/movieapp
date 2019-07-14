import React, { Component } from 'react';
import Header from '../layouts/movies-detail/header';
import MoviesDetailLayout from '../layouts/movies-detail/movie-detail-layout';
import MovieService from '../services/movie-service';
import * as Toast from '../util/toast';

class MoviesDetail extends Component {

    state = {
        movie: null
    };

    static navigationOptions = ({ navigation }) => {
        const title = navigation.getParam("title", "");
        return {
            header: <Header title={title} goBack={navigation.goBack} />
        }
    }

    async componentDidMount() {

        this.props.navigation.addListener('willFocus', async () => {
            try {
                const id = this.props.navigation.getParam("id");
                const movie = await MovieService.getDetail(id);

                this.setState({ movie });
            } catch (err) {
                Toast.dangerToast("Error al obtener la película seleccionada");
            }
        });

    }

    render() {
        const { movie } = this.state;
        return (
            <MoviesDetailLayout movie={movie}>
            </MoviesDetailLayout>
        );
    }
}

export default MoviesDetail;