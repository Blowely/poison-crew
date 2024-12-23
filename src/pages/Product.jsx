import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import {useGetPriceMutation, useGetProductQuery, useParseProductQuery} from "../store/products.store";
import "./product.scss";
import { LeftOutlined, LinkOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../store";
import { addToCart } from "../common/cartSlice";
import SwiperCarousel from "../components/Carousel/SwiperCarousel";
import { useTimer } from "use-timer";
import RePoizonMainLogo from "../assets/svg/re-poizon-main-logo";
import MeasureTable from "../components/MeasureTable/MeasureTable";
import {getCheapestElOfSize, getCheapestPriceOfSize, getIntPrice, keepNumbersAndSpecialChars} from "../common/utils";
import { usSizeConversionTable } from "./constants";

function Product({ selectedProduct, onAddToFavorite, isLoading }) {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCodeModalOpen, setCodeModalOpen] = useState(false);
  const [choice, setChoice] = useState({});
  const [measureOpen, setMeasureOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [isDisabledBuyBtn, setDisabledBuyBtn] = useState(false);
  const [product, setProduct] = useState(selectedProduct);
  const [lvl2Properties, setLvl2Properties] = useState([]);
  const [availableLvl1Properties, setAvailableLvl1Properties] = useState({});
  const [availableLvl2Properties, setAvailableLvl2Properties] = useState({});
  const [sizesAndPrices, setSizesAndPrices] = useState([]);

  const spuId = searchParams.get("spuId");
  const url = searchParams.get("url");
  const sizeParam = searchParams.get("size");

  const token = localStorage.getItem("token");
  const prevUpdatedAtRef = useRef(null);

  /*useParseProductQuery({
    url,
    token,
  }, {skip: !spuId});*/

  const isLoadingProduct = false;

  let { data: remoteProduct } = useGetProductQuery(
    {
      url,
      token,
    },
    { skip: !url },
  );

  const [getPrice] = useGetPriceMutation();

  const { time, start, pause, reset, status } = useTimer({
    //initialTime: 13,
    initialTime: 0,
    endTime: 0,
    timerType: 'DECREMENTAL',
  });


  useEffect(() => {
    //const defaultPrice = selectedProduct
    let currentProduct = selectedProduct;
    // Исходные данные
    const data = currentProduct;

// Создаем маппинг propertyValueId -> название размера
    const sizeMap = {};
    data.saleProperties.list.forEach((property) => {
      if (property.name === "尺碼" && property.propertyValueId) {
        sizeMap[property.propertyValueId] = property.value;
      }
    });

// Маппинг SKU -> итоговая структура
    const mappedSkus = data.skus.map((sku) => {
      // Проверяем наличие свойства "properties"
      const sizeProperty = sku.properties?.find(
          (prop) => sizeMap[prop.propertyValueId]
      );

      return {
        skuId: sku.skuId,           // ID параметра (размера)
        spuId: sku.spuId,           // ID товара
        propertyValueId: sizeProperty?.propertyValueId || null, // Значение propertyValueId
        size: sizeProperty ? sizeMap[sizeProperty.propertyValueId] : null // Название размера
      };
    });

    console.log(mappedSkus);

// Пример псевдокода для обращения к бэку и добавления цены к структуре
    async function fetchSkuPrices(skus) {
      const prices = await Promise.all(
          skus.map(async (sku) => {
            try {
              // Псевдозапрос к бэку для получения цены
              const response = await getPrice(sku.skuId).unwrap();

              if (!response?.spuId) throw new Error(`Error fetching price for skuId ${sku.skuId}`);
              const {detail} = response;
              console.log('response',response);
              return { ...sku, price: detail.data.verticals[detail.data.verticals.length - 1] };
            } catch (error) {
              console.error(error);
              return { ...sku, price: null }; // Если произошла ошибка, цена будет null
            }
          })
      );
      return prices;
    }

// Использование
    fetchSkuPrices(mappedSkus.slice(0,3)).then((result) => {
      console.log("Итоговая структура с ценами:", result);
      setSizesAndPrices(result);

      const {size, price, index} = getCheapestElOfSize(result);
      setChoice({ size, price, index });
    });


    if (!prevUpdatedAtRef.current) {
      start();
      prevUpdatedAtRef.current = currentProduct?.updatedAt;
    } else if (prevUpdatedAtRef.current !== currentProduct?.updatedAt) {
      prevUpdatedAtRef.current = currentProduct?.updatedAt;
      //setDisabledBuyBtn(false);
    }
  }, [selectedProduct, remoteProduct]);

  useEffect(() => {
    if (!lvl2Properties) {
      return;
    }

    const tempAvailableSizesBy1lvlProps = {};

    /*lvl2Properties?.map((sku) => {
      if (!sku.properties[-2]) {
        return;
      }
      const lvl1Prop = sku.properties[-2];
      tempAvailableSizesBy1lvlProps[lvl1Prop.propertyValueId] = sku.properties[-1];
    })*/

  },[lvl2Properties])

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const onAddToCart = () => {
    if (!choice?.price) {
      return;
    }

    dispatch(
      addToCart({ ...product, size: choice?.size, price: choice?.price }),
    );
    navigate("/cart");
  };

  const onChangeChoiceHandler = (el, i) => {
    if (!el.price) {
      return;
    }

    if (!el?.size) {
      return;
    }

    const price = el?.price;

    setChoice({ size: el.size.value, price, index: i });
  };

  const getTitlePrice = (price) => {
    if (!price) {
      return "--";
    }

    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price * 102);
  };

  const getBtnPrice = useCallback((price) => {
    if (!price) {
      return "--";
    }

    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price * 102);

  },[choice, isDisabledBuyBtn, time]);

  const onMeasureOpenClick = () => {
    setMeasureOpen(true);
  };

  const onLoadCarousel = () => {
    if (!isLoadingImages) {
      return null;
    }
    setIsLoadingImages(false);
  };

  const getClearTitle = (str) => {
    return str?.replace(/[^a-zA-Z\s]/g, '');
  }

  const showPropertyValue = (value, showValue) => {
    if (!showValue) {
      return '';
    }

    if (value?.includes('宽')) {
      return value.replace('宽', ' ширина');
    }

    return value;
  }

  const isDesktopScreen = window?.innerWidth > 768;

  console.log(sizesAndPrices);

  return (
    <div style={{height: '100%'}}>
      {/*{!token && (
        <AuthModal
          open={isModalOpen}
          setRemotePhone={setPhone}
          setModalOpen={setModalOpen}
          onCancel={() => {
            setModalOpen(false);
            setCodeModalOpen(false);
          }}
          isCodeModalOpen={isCodeModalOpen}
          setCodeModalOpen={setCodeModalOpen}
        />
      )}*/}
      {measureOpen && (
        <Modal
          title="Таблица размеров"
          open={measureOpen}
          onOk={() => {
            setMeasureOpen(false);
          }}
          centered={!isDesktopScreen}
          onCancel={() => {
            setMeasureOpen(false);
          }}
        >
          <div
            style={{
              display: "grid",
              padding: "15px",
              borderBottom: "1px solid #ececec",
              gap: "15px",
            }}
          >
            <div style={{ fontSize: "22px", fontWeight: "500" }}>
              Таблица размеров
            </div>
            <MeasureTable />
          </div>
        </Modal>
      )}
      {isLoadingProduct && (
        <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
          <LoadingOutlined style={{fontSize: '24px'}} spin />
        </div>)
      }
      {isDesktopScreen &&
        <div className="main-logo-wrapper">
          <div
            className="main-logo-line black main-logo-line-left"
            style={{
              width: "calc((100vw - 226px - 40px) / 2 )"
            }}
          />
          {<RePoizonMainLogo />}

          <div
            className="main-logo-line black main-logo-line-right"
            style={{
              width: "calc((100vw - 226px - 40px) / 2 )"
            }}
          />
        </div>
      }

      {!isLoadingProduct && (
        <div style={{height: '100%'}}>
          <LeftOutlined
            className="go-back-btn"
            onClick={() => window.history.go(-1)}
          />
          <LinkOutlined
            className="link-btn"
            onClick={() => window.history.go(-1)}
          />


          <div className={'layout-wrapper'} style={{padding: isDesktopScreen ? '0 20px 0 20px' : '0'}}>
            <div className={"content-wrapper"} style={{flexDirection: isDesktopScreen ? 'row' : 'column'}}>
              <div className={"carousel-wrapper"} style={{
                maxWidth: isDesktopScreen ? 'calc(50% - 24px / 2)' : 'none',
                marginTop: isDesktopScreen ? '40px' : '0'
              }}>
                <SwiperCarousel
                  style={{width: '100%'}}
                  images={product?.spuImage?.images?.map(el => el?.url) || [product?.image]}
                  onLoad={onLoadCarousel}
                  onError={onLoadCarousel}
                />
              </div>

              <div className={isDesktopScreen ? 'product-info-wrapper' : 'product-info-phone-wrapper'}>
                <div className="product-info__item standart">
                  {!isDesktopScreen &&
                    <div  className="title">
                      {getIntPrice(choice?.price)}
                    </div>
                  }
                  <div className="title-wrapper">
                    <span className="standart" style={{minHeight: '24px'}}>
                      {product?.detail?.title}
                    </span>
                    {isDesktopScreen &&
                      <div  className="title">
                        {getIntPrice(choice?.price)}
                      </div>
                    }
                  </div>

                </div>
                {(!isDesktopScreen && !!(Object.keys(lvl2Properties)?.length)) &&
                  <div className="product-info__item standart">
                    <div className="label">
                      <div className="label_wrap">
                        <div className="size_label">
                          <div>Версия</div>
                        </div>
                      </div>
                    </div>
                    <div className="list">
                      {Object.keys(lvl2Properties)?.map((key, i) => (
                        <div
                          className={
                            i === choice.index
                              ? "size-wrapper gap-2 selected"
                              : "size-wrapper gap-2"
                          }
                          onClick={() => onChangeChoiceHandler(lvl2Properties[key], i)}
                          key={i}
                          role="presentation"
                        >
                          <div
                            style={{
                              fontSize: "17px",
                              fontWeight: "600",
                              textAlign: "center",
                            }}
                          >
                            {showPropertyValue(lvl2Properties[key].value, lvl2Properties[key]?.showValue)}
                          </div>
                        </div>
                      )).filter(el => el)}
                    </div>
                  </div>
                }

                {!isDesktopScreen &&
                  <div className="product-info__item standart">
                    <div className="label">
                      <div className="label_wrap">
                        <div className="size_label">
                          <div>Размер: EU</div>
                        </div>
                      </div>
                      <div className="size_guide" onClick={onMeasureOpenClick}>
                        Таблица размеров
                        <img className="PoizonImage_img__BNSaU"
                             src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg" alt="" />
                      </div>
                    </div>
                    <div className="list">
                      {sizesAndPrices?.map((el, i) => (
                        <div
                          className={
                            i === choice.index
                              ? "size-wrapper gap-2 selected"
                              : "size-wrapper gap-2"
                          }
                          onClick={() => onChangeChoiceHandler(el, i)}
                          key={i}
                          role="presentation"
                        >
                          <div
                            style={{
                              fontSize: "17px",
                              fontWeight: "600",
                              textAlign: "center",
                            }}
                          >
                            {el?.size}
                          </div>
                          <div
                            style={{
                              fontSize: "13px",
                              textAlign: "center",
                              display: "flex",
                              gap: "1.5px",
                              justifyContent: "center",
                            }}
                          >
                            {getTitlePrice(el.price) || "--"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }

                <div className="product-info__item poizon_auth">
                  <img className="product-info__item poizon_auth pzn_img"
                       src="https://cdn-img.poizonapp.com/node-common/e9004fdc-f3f9-1e94-d275-0965f2da9ee4-192-117.png?x-oss-process=image/format,webp/resize,w_100"
                       alt="100% authenticated" />
                  <div className="sm_divider">|</div>
                  <div className="product-info__item poizon_auth main-txt">ВЕРЕФИЦИРОВАНО ЭКСПЕРТАМИ</div>
                  <div className="product-info__item poizon_auth second-txt">5-шаговая аутентификация</div>
                  <div>
                    <img className="PoizonImage_img__BNSaU"
                         src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg" alt="" />
                  </div>
                </div>

                {(isDesktopScreen && !!(Object.keys(lvl2Properties)?.length)) &&
                  <div className="product-info__item">
                    <div className="label">
                      <div className="label_wrap">
                        <div className="size_label">
                          <div>Версия</div>
                        </div>
                      </div>
                      <div className="size_guide" onClick={onMeasureOpenClick}>
                        Таблица размеров
                        <img className="PoizonImage_img__BNSaU"
                             src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg" alt="" />
                      </div>
                    </div>
                    <div className="list">
                      {Object.keys(lvl2Properties)?.map((key, i) => (
                        <div
                          className={
                            i === choice.index
                              ? "size-wrapper gap-2 selected"
                              : "size-wrapper gap-2"
                          }
                          onClick={() => onChangeChoiceHandler(lvl2Properties[key], i)}
                          key={i}
                          role="presentation"
                        >
                          <div
                            style={{
                              fontSize: "17px",
                              fontWeight: "600",
                              textAlign: "center",
                            }}
                          >
                            {showPropertyValue(lvl2Properties[key].value, lvl2Properties[key]?.showValue)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }

                {isDesktopScreen &&
                  <div className="product-info__item">
                    <div className="label">
                      <div className="label_wrap">
                        <div className="size_label">
                          <div>Размер: EU</div>
                        </div>
                      </div>
                      <div className="size_guide" onClick={onMeasureOpenClick}>
                        Таблица размеров
                        <img className="PoizonImage_img__BNSaU"
                             src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg" alt="" />
                      </div>
                    </div>
                    <div className="list">
                      {sizesAndPrices?.map((el, i) => (
                          <div
                            className={
                              i === choice.index
                                ? "size-wrapper gap-2 selected"
                                : "size-wrapper gap-2"
                            }
                            onClick={() => onChangeChoiceHandler(el, i)}
                            key={i}
                            role="presentation"
                          >
                            <div
                              style={{
                                fontSize: "17px",
                                fontWeight: "600",
                                textAlign: "center",
                              }}
                            >
                              {el?.size}
                            </div>
                            <div
                              style={{
                                fontSize: "13px",
                                textAlign: "center",
                                display: "flex",
                                gap: "1.5px",
                                justifyContent: "center",
                              }}
                            >
                              {getTitlePrice(el?.price) || "--"}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                }


                {isDesktopScreen &&
                  <div className="btn_wrapper">
                    <Button
                      type="primary"
                      className={"btn"}
                      onClick={onAddToCart}
                      disabled={isDisabledBuyBtn}
                      loading={isDisabledBuyBtn}
                    >
                      {getBtnPrice(choice?.price)}
                      <span> {!isDisabledBuyBtn ? 'В корзину' : ''}</span>
                    </Button>
                  </div>

                }
              </div>

            </div>

            {!isDesktopScreen &&
              <div
                style={{
                  position: "fixed",
                  bottom: "0",
                  width: "100%",
                  padding: 10,
                  backgroundColor: "white",
                  borderTop: "1px solid #f9f9f9",
                  zIndex: 2,
                }}
              >
                <Button
                  type="primary"
                  className={"btn"}
                  onClick={onAddToCart}
                  disabled={isDisabledBuyBtn}
                  loading={isDisabledBuyBtn}
                >
                  <span>{getBtnPrice(choice?.price)}</span>
                  <span>{!isDisabledBuyBtn ? 'В корзину' : '₽'}</span>
                </Button>
              </div>
            }

          </div>
        </div>
      )}
    </div>
  );
}
export default Product;
