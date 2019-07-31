import { config } from '../config/config';
import axios from 'axios';
import MyListService from './my-list-service';
import NetInfoService from './netinfo-service';
import { MEDIA_TYPE } from '../util/constants';
import SqliteService from './sqlite-service';

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

            await SqliteService.updateData(page, response.data.results, "movies");

            return response.data.results;
        }
        else {
            return await SqliteService.getData(page, "movies");
        }
    }

    async getUpcoming(page = 1) {
        const isConnected = await NetInfoService.isConnected();
        if (isConnected) {
            const url = `${config.API_BASE}/movie/upcoming?api_key=${config.API_KEY}&language=${config.LANG}&page=${page}`;
            const response = await axios.get(url);

            await SqliteService.updateData(page, response.data.results, "upcoming");

            return response.data.results;
        }
        else {
            const data = await SqliteService.getData(page, "upcoming");
            return data;
        }

    }

    async getMovieTrailer(id) {
        const url = `${config.API_BASE}/movie/${id}/videos?api_key=${config.API_KEY}`;
        const response = await axios.get(url);
        return response.data.results.map(result => result.key);
    }

    async getDetail(id, checkInMyList = true) {
        const url = `${config.API_BASE}/movie/${id}?api_key=${config.API_KEY}&language=${config.LANG}`;

        const response = await axios.get(url);
        const movie = response.data;

        movie.genres = movie.genres.map(genre => genre.name);
        movie["mediaType"] = MEDIA_TYPE.MOVIE;

        if (checkInMyList) {
            const inMyList = await MyListService.checkInMyList(movie.id, MEDIA_TYPE.MOVIE);
            movie["inMyList"] = inMyList;
        }

        return movie;
    }

    async doSearch(term, page = 1) {
        const url = `${config.API_BASE}/search/movie?api_key=${config.API_KEY}&language=${config.LANG}&query=${term}&page=${page}`;
        const response = await axios.get(url);
        return response.data.results;
    }

    async getNowPlaying(page = 1) {
        const url = `${config.API_BASE}/movie/now_playing?api_key=${config.API_KEY}&language=${config.LANG}&page=${page}`;
        const response = await axios.get(url);
        const data = response.data;

        return { total_pages, results } = data;
    }

}

export default new MovieService();