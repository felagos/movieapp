import { SET_GENRES_MOVIES } from "../action-types";

export const setGenresMovies = genres => {
    return {
        type: SET_GENRES_MOVIES,
        payload: genres
    }
}