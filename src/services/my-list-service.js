import Storage from '../services/storage-service';
import { config } from '../config/config';
import { STATUS_HTTP } from '../util/constants';

class MyListService {

    async saveToMyList(idMedia, mediaType) {
        const user = await Storage.getItem("user");
        const url = `${config.API_REST}/api/media/`;

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ idMedia, mediaType, "idUser": user._id }),
            headers: { 'Content-Type': 'application/json' }
        });

        const { status } = response;
        const { message } = await response.json();
       
        if (status === STATUS_HTTP.BAD_REQUEST || status === STATUS_HTTP.ERROR) throw new Error(message);

        return true;
    }

}

export default new MyListService();