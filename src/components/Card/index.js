import React, { useState } from "react";

import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import { useNavigate, useSearchParams } from "react-router-dom";

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


  const onCardClickHandler = (spuId) => {
    /*searchParams.set('spuId', spuId);
    setSearchParams(searchParams);*/
    localStorage.setItem('product', JSON.stringify(item));
  }

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
    return Math.ceil(price / 100);
  };

  const isSquare = imgElement?.current?.naturalHeight === imgElement?.current?.naturalWidth;

  const onLoadedIcon = () => {
    if (!loadingImg) {
      return null;
    }
    setLoadingImg(false);
  };

  const isDesktopScreen = window.screen.availWidth > 600;

  return (
    <a href={`/products?spuId=${spuId}`} className={styles.card} onClick={() => onCardClickHandler(spuId)} rel="noreferrer">
      {!title && (
          <ContentLoader
          speed={2}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          className={styles.contentLoader}
        >
          <rect
            x="1"
            y="0"
            rx="10"
            ry="10"
            style={{ width: "100%", height: "100%" }}
          />
        </ContentLoader>
      )}

      <img
        style={{ width: `${isSquare ? '64%' : "100%"}`}}
        ref={imgElement}
        src={images?.[0]}
        onLoad={onLoadedIcon}
        onLoadedData={onLoadedIcon}
        loading="lazy"
      />

      {!loadingImg && (
        <>
          <div className={styles.cardText} style={{}}>
            {title}
          </div>
          <div className={styles.price}>
            <span>{getPrice()} ₽</span>
          </div>
        </>
      )}
    </a>
  );
}
export default Card;
