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
  const onLoadedIcon = () => {
    if (!loadingImg) {
      return null;
    }
    setLoadingImg(false);
  };

  const isDesktopScreen = window.screen.availWidth > 600;

  return (
    <a href={`/products/view?productId=${id}`} className={styles.card}>
      <ContentLoader
        speed={2}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        style={{ display: loading || loadingImg ? "block" : "none" }}
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

      <img
        style={{ width: "-webkit-fill-available" }}
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
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column ">
              <b style={{ fontSize: "15px", gap: "3px", display: "flex" }}>
                <b style={{ fontSize: "14px", color: "black" }}></b>
                {getPrice()} ₽
              </b>
            </div>
          </div>
        </>
      )}
    </a>
  );
}
export default Card;
