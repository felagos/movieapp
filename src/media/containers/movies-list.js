import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import { colorWhite } from '../../styles/styles';
import TopRated from '../components/top-rated-cover';

class MovieList extends PureComponent {

    renderItem = ({ item }) => {
        return <TopRated item={item} media="film" seeDetail={this.props.seeDetail} />
    }

    render() {
        const { movies } = this.props;

        if (movies.length === 0) {
            return <BarIndicator color={colorWhite.color} />
        }

        return (
            <FlatList
                horizontal
                data={movies}
                keyExtractor={i => i.id.toString()}
                renderItem={this.renderItem}
            />
        );
    }

}

export default MovieList;