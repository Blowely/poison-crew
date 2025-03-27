import React, { useRef } from "react";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Zoom from "react-medium-image-zoom";
import styles from "./index.module.scss";
import "react-medium-image-zoom/dist/styles.css";
import 'swiper/css';
import 'swiper/css/pagination';

const SwiperCarousel = (props) => {
    const { images, onError, lazyPreloadPrevNext, loop } = props;
    const isDesktopScreen = window.screen.availWidth > 600;
    const swiperRef = useRef(null);
    const imgRef = useRef(null);

    return (
        <Swiper
            pagination={true}
            zoom={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            style={{ width: '100%' }}
            lazyPreloadPrevNext={lazyPreloadPrevNext}
            loop={loop}
            ref={swiperRef}
        >
            {images?.map((image, index) => {
                const compressedImage = `${image}?x-oss-process=image/format,webp/resize,w_400`;
                const originalImage = image;

                return (
                    <SwiperSlide key={index} className={!isDesktopScreen ? styles.slide : ""}>
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            paddingTop: '75%', // Соотношение сторон (можно изменить по необходимости)
                            overflow: 'hidden'
                        }}>
                            {index === 0 && (
                                <img
                                    src={compressedImage}
                                    alt={`Image ${index + 1}`}
                                    loading="lazy"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        zIndex: 1,
                                        padding: '0 10vw',
                                        transition: 'opacity 0.3s ease',
                                    }}
                                />
                            )}
                            <Zoom>
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 2
                                }}>
                                    <img
                                        ref={imgRef}
                                        src={originalImage}
                                        onLoad={(e) => {
                                            if (index === 0) {
                                                e.target.style.opacity = 1;
                                                const placeholder = e.target.closest('.swiper-slide').querySelector('img:first-child');
                                                if (placeholder) placeholder.style.opacity = 0;
                                            }
                                        }}
                                        onError={onError}
                                        loading="lazy"
                                        style={{
                                            width: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain',
                                            opacity: index === 0 ? 0 : 1,
                                            transition: 'opacity 0.3s ease',
                                            padding: '0 10vw',
                                        }}
                                        alt={'Image'}
                                    />
                                </div>
                            </Zoom>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}

export default SwiperCarousel;