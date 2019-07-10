import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import SeriesService from '../../services/series-service';
import Loader from "../../widgets/loader-widget";
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
        this.setState({ page: this.state.page + 1, loading: true }, () => this.loadData());
    }

    seeDetailSerie = id => {
        this.props.navigation.navigate("Detail", { id, type: "serie" });
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <TouchableOpacity onPress={() => { this.seeDetailSerie(item.id) }}>
                    <View style={styles.cardBody}>
                        <Image style={styles.imageThumbnail} source={{ uri: `${getImage(item.poster_path, IMG_SIZE.original)}` }} />
                        <Text style={styles.title}>{item.original_name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const { series, loading } = this.state;

        return (
            <View style={styles.container}>
                <Loader loading={loading} color="#ff66be" text="Cargando series ..." />
                <GeneralFlatList numColumns={2} data={series} onEndReached={this.loadMoreData} keyExtractor={i => i.id.toString()} renderItem={this.renderItem} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: 30,
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 350
    },
    card: {
        flex: 1,
        flexDirection: 'column',
        margin: 1,
        height: 390
    },
    cardBody: {
        flexDirection: 'column'
    },
    title: {
        color: 'black',
        fontWeight: 'bold'
    }
});

export default SeriesTopRated;