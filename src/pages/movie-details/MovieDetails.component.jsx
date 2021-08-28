import {Container, Row, Col} from 'shards-react';
import {Spinner} from 'react-rainbow-components';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {MovieActions} from '../../actions';

const MovieDetails = (props) => {
    const {match} = props;
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

    const images = movie.images?.backdrops.slice(0, 10) || [];
    if (!images.length && movie.images?.posters.length) {
        images.push(...movie.images.posters);
    }

    const {title, overview} = movie;

    const crew = getMovieCrew(movie?.credits?.crew);

    return (
        <Container>
            <div className="movie-details-img">
                <img
                    src={`https://image.tmdb.org/t/p/w500${images?.[0]?.file_path}`}
                    alt="Snow"
                    style={{width: '100%'}}
                    className="details-image"
                />
                <div className="bottom-left">{title}</div>
            </div>
            <Container>
                <Row className="details-row">
                    <h4>Overview</h4>
                </Row>
                <Row>{overview}</Row>
                <Row className="details-row">
                    {crew.map((item) => (
                        <Col>
                            <div className="attribute-title">{item.title}</div>
                            <div>{item.value}</div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
};

const getMovieCrew = (crew = []) => {
    const crewMap = {};
    crew.forEach((item) => {
        crewMap[item.job] = item.name;
    });

    return [
        {title: 'Director', value: crewMap.Director},
        {title: 'Writer', value: crewMap.Writer},
        {title: 'Producer', value: crewMap.Producer}
    ].filter(({value}) => value);
};

export default MovieDetails;
