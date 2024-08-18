import React, { useState } from "react";

import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

function Card({
  title,
  clearTitle,
  images,
  price,
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

    const subStr = str.substring(0, str?.length - 2)
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(subStr);

  };

  const onLoadedIcon = () => {
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
            src={`${images?.[0]}?x-oss-process=image/format,webp/resize,w_600`}
            onLoad={onLoadedIcon}
            loading="lazy"
          />
        </>

      }


      {!loadingImg && images?.[0] && (
        <>
          <div className={styles.cardText} style={{}}>
            {clearTitle || title}
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
