import React, {useState} from "react";

import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import {useNavigate} from "react-router-dom";
import CarouselComponent from "../Carousel/Carousel";
import SwiperCarousel from "../Carousel/SwiperCarousel";

function Card({
                  id,
                  onFavorite,
                  title,
                images,
                  price,
                  onPlus,
                  favorited = false,
                  added = false,
                  loading = false,
              }) {
    const navigate = useNavigate();
    const [loadingImg, setLoadingImg] = useState(true);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
      onPlus({ id, title, images, price });
    };

    const onClickFavorite = () => {
      onFavorite({ id, title, images, price });
      setIsFavorite(!isFavorite);
    };


    const getPrice = () => {
        if (Number(price) < 1) {
            return '--';
        }
        return Math.ceil(price * 13.3 + 1000);
    }

    const onLoadedIcon = () => {
      if (!loadingImg) {
        return null;
      }
      setLoadingImg(false)
    }

    const isDesktopScreen = window.screen.availWidth > 600;


  return (
      <a href={`/products/view?productId=${id}`} className={styles.card}>
          {loading ? (
              <ContentLoader
                  speed={2}
                  width={isDesktopScreen ? 230 : 160}
                  height={265}
                  viewBox={`0 0 ${isDesktopScreen ? 230 : 160} 265`}
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
              >
                  <rect x="1" y="0" rx="10" ry="10" width={isDesktopScreen ? "200" : "160"} height="155" />
                  <rect x="0" y="167" rx="5" ry="5" width="160" height="15" />
                  <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                  <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                  <rect x="118" y="230" rx="10" ry="10" width="32" height="32" />
              </ContentLoader>
          ) : (
              <>
                  {loadingImg &&
                    <ContentLoader
                      speed={2}
                      width={isDesktopScreen ? 230 : 160}
                      height={265}
                      viewBox={`0 0 ${isDesktopScreen ? 230 : 160} 265`}
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect x="1" y="0" rx="10" ry="10" width={isDesktopScreen ? "200" : "160"} height="155" />
                      <rect x="0" y="167" rx="5" ry="5" width="160" height="15" />
                      <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                      <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                      <rect x="118" y="230" rx="10" ry="10" width="32" height="32" />
                    </ContentLoader>
                  }
                  <div style={{opacity: loadingImg ? "0" : "1"}}>
                    <SwiperCarousel images={images} onLoad={onLoadedIcon} onError={onLoadedIcon} lazyPreloadPrevNext={1} loop={false}/>
                  </div>

                  {!loadingImg &&
                    <>
                      <div style={{fontSize: '15px', paddingTop: '10px', paddingBottom: '10px'}}>{title}</div>
                      <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column ">
                          <b style={{fontSize: '15px', gap: '3px', display: 'flex'}}>
                            <b style={{fontSize: '14px', color: 'black'}}></b>{getPrice()} ₽</b>
                        </div>
                      </div>
                    </>
                  }

              </>
          )}
      </a>
    );
}
export default Card;
