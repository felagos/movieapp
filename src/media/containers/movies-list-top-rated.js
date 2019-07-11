import React, { Component } from 'react';
import { FlatList } from 'react-native';
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
        return (
            <FlatList
                horizontal
                data={this.state.movies}
                keyExtractor={i => i.id.toString()}
                renderItem={this.renderItem}
            />
        );
    }

}

export default MovieList;