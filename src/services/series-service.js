import { config } from '../config/config';

class SerieService {

    async getMoviesGenres() {
        const url = `${config.API_BASE}/genre/tv/list?api_key=${config.API_KEY}&language=${config.LANG}`;
        const response = await fetch(url);
        return response.genres;
    }

}

export default new SerieService();