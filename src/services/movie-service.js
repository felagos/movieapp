import { config } from '../config/config';
import axios from 'axios';

class MovieService {

    async getMoviesGenres() {
        const url = `${config.API_BASE}/genre/movie/list?api_key=${config.API_KEY}&language=${config.LANG}`;
        const response = await axios.get(url);
        return response.data.genres;
    }

}

export default new MovieService();