import {Card, CardTitle, CardImg, CardBody} from 'shards-react';
import './style.css';

const FALLBACK_IMG =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/488px-No-Image-Placeholder.svg.png';

const MovieCard = (props) => {
    const {movie, navigateToDetails} = props;
    const {title, poster_path} = movie;

    return (
        <div className="movie-card" onClick={navigateToDetails}>
            <Card>
                <CardImg
                    className="movie-poster-img"
                    src={
                        poster_path
                            ? `https://image.tmdb.org/t/p/w200${poster_path}`
                            : FALLBACK_IMG
                    }
                    alt={title}
                    loading="lazy"
                />
                <CardBody>
                    <CardTitle className="movie-title">{title}</CardTitle>
                </CardBody>
            </Card>
        </div>
    );
};

export default MovieCard;
