import React, { useCallback, useEffect, useRef, useState } from "react";
import {Button, Modal} from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import {useGetProductQuery, useParseProductQuery} from "../store/products.store";
import "./product.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../store";
import { addToCart } from "../common/cartSlice";
import SwiperCarousel from "../components/Carousel/SwiperCarousel";
import { useTimer } from "use-timer";
import RePoizonMainLogo from "../assets/svg/re-poizon-main-logo";
import MeasureTable from "../components/MeasureTable/MeasureTable";
import {getCheapestElOfSize, getCurrentPriceOfSize, getIntPrice, normalizeSize} from "../common/utils";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import {BRANDS} from "../components/constants";
import GenderSwitcher from "../components/GenderSwitcher/GenderSwitcher";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";
import {APPAREL_SIZES_ORDER} from "./constants";

function Product({ selectedProduct, setLoading }) {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [choice, setChoice] = useState({});
  const [measureOpen, setMeasureOpen] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [isDisabledBuyBtn] = useState(false);
  const [product, setProduct] = useState(selectedProduct);
  const [sizesAndPrices, setSizesAndPrices] = useState([]);

  const spuId = searchParams.get("spuId");
  const sizesParam = searchParams.get("sizes");

  const token = localStorage.getItem("token");
  const prevUpdatedAtRef = useRef(null);

  const isLoadingProduct = false;
  const isTest = true

  const { data: updatedProductData } = useParseProductQuery({
    spuId,
    token,
  }, {skip: !spuId || isTest});

  let { data: remoteProduct } = useGetProductQuery(
    {
      spuId,
      token,
    },
    { skip: !spuId },
  );

  useEffect(() => {
    setProduct(updatedProductData || remoteProduct);
  },[remoteProduct, updatedProductData]);

  const { time, start, pause, reset, status } = useTimer({
    //initialTime: 13,
    initialTime: 0,
    endTime: 0,
    timerType: 'DECREMENTAL',
  });


  useEffect(() => {
    const currentProduct = product;

    if (!currentProduct?.skus?.length) {
      return;
    }

    let handledSizesAndPrices = currentProduct?.skus || []

    if (!currentProduct?.skus?.[0]?.size) {
      const propertyTypeSizeIndex = currentProduct?.properties?.propertyTypes.findIndex((type) => type.name === "Размер");
      const sizesValues = currentProduct?.properties?.propertyTypes[propertyTypeSizeIndex]?.values;

      const sizesAndPrices = sizesValues?.map((size, i) => ({
        ...size,
        price: currentProduct?.skus[i]?.price,
        size: size?.value
      }));

      handledSizesAndPrices = sizesAndPrices || [];
    }

    if (!handledSizesAndPrices?.length) {
      return setSizesAndPrices([]);
    }

    // For bags and else
    if (!handledSizesAndPrices?.length && currentProduct?.skus?.length === 1 && currentProduct?.skus[0].price) {
      handledSizesAndPrices = [{size: 'Стандарт', index: 0, price: currentProduct?.skus[0].price}]
    }

    console.log('handledSizesAndPrices =', handledSizesAndPrices);
    const sortedHandledSizesAndPrices = [
      ...new Map(
          handledSizesAndPrices.map(item => [normalizeSize(item?.size || item?.value), item])
      ).values()
    ].sort((a, b) => {
      const sizeA = normalizeSize(a?.size || a?.value);
      const sizeB = normalizeSize(b?.size || b?.value);

      const isNumeric = !isNaN(sizeA) && !isNaN(sizeB);

      if (isNumeric) {
        return parseFloat(sizeA) - parseFloat(sizeB); // Числовая сортировка
      } else {
        return APPAREL_SIZES_ORDER.indexOf(sizeA) - APPAREL_SIZES_ORDER.indexOf(sizeB); // Буквенная сортировка
      }
    });


    setSizesAndPrices(sortedHandledSizesAndPrices);


    const template = {size: null, price: null, index: null};

    const {size, price, index} = getCheapestElOfSize(handledSizesAndPrices?.filter(el => el.price && (el?.size || el?.size?.primary))) || template;
    console.log('{ size, price, index ',{ size, price, index })
    setChoice({ size, price, index });

    if (sizesParam?.split(',').length  === 1) {
      const {size, price, index} = getCurrentPriceOfSize(sizesParam, handledSizesAndPrices?.filter(el => el.price && (el?.size || el?.size?.primary))) || template;
      setChoice({ size, price, index });
    }

    if (!prevUpdatedAtRef.current) {
      start();
      prevUpdatedAtRef.current = currentProduct?.updatedAt;
    } else if (prevUpdatedAtRef.current !== currentProduct?.updatedAt) {
      prevUpdatedAtRef.current = currentProduct?.updatedAt;
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo({ top: 0 });

  }, []);

  const onAddToCart = () => {
    if (!choice?.price) {
      return;
    }

    dispatch(
      addToCart({ ...product, selectedSize: choice?.size?.eu || choice?.size, price: choice.price }),
    );
    navigate("/cart");
  };

  const onChangeChoiceHandler = (el, i) => {
    if (!el.price) {
      return;
    }

    const price = el?.price;
    setChoice({ size: el?.size?.primary || el?.size || 'cтандарт', price, index: i });
  };

  const getTitlePrice = (price) => {
    if (!price) {
      return "--";
    }

    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  const getBtnPrice = useCallback((price) => {
    if (!price) {
      return "--";
    }

    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);

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

  const onBrandClick = () => {
    setLoading(true);
    navigate(`?brandIds=${product?.brandId}`);
  }

  const getImgSrc = () => {
    const brandIndex = BRANDS.findIndex(el => el.id === product?.brandIds);
    if (brandIndex === -1) {
      return null
    }
    return BRANDS[brandIndex]?.src;
  }

  const copyUrl = async () => {
    /*navigator.clipboard.writeText(window.location.href);
    message.success( 'Ссылка скопирована')*/
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Смотри, какой классный товар!",
          url: window.location.href,
        });
        console.log("Контент успешно отправлен!");
      } catch (error) {
        console.error("Ошибка при отправке:", error);
      }
    } else {
      alert("Функция 'Поделиться' не поддерживается в этом браузере.");
    }
  }

  const isDesktopScreen = window?.innerWidth > 768;

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
              padding: "16px",
              borderBottom: "1px solid #ececec",
              gap: "16px",
            }}
          >
            <div style={{ fontSize: "22px", fontWeight: "500" }}>
              Таблица размеров
            </div>
            <MeasureTable sizeTable={product?.sizeTable} />
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
          {/*<div
            className="main-logo-line black main-logo-line-left"
            style={{
              width: "calc((100vw - 226px - 40px) / 2 )"
            }}
          />*/}
          {<RePoizonMainLogo />}

          {/*<div
            className="main-logo-line black main-logo-line-right"
            style={{
              width: "calc((100vw - 226px - 40px) / 2 )"
            }}
          />*/}
          {isDesktopScreen && <div className="actions-btns">
            <GenderSwitcher/>
            <div onClick={() => navigate("/profile")}>
              <NonActiveProfileIcon/>
            </div>
          </div>}
        </div>
      }

      {!isLoadingProduct && (
          <div style={{height: '100%'}}>
            <img src="https://storage.yandexcloud.net/pc-mediafiles/icons/%D0%9D%D0%B0%D0%B7%D0%B0%D0%B4%20(1).png"
                 alt="" className="go-back-btn"
                 onClick={() => window.history.go(-1)}/>


            <img
                src="https://storage.yandexcloud.net/pc-mediafiles/icons/%D0%9F%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8%D1%82%D1%8C%D1%81%D1%8F(cropped).png"
                className="link-btn"
                onClick={copyUrl} alt=""/>


            <div className={'layout-wrapper'} style={{padding: isDesktopScreen ? '0 20px 0 20px' : '0'}}>
              <div className={"content-wrapper"} style={{flexDirection: isDesktopScreen ? 'row' : 'column'}}>
                <div className={"carousel-wrapper"} style={{
                  maxWidth: isDesktopScreen ? 'calc(50% - 24px / 2)' : 'none',
                  marginTop: isDesktopScreen ? '40px' : '0'
                }}>
                  <SwiperCarousel
                      style={{width: '100%'}}
                      images={product?.images}
                      onLoad={onLoadCarousel}
                      onError={onLoadCarousel}
                  />
                  {isDesktopScreen && <div style={{width: '100%'}}>
                    <div className="item-details-wrapper">
                      <ItemDetails details={product?.productProperties} style={{marginTop: '50px'}}/>
                    </div>
                    <div className="product-info__item standart brand " onClick={onBrandClick}>
                      {!!getImgSrc() && <img
                          src={getImgSrc()}
                          alt="brand" className="brand-logo"/>
                      }
                      <div className="brand-info">
                        <span className="brand-name">{product?.brand}</span>
                        <span className="items">10K+ items ></span>
                      </div>
                    </div>
                  </div>
                  }


                </div>

                <div className={isDesktopScreen ? 'product-info-wrapper' : 'product-info-phone-wrapper'}>
                  <div className={"product-info__item standart" + (isDesktopScreen ? ' transparent' : '')}>
                    {!isDesktopScreen &&
                        <div className="title">
                          {getIntPrice(choice?.price)}
                        </div>
                    }
                    <div className="title-wrapper">
                    <span className="standart" style={{minHeight: '24px'}}>
                      {product?.name}
                    </span>
                      {isDesktopScreen &&
                          <div className="title">
                            {getIntPrice(choice?.price)}
                          </div>
                      }
                    </div>
                  </div>

                  {!isDesktopScreen &&
                      <div style={{display: 'grid', gap: '10px'}}>
                        <div className="product-info__item standart">
                          <div className="label">
                            <div className="label_wrap">
                              <div className="size_label">
                                <div>Размер: EU</div>
                              </div>
                            </div>
                            {product?.category?.category1 === 'footwear' &&
                                <div className="size_guide" onClick={onMeasureOpenClick}>
                                  Таблица размеров
                                  <img className="PoizonImage_img__BNSaU"
                                       src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg"
                                       alt=""/>
                                </div>
                            }

                          </div>
                          <div className="list">
                            {sizesAndPrices?.filter(el => el.price && el?.size)?.map((el, i) => (
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
                                    {el?.size?.eu || el?.size?.primary || el?.size || ""}
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

                        <div className="product-info__item standart">
                          <ItemDetails details={product?.productProperties}/>
                        </div>

                        <div className="product-info__item standart brand" onClick={onBrandClick}>
                          {!!getImgSrc() && <img
                              src={getImgSrc()}
                              alt="brand" className="brand-logo"/>
                          }

                          <div className="brand-info">
                            <span className="brand-name">{product?.brand}</span>
                            <span className="items">10K+ items</span>
                          </div>

                          <span className="brand-name-arrow">
                  <img className="PoizonImage_img__BNSaU"
                       src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg"
                       alt=""/>
                          </span>
                        </div>
                      </div>
                  }

                  <div className="product-info__item poizon_auth full-border-radius">
                    <img className="product-info__item poizon_auth pzn_img"
                         src="https://cdn-img.poizonapp.com/node-common/e9004fdc-f3f9-1e94-d275-0965f2da9ee4-192-117.png?x-oss-process=image/format,webp/resize,w_100"
                         alt="100% authenticated"/>
                    <div className="sm_divider">|</div>
                    <div className="product-info__item poizon_auth main-txt">ВЕРЕФИЦИРОВАНО ЭКСПЕРТАМИ</div>
                    {/*<div className="product-info__item poizon_auth second-txt">5-шаговая аутентификация</div>
                  <div>
                    <img className="PoizonImage_img__BNSaU"
                         src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg" alt=""/>
                  </div>*/}
                  </div>

                  {isDesktopScreen &&
                      <div className="product-info__item">
                        <div className="label">
                          <div className="label_wrap">
                            <div className="size_label">
                              <div>Размер: EU</div>
                            </div>
                          </div>
                          {product?.category?.category1 === 'footwear' &&
                              <div className="size_guide" onClick={onMeasureOpenClick}>
                                Таблица размеров
                                <img className="PoizonImage_img__BNSaU"
                                     src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg"
                                     alt=""/>
                              </div>
                          }
                        </div>
                        <div className="list">
                          {sizesAndPrices?.filter(el => el.price && el?.size)?.map((el, i) => (
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
                                  {el?.size?.eu || el?.size?.primary || el?.size || ""}
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
                          <span> {!isDisabledBuyBtn ? 'Купить' : ''}</span>
                        </Button>
                      </div>

                  }
                  
                </div>

              </div>
            </div>
          </div>
      )}
      {!isDesktopScreen &&
          <footer className="footer-btn-wrapper">
            <Button
                type="primary"
                className={"btn"}
                onClick={onAddToCart}
                disabled={isDisabledBuyBtn}
                loading={isDisabledBuyBtn}
            >
              <span>{getBtnPrice(choice?.price)}</span>
              <span>{!isDisabledBuyBtn ? 'Купить' : '₽'}</span>
            </Button>
          </footer>
      }
    </div>
  );
}

export default Product;
