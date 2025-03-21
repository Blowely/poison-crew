import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // ← CSS-импорт;
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
    const items = images?.map(el =>
        ({original: el, thumbnail: el + '?x-oss-process=image/format,webp/resize,w_500'})
    )

    // Функция рендера для ImageGallery
    const renderItem = (item) => {
        return <LazyImage original={item.original} thumbnail={item.thumbnail} />;
    };

    return (
        <ImageGallery
            items={items || []}
            lazyLoad={true}
            renderItem={renderItem}
        />
    );
};

export default ProductGallery;