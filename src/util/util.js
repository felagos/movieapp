import { config } from '../config/config';

export const IMG_SIZE = {
    "original": "original",
    "w200": "w200"
}

export const getImage = (img, size) => {
    return `${config.BASE_IMG}/${size}/${img}`;
}