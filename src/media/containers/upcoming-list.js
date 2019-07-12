import React, { Component } from 'react';
import { Platform, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { BarIndicator } from 'react-native-indicators';
import MoviesService from '../../services/movie-service';
import UpcomingCover from '../components/upcoming-cover';
import { YouTubeStandaloneAndroid, YouTubeStandaloneIOS } from 'react-native-youtube';
import { config } from '../../config/config';
import globalStyles from '../../styles/styles';

class UpcomingMoviesList extends Component {

    state = {
        movies: []
    };

    async componentDidMount() {
        const movies = await MoviesService.getUpcoming();
        this.setState({ movies });
    }

    renderItem = ({ item }) => {
        return <UpcomingCover item={item} openVideo={this.openVideo} />
    }

    openVideo = async (id) => {
        const videoIds = await MoviesService.getMovieTrailer(id);

        if (videoIds.length === 0) {
            Alert.alert("", "No se encontraron videos disponibles");
        }

        else {
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
    }

    render() {
        const { movies } = this.state;
        if (movies.length === 0) {
            return <BarIndicator color={globalStyles.white.color} />
        }
        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={movies}
                renderItem={this.renderItem}
                itemWidth={400}
                sliderWidth={400}
            />
        );
    }

}

export default UpcomingMoviesList;