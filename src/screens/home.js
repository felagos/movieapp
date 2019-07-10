import React, { Component } from 'react';
import HomeLayout from '../layouts/home/layout';
import HomeHeader from '../layouts/home/header';

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
        alert("Navegacion a series");
    }

    goToMovies = () => {
        alert("Navegacion a peliculas");
    }

    render() {
        return (
            <HomeLayout />
        );
    }
}

export default Home;