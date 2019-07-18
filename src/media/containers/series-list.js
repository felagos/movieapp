import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import { BarIndicator } from 'react-native-indicators';
import { colorWhite, backgroundColorBlack } from '../../styles/styles';
import CoverMedia from '../components/cover-media';

class SeriesList extends PureComponent {

    renderItem = ({ item }) => {
        return <CoverMedia columns={this.props.columns} item={item} media="tv" seeDetail={this.seeDetailSerie} />
    }

    seeDetailSerie = (id, media, title) => {
        this.props.navigation.navigate("SerieDetail", { id, media, title });
    }

    render() {
        const { series, horizontal, loading, columns } = this.props;

        if (series.length === 0 && loading) {
            return <BarIndicator color={colorWhite.color} />
        }

        return (
            <FlatList
                numColumns={columns ? columns : 1}
                contentContainerStyle={{ ...backgroundColorBlack }}
                horizontal={horizontal}
                data={series}
                keyExtractor={i => i.id.toString()}
                renderItem={this.renderItem}
            />
        );
    }

}

export default withNavigation(SeriesList);