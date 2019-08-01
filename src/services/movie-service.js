import { config } from '../config/config';
import axios from 'axios';
import MyListService from './my-list-service';
import NetInfoService from './netinfo-service';
import { MEDIA_TYPE } from '../util/constants';
import SqliteService, { TABLES } from './sqlite-service';

class MovieService {

    async getMoviesGenres() {
        const url = `${config.API_BASE}/genre/movie/list?api_key=${config.API_KEY}&language=${config.LANG}`;
        const response = await axios.get(url);
        const genres = response.data.genres;

        return genres;
    }

    async getTopRated(page = 1) {
        const isConnected = await NetInfoService.isConnected();
        if (isConnected) {
            const url = `${config.API_BASE}/movie/top_rated?api_key=${config.API_KEY}&language=${config.LANG}&page=${page}`;
            const response = await axios.get(url);

            await SqliteService.updateData(page, response.data.results, TABLES.MOVIES);

            return response.data.results;
        }
        else {
            return await SqliteService.getData(page, TABLES.MOVIES);
        }
    }

    async getUpcoming(page = 1) {
        const isConnected = await NetInfoService.isConnected();
        if (isConnected) {
            const url = `${config.API_BASE}/movie/upcoming?api_key=${config.API_KEY}&language=${config.LANG}&page=${page}`;
            const response = await axios.get(url);

            await SqliteService.updateData(page, response.data.results, TABLES.UPCOMING);

            return response.data.results;
        }
        else {
            const data = await SqliteService.getData(page, TABLES.UPCOMING);
            return data;
        }

    }

    async getMovieTrailer(id) {
        const url = `${config.API_BASE}/movie/${id}/videos?api_key=${config.API_KEY}`;
        const response = await axios.get(url);
        return response.data.results.map(result => result.key);
    }

    async getDetail(id, checkInMyList = true) {
        const isConnected = await NetInfoService.isConnected();
        if (isConnected) {
            const url = `${config.API_BASE}/movie/${id}?api_key=${config.API_KEY}&language=${config.LANG}`;

            const response = await axios.get(url);
            const movie = response.data;

            movie.genres = movie.genres.map(genre => genre.name);
            movie["mediaType"] = MEDIA_TYPE.MOVIE;

            if (checkInMyList) {
                const inMyList = await MyListService.checkInMyList(movie.id, MEDIA_TYPE.MOVIE);
                movie["inMyList"] = inMyList;
            }

            await SqliteService.updateDetail(id, movie, MEDIA_TYPE.MOVIE);

            return movie;
        }

        return await SqliteService.getDetail(id, MEDIA_TYPE.MOVIE);
    }

    async doSearch(term, page = 1) {
        const url = `${config.API_BASE}/search/movie?api_key=${config.API_KEY}&language=${config.LANG}&query=${term}&page=${page}`;
        const response = await axios.get(url);
        return response.data.results;
    }

    async getNowPlaying(page = 1) {
        const isConnected = NetInfoService.isConnected();
        if (isConnected) {
            const url = `${config.API_BASE}/movie/now_playing?api_key=${config.API_KEY}&language=${config.LANG}&page=${page}`;
            const response = await axios.get(url);
            const data = response.data;

            const { total_pages, results } = data;

            await SqliteService.updateData(page, { total_pages, results }, TABLES.UPCOMING);

            return { total_pages, results };
        }

        return { total_pages, results } = await SqliteService.getData(page, TABLES.NOWPLAYING);
    }

}

export default new MovieService();