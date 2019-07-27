import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Header from '../layouts/media/header';
import Loader from '../widgets/loader-widget';
import SerieService from '../services/series-service';
import MediaLayout from '../layouts/media/media-layout';
import CoverMedia from '../media/components/cover-media';

class Series extends Component {

    state = {
        series: [],
        page: 1,
        totalPage: null,
        loading: true
    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: <Header goBack={navigation.goBack} title="Series" />
        }
    }

    async componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const { page, totalPage } = this.state;
        if (page < totalPage) {
            let { total_pages, results: series } = await SerieService.getOnTheAir(page);

            if (page !== 1) {
                series = [...this.state.series, ...series];
            }

            this.setState({ series, loading: false, total_pages });
        }
    }

    loadMoreData = async () => {
        this.setState({ page: this.state.page + 1, loading: true }, () => this.loadData());
    }

    renderElement = ({ item }) => {
        return <CoverMedia columns={2} item={item} media="tv" seeDetail={this.seeDetail} />
    }

    seeDetail = (id, media, title) => {
        this.props.navigation.navigate("SerieDetail", { id, media, title })
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