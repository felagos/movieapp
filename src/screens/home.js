import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import HomeLayout from '../layouts/home/home-layout';
import HomeHeader from '../layouts/home/header';
import SeriesList from '../media/containers/series-list';
import MovieList from '../media/containers/movies-list';
import UpcomingMoviesList from '../media/containers/upcoming-list';

import MoviesService from '../services/movie-service';
import SeriesService from '../services/series-service';

class Home extends Component {

    state = {
        upcoming: [],
        series: [],
        movies: []
    };

    static navigationOptions = ({ navigation }) => {
        const goToMovies = navigation.getParam("goToMovies", () => { });
        const goToSeries = navigation.getParam("goToSeries", () => { });
        return {
            header: <HomeHeader goToMovies={goToMovies} goToSeries={goToSeries} />
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            goToMovies: this.goToMovies,
            goToSeries: this.gotToSeries
        });
    }

    componentDidMount() {
        MoviesService.getUpcoming().then(upcoming => {
            this.setState({ upcoming });
        });

        MoviesService.getTopRated().then(movies => {
            this.setState({ movies });
        });

        SeriesService.getTopRated().then(series => {
            this.setState({ series });
        });

    }

    gotToSeries = () => {
        this.props.navigation.navigate("Series");
    }

    goToMovies = () => {
        this.props.navigation.navigate("Movies");
    }

    render() {
        const { upcoming, series, movies } = this.state;
        StatusBar.setBackgroundColor('#221f1f', true);
        return (
            <HomeLayout
                upcomingComponent={
                    <UpcomingMoviesList upcoming={upcoming} />
                }
                serieComponent={
                    <SeriesList loading horizontal series={series} />
                }
                movieComponent={
                    <MovieList loading horizontal movies={movies} />
                }
            />

        );
    }
}

export default Home;