import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import SeriesService from '../../services/series-service';
import TopRated from '../components/top-rated';
import { colorWhite } from '../../styles/styles';

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
        const { series } = this.state;
        if (series.length === 0) {
            return <BarIndicator color={colorWhite.color} />
        }
        return (
            <FlatList
                horizontal
                data={series}
                keyExtractor={i => i.id.toString()}
                renderItem={this.renderItem}
            />
        );
    }

}

export default SeriesList;