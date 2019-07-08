import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ListItem, Card, CardItem, Thumbnail } from 'native-base';
import SeriesService from '../../services/series-service';
import Loader from "react-native-modal-loader";
import GeneralFlatList from '../../layouts/flat-list';
import { IMG_SIZE, getImage } from '../../util/util';


class SeriesTopRated extends Component {

    state = {
        series: [],
        loading: true,
        page: 1
    };

    async componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const { page } = this.state;
        let series = await SeriesService.getTopRated(page);
        if (page !== 1) {
            series = [...this.state.series, ...series];
        }

        this.setState({ series, loading: false });
    }

    loadMoreData = async () => {
        this.setState({ page: this.state.page + 1 }, () => this.loadData());
    }

    renderItem = ({ item }) => {
        return (
            <Card>
                <CardItem cardBody>
                    <Thumbnail source={{ uri: `${getImage(item.poster_path, IMG_SIZE.w200)}` }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <Text>{item.original_name}</Text>
            </Card>
        );
    }

    render() {
        const { series, loading } = this.state;

        return (
            <View style={styles.container}>
                <Loader loading={loading} color="#ff66be" />
                <GeneralFlatList data={series} onEndReached={this.loadMoreData} keyExtractor={i => i.id.toString()} renderItem={this.renderItem} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default SeriesTopRated;