import React, { Component } from 'react';
import { Share, View } from 'react-native';
import { imdbUrl } from '../util/util';
import Header from '../layouts/media-detail/header';
import MediaDetailLayout from '../layouts/media-detail/media-detail-layout';
import * as Toast from '../util/toast';
import Loader from '../widgets/loader-widget';
import SerieService from '../services/series-service';
import SerieDetailView from '../media/containers/serie-detail';
import EpisodeItem from '../media/components/episodes';

class SerieDetail extends Component {

    state = {
        serie: null,
        seasonSelected: "",
        episodes: []
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

                this.setState({ serie });
            } catch (err) {
                alert(err)
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
        Toast.successToast("Agregada a mi lista");
    }

    handleChangeSeason = async value => {
        if (value === "") {
            this.setState({ seasonSelected: "", episodes: [] });
        }

        else {
            const values = value.split("-");
            const season = values[0];
            const idSerie = values[1]

            const episodes = await SerieService.getEpisodesBySeason(idSerie, season);

            this.setState({ seasonSelected: season, episodes });
        }
    }

    renderEpisodes = ({ item }) => {
        return <EpisodeItem episode={item} />
    }

    render() {
        let { serie, seasonSelected, episodes } = this.state;

        return (
            <MediaDetailLayout>
                {serie === null && <Loader loading text="Cargando serie ..." />}
                {serie !== null && <SerieDetailView renderEpisodes={this.renderEpisodes} episodes={episodes} seasonSelected={seasonSelected} serie={serie} share={this.share} handleMyList={this.handleMyList} handleChangeSeason={this.handleChangeSeason} />}
            </MediaDetailLayout>
        );
    }
}

export default SerieDetail;