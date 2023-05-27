import React from "react";

import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import {useNavigate} from "react-router-dom";

function Card({
                  id,
                  onFavorite,
                  title,
                  imageUrl,
                  price,
                  onPlus,
                  favorited = false,
                  added = false,
                  loading = false,
              }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
      onPlus({ id, title, imageUrl, price });
  };

  const onClickFavorite = () => {
      onFavorite({ id, title, imageUrl, price });
      setIsFavorite(!isFavorite);
  };

  return (
      <div className={styles.card} onClick={() => navigate(`/products/view?productId=${id}`)}>
          {loading ? (
              <ContentLoader
                  speed={2}
                  width={160}
                  height={265}
                  viewBox="0 0 160 265"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
              >
                  <rect x="1" y="0" rx="10" ry="10" width="160" height="155" />
                  <rect x="0" y="167" rx="5" ry="5" width="160" height="15" />
                  <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                  <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                  <rect x="118" y="230" rx="10" ry="10" width="32" height="32" />
              </ContentLoader>
          ) : (
              <>
                  <img style={{width: "100%", height: 'fit-content'}} src={imageUrl} alt="Sneakers" />
                  <h5>{title}</h5>
                  <div className="d-flex justify-between align-center">
                      <div className="d-flex flex-column ">
                          <span>Price:</span>
                          <b>{price} eur.</b>
                      </div>
                  </div>
              </>
          )}
      </div>
  );
}
export default Card;
