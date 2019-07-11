import { config } from '../config/config';
import axios from 'axios';

class MovieService {

    async getMoviesGenres() {
        const url = `${config.API_BASE}/genre/movie/list?api_key=${config.API_KEY}&language=${config.LANG}`;
        const response = await axios.get(url);
        return response.data.genres;
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

    async getGenreByIds(ids) {
        if(ids.length == 0) return [];

        let genres = await this.getMoviesGenres();

        genres.filter(genre => {
            if(ids.include(genre.id))
                return genre;
        });

        return genres.map(genre => genre.name);

    }

    async getMovieTrailer(id) {
        const url = `${config.API_BASE}/movie/${id}/videos?api_key=${config.API_KEY}`;
        const response = await axios.get(url);
        return response.data.results;
    }

}

export default new MovieService();