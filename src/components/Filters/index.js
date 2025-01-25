import React, { useState } from "react";

import "./Filters.scss";
import {Button, Input} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { useGetBrandsQuery } from "../../store/brands.store";
import ColorSelector from "../ColorSelector/ColorSelector";
import {SIZES} from "../../pages/constants";


function Filters(props) {
  const {
    search,
    brandId,
    setShowFilters,
    sizes,
    colors,
    minPrice,
    maxPrice,
    categoryId,
    setMaxPrice,
    setMinPrice,
    setSizes,
    setColors,
    applyFilters,
    selectedBrands,
    setSelectedBrands,
    setLoading,
    setOffset,
  } = props

  const [searchParams, setSearchParams] = useSearchParams();

  const sizesParam = searchParams.get("sizes") || "";
  const minPriceParam = searchParams.get("minPrice") || "";
  const maxPriceParam = searchParams.get("maxPrice") || "";
  const colorsParam = searchParams.get("colors") || "";

  const [choices, setChoices] = useState(sizes);

  const isDesktopScreen = window.screen.availWidth > 600;

  const buildRequest = () => {
    let obj = {
      limit: 100,
    };

    if (categoryId) {
      obj.categoryId = categoryId;
    }

    return obj;
  };

  const {
    data: brands = { items: [], totalCount: 0 },
    isLoading,
    refetch,
  } = useGetBrandsQuery(buildRequest());

  const onChangeChoiceHandler = (el) => {
    setChoices((prev) => prev.includes(el)
        ? prev.filter((c) => c !== el)
        : [...prev, el]);
    setSizes((prev) => prev.includes(el)
        ? prev.filter((c) => c !== el)
        : [...prev, el]);
  };

  const closeClickHandler = () => {
    setShowFilters(false);
    setSizes([]);
    setMinPrice("");
    setMaxPrice("");
  }

  const minPriceHandler = (e) => {
    if (e.target.value === "") {
      searchParams.delete("minPrice");
      setSearchParams(searchParams);
    }

    setMinPrice(e.target.value);
  }

  const maxPriceHandler = (e) => {
    if (e.target.value === "") {
      searchParams.delete("maxPrice");
      setSearchParams(searchParams);
    }

    setMaxPrice(e.target.value);
  }

  const getPrice = (price) => {
    return price
  }

  const clearFilters = () => {
    setMaxPrice('');
    setMinPrice('');
    setSizes([]);
    setColors([]);
    setChoices([]);
    setOffset(1);
    searchParams.delete('sizes');
    searchParams.delete('minPrice');
    searchParams.delete('maxPrice');
    searchParams.delete('brandId');
    searchParams.delete('search');
    searchParams.delete('sortBy');
    searchParams.delete('colors');
    setSearchParams(searchParams);
  }

  const isFilters = !!(minPrice || maxPrice || sizes || minPriceParam || maxPriceParam || sizesParam || choices || brandId || search || colors);
  const queryLine = `${minPriceParam}+${maxPriceParam}+${sizesParam}+${colorsParam}`;
  const currentLine = `${minPrice}+${maxPrice}+${sizes.join(',')}+${colors?.join(',')}`;

  return (
    <div className="filters-component-wrapper">
      {!isDesktopScreen && (
        <div className="filters-phone-headers">
          <Button disabled={!isFilters} onClick={clearFilters}>Сбросить фильтры<CloseOutlined /></Button>
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
                   value={getPrice(minPrice || minPriceParam)} onChange={minPriceHandler}/>
            <Input size="large" placeholder="520433" prefix="до" suffix="₽"
                   value={getPrice(maxPrice || maxPriceParam)} onChange={maxPriceHandler}/>
          </div>
        </div>
        <div className="params-item-wrapper">
          <div className="param-title">
            Размеры, EU
          </div>

          <div className="list">
            {SIZES?.map((el, i) => (
                <div
                    className={
                      choices?.includes(el)
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
        <div className="params-item-wrapper">
          <div className="param-title">
            Цвет
          </div>

          <div className="inputs-wrapper">
            <ColorSelector colors={colors} setColors={setColors} />
          </div>
        </div>
        {/*<div className="params-item-wrapper">
          <div className="param-title">
            Бренды
          </div>

          <ImgList data={brands?.items} setLoading={setLoading}
                   setOffset={setOffset} setSelectedBrands={setSelectedBrands}/>
        </div>*/}
        {isDesktopScreen &&
            <div className="filters-apply-btn">
              <Button
                  type="primary"
                  className={"btn default"}
                  onClick={applyFilters}
                  disabled={queryLine === currentLine}
              >
                <span>Применить</span>
              </Button>
              {isFilters &&
                  <div className="filters-phone-headers">
                    <Button disabled={!isFilters} onClick={clearFilters}>Сбросить фильтры</Button>
                  </div>
              }
            </div>
        }
      </div>
    </div>
  );
}

export default Filters;
