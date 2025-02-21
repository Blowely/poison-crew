import React, { useState } from "react";

import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import IconHeart from "../../assets/svg/iconHeart";

function Card({
  image,
  price,
  name,
  item,
}) {

  const [loadingImg, setLoadingImg] = useState(true);
  const imgElement = React.useRef(null);

  const getPrice = () => {
    if (Number(price) < 1) {
      return "--";
    }

    const str = JSON.stringify(price);
    if (!str) {
      return '--';
    }

    //const subStr = str.substring(0, str?.length - 2)
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(str);

  };

  const onLoadedIcon = () => {
    setLoadingImg(false);
  };

  const onFavoriteIconClick = (spuId) => {
    const icon = document.getElementsByClassName('tabler-icon-heart')[0];
    if (!icon) return;

    const prevFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const isFavorite = icon.style.fill === 'rgb(162, 162, 162)';

    if (isFavorite) {
      const updatedFavorites = prevFavorites.filter((el) => el?.spuId !== spuId);
      icon.style.fill = "none";
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      icon.style.fill = '#a2a2a2';
      localStorage.setItem("favorites", JSON.stringify([...prevFavorites, item]));
    }
  };

  const isDesktopScreen = window.screen.availWidth > 600;

  return (
    <div className={styles.card}
         style={{aspectRatio: isDesktopScreen ? '64 / 57' : '64 / 65.5'}}
       rel="noreferrer">
      {!name && (
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

      {image &&
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
                      style={{width: "100%", height: "100%"}}
                  />
                </ContentLoader>
            }

            <div className="link-btn favorite-btn" onClick={onFavoriteIconClick}>
              <IconHeart/>
            </div>

            <img
                ref={imgElement}
                src={`${image}?x-oss-process=image/format,webp/resize,w_500`}
                //src={`${image}`}
                onLoad={onLoadedIcon}
                loading="lazy"
            />
          </>

      }


      {!loadingImg && image && (
          <>
            <div className={styles.cardText} style={{}}>
              {name}
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
