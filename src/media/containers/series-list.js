import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import { colorWhite } from '../../styles/styles';
import TopRated from '../components/top-rated-cover';

class SeriesList extends PureComponent {

    renderItem = ({ item }) => {
        return <TopRated item={item} media="tv" seeDetail={this.props.seeDetail} />
    }

    render() {
        const { series } = this.props;

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