import React, { Component } from 'react';
import { Share } from 'react-native';
import { imdbUrl } from '../util/util';
import Header from '../layouts/media-detail/header';
import MediaDetailLayout from '../layouts/media-detail/media-detail-layout';
import MovieService from '../services/movie-service';
import * as Toast from '../util/toast';
import Loader from '../widgets/loader-widget';
import MovieDetailView from '../media/containers/movie-detail';

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

    share = async (title, imdbId) => {
        const url = imdbUrl(imdbId);
        await Share.share({
            url,
            title
        });
    }

    handleMyList = async id => {
        Toast.successToast("Agregada a mi lista");
    }

    render() {
        const { movie } = this.state;
        return (
            <MediaDetailLayout>
                {movie === null && <Loader loading text="Cargando película ..." />}
                {movie !== null && <MovieDetailView movie={movie} share={this.share} handleMyList={this.handleMyList} />}
            </MediaDetailLayout>
        );
    }
}

export default MoviesDetail;