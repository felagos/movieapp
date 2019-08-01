import { config } from '../config/config';
import axios from 'axios';
import MyListService from './my-list-service';
import SqliteService, { TABLES } from './sqlite-service';
import NetInfoService from './netinfo-service';
import { MEDIA_TYPE } from '../util/constants';

class SerieService {

    async getSeriesGenres() {
        const url = `${config.API_BASE}/genre/tv/list?api_key=${config.API_KEY}&language=${config.LANG}`;
        const response = await axios.get(url);
        return response.data.genres;
    }

    async getTopRated(page = 1) {
        const isConnected = await NetInfoService.isConnected();
        if (isConnected) {
            const url = `${config.API_BASE}/tv/top_rated?api_key=${config.API_KEY}&language=${config.LANG}&page=${page}`;
            const response = await axios.get(url);

            await SqliteService.updateData(page, response.data.results, TABLES.SERIES);

            return response.data.results;
        }
        else {
            return await SqliteService.getData(page, TABLES.SERIES);
        }
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

    async getDetail(id, checkInMyList = true) {
        const isConnected = await NetInfoService.isConnected();
        if (isConnected) {
            const { data: serie } = await axios.get(`${config.API_BASE}/tv/${id}?api_key=${config.API_KEY}&language=${config.LANG}`);

            serie.genres = serie.genres.map(genre => genre.name);
            serie.seasons = serie.seasons.map(season => {
                return { number: season.season_number, name: season.name };
            });
            serie["mediaType"] = MEDIA_TYPE.SERIE;

            if (checkInMyList) {
                const inMyList = await MyListService.checkInMyList(serie.id, MEDIA_TYPE.SERIE);
                serie["inMyList"] = inMyList;
            }

            await SqliteService.updateDetail(id, serie, MEDIA_TYPE.SERIE);

            return serie;
        }

        return await SqliteService.getDetail(id, MEDIA_TYPE.SERIE);
    }

    async doSearch(term, page = 1) {
        const url = `${config.API_BASE}/search/tv?api_key=${config.API_KEY}&language=${config.LANG}&query=${term}&page=${page}`;
        const response = await axios.get(url);
        return response.data.results;
    }

    async getOnTheAir(page = 1) {
        const isConnected = await NetInfoService.isConnected();
        if (isConnected) {
            const url = `${config.API_BASE}/tv/on_the_air?api_key=${config.API_KEY}&language=${config.LANG}&page=${page}`;
            const response = await axios.get(url);
            const data = response.data;

            const { total_pages, results } = data;

            await SqliteService.updateData(page, { total_pages, results }, TABLES.ONAIR);

            return { total_pages, results };
        }

        return { total_pages, results } = await SqliteService.getData(page, TABLES.ONAIR);
    }

}

export default new SerieService();