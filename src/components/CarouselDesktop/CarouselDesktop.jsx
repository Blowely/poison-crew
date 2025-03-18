import React from 'react';
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"; // ← CSS-импорт;
import "./CarouselDesktop.scss";

const ProductGallery = ({images}) => (
    <ImageGallery items={images.map(el => (
        {original: el, thumbnail: el + '?x-oss-process=image/format,webp/resize,w_500'}
    ))} />
);

export default ProductGallery;