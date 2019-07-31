import Storage from '../services/storage-service';
import { config } from '../config/config';
import axios from 'axios';
import MovieService from './movie-service';
import SerieService from './series-service';
import { MEDIA_TYPE } from '../util/constants';

class MyListService {

    async saveToMyList(idMedia, mediaType) {
        try {
            const user = await Storage.getItem("user");
            const url = `${config.API_REST}/api/media/`;

            const response = await axios.post(url, { idMedia, mediaType, "idUser": user._id });

            const { data: { message } } = response;

            return message;

        } catch (err) {
            const { data: { message } } = err.response;
            throw new Error(message);
        }
    }

    async checkInMyList(idMedia, mediaType) {
        try {
            const user = await Storage.getItem("user");
            const url = `${config.API_REST}/api/media/isInMyList/${idMedia}/${mediaType}/${user._id}`;
            const response = await axios.get(url);

            const { data: { message: inMyList } } = response;

            return inMyList;
        } catch (err) {
            const { data: { message } } = err.response;
            throw new Error(message);
        }
    }

    async deleteFromMyList(idMedia, mediaType) {
        try {
            const user = await Storage.getItem("user");
            const url = `${config.API_REST}/api/media/deleteFromList/${idMedia}/${mediaType}/${user._id}`;
            const response = await axios.delete(url);

            const { data: { message } } = response;

            return true;
        } catch (err) {
            console.log("err", err);
            const { data: { message } } = err.response;
            throw new Error(message);
        }
    }

    getMyList() {
        return new Promise((resolve, reject) => {
            try {
                Storage.getItem("user").then(user => {
                    const url = `${config.API_REST}/api/media/${user._id}`;
                    const response = axios.get(url);

                    response.then(data => {
                        const { data: { message } } = data;
                        const promises = [];

                        for (const element of message) {
                            if (element.mediaType === MEDIA_TYPE.MOVIE) {
                                const media = MovieService.getDetail(element.idMedia, false);
                                promises.push(media);
                            }
                            if (element.mediaType === MEDIA_TYPE.SERIE) {
                                const media = SerieService.getDetail(element.idMedia, false);
                                promises.push(media);
                            }
                        }

                        Promise.all(promises).then(data => {
                            resolve(data);
                        });
                    });
                });


            } catch (err) {
                const { data: { message } } = err.response;
                reject(message);
            }
        });

    }

}

export default new MyListService();