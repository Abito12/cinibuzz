import {ImageCard} from '../../../components';

const MovieRecomendations = (props) => {
    const {recommendations, onItemClick} = props;

    const renderRecomendationsList = () => {
        const slicedList = recommendations.slice(0, 3);
        return slicedList.map((recomendation) => {
            const {id, title, backdrop_path, vote_average = 0} = recomendation;
            return (
                <div onClick={() => onItemClick(id)}>
                    <ImageCard
                        key={id}
                        imageSrc={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
                        width="348px"
                        height="174px"
                        altText={title}
                        mainTitle={title}
                        subMainTitle={`${Math.floor(vote_average * 10)} %`}
                    />
                </div>
            );
        });
    };

    if (recommendations?.length) {
        return (
            <div className="movie_recomendations_section">
                <div className="movie_recomendations_title">Recomendations</div>
                <div className="movie_recomendations_list">
                    {renderRecomendationsList()}
                </div>
            </div>
        );
    }

    return null;
};

export default MovieRecomendations;
