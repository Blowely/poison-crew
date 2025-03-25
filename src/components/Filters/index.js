import React, { useState } from "react";

import "./Filters.scss";
import {Button, Divider, Input} from "antd";
import {CloseOutlined, UndoOutlined} from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { useGetBrandsQuery } from "../../store/brands.store";
import ColorSelector from "../ColorSelector/ColorSelector";
import {APPAREL_SIZES, SIZES} from "../../pages/constants";


function Filters(props) {
  const {
    search,
    brandIds,
    setShowFilters,
    sizes,
    colors,
    minPrice,
    maxPrice,
    setMaxPrice,
    setMinPrice,
    setSizes,
    setColors,
    applyFilters,
    setOffset,
    setSelectedBrands
  } = props

  const [searchParams, setSearchParams] = useSearchParams();

  const sizesParam = searchParams.get("sizes") || "";
  const minPriceParam = searchParams.get("minPrice") || "";
  const maxPriceParam = searchParams.get("maxPrice") || "";
  const colorsParam = searchParams.get("colors") || "";
  const category1Id = searchParams.get("category1Id") || "";
  const category2Id = searchParams.get("category2Id") || "";
  const category3Id = searchParams.get("category3Id") || "";

  const isSelectedCategory = !!(category1Id || category2Id || category3Id);

  const isDesktopScreen = window.screen.availWidth > 600;

  /*const buildRequest = () => {
    let obj = {
      limit: 100,
    };

    if (category3Id) {
      obj.category3Id = category3Id;
    }

    return obj;
  };

  const {
    data: brands = { items: [], totalCount: 0 },
    isLoading,
    refetch,
  } = useGetBrandsQuery(buildRequest());*/

  const onChangeChoiceHandler = (el) => {
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

    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(e.target.value)) {
      setMinPrice(e.target.value);
    }
  }

  const maxPriceHandler = (e) => {
    if (e.target.value === "") {
      searchParams.delete("maxPrice");
      setSearchParams(searchParams);
    }

    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(e.target.value)) {
      setMaxPrice(e.target.value);
    }
  }

  const getPrice = (price) => {
    return price
  }

  const clearFilters = () => {
    setMaxPrice('');
    setMinPrice('');
    setSizes([]);
    setColors([]);
    setColors([]);
    setOffset(1);
    setSelectedBrands([])
    searchParams.delete('sizes');
    searchParams.delete('minPrice');
    searchParams.delete('maxPrice');
    searchParams.delete('brandIds');
    searchParams.delete('search');
    searchParams.delete('sortBy');
    searchParams.delete('colors');
    searchParams.delete('brandIds');
    setSearchParams(searchParams);
  }

  const isFilters = !!(minPrice || maxPrice || sizes || minPriceParam || maxPriceParam || sizesParam || brandIds || search || colors);
  const queryLine = `${minPriceParam}+${maxPriceParam}+${sizesParam}+${colorsParam}`;
  const currentLine = `${minPrice}+${maxPrice}+${sizes.join(',')}+${colors?.join(',')}+${brandIds?.join(',')}`;

  const isFootwear = () => {
    if (category1Id === '29') {
      return true;
    }

    const footwear2Categories = ['35', '30', '410', '292'];
    const footwear3Categories = ['38'];

    if (footwear2Categories.includes(category2Id) || footwear3Categories.includes(category3Id)) {
      return true;
    }

    return !isSelectedCategory;
  }

  return (
    <div className="filters-component-wrapper">
      {!isDesktopScreen && (
        <div className="filters-phone-headers">
          <Button disabled={!isFilters} onClick={clearFilters}>Сбросить фильтры<UndoOutlined /></Button>
          <CloseOutlined onClick={closeClickHandler}/>
        </div>
      )}

      <div className="params-wrapper">
        <div className="params-item-wrapper">
          <div className="param-title">
            Цена, RUB
          </div>

          <div className="inputs-wrapper">
            <Input size="large" placeholder="3020" prefix="от" suffix="₽"
                   value={getPrice(minPrice || minPriceParam)} onChange={minPriceHandler}/>
            <Input size="large" placeholder="520433" prefix="до" suffix="₽"
                   value={getPrice(maxPrice || maxPriceParam)} onChange={maxPriceHandler}/>
          </div>
        </div>
        <div className="params-item-wrapper">
          <div className="param-title">
            Размеры{isFootwear() ? ", EU" : (isSelectedCategory ? null : ', EU')}
          </div>

          <div className="list">
            {isFootwear() && SIZES?.map((el, i) => (
                <div
                    className={
                      sizes?.includes(el)
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
            {!isFootwear() && APPAREL_SIZES?.map((el, i) => (
                <div
                    className={
                      sizes?.includes(el)
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
            <>
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
                      <Button disabled={!isFilters} className="btn default" type="default"
                              onClick={clearFilters}><UndoOutlined/></Button>
                    </div>
                }
              </div>
              <Divider className="divider"/>
              <div className="filters-link">
                <a href="https://storage.yandexcloud.net/pc-mediafiles/important/public-offer-re-poizon.pdf"
                   target="_blank">
                  Условия оферты
                </a>
              </div>
              <div className="filters-link">
                <a href="https://storage.yandexcloud.net/pc-mediafiles/important/privacy-policy-re-poizon.ru.pdf"
                   target="_blank">
                  Политика конфиденциальности
                </a>
              </div>
              <div className="filters-link">
                <a href="https://storage.yandexcloud.net/pc-mediafiles/important/process-personal-data-agreement-re-poizon.ru.pdf"
                   target="_blank">
                  Согласие на обработку персональных данных
                </a>
              </div>
            </>

        }
      </div>
    </div>
  );
}

export default Filters;
