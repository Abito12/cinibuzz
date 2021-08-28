import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Pagination, Spinner} from 'react-rainbow-components';
import {Container, Col, Row, Card, CardImg, CardBody} from 'shards-react';
import {MovieActions} from '../../actions';
import {MovieCard, FilterPanel} from '../../components';
import EmptyImage from './assets/empty.jpg';
import Badges from '../../components/GenreChips/GenreChips.component';
import appConfig from '../../config/appConfig';

const INITIAL_FILTERS = {
    searchKey: '',
    language: 'en',
    sortKey: 'vote_count.desc',
    page: 1
};

const GENRES = {
    tv: appConfig.TV_SHOW_GENRES
};

const Movies = (props) => {
    const history = useHistory();
    const category = props.match?.params.category;
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    const dispatch = useDispatch();
    const moviesInfo = useSelector((state) => {
        return state.movies;
    });

    const loading = useSelector((state) => {
        return state.movies.showLoader;
    });

    useEffect(() => {
        const {
            page,
            searchKey = '',
            language,
            sortKey,
            category,
            genre
        } = filters;
        const isFilterActive = !!searchKey.length;

        dispatch(MovieActions.showLoader());
        if (isFilterActive) {
            dispatch(
                MovieActions.search({
                    page,
                    searchKey: searchKey.split(' ').join('+'),
                    language,
                    sortKey
                })
            );
        } else {
            dispatch(
                MovieActions.getMovies({
                    page,
                    language,
                    sort_by: sortKey,
                    with_genres: genre,
                    category
                })
            );
        }
    }, [dispatch, filters]);

    useEffect(() => {
        updateFilters({...INITIAL_FILTERS, category, genre: null});
    }, [category]);

    const updateFilters = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters
        }));
    };

    const handlePageChange = (_event, page) => {
        updateFilters({page});
    };

    const {items: movies = [], pages} = moviesInfo;

    const getFilteredMovies = () => {
        if (loading) {
            return <Spinner />;
        } else if (!movies.length) {
            return (
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <p className="empty-view-header">
                                    No results found
                                </p>
                            </CardBody>
                            <CardImg src={EmptyImage} className="empty-img" />
                        </Card>
                    </Col>
                </Row>
            );
        }
        return (
            <div>
                {filters.searchKey?.length ? (
                    <div className="search-result-text">
                        Showing results for '{filters.searchKey}'
                    </div>
                ) : (
                    <div>
                        <Badges
                            items={(
                                GENRES[category] || appConfig.MOVIE_GENRES
                            ).map((item) => ({
                                ...item,
                                selected: item.id === filters.genre
                            }))}
                            onItemClick={(id) => updateFilters({genre: id})}
                        />
                    </div>
                )}
                <div className="movies-card-container">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            handleAddToWatchList={() => {}}
                            navigateToDetails={() => {
                                history.push(`/movie/${movie.id}`);
                            }}
                        />
                    ))}
                </div>
                <Pagination
                    className="rainbow-m_auto"
                    pages={pages}
                    activePage={filters.page}
                    onChange={handlePageChange}
                    variant="shaded"
                />
            </div>
        );
    };

    return (
        <Container className="movies-container">
            <h1>{category}</h1>
            <FilterPanel filters={filters} updateFilters={updateFilters} />
            {getFilteredMovies()}
        </Container>
    );
};

export default Movies;
