import React, { Component } from 'react';
import { FlatList } from 'react-native';
import SeriesService from '../../services/series-service';
import TopRated from '../components/top-rated';

class SeriesList extends Component {

    state = {
        series: []
    };

    async componentDidMount() {
        const series = await SeriesService.getTopRated();
        this.setState({ series });
    }

    renderItem = ({ item }) => {
        return <TopRated item={item} media="tv" seeDetail={this.props.seeDetail} />
    }

    render() {
        return (
            <FlatList
                horizontal
                data={this.state.series}
                keyExtractor={i => i.id.toString()}
                renderItem={this.renderItem}
            />
        );
    }

}

export default SeriesList;