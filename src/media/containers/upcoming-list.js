import React, { Component } from 'react';
import { Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { BarIndicator } from 'react-native-indicators';
import MoviesService from '../../services/movie-service';
import UpcomingMovie from '../components/upcoming-movies';
import { YouTubeStandaloneAndroid, YouTubeStandaloneIOS } from 'react-native-youtube';
import { config } from '../../config/config';

class UpcomingMoviesList extends Component {

    state = {
        movies: []
    };

    async componentDidMount() {
        const movies = await MoviesService.getUpcoming();
        this.setState({ movies });
    }

    renderItem = ({ item }) => {
        return <UpcomingMovie item={item} openVideo={this.openVideo} />
    }

    openVideo = async (id) => {
        const videoIds = await MoviesService.getMovieTrailer(id);
        
        if (Platform.OS === "android") {
            YouTubeStandaloneAndroid.playVideos({
                apiKey: config.GOOGLE_API_KEY,
                videoIds: videoIds,
                autoplay: true
            })
                .then(() => console.log('Standalone Player Exited'))
                .catch(errorMessage => console.error(errorMessage));
        }
        else {
            YouTubeStandaloneIOS.playVideo(videoIds[0])
                .then(() => console.log('Standalone Player Exited'))
                .catch(errorMessage => console.error(errorMessage))
        }
    }

    render() {
        const { movies } = this.state;
        if (movies.length === 0) {
            return <BarIndicator color="black" />
        }
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