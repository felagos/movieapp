import React, { Component } from 'react';
import HomeLayout from '../layouts/home/home-layout';
import HomeHeader from '../layouts/home/header';
import SeriesList from '../media/containers/series-list-top-rated';
import MovieList from '../media/containers/movies-list-top-rated';
import UpcomingMoviesList from '../media/containers/upcoming-list';

class Home extends Component {

    static navigationOptions = ({ navigation }) => {
        const goToMovies = navigation.getParam("goToMovies", () => { });
        const goToSeries = navigation.getParam("goToSeries", () => { })
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

    gotToSeries = () => {
        this.props.navigation.navigate("Series");
    }

    goToMovies = () => {
        this.props.navigation.navigate("Movies");
    }

    seeDetail = (id, media) => {
        this.props.navigation.navigate("Detail", { id, media });
    }

    render() {
        return (
            <HomeLayout
                    upcomingComponent={
                        <UpcomingMoviesList />
                    }
                    serieComponent={
                        <SeriesList seeDetail={this.seeDetail} />
                    }
                    movieComponent={
                        <MovieList seeDetail={this.seeDetail} />
                    }
                />

        );
    }
}

export default Home;