import {Spinner} from 'react-rainbow-components';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {MovieActions} from '../../actions';
import {Container, Row} from 'shards-react';
import MovieOverView from './movie-overview';
import MovieCast from './movie-cast';
import MovieRecommendations from './movie-recomendations';

const MovieDetails = (props) => {
    const {match} = props;
    const history = useHistory();
    const movieId = Number(match.params.movieId);
    const dispatch = useDispatch();

    const movie = useSelector(
        (state) => state.movies.detailsMap?.[movieId] || {}
    );

    const isLoading = useSelector((state) => state.movies.showLoader);

    useEffect(() => {
        if (!movie.id) {
            dispatch(MovieActions.showLoader());
            dispatch(
                MovieActions.getMovieDetails(movieId, {
                    append_to_response: 'images'
                })
            );
        }
    }, [dispatch, movieId, movie.id]);

    if (isLoading) {
        return <Spinner />;
    }

    const {backdrop_path, title, release_date, genres = [], runtime} = movie;

    const getHighlights = () => {
        const highlights = [];

        const getDate = () => {
            if (release_date) {
                const releaseDate = new Date(release_date);
                let month = releaseDate.getMonth() + 1;
                const year = releaseDate.getFullYear();
                let date = releaseDate.getDate();
                if (date < 10) {
                    date = '0' + date;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                highlights.push(`${month}/${date}/${year}`);
            }
        };

        const getGenres = () => {
            const genreNames = genres.map((genere) => genere.name) || [];
            highlights.push(genreNames.join(', '));
        };

        const getRunTime = () => {
            if (runtime) {
                const hours = Math.floor(runtime / 60);
                const minutes = runtime - hours * 60;
                let movieRunTimeString = '';
                if (hours > 0) {
                    movieRunTimeString += `${hours}h `;
                }
                if (minutes > 0) {
                    movieRunTimeString += `${minutes}m`;
                }
                highlights.push(movieRunTimeString);
            }
        };

        getDate();
        getGenres();
        getRunTime();
        return highlights.join(' | ');
    };

    return (
        <Container>
            <div
                className="movie_backdrop_card"
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${backdrop_path}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%'
                }}>
                <div className="movie_backdrop_contents">
                    <div>
                        <Row>
                            <div className="movie_title">{title}</div>
                        </Row>
                        <Row>
                            <div className="movie_highlights">
                                {getHighlights()}
                            </div>
                        </Row>
                    </div>
                </div>
            </div>
            <MovieOverView details={movie} />
            <MovieCast cast={movie.credits?.cast} />
            <MovieRecommendations
                recommendations={movie.recommendations}
                onItemClick={(movieId) => history.push(`/movie/${movieId}`)}
            />
        </Container>
    );
};

export default MovieDetails;
