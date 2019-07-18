import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import { BarIndicator } from 'react-native-indicators';
import { colorWhite, backgroundColorBlack } from '../../styles/styles';
import CoverMedia from '../components/cover-media';

class MovieList extends PureComponent {

    renderItem = ({ item }) => {
        return <CoverMedia columns={this.props.columns} item={item} media="film" seeDetail={this.seeDetailMovie} />
    }

    seeDetailMovie = (id, media, title) => {
        this.props.navigation.navigate("MovieDetail", { id, media, title });
    }

    render() {
        const { movies, horizontal, loading, columns } = this.props;

        if (movies.length === 0 && loading) {
            return <BarIndicator color={colorWhite.color} />
        }

        return (
            <FlatList
                contentContainerStyle={{ ...backgroundColorBlack }}
                numColumns={columns ? columns : 1}
                horizontal={horizontal}
                data={movies}
                keyExtractor={i => i.id.toString()}
                renderItem={this.renderItem}
            />
        );
    }

}

export default withNavigation(MovieList);