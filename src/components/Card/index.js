import React, { useState } from "react";

import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

function Card({
  spuId,
  onFavorite,
  title,
  images,
  price,
  onPlus,
  item,
  favorited = false,
  added = false,
  loading = false,
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [loadingImg, setLoadingImg] = useState(true);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const imgElement = React.useRef(null);

  const onClickPlus = () => {
    onPlus({ spuId, title, images, price });
  };

  const onClickFavorite = () => {
    onFavorite({ spuId, title, images, price });
    setIsFavorite(!isFavorite);
  };

  const getPrice = () => {
    if (Number(price) < 1) {
      return "--";
    }

    const str = JSON.stringify(price);
    if (!str) {
      return '--';
    }

    const subStr = str.substring(0, str?.length - 2)
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(subStr);

  };

  const onLoadedIcon = () => {
    if (!loadingImg) {
      return null;
    }
    setLoadingImg(false);
  };

  const isDesktopScreen = window.screen.availWidth > 600;

  return (
    <div className={styles.card}
         style={{aspectRatio: isDesktopScreen ? '64 / 57' : '64 / 65.5'}}
       rel="noreferrer">
      {!title && (
        <ContentLoader
          speed={0.8}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          className={styles.contentImgLoader}
        >
          <rect
            rx="10"
            ry="10"
            style={{ width: "100%", height: "100%" }}
          />
        </ContentLoader>
      )}

      {images?.[0] &&
        <>
          {loadingImg &&
            <ContentLoader
              speed={0.8}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              className={styles.contentImgLoader}
            >
              <rect
                rx="10"
                ry="10"
                style={{ width: "100%", height: "100%"}}
              />
            </ContentLoader>
          }

          <img
            ref={imgElement}
            //src={`https://image.unicorngo.ru/_next/image?url=${images?.[0]}&w=640&q=75`}
            src={images?.[0]}
            onLoad={onLoadedIcon}
            onLoadedData={onLoadedIcon}
            loading="lazy"
          />
        </>

      }


      {!loadingImg && images?.[0] && (
        <>
          <div className={styles.cardText} style={{}}>
            {title}
          </div>
          <div className={styles.price}>
            <span>{getPrice()}</span>
          </div>
        </>
      )}
    </div>
  );
}
export default Card;
