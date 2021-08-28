import BaseApi from '../base';
import MoviesURIs from './MovieUris.json';

class MoviesApi extends BaseApi {
    API_KEY = '81f382d33088c6d52099a62eab51d967';
    HISTORY_STORAGE_KEY = 'history';
    WATCHLIST_STORAGE_KEY = 'watchList';

    /**
     * Retrieves movies list
     * @param {page: string, language: string} query
     */
    getMovies(query) {
        const {language = 'en', category = 'movie', ...rest} = query;
        return this.getRequest(MoviesURIs.getMovies, {
            api_key: this.API_KEY,
            with_original_language: language,
            ...rest
        }, {category});
    }

    async getMovieDetails(movieId, query = {}) {
        const details = await this.getRequest(
            MoviesURIs.getMovieDetails,
            {api_key: this.API_KEY, ...query},
            {movieId}
        );

        const credits = await this.getRequest(
            MoviesURIs.getMovieCredits,
            {api_key: this.API_KEY},
            {movieId}
        );

        return {...details, credits};
    }

    async searchMovies(query) {
        const {page, searchKey} = query;
        const response = await this.getRequest(MoviesURIs.searchMovies, {
            api_key: this.API_KEY,
            page,
            query: searchKey
        });

        return {
            results: response.results,
            page,
            total_pages: response.total_pages
        };
    }
}

export default new MoviesApi();
