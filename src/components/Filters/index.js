import React, { useEffect, useState } from "react";

import "./Filters.scss";
import { Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";


function Filters(props) {
  const {
    setShowFilters,
    size,
    minPrice,
    maxPrice,
    setMaxPrice,
    setMinPrice,
    setSize,
    setCloseFilters
  } = props

  const [searchParams, setSearchParams] = useSearchParams();

  const [choice, setChoice] = useState(null);
  const [sizes, setSizes] = useState([]);

  const sizeParam = searchParams.get("size") || "";
  const minPriceParam = searchParams.get("minPrice") || "";
  const maxPriceParam = searchParams.get("maxPrice") || "";

  const isDesktopScreen = window.screen.availWidth > 600;

  useEffect(() => {
    if (!sizes?.length) {
      const euSizes = []
      for (let i = 36; i <= 52.5; i+=0.5) {
        euSizes.push(i);
      }
      setSizes(euSizes)
    }
  },[sizes?.length])

  const onChangeChoiceHandler = (el) => {
    setChoice(el);
    setSize(el.toString());
  };

  const closeClickHandler = () => {
    setShowFilters(false);
    setCloseFilters(true);
    setSize("");
    setMinPrice("");
    setMaxPrice("");
  }

  const minPriceHandler = (e) => {
    setMinPrice(`${e.target.value}00`);
  }

  const maxPriceHandler = (e) => {
    setMaxPrice(`${e.target.value}99`);
  }

  const getPrice = (price) => {
    return price.substring(0, price.length - 2)
  }

  return (
    <div className="filters-component-wrapper">
      {!isDesktopScreen && (
        <div className="filters-phone-headers">
          <CloseOutlined onClick={closeClickHandler}/>
        </div>
      )}

      <div className="params-wrapper">

        <div className="params-item-wrapper">
          <div className="param-title">
            Цена, RUB
          </div>

          <div className="inputs-wrapper">
            <Input size="large" placeholder="3020" prefix="от" suffix="₽" type="number"
                   value={getPrice(minPrice || minPriceParam)} onChange={minPriceHandler} />
            <Input size="large" placeholder="520433" prefix="до" suffix="₽"
                   value={getPrice(maxPrice || maxPriceParam)} onChange={maxPriceHandler}/>
          </div>
        </div>
        <div className="params-item-wrapper">
          <div className="param-title">
            Размеры, EU
          </div>

          <div className="list">
            {sizes?.map((el, i) => (
              <div
                className={
                  el === (choice || Number(sizeParam))
                    ? "size-wrapper gap-2 selected"
                    : "size-wrapper gap-2"
                }
                onClick={() => onChangeChoiceHandler(el)}
                key={i}
                role="presentation"
              >
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    textAlign: "center",
                  }}
                >
                  {el}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Filters;
