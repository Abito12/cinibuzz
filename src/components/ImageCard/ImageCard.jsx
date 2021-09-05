const ImageCard = (props) => {
    const {
        imageSrc,
        width,
        height,
        altText,
        imageClickHandler,
        mainTitle = '',
        subTitle = '',
        subMainTitle = ''
    } = props;

    return (
        <div className="image_card">
            <img className="image" 
                src={imageSrc}
                width={width}
                height={height}
                alt={altText}
                onClick={imageClickHandler}
            />
            <div className="image_title">
                {!!mainTitle.length && <div>{mainTitle}</div>}
                {!!subMainTitle.length && <div>{subMainTitle}</div>}
            </div>
            {!!subTitle.length && <div>{subTitle}</div>}
        </div>
    );
};

export default ImageCard;
