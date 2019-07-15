import React, { Component } from 'react';
import { Platform, Dimensions, View, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { BarIndicator } from 'react-native-indicators';
import MoviesService from '../../services/movie-service';
import UpcomingCover from '../components/upcoming-cover';
import { colorWhite } from '../../styles/styles';
import { youtubeAndroid, youtubeIOS } from '../../util/youtube';
import { dangerToast } from '../../util/toast';
import { withNavigation } from 'react-navigation';

class UpcomingMoviesList extends Component {

    state = {
        movies: [],
        viewport: {
            width: Dimensions.get('window').width,
        }
    };

    async componentDidMount() {
        const movies = await MoviesService.getUpcoming();
        this.setState({ movies });
    }

    renderItem = ({ item }) => {
        return <UpcomingCover item={item} openVideo={this.openVideo} seeDetail={this.seeDetail} width={this.state.viewport.width} />
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

    handleRotation = () => {
        this.setState({
            viewport: {
                width: Dimensions.get('window').width
            }
        });
    }

    seeDetail = (id, title) => {
        this.props.navigation.navigate("MovieDetail", { id, title });
    }

    render() {
        const { movies, viewport: { width } } = this.state;
        if (movies.length === 0) {
            return <BarIndicator color={colorWhite.color} />
        }
        return (
            <View onLayout={this.handleRotation}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={movies}
                    renderItem={this.renderItem}
                    itemWidth={width}
                    sliderWidth={width}
                    firstItem={1}
                />
            </View>
        );
    }

}

export default withNavigation(UpcomingMoviesList);