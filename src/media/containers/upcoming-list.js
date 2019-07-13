import React, { Component } from 'react';
import { Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { BarIndicator } from 'react-native-indicators';
import MoviesService from '../../services/movie-service';
import UpcomingCover from '../components/upcoming-cover';
import globalStyles from '../../styles/styles';
import { youtubeAndroid, youtubeIOS } from '../../util/youtube';
import { dangerToast } from '../../util/toast';

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
            dangerToast("No se encontraron videos disponibles");
        }

        else {
            if (Platform.OS === "android") {
                youtubeAndroid(videoIds);
            }
            else {
                youtubeIOS(videoIds[0]);
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
                itemWidth={399}
                sliderWidth={399}
            />
        );
    }

}

export default UpcomingMoviesList;