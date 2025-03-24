import React, {useState, useEffect, useRef} from "react";
import ImageGallery from "react-image-gallery";
import Zoom from "react-medium-image-zoom";
import "react-image-gallery/styles/css/image-gallery.css"; // ← CSS-импорт;
import "react-medium-image-zoom/dist/styles.css";
import "./CarouselDesktop.scss";

// Создаем отдельный компонент для изображения с ленивой загрузкой
const LazyImage = ({ original, thumbnail }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = original;
        img.onload = () => setIsLoaded(true);

        return () => {
            img.onload = null; // Очистка при размонтировании
        };
    }, [original]);

    if (!isLoaded) {
        return <img className="image-gallery-image" src={thumbnail} alt="thumbnail" />
    }

    return (
        <img
            className="image-gallery-image"
            src={original}
            alt="original"
            style={{opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s'}}
        />
    )
};

const ProductGallery = ({images}) => {
    const galleryRef = useRef(null);

    const items = images?.map(el =>
        ({original: el, thumbnail: el + '?x-oss-process=image/format,webp/resize,w_400'})
    )

    const renderItem = (item) => {
        return <LazyImage original={item.original} thumbnail={item.thumbnail}/>;
    };


    return (
        <ImageGallery
            ref={galleryRef}
            items={items || []}
            lazyLoad={true}
            renderItem={renderItem}
        />
    );
};

export default ProductGallery;