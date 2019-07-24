import React, { Component } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import Header from '../layouts/media/header';
import Loader from '../widgets/loader-widget';
import SerieService from '../services/series-service';
import MediaLayout from '../layouts/media/media-layout';
import { getImage, IMG_SIZE } from '../util/util';

class Series extends Component {

    state = {
        series: [],
        page: 1,
        totalPage: null,
        loading: true
    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: <Header goBack={navigation.goBack} />
        }
    }

    async componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const { page } = this.state;
        let { total_pages, results: series } = await SerieService.getOnTheAir(page);

        if (page !== 1) {
            series = [...this.state.series, ...series];
        }

        this.setState({ series, loading: false, total_pages });
    }

    loadMoreData = async () => {
        this.setState({ page: this.state.page + 1, loading: true }, () => this.loadData());
    }

    renderElement = ({ item }) => {
        const width = Dimensions.get("window").width / 2.2;

        let img = require('../assets/no_disponible.jpg');
        if (item.poster_path) {
            const uri = getImage(item.poster_path, IMG_SIZE.w200);
            Image.prefetch(uri);
            img = { uri };
        }

        return (
            <TouchableOpacity onPress={() => {
                this.seeDetail(id, "tv", item.name);
            }}>
                <View style={{ margin: 10, height: 250, width }}>
                    <Image source={img} style={{ height: 250, width }} />
                </View>
            </TouchableOpacity>
        );
    }

    seeDetail = (id, media, title) => {
        this.props.navigation.navigate("MovieDetail", { id, media, title })
    }

    render() {
        const { series, loading } = this.state;
        return (
            <MediaLayout>
                <Loader visible={loading} text="Cargando series ..." />
                <FlatList
                    data={series}
                    numColumns={2}
                    keyExtractor={i => i.id.toString() * Date.now()}
                    renderItem={this.renderElement}
                    onEndReached={this.loadMoreData}
                    onEndThreshold={0}
                />
            </MediaLayout>
        );
    }
}

export default Series;