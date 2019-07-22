import Storage from '../services/storage-service';
import { config } from '../config/config';
import axios from 'axios';

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

            return message;
        } catch (err) {
            console.log("err", err);
            const { data: { message } } = err.response;
            throw new Error(message);
        }
    }

    async getMyList() {
        try {
            const user = await Storage.getItem("user");
            const url = `${config.API_REST}/api/media/${user._id}`;
            const response = axios.get(url);
            const { data: { message } } = response;

            return message;
        } catch (err) {
            console.log("err", err);
            const { data: { message } } = err.response;
            throw new Error(message);
        }
    }

}

export default new MyListService();