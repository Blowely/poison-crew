import React, {useRef} from "react";
import {Navigation, Pagination, Zoom} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./index.module.scss"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const SwiperCarousel = (props) => {
  const {images, onError, lazyPreloadPrevNext, loop} = props;
  const isDesktopScreen = window.screen.availWidth > 600;

    const swiperRef = useRef(null);

    /*const onSwiper = (swiper) => {
        swiper.on('zoomChange', (scale) => {
            const zoomed = scale > 1;
            isZoomedRef.current = !!zoomed;
        });
    };*/

  return (
      <Swiper
          pagination={true}
          zoom={true}
          navigation={true}
          modules={[Pagination, Navigation, Zoom]}
          style={{ width: '100%' }}
          lazyPreloadPrevNext={lazyPreloadPrevNext}
          loop={loop}
          ref={swiperRef}
      >
          {images?.map((image, index) => {
              const compressedImage = `${image}?x-oss-process=image/format,webp/resize,w_500`;
              const originalImage = image;

              return (
                  <SwiperSlide key={index} zoom={true} modules={[Zoom]} className={!isDesktopScreen && styles.slide}>
                      {index === 0 &&
                          <img
                              src={compressedImage}
                              alt={`Image ${index + 1}`}
                              loading="lazy"
                              style={{
                                  width: isDesktopScreen ? '100%' : '80%',
                                  objectFit: isDesktopScreen ? 'contain' : 'unset',
                                  position: 'absolute', // Абсолютное позиционирование для placeholder
                                  zIndex: 1, // Ниже оригинального изображения
                              }}
                          />
                      }
                      <Zoom>
                          <img
                              src={originalImage}
                              onLoad={(e) => {
                                  // Когда оригинальное изображение загрузится, скрываем placeholder
                                  e.target.style.opacity = 1;
                                  const placeholder = e.target.previousElementSibling;
                                  if (placeholder) placeholder.style.opacity = 0;
                              }}
                              onError={onError}
                              loading="lazy"
                              style={{
                                  width: isDesktopScreen ? '100%' : '80%',
                                  objectFit: isDesktopScreen ? 'contain' : 'unset',
                                  opacity: 0, // Сначала скрыто
                                  position: 'absolute', // Относительное позиционирование
                                  zIndex: 2, // Выше placeholder
                              }}
                          />
                      </Zoom>

                  </SwiperSlide>
              );
          })}
      </Swiper>
  );
}

export default SwiperCarousel;