import { config } from '../config/config';
import axios from 'axios';

class MovieService {

    async getMoviesGenres() {
        const url = `${config.API_BASE}/genre/movie/list?api_key=${config.API_KEY}&language=${config.LANG}`;
        const response = await axios.get(url);
        const genres = response.data.genres;

        return genres;
    }

    async getTopRated(page = 1) {
        const url = `${config.API_BASE}/movie/top_rated?api_key=${config.API_KEY}&language=${config.LANG}&page=${page}`;
        const response = await axios.get(url);
        return response.data.results;
    }

    async getUpcoming(page = 1) {
        const url = `${config.API_BASE}/movie/upcoming?api_key=${config.API_KEY}&language=${config.LANG}&page=${page}`;
        const response = await axios.get(url);
        return response.data.results;
    }

    async getMovieTrailer(id) {
        const url = `${config.API_BASE}/movie/${id}/videos?api_key=${config.API_KEY}`;
        const response = await axios.get(url);
        return response.data.results.map(result => result.key);
    }

    async getDetail(id) {
        const url = `${config.API_BASE}/movie/${id}?api_key=${config.API_KEY}&language=${config.LANG}`;

        const response = await axios.get(url);
        const movie = response.data;

        movie.genres = movie.genres.map(genre => genre.name);

        return movie;
    }

    async doSearch(term, page = 1) {
        const url = `${config.API_BASE}/search/movie?api_key=${config.API_KEY}&language=${config.LANG}&query=${term}&page=${page}`;
        const response = await axios.get(url);
        return response.data.results;
    }

}

export default new MovieService();