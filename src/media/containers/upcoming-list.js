import React, { PureComponent } from 'react';
import { Dimensions, View } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import { colorWhite } from '../../styles/styles';
import { dangerToast } from '../../util/toast';
import { withNavigation } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import MoviesService from '../../services/movie-service';
import UpcomingCover from '../components/upcoming-cover';
import { YouTubeStandaloneAndroid } from 'react-native-youtube';

class UpcomingMoviesList extends PureComponent {

    state = {
        viewport: {
            width: Dimensions.get('window').width,
        }
    };

    renderItem = ({ item }) => {
        return <UpcomingCover item={item} openVideo={this.openVideo} seeDetail={this.seeDetail} width={this.state.viewport.width} />
    }

    openVideo = async (id) => {
        const videoIds = await MoviesService.getMovieTrailer(id);

        if (videoIds.length === 0) {
            dangerToast("No se encontraron videos disponibles");
        }
        else {
            YouTubeStandaloneAndroid.playVideos({
                apiKey: 'AIzaSyBbU95TmFevDq2y55p4PAE4xZU_jCXammE',
                videoIds: videoIds,
                autoplay: true,
              }).then(() => console.log('Standalone Player Exited'))
              .catch(errorMessage => alert(errorMessage));
            //this.props.navigation.navigate("Video", { videos: videoIds });
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
        const { viewport: { width } } = this.state;
        const { upcoming } = this.props;

        if (upcoming.length === 0) {
            return <BarIndicator color={colorWhite.color} />
        }

        return (
            <View onLayout={this.handleRotation}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={upcoming}
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