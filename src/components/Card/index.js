import React from "react";

import AppContext from "../../context";

import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";

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
    const { isItemAdded } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    console.log(title, isItemAdded(id));

    const onClickPlus = () => {
        onPlus({ id, title, imageUrl, price });
    };

    const onClickFavorite = () => {
        onFavorite({ id, title, imageUrl, price });
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>
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
                    <div className={styles.favorite} onClick={onClickFavorite}>
                        <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} />
                    </div>
                    <img width={133} height={112} src={imageUrl} alt="Sneakers" />
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column ">
                            <span>Price:</span>
                            <b>{price} eur.</b>
                        </div>
                        <img
                            className={styles.plus}
                            onClick={onClickPlus}
                            src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/plus.svg"}
                            alt="Plus"
                        />
                    </div>
                </>
            )}
        </div>
    );
}
export default Card;
