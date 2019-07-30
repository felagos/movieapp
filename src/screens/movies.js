import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Header from '../layouts/media/header';
import Loader from '../widgets/loader-widget';
import MovieService from '../services/movie-service';
import MediaLayout from '../layouts/media/media-layout';
import CoverMedia from '../media/components/cover-media';

class Movies extends Component {

    state = {
        movies: [],
        page: 1,
        totalPage: null,
        loading: true
    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: <Header goBack={navigation.goBack} title="Películas" />
        }
    }

    async componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const { page, totalPage } = this.state;
        if (page < totalPage || totalPage === null) {
            let { total_pages, results: movies } = await MovieService.getNowPlaying(page);
            console.log(movies)

            if (page !== 1) {
                movies = [...this.state.movies, ...movies];
            }

            this.setState({ movies, loading: false, total_pages });
        }
    }

    loadMoreData = async () => {
        this.setState({ page: this.state.page + 1, loading: true }, () => this.loadData());
    }

    renderElement = ({ item }) => {
        return <CoverMedia columns={2} item={item} media="film" seeDetail={this.seeDetail} />
    }

    seeDetail = (id, media, title) => {
        this.props.navigation.navigate("MovieDetail", { id, media, title })
    }

    render() {
        const { movies, loading } = this.state;
        return (
            <MediaLayout>
                <Loader visible={loading} text="Cargando peliculas ..." />
                <FlatList
                    data={movies}
                    numColumns={2}
                    keyExtractor={i => i.id.toString() * Date.now()}
                    renderItem={this.renderElement}
                    onEndReached={this.loadMoreData}
                    onEndThreshold={1}
                />
            </MediaLayout>
        );
    }
}

export default Movies;