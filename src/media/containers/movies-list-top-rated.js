import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import MoviesService from '../../services/movie-service';
import TopRated from '../components/top-rated';

class MovieList extends Component {

    state = {
        movies: []
    };

    async componentDidMount() {
        const movies = await MoviesService.getTopRated();
        this.setState({ movies });
    }

    renderItem = ({ item }) => {
        return <TopRated item={item} media="film" seeDetail={this.props.seeDetail} />
    }

    render() {
        const { movies } = this.state;
        if (movies.length === 0) {
            return <BarIndicator color="black" />
        }
        return (
            <FlatList
                horizontal
                data={movies}
                keyExtractor={i => i.id.toString()}
                renderItem={this.renderItem}
            />
        );
    }

}

export default MovieList;