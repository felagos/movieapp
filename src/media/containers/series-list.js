import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import { BarIndicator } from 'react-native-indicators';
import { colorWhite } from '../../styles/styles';
import CoverMedia from '../components/cover-media';

class SeriesList extends PureComponent {

    renderItem = ({ item }) => {
        return <CoverMedia item={item} media="tv" seeDetail={this.seeDetailSerie} />
    }

    seeDetailSerie = (id, media, title) => {
        this.props.navigation.navigate("SerieDetail", { id, media, title });
    }

    render() {
        const { series, horizontal } = this.props;

        if (series.length === 0) {
            return <BarIndicator color={colorWhite.color} />
        }

        return (
            <FlatList
                horizontal={horizontal}
                data={series}
                keyExtractor={i => i.id.toString()}
                renderItem={this.renderItem}
            />
        );
    }

}

export default withNavigation(SeriesList);