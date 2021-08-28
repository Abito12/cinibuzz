class BaseApi {
    async getRequest(url, params, embed) {
        const requestURL = this.addURLParams(url, params);
        const embeddedURL = this.embedURLParams(requestURL, embed);
        const raw = await fetch(embeddedURL);
        const response = await raw.json();
        return response;
    }

    /**
     * Utility function to add filter parameters in URL
     * @param {string} url
     * @param {Record<string, string>} embed
     * @returns {string}
     * Example: movies => movies?recent=true&page=1
     */
    addURLParams(url, params) {
        if (!params || !Object.keys(params).length) {
            return url;
        }

        let result = `${url}?`;
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                result += `${key}=${value}&`;
            }
        });

        return result;
    }

    /**
     * Utility function to embed parameters in URL
     * @param {string} url
     * @param {Record<string, string>} embed
     * @returns {string}
     * Example: movie/{movieId} => movie/123
     */
    embedURLParams(url, embed) {
        if (!embed || !Object.keys(embed).length) {
            return url;
        }

        let result = url;
        Object.entries(embed).forEach(([key, value]) => {
            result = url.replace(`{${key}}`, value);
        });

        return result;
    }
}

export default BaseApi;
