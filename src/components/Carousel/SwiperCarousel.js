import React, {useEffect, useRef, useState} from "react";
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./index.module.scss"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const SwiperCarousel = (props) => {
  const {images, onLoad, onError, lazyPreloadPrevNext, loop} = props;
  const isDesktopScreen = window.screen.availWidth > 600;

  return (
    <Swiper pagination={true} modules={[Pagination]} style={{width:'100%'}}
            lazyPreloadPrevNext={lazyPreloadPrevNext} loop={loop}>
      {images?.map((image, index) => {
        return (
          <SwiperSlide key={index} className={!isDesktopScreen && styles.slide}>
            <img
              src={image}
              onLoad={onLoad}
              onLoadedData={onLoad}
              alt={`Image ${index + 1}`}
              onError={onError}
              loading="lazy"
              style={{width: isDesktopScreen ? '100%' : '80%'}}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SwiperCarousel;