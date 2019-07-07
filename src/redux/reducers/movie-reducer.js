import { SET_GENRES_MOVIES } from "../action-types";

const initialState = {
    genres: []
};

const moviesReducer = (state = initialState, action) => {

    if (action.type === SET_GENRES_MOVIES) {
        return { ...state, genres: action.payload }
    }

    return state;

}

export default moviesReducer;