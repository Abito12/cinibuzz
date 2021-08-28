import {MoviesApi} from '../api';

// Actions
export const ACTION_TYPES = {
    FETCH_MOVIES: 'FETCH_MOVIES',
    TOGGLE_LOADER: 'TOGGLE_LOADER', // TODO: Move loader to app level
    FETCH_MOVIE_DETAILS: 'FETCH_MOVIE_DETAILS'
};

// Actions Factory
export const getMovies = (query) => async (dispatch) => {
    MoviesApi.getMovies(query)
        .then((response) => {
            const action = {type: ACTION_TYPES.FETCH_MOVIES, payload: response};
            dispatch(action);
        })
        .finally(() => {
            dispatch({
                type: ACTION_TYPES.TOGGLE_LOADER,
                payload: false
            });
        });
};

export const search = (query) => async (dispatch) => {
    MoviesApi.searchMovies(query)
        .then((response) => {
            const action = {type: ACTION_TYPES.FETCH_MOVIES, payload: response};
            dispatch(action);
        })
        .finally(() => {
            dispatch({
                type: ACTION_TYPES.TOGGLE_LOADER,
                payload: false
            });
        });
};

export const getMovieDetails = (movieId, query) => async (dispatch) => {
    MoviesApi.getMovieDetails(movieId, query)
        .then((response) => {
            const action = {type: ACTION_TYPES.FETCH_MOVIE_DETAILS, payload: response};
            dispatch(action);
        })
        .finally(() => {
            dispatch({
                type: ACTION_TYPES.TOGGLE_LOADER,
                payload: false
            });
        });
};

export const showLoader = () => async (dispatch) => {
    dispatch({
        type: ACTION_TYPES.TOGGLE_LOADER,
        payload: true
    });
};

export const hideLoader = () => async (dispatch) => {
    dispatch({
        type: ACTION_TYPES.TOGGLE_LOADER,
        payload: false
    });
};
