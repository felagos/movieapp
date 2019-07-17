import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import { BarIndicator } from 'react-native-indicators';
import { colorWhite } from '../../styles/styles';
import TopRated from '../components/top-rated-cover';

class MovieList extends PureComponent {

    renderItem = ({ item }) => {
        return <TopRated item={item} media="film" seeDetail={this.seeDetailMovie} />
    }

    seeDetailMovie = (id, media, title) => {
        this.props.navigation.navigate("MovieDetail", { id, media, title });
    }

    render() {
        const { movies, horizontal } = this.props;

        if (movies.length === 0) {
            return <BarIndicator color={colorWhite.color} />
        }

        return (
            <FlatList
                horizontal={horizontal}
                data={movies}
                keyExtractor={i => i.id.toString()}
                renderItem={this.renderItem}
            />
        );
    }

}

export default withNavigation(MovieList);