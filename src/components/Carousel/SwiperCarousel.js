import React, {useEffect, useRef, useState} from "react";
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const SwiperCarousel = ({images, onLoad, onError, limit}) => {
  const contentStyle = {
    margin: 0,
    //height: '460px',
    color: '#fff',
    textAlign: 'center',
    background: '#f1f1f1',
  };


  return (
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper" lazyPreloadPrevNext={limit}>
      {images?.map((image, index) => {
        return (
          <SwiperSlide key={index}>
            <h3 style={contentStyle}>
              <img
                style={{ width: '-webkit-fill-available'}}
                src={image}
                onLoad={onLoad}
                alt={`Image ${index + 1}`}
                onError={onError}
                loading="lazy"
              />
            </h3>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SwiperCarousel;