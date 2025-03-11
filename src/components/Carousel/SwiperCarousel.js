import React, {useRef} from "react";
import {Navigation, Pagination, Zoom} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./index.module.scss"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const SwiperCarousel = (props) => {
  const {images, onLoad, onError, lazyPreloadPrevNext, loop} = props;
  const isDesktopScreen = window.screen.availWidth > 600;

  const swiperRef = useRef(null);

    const onSwiper = (swiper) => {
        swiper.on('zoomChange', (scale) => {
            swiper.allowTouchMove = scale === 1; // Блокируем свайп при увеличении
            swiper.allowSlideNext = scale === 1;
            swiper.allowSlidePrev = scale === 1;
        });
    };

  return (
    <Swiper
        onSwiper={onSwiper}
        pagination={true} zoom={true} navigation={true}
        modules={[Pagination, Navigation, Zoom]}
        style={{
          width:'100%',
          touchAction: 'none'
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