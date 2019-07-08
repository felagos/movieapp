import { config } from '../config/config';
import axios from 'axios';

class SerieService {

    async getTopRated(page = 1) {
        const url = `${config.API_BASE}/tv/top_rated?api_key=${config.API_KEY}&language=${config.LANG}&page=${page}`;
        const response = await axios.get(url);
        return response.data.results;
    }

}

export default new SerieService();