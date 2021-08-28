import {ACTION_TYPES} from '../../actions/movies';

const INITIAL_STATE = {showLoader: true, detailsMap: {}};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_MOVIES:
            const {results, total_pages, total_results} = action.payload;
            return {
                ...state,
                items: [...results],
                pages: total_pages,
                count: total_results
            };
        case ACTION_TYPES.FETCH_MOVIE_DETAILS:
            return {
                ...state,
                detailsMap: {
                    ...state.detailsMap,
                    [action.payload.id]: {...action.payload}
                }
            };
        case ACTION_TYPES.TOGGLE_LOADER:
            return {
                ...state,
                showLoader: action.payload
            };
        default:
            return {...state};
    }
};

export default reducer;
