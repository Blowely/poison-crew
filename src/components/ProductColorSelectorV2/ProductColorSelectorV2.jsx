import React, {useState} from "react";
import { Card } from "antd";
import classNames from "classnames";
import "./ProductColorSelectorV2.scss";

const ProductColorSelectorV2 = ({ variants, selectedColor, onSelect }) => {
    const isDesktopScreen = window?.innerWidth > 768;
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onCardClick = (variant, index) => {
     onSelect(variant);
     setSelectedIndex(index);
    }

    return (
        <div className="product-color-selector">
            {isDesktopScreen && <h4 className="product-color-selector__title">Цвет:</h4>}
            <div className="product-color-selector__grid">
                {variants.filter(el => el.inStock).map((variant, index) => {
                    const isSelected = selectedIndex === index;
                    const img = `${variant.images?.[0]}?x-oss-process=image/format,webp/resize,w_140`;

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
