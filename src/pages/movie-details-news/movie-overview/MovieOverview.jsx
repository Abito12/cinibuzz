const MovieOverView = (props) => {
    const {details} = props;

    const {overview, status, original_language, budget, revenue, credits} =
        details || {};

    const getHighlightView = (title, value) => {
        return (
            <div className="movie_highlight" key={`${title}/${value}`}>
                <div className="movie_highlight_title">{title}</div>
                <div className="movie_highlight_value">{value}</div>
            </div>
        );
    };

    const getMovieHighlights = () => {
        const highlights = [];

        const getStatus = () => {
            if (status) {
                highlights.push(getHighlightView('Status', status));
            }
        };

        const getOriginalLanguage = () => {
            if (original_language) {
                let originalLanguage = '';
                switch (original_language) {
                    case 'en':
                        originalLanguage = 'English';
                        break;
                    default:
                        originalLanguage = 'English';
                }
                highlights.push(
                    getHighlightView('Original Language', originalLanguage)
                );
            }
        };

        const getBudget = () => {
            if (budget) {
                highlights.push(
                    getHighlightView('Budget', `$${Number(budget).toFixed(2)}`)
                );
            }
        };

        const getRevenue = () => {
            if (revenue) {
                highlights.push(
                    getHighlightView(
                        'Revenue',
                        `$${Number(revenue).toFixed(2)}`
                    )
                );
            }
        };

        getStatus();
        getOriginalLanguage();
        getBudget();
        getRevenue();
        return highlights;
    };

    const getMovieCrew = () => {
        if (credits?.crew?.length) {
            const splicedCrew = credits.crew.splice(0, 3);
            return splicedCrew.map((crew) =>
                getHighlightView(crew.name, crew.job)
            );
        }
    };

    return (
        <div className="movie_overview_main_container">
            <div className="movie_overview_section">
                <div className="movie_overview_label">Overview</div>
                <div className="movie_overview">{overview}</div>
                <div className="movie_crew">{getMovieCrew()}</div>
            </div>
            <div className="movie_highlights_section">
                {getMovieHighlights()}
            </div>
        </div>
    );
};

export default MovieOverView;
