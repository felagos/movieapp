import { config } from '../config/config';

export const IMG_SIZE = {
    "original": "original",
    "w200": "w200",
    "w500": "w500"
}

export const getImage = (img, size) => {
    img = img.replace("\/", "");
    return `${config.BASE_IMG}/${size}/${img}`;
}

export const cutString = (string, limit = 28) => {
    if(string.length < 28) return string;
    return string.substring(0, limit) + " ...";
}

export const concatGenres = genres => {
    return genres.join(" - ");
}