import React, {useState, useEffect, useRef} from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // ← CSS-импорт;
import "./CarouselDesktop.scss";

// Создаем отдельный компонент для изображения с ленивой загрузкой
const LazyImage = ({ original, thumbnail, onClick }) => {
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
            onClick={onClick}
            alt="original"
            style={{opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s', cursor: "pointer"}}
        />
    )
};

const ProductGallery = ({images}) => {
    const [isOpenGallery, setOpenGallery] = useState(false);
    const galleryRef = useRef(null);

    const items = images?.map(el =>
        ({original: el, thumbnail: el + '?x-oss-process=image/format,webp/resize,w_500'})
    )

    const handleImageClick = ({target}) => {
        if (galleryRef.current) {
            console.log('galleryRef?.current=',galleryRef?.current)
            //galleryRef?.current?.fullScreen(); // Включаем полноэкранный режим
            console.log('target=',target)
            if (target?.requestFullscreen) {
                target?.requestFullscreen();
            } else if (target?.mozRequestFullScreen) {
                // Firefox
                target?.mozRequestFullScreen();
            } else if (target?.webkitRequestFullscreen) {
                // Chrome, Safari и Opera
                target?.webkitRequestFullscreen();
            } else if (target?.msRequestFullscreen) {
                // IE/Edge
                target?.msRequestFullscreen();
            }
        }
    };

    // Функция рендера для ImageGallery
    const renderItem = (item) => {
        return <LazyImage onClick={handleImageClick} style={{ cursor: "pointer" }} original={item.original} thumbnail={item.thumbnail}/>;
    };

    const isDesktopScreen = window?.innerWidth > 768;

    return (
        <ImageGallery
            ref={galleryRef}
            items={items || []}
            lazyLoad={true}
            renderItem={renderItem}
            showThumbnails={isDesktopScreen || isOpenGallery}
            showPlayButton={isDesktopScreen}
            showNav={isDesktopScreen}
            showFullscreenButton={true}
            onScreenChange={setOpenGallery}
        />
    );
};

export default ProductGallery;