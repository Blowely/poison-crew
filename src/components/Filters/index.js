import React, { useEffect, useState } from "react";

import "./Filters.scss";
import {Button, Input, Select} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { useGetBrandsQuery } from "../../store/brands.store";
import ImgList from "./ImgList/ImgList";
import {SORT_OPTIONS, SORT_TYPES} from "../../pages/constants";
import ColorSelector from "../ColorSelector/ColorSelector";


function Filters(props) {
  const {
    search,
    brandId,
    setShowFilters,
    size,
    sort,
    colors,
    minPrice,
    maxPrice,
    categoryId,
    setMaxPrice,
    setMinPrice,
    setSize,
    setColors,
    applyFilters,
    setSort,
    selectedBrands,
    setSelectedBrands,
    setLoading,
    setOffset,
  } = props

  const [searchParams, setSearchParams] = useSearchParams();

  const [choice, setChoice] = useState(null);
  const [sizes, setSizes] = useState([]);

  const sizeParam = searchParams.get("size") || "";
  const minPriceParam = searchParams.get("minPrice") || "";
  const maxPriceParam = searchParams.get("maxPrice") || "";
  const sortBy = searchParams.get("sortBy");

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
    setSize("");
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
    setSize('');
    setChoice(null);
    searchParams.delete('size');
    searchParams.delete('minPrice');
    searchParams.delete('maxPrice');
    searchParams.delete('brandId');
    searchParams.delete('search');
    searchParams.delete('sortBy');
    setSearchParams(searchParams);
  }

  const isFilters = !!(minPrice || maxPrice || size || minPriceParam || maxPriceParam || sizeParam || choice || brandId || search || sort);

  const queryLine = `${minPriceParam}+${maxPriceParam}+${sizeParam}`;
  const currentLine = `${minPrice}+${maxPrice}+${size}`;

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
