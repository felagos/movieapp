import React, { Component, Fragment } from 'react';
import { FlatList } from 'react-native';
import Carousel from '@rhysforyou/react-native-carousel';
import HomeLayout from '../layouts/home/layout';
import HomeHeader from '../layouts/home/header';
import MovieService from '../services/movie-service';
import SerieService from '../services/series-service';
import TrendingService from '../services/trending-service';
import Loader from '../widgets/loader-widget';
import TopRated from '../media/top-rated';
import Trending from '../media/trending';

class Home extends Component {

    state = {
        movies: [],
        series: [],
        trending: [],
        loading: false
    };

    static navigationOptions = ({ navigation }) => {
        const goToMovies = navigation.getParam("goToMovies", () => { });
        const goToSeries = navigation.getParam("goToSeries", () => { })
        return {
            header: <HomeHeader goToMovies={goToMovies} goToSeries={goToSeries} />
        }
    }

    componentDidMount() {
        const seriesPromise = SerieService.getTopRated();
        const moviesPromise = MovieService.getTopRated();
        const trendingPromise = TrendingService.getTrending();

        /*Promise.all([moviesPromise, seriesPromise]).then(response => {
            const movies = response[0];
            const series = response[1];
            this.setState({ movies, series, loading: false });
        });*/

        trendingPromise.then(trending => {
            this.setState({ trending });
        });

        seriesPromise.then(series => {
            this.setState({ series });
        });

        moviesPromise.then(movies => {
            this.setState({ movies });
        });

    }

    componentWillMount() {
        this.props.navigation.setParams({
            goToMovies: this.goToMovies,
            goToSeries: this.gotToSeries
        });
    }

    gotToSeries = () => {
        this.props.navigation.navigate("Series");
    }

    goToMovies = () => {
        this.props.navigation.navigate("Movies");
    }

    seeDetail = item => {
        this.props.navigation.navigate("Detail", { item });
    }

    renderItem = ({ item }) => {
        return (
            <TopRated item={item} seeDetail={this.seeDetail} />
        );
    }

    renderTrending = ({ item }) => {
        return (
            <Trending item={item} />
        );
    }

    render() {
        const { movies, series, trending, loading } = this.state;

        return (
            <Fragment>
                <Loader loading={loading} color="#ff66be" />
                <HomeLayout trendingComponent={
                    <Carousel
                        data={trending}
                        keyExtractor={item => item.id.toString()}
                        renderItem={this.renderTrending}
                    />
                }
                    serieComponent={
                        <FlatList
                            horizontal
                            data={series}
                            keyExtractor={i => i.id.toString()}
                            renderItem={this.renderItem}
                        />
                    }
                    movieComponent={
                        <FlatList
                            horizontal
                            data={movies}
                            keyExtractor={i => i.id.toString()}
                            renderItem={this.renderItem}
                        />
                    }
                />
            </Fragment>
        );
    }
}

export default Home;