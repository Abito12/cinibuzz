import {useState} from 'react';
import {ImageCard} from '../../../components';

const MovieCast = (props) => {
    const {cast} = props;
    const [currentPage, updateCurrentPage] = useState(0);
    const [isForwardDisabled, updateIsForwardDisabled] = useState(false);
    const [isBackwarDisabled, updateIsBackwardDisabled] = useState(true);

    const handleForwardClick = () => {
        const newCurrentPage = currentPage + 1;
        updateCurrentPage(newCurrentPage);
        if (cast.length <= newCurrentPage * 4 + 4) {
            updateIsForwardDisabled(true);
        }
        updateIsBackwardDisabled(false);
    };

    const handleBackWardClick = () => {
        const newCurrentPage = currentPage - 1;
        if (newCurrentPage <= 0) {
            updateIsBackwardDisabled(true);
        }
        if (newCurrentPage >= 0) {
            updateCurrentPage(newCurrentPage);
        }
        updateIsForwardDisabled(false);
    };

    const renderCastList = () => {
        const offset = currentPage * 4;
        const limit = offset + 4;
        const slicedList = cast.slice(offset, limit);
        return slicedList.map((castMemeber) => {
            const {id, name, character, profile_path} = castMemeber;
            return (
                <ImageCard
                    key={id}
                    imageSrc={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                    width="256px"
                    height="322px"
                    altText={name}
                    mainTitle={name}
                    subTitle={character}
                />
            );
        });
    };

    if (cast?.length) {
        return (
            <>
                <div className="horizontal_divider" />
                <div className="movie_cast_section">
                    <div className="movie_cast_title_section">
                        <div className="movie_cast_title">Cast</div>
                        <div className="navigation_icon">
                            <div
                                className={
                                    isBackwarDisabled
                                        ? 'navigation_icon_disabled'
                                        : ''
                                }
                                style={{oaddingRight: '30px'}}
                                onClick={
                                    isBackwarDisabled
                                        ? undefined
                                        : handleBackWardClick
                                }>
                                {'<'}
                            </div>
                            <div
                                className={
                                    isForwardDisabled
                                        ? 'navigation_icon_disabled'
                                        : ''
                                }
                                onClick={
                                    isForwardDisabled
                                        ? undefined
                                        : handleForwardClick
                                }>
                                {'>'}
                            </div>
                        </div>
                    </div>
                    <div className="movie_cast_list">{renderCastList()}</div>
                </div>
            </>
        );
    }
    return null;
};

export default MovieCast;
