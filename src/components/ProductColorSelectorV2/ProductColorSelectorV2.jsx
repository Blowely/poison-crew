import React, {useState} from "react";
import { Card } from "antd";
import classNames from "classnames";
import "./ProductColorSelectorV2.scss";

const ProductColorSelectorV2 = ({ variants, selectedVariation, onSelect }) => {
    const isDesktopScreen = window?.innerWidth > 768;
    const [selectedIndex, setSelectedIndex] = useState(null);


    const onCardClick = (variant, index) => {
         onSelect(variant);
         setSelectedIndex(index);
    }

    return (
        <div className="product-color-selector">
            {isDesktopScreen && <div className="product-color-selector__title">Цвет</div>}
            <div className="product-color-selector__grid">
                {variants.filter(el => el.inStock).map((variant, index) => {
                    const selectedIndexParam = selectedVariation?.color === variant?.color ? index : null;

                    const isSelected = selectedIndexParam === index;
                    const img = `${variant.images?.[0]}?x-oss-process=image/format,webp/resize,w_110`;

                    if (!isDesktopScreen) {
                        return (<div
                                    key={index}
                                    onClick={() => onCardClick(variant,index)}
                                    className={classNames("product-color-selector__card", {
                                    "product-color-selector__card--selected": isSelected,
                                    "product-color-selector__card--disabled": !variant.inStock,
                                    })}
                                >
                                    <img src={img} alt={variant.color} />
                                </div>
                        )
                    }
                    console.log('isSelected',isSelected)
                    return (
                        <Card
                            key={index}
                            hoverable={!isSelected}
                            onClick={() => onCardClick(variant,index)}
                            className={classNames("product-color-selector__card", {
                                "product-color-selector__card--selected": isSelected,
                                "product-color-selector__card--disabled": !variant.inStock,
                                "ant-card-body--disabled": !variant.color,
                            })}
                            cover={<img src={img} alt={variant.color} />}
                        >
                            {isDesktopScreen && variant.color && <div className="product-color-selector__label">{variant.color}</div>}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductColorSelectorV2;
