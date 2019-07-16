import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import SearchLayout from '../layouts/search/search-layout';
import HeaderSearch from '../layouts/search/header';
import MovieService from '../services/movie-service';
import SerieService from '../services/series-service';
import SearchWrapper from '../media/containers/search-list';

class Search extends Component {

    state = {
        iconLoading: false,
        movies: [],
        series: []
    };

    static navigationOptions = () => {
        return {
            header: null,
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            search: this.search
        });
    }

    search = async term => {
        this.setState({ iconLoading: true }, () => {
            const pMovie = MovieService.doSearch(term);
            const pSerie = SerieService.doSearch(term);

            Promise.all([pMovie, pSerie]).then(response => {
                const movies = response[0];
                const series = response[1];

                this.setState({movies, series, iconLoading: false});
            });

        });
    }

    render() {
        const { iconLoading, movies, series } = this.state;
        StatusBar.setBackgroundColor('#221f1f', true);
        return (
            <SearchLayout>
                <HeaderSearch search={this.search} iconLoading={iconLoading} />
                <SearchWrapper movies={movies} series={series} />
            </SearchLayout>

        );
    }
}

export default Search;