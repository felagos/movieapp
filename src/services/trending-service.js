import { config } from '../config/config';
import axios from 'axios';

class TrendingService {

    async getTrending(page = 1, media = "all", period = "day") {
        const url = `${config.API_BASE}/trending/${media}/${period}?api_key=${config.API_KEY}&language=${config.LANG}&page=${page}`;
        const response = await axios.get(url);
        return response.data.results;
    }

}

export default new TrendingService();