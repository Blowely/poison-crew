import React, { useState } from "react";

import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import { useNavigate } from "react-router-dom";

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
  const imgElement = React.useRef(null);

  const onClickPlus = () => {
    onPlus({ id, title, images, price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, images, price });
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
    <a href={`/products/view?productId=${id}`} className={styles.card}>
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
        style={{ width: `${isSquare ? '64%' : "-webkit-fill-available"}` }}
        ref={imgElement}
        src={images?.[0]}
        onLoad={onLoadedIcon}
        onLoadedData={onLoadedIcon}
        loading="lazy"
        onError={() => (this.src = images?.[0])}
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
