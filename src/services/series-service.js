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
            if(ids.include(genre.id))
                return genre.name;
        });
    }

}

export default new SerieService();