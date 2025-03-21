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

    const hideControls = () => {
        const productInfo = document.getElementsByClassName('product-info-phone-wrapper')[0];
        const linkBtns = document.getElementsByClassName('link-btn');
        const goBackBtn = document.getElementsByClassName('go-back-btn')[0];
        const footer = document.getElementsByClassName('footer-btn-wrapper')[0];
        console.log('linkBtns =',linkBtns);
        console.log('productInfo=',productInfo)
        productInfo.style.display = 'none';
        linkBtns[0].style.display = 'none';
        linkBtns[1].style.display = 'none';
        goBackBtn.style.display = 'none';
        footer.style.display = 'none';
    }

    const handleImageClick = () => {
        if (galleryRef.current) {
            hideControls()
            galleryRef?.current?.fullScreen(); // Включаем полноэкранный режим
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
            useBrowserFullscreen={true}
            showNav={isDesktopScreen}
            showFullscreenButton={true}
            onScreenChange={setOpenGallery}
        />
    );
};

export default ProductGallery;