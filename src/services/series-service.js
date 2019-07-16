import { config } from '../config/config';
import axios from 'axios';

class SerieService {

    async getSeriesGenres() {
        const url = `${config.API_BASE}/genre/tv/list?api_key=${config.API_KEY}&language=${config.LANG}`;
        const response = await axios.get(url);
        return response.data.genres;
    }

    async getTopRated(page = 1) {
        const url = `${config.API_BASE}/tv/top_rated?api_key=${config.API_KEY}&language=${config.LANG}&page=${page}`;
        const response = await axios.get(url);
        return response.data.results;
    }

    async getGenreByIds(ids) {
        const genres = await this.getSeriesGenres();

        return genres.filter(genre => {
            if (ids.include(genre.id))
                return genre.name;
        });
    }

    async getDetailSeason(idSerie, season) {
        const url = `${config.API_BASE}/tv/${idSerie}/season/${season}?api_key=${config.API_KEY}&${config.LANG}`;
        const { data: detailSeason } = await axios.get(url);

        const episodes = detailSeason.episodes.map(detail => {
            return { air_date: detail.air_date, episode_number: detail.episode_number, name: detail.name };
        });

        return { episodes, air_date: detailSeason.air_date, name: detailSeason.name };
    }

    async getEpisodesBySeason(idSerie, season) {
        const url = `${config.API_BASE}/tv/${idSerie}/season/${season}?api_key=${config.API_KEY}&${config.LANG}`;
        const { data: detailSeason } = await axios.get(url);

        return detailSeason.episodes.map(detail => {
            return { air_date: detail.air_date, episode_number: detail.episode_number, name: detail.name, id: detail.id };
        });
    }

    async getDetail(id) {
        const { data: serie } = await axios.get(`${config.API_BASE}/tv/${id}?api_key=${config.API_KEY}&language=${config.LANG}`);

        serie.genres = serie.genres.map(genre => genre.name);
        serie.seasons = serie.seasons.map(season => {
            return { number: season.season_number, name: season.name };
        });

        let response = { id, genres, homepage, title, overview, backdrop_path, seasons } = serie;

        return response;
    }

    async doSearch(term, page = 1) {
        const url = `${config.API_BASE}/search/tv?api_key=${config.API_KEY}&language=${config.LANG}&query=${term}&page=${page}`;
        const { data: results } = await axios.get(url);

        return results;
    }

}

export default new SerieService();