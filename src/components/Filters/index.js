import React, { useEffect, useState } from "react";

import "./Filters.scss";
import { Input } from "antd";


function Filters() {
  const [choice, setChoice] = useState({});
  const [sizes, setSizes] = useState([]);

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
    console.log('el=',el);
    setChoice(el);
  };

  return (
    <div className="params-wrapper">
      <div className="params-item-wrapper">
        <div className="param-title">
          Цена, RUB
        </div>

        <div className="inputs-wrapper">
          <Input size="large" placeholder="3020" prefix="от" suffix="₽" />
          <Input size="large" placeholder="520433" prefix="до" suffix="₽" />
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
                el === choice
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
  );
}
export default Filters;
