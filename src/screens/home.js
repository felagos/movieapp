import React, { Component, Fragment } from 'react';
import { FlatList } from 'react-native';
import HomeLayout from '../layouts/home/layout';
import HomeHeader from '../layouts/home/header';
import MovieService from '../services/movie-service';
import SerieService from '../services/series-service';
import Loader from '../widgets/loader-widget';
import TopRated from '../media/top-rated';

class Home extends Component {

    state = {
        movies: [],
        series: [],
        loading: true
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

        Promise.all([moviesPromise, seriesPromise]).then(response => {
            const movies = response[0];
            const series = response[1];

            this.setState({ movies, series, loading: false });
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

    render() {
        const { movies, series, loading } = this.state;

        return (
            <Fragment>
                <Loader loading={loading} color="#ff66be" />
                <HomeLayout serieComponent={
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