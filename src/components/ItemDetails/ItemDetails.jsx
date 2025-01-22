// ItemDetails.jsx
import React from 'react';
import './ItemDetails.scss';
import {PRODUCT_PROPERTIES} from "../../pages/constants";

const ItemDetails = ({details = []}) => {
    const [show, setShow] = React.useState(false);
    const detailItems = !show ? details.slice(0, 4) : details;

    const toggle = (e) => {
        e.preventDefault();
        setShow(!show);
    }

    return (
        <div className="item-details">
            <div className="details">
                <div className="title">СВОЙСТВА ТОВАРА</div>
                <div className="details-list">
                    {(detailItems || [])?.map((item, i) => {
                        if (item.definitionId === PRODUCT_PROPERTIES.SALE_PRICE ||
                            item.definitionId === PRODUCT_PROPERTIES.MAIN_ARTICLE_NUMBER) {
                            return null
                        }

                        if (item.definitionId === PRODUCT_PROPERTIES.APPLICABLE_SEASON &&
                            item.translatedValue.length === 4) {
                            return (<div className="detail">
                                <span className="label">{item.translatedKey}</span>
                                <span className="value">Все сезоны</span>
                            </div>)
                        }

                        return (<div className="detail">
                            <span className="label">{item.translatedKey}</span>
                            <span className="value">{item.translatedValue?.map((el,i) => {
                                if (i === item.translatedValue.length - 1) {
                                    return (el);
                                }
                                return `${el}, `;
                            })}</span>
                        </div>)
                    })}
                </div>
                <a href="#" onClick={toggle} className="view-more">{!show ? 'Показать все' : 'Скрыть'}</a>
            </div>
        </div>
    );
};

export default ItemDetails;