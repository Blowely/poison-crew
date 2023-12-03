import React, {useEffect, useRef, useState} from "react";
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const SwiperCarousel = (props) => {
  const {images, onLoad, onError, lazyPreloadPrevNext, loop} = props;
  const isDesktopScreen = window.screen.availWidth > 600;

  return (
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper" lazyPreloadPrevNext={lazyPreloadPrevNext} loop={loop}>
      {images?.map((image, index) => {
        return (
          <SwiperSlide key={index}>
            <img
              style={{width: "inherit"}}
              src={image}
              onLoad={onLoad}
              onLoadedData={onLoad}
              alt={`Image ${index + 1}`}
              onError={onError}
              loading="lazy"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SwiperCarousel;