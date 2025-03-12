import React, {useRef, useState} from "react";
import {Navigation, Pagination, Zoom} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./index.module.scss"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const SwiperCarousel = (props) => {
  const {images, onLoad, onError, lazyPreloadPrevNext, loop} = props;
  const isDesktopScreen = window.screen.availWidth > 600;

    const [isZoomed, setIsZoomed] = useState(false);

    const swiperRef = useRef(null);

    const onSwiper = (swiper) => {
        swiper.on('zoomChange', (scale) => {
            const zoomed = scale > 1;
            setIsZoomed(zoomed);

            // Позволяем вертикальный скролл, но блокируем горизонтальный свайп при зуме
            swiper.allowTouchMove = !zoomed;
            swiper.allowSlideNext = !zoomed;
            swiper.allowSlidePrev = !zoomed;
        });
    };

  return (
    <Swiper
        onSwiper={onSwiper}
        pagination={true} zoom={true} navigation={true}
        modules={[Pagination, Navigation, Zoom]}
        style={{
          width:'100%',
          touchAction: isZoomed ? 'none' : 'auto',
        }}
        lazyPreloadPrevNext={lazyPreloadPrevNext} loop={loop}
        ref={swiperRef}>
    >
      {images?.map((image, index) => {
        return (
          <SwiperSlide key={index} zoom={true} modules={[Zoom]} className={!isDesktopScreen && styles.slide}>
            <img
              src={image}
              onLoad={onLoad}
              onLoadedData={onLoad}
              alt={`Image ${index + 1}`}
              onError={onError}
              loading="lazy"
              style={{width: isDesktopScreen ? '100%' : '80%',
                objectFit: isDesktopScreen ? 'contain' : 'unset'
              }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SwiperCarousel;