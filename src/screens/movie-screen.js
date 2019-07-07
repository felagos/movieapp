import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';

import MovieService from '../services/movie-service';
import { setGenresMovies } from '../redux/actions/movie-action';

class MovieScreen extends Component {

    async componentDidMount() {
        const moviesGenres = await MovieService.getMoviesGenres();
        this.props.setGenresMovies(moviesGenres);
    }

    render() {
        const { genres } = this.props;
        return (
            <View></View>
        );
    }

}

const bindActionToProps = dispatch => {
    return bindActionCreators({ setGenresMovies }, dispatch);
}

const mapStateToProps = state => {
    return {
        genres: state.movieReducer.genres
    }
}

export default connect(mapStateToProps, bindActionToProps)(MovieScreen);