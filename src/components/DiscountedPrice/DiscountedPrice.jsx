import React from "react";
import {getPrice} from "../../common/utils";
import "./discountedPrice.scss";

const DiscountedPrice = ({discountedPrice, count, discount}) => {
    return (
        <div className="discounted-price-wrapper">
            <span style={{fontWeight: '500', color: "red"}}>{getPrice(discountedPrice * (count || 1))}</span>
            <span className="badge">-{Math.trunc((`${0}.${discount}`) * 100)}%</span>
        </div>
    )
}

export default DiscountedPrice;