import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import MoviesService from '../../services/movie-service';
import UpcomingMovie from '../components/upcoming-movies';

class UpcomingMoviesList extends Component {

    state = {
        movies: []
    };

    async componentDidMount() {
        const movies = await MoviesService.getUpcoming();
        this.setState({ movies });
    }

    renderItem = ({ item }) => {
        return <UpcomingMovie item={item} />
    }

    render() {
        const { movies } = this.state;
        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={movies}
                renderItem={this.renderItem}
                itemWidth={204}
                sliderWidth={400}
                firstItem={1}
            />
        );
    }

}

export default UpcomingMoviesList;