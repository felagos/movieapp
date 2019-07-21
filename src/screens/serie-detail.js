import React, { Component } from 'react';
import { Share } from 'react-native';
import Header from '../layouts/media-detail/header';
import MediaDetailLayout from '../layouts/media-detail/media-detail-layout';
import * as Toast from '../util/toast';
import Loader from '../widgets/loader-widget';
import SerieService from '../services/series-service';
import SerieDetailView from '../media/containers/serie-detail';
import EpisodeItem from '../media/components/episodes';
import MyListService from '../services/my-list-service';

class SerieDetail extends Component {

    state = {
        serie: null,
        seasonSelected: "",
        episodes: [],
        loading: true
    };

    static navigationOptions = ({ navigation }) => {
        const title = navigation.getParam("title", "");
        return {
            header: <Header title={title} goBack={navigation.goBack} />
        }
    }

    async componentDidMount() {

        this.props.navigation.addListener('willFocus', async () => {
            try {
                const id = this.props.navigation.getParam("id");
                const serie = await SerieService.getDetail(id);

                this.setState({ serie, loading: false });
            } catch (err) {
                this.setState({ serie: [], loading: false });
                Toast.dangerToast("Error al obtener la película seleccionada");
            }
        });

    }

    share = async (title, url) => {
        await Share.share({
            url,
            title
        });
    }

    handleMyList = async id => {
        try {
            await MyListService.saveToMyList(id, "serie");
            Toast.successToast("Agregada a mi lista");
        } catch (err) {
            Toast.dangerToast(err.message);
        }
    }

    handleChangeSeason = async value => {
        if (value === "") {
            this.setState({ seasonSelected: "", episodes: [] });
        }

        else {
            const values = value.split("-");
            const season = values[0];
            const idSerie = values[1];

            const episodes = await SerieService.getEpisodesBySeason(idSerie, season);

            this.setState({ seasonSelected: season, episodes });
        }
    }

    renderEpisodes = ({ item }) => {
        return <EpisodeItem episode={item} />
    }

    render() {
        const { serie, seasonSelected, episodes, loading } = this.state;

        return (
            <MediaDetailLayout>
                <Loader loading={loading} text="Cargando serie ..." />
                {!loading && <SerieDetailView renderEpisodes={this.renderEpisodes} episodes={episodes} seasonSelected={seasonSelected} serie={serie} share={this.share} handleMyList={this.handleMyList} handleChangeSeason={this.handleChangeSeason} />}
            </MediaDetailLayout>
        );
    }
}

export default SerieDetail;