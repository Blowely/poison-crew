import React, { useState } from "react";

import "./Filters.scss";
import { Input } from "antd";


function Filters() {

  const isDesktopScreen = window.screen.availWidth > 600;

  return (
    <div>
      <div className="prices-wrapper">
        <div className="param-title">
          Цена, RUB
        </div>

        <div className="inputs-wrapper">
          <Input size="large" placeholder="3020" prefix="от" suffix="₽" />
          <Input size="large" placeholder="520433" prefix="до" suffix="₽" />
        </div>
      </div>

    </div>
  );
}
export default Filters;
