import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import IconWidget from '../widgets/icon-widget';

class MovieScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Pelculas",
        drawerIcon: <IconWidget name="film" size={16} />
    });


    async componentDidMount() {
        this.props.navigation.openDrawer();

    }

    render() {
        return (
            <View><Text>Movie Screen</Text></View>
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

export default connect(mapStateToProps, null)(MovieScreen);