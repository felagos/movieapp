import React, { Component } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import Header from '../layouts/media/header';
import Loader from '../widgets/loader-widget';
import MovieService from '../services/movie-service';
import MediaLayout from '../layouts/media/media-layout';
import { getImage, IMG_SIZE } from '../util/util';

class Movies extends Component {

    state = {
        movies: [],
        page: 1,
        totalPage: null,
        loading: true
    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: <Header goBack={navigation.goBack} />
        }
    }

    async componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const { page } = this.state;
        let { total_pages, results: movies } = await MovieService.getNowPlaying(page);

        if (page !== 1) {
            movies = [...this.state.movies, ...movies];
        }

        this.setState({ movies, loading: false, total_pages });
    }

    loadMoreData = async () => {
        this.setState({ page: this.state.page + 1, loading: true }, () => this.loadData());
    }

    renderElement = ({ item }) => {
        const img = !item.poster_path ? require('../assets/no_disponible.jpg') : { uri: `${getImage(item.poster_path, IMG_SIZE.w200)}` };
        const width = Dimensions.get("window").width / 2.2;

        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("MovieDetail", { id: item.id, media: "movie", title: item.title });
            }}>
                <View style={{ margin: 10, height: 250, width }}>
                    <Image source={img} style={{ height: 250, width }} />
                </View>
            </TouchableOpacity>
        );
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