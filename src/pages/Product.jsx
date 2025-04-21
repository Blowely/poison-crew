import React, {useCallback, useEffect, useRef, useState} from "react";
import {Breadcrumb, Modal} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useGetProductQuery, useParseProductQuery} from "../store/products.store";
import "./product.scss";
import {ArrowLeftOutlined, LoadingOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../store";
import {addToCart, decreaseCartItem} from "../common/cartSlice";
import SwiperCarousel from "../components/Carousel/SwiperCarousel";
import MeasureTable from "../components/MeasureTable/MeasureTable";
import {
  findVariantBySkuId,
  getCategoryClickedLink,
  getCheapestElOfSize,
  getCurrentPriceOfSize,
  getIntPrice, groupVariationsByColor,
  normalizeSize, processProduct
} from "../common/utils";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import {BRANDS, CATEGORIES} from "../components/constants";
import {APPAREL_SIZES_ORDER} from "./constants";
import IconHeart from "../assets/svg/iconHeart";
import TelegramButton from "../components/TelegramButton/TelegramButton";
import DeliverBlock from "../components/Delivery/DeliveryBlock";
import InsuranceBlock from "../components/InsuranceBlock/InsuranceBlock";
import VerifiedBlock from "../components/VerifiedBlock/VerifiedBlock";
import ProductGallery from "../components/CarouselDesktop/CarouselDesktop";
import MainLogoComponent from "../components/MainLogoComponent/MainLogoComponent";
import CartButton from "../components/CartButton/CartButton";
import PoizonVerifiedBlock from "../components/PoizonVerifiedBlock/PoizonVerifiedBlock";
import ProductColorSelectorV2 from "../components/ProductColorSelectorV2/ProductColorSelectorV2";
import Header from "../components/Header/Header";

function Product({ selectedProduct = {}, setLoading = () => {}, setOffset = () => {} }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [choice, setChoice] = useState({});
  const [measureOpen, setMeasureOpen] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [isDisabledBuyBtn] = useState(false);
  const [product, setProduct] = useState({});
  const [sizesAndPrices, setSizesAndPrices] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [productVariations, setProductVariations] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState(null);

  const spuId = searchParams.get("spuId");
  const sizesParam = searchParams.get("sizes");
  const colorParam = searchParams.get("color");
  const skuParam = searchParams.get("sku") || null;

  const gender = localStorage.getItem("gender") || "men";
  const token = localStorage.getItem("token");

  const prevUpdatedAtRef = useRef(null);
  const productLayoutRef = useRef(null);

  const isTest = true

  const cartItems = useAppSelector((state) => state.cart.items) || [];

  const { data: updatedProductData } = useParseProductQuery({
    spuId,
    token,
  }, {skip: !spuId || isTest});

  let { data: remoteProduct, isFetching: isLoadingProduct } = useGetProductQuery(
    {
      spuId,
      token,
    },
    { skip: !spuId || selectedProduct?.skus?.length}, //bug
    //{ skip: !spuId || Object.keys(selectedProduct)?.length},
  );

  useEffect(() => {
    setProduct(updatedProductData || remoteProduct || selectedProduct);
  },[selectedProduct, remoteProduct, updatedProductData]);

  useEffect(() => {
    const currentProduct = product;
    console.log('currentProduct',currentProduct)
    const processedProduct = processProduct(currentProduct);
    const variationsByColor  = groupVariationsByColor(processedProduct);
    const selectedVariationItem =  selectedVariation || variationsByColor[0];

    setProductVariations(variationsByColor);

    if (!selectedVariation) {
      if (colorParam) {
        const colorIndex = variationsByColor.findIndex((el) => el.color === colorParam);
        setSelectedVariation(colorIndex >= 0 ? variationsByColor[colorIndex] : variationsByColor[0]);
      } else if (skuParam) {
        const foundVariation = findVariantBySkuId(variationsByColor, Number(skuParam));
        setSelectedVariation(foundVariation);
      } else {
        setSelectedVariation(variationsByColor[0]);
      }
    }

    console.log('variationsByColor',variationsByColor)

    if (!selectedVariationItem?.sizes?.length) {
      return;
    }

    //let handledSizesAndPrices = currentProduct?.skus || []

    /*if (!currentProduct?.skus?.[0]?.size || !Object.keys(currentProduct?.skus?.[0]?.size)?.length) {
      const propertyTypeSizeIndex = currentProduct?.properties?.propertyTypes.findIndex((type) => type.name === "Размер");
      const sizesValues = currentProduct?.properties?.propertyTypes[propertyTypeSizeIndex]?.values;

      const sizesAndPrices = sizesValues?.map((size, i) => ({
        ...size,
        price: currentProduct?.skus[i]?.price,
        size: size?.value
      }));
      console.log('sizesAndPrices =',sizesAndPrices);
      handledSizesAndPrices = sizesAndPrices || [];
    }

    // For bags and else
    if (currentProduct?.skus?.length === 1 && currentProduct?.skus[0].price) {
      handledSizesAndPrices = [{size: 'Стандарт', index: 0, price: currentProduct?.skus[0].price}]
    }*/

    const handledSizesAndPrices = selectedVariationItem.sizes;

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

    if (!sortedHandledSizesAndPrices?.length) {
      return;
    }

    let p = null;
    if (sizesParam?.split(',').length  === 1) {
      p = getCurrentPriceOfSize(sizesParam, sortedHandledSizesAndPrices?.filter(el => el.price && (el?.size || el?.size?.primary)));
    } else {
      p = getCheapestElOfSize(sortedHandledSizesAndPrices?.filter(el => el.price && (el?.size || el?.size?.primary)));

      if ((typeof p?.size === 'object' && Object.keys(p?.size)?.length) || !p?.size) {
        p.size = 'Стандарт';
      }
    }

    setChoice({ size: p?.size, price: p.price, index: p.index, skuId: p.skuId });

    searchParams.set('sku', p.skuId);
    setSearchParams(searchParams, {replace: true});

    const icon = document.getElementsByClassName('tabler-icon-heart')[0];
    if (!icon) return;

    const prevFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const productIndex = prevFavorites.findIndex((el) => el?.spuId === product?.spuId);

    if (productIndex >= 0) {
      icon.style.fill = '#a2a2a2';
    }

    if (!prevUpdatedAtRef.current) {
      prevUpdatedAtRef.current = currentProduct?.updatedAt;
    } else if (prevUpdatedAtRef.current !== currentProduct?.updatedAt) {
      prevUpdatedAtRef.current = currentProduct?.updatedAt;
    }
  }, [product, selectedVariation]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const onAddToCart = () => {
    if (getCartItemNumberCount(product, choice.skuId) === 2) return;

    if (!choice?.price) {
      return;
    }

    dispatch(
      addToCart({
        ...product,
        selectedSize: choice?.size?.eu || choice?.size,
        price: choice.price,
        skuId: choice.skuId
      }),
    );
    //navigate("/cart");
  };

  const onChangeChoiceHandler = (el, i) => {
    if (!el.price) {
      return;
    }

    const price = el?.price;
    setChoice({ size: el?.size?.primary || el?.size || 'cтандарт', price, index: i, skuId: el?.skuId });
    searchParams.set('sku', el?.skuId);
    setSearchParams(searchParams, { replace: true });
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

  },[choice, isDisabledBuyBtn]);

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
    if (!product?.brandId) {
      return;
    }

    setLoading(true);
    setOffset(1);
    navigate(`?brandIds=${product?.brandId}&brandName=${product?.brand}`);
  }

  const onInfoBlockItemClick = (link) => {
    window.open(link);
  }

  const getImgSrc = () => {
    const brandIndex = BRANDS.findIndex(el => el.id === product?.brandIds);
    if (brandIndex === -1) {
      return null
    }
    return BRANDS[brandIndex]?.src;
  }

  const copyUrl = async () => {
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

  const goBack = () => {
    if (window?.history?.length <= 1) {
      return navigate(`/${gender}-products`);
    }

    window.history.go(-1);
  }

  const onFavoriteIconClick = () => {
    const icon = document.getElementsByClassName('tabler-icon-heart')[0];
    if (!icon) return;

    const prevFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const isFavorite = icon.style.fill === 'rgb(162, 162, 162)';

    if (isFavorite) {
      const updatedFavorites = prevFavorites.filter((el) => el?.spuId !== product?.spuId);
      icon.style.fill = "none";
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      icon.style.fill = '#a2a2a2';
      localStorage.setItem("favorites", JSON.stringify([...prevFavorites, product]));
    }
  };

  const isDesktopScreen = window?.innerWidth > 768;

  const getValue = (size) => {
    if (size?.eu) return size.eu;
    if (size?.primary) return size.primary;
    if (typeof size === 'string' || typeof size === 'number') return size;
    return "";
  }

  const root = document.getElementById("root");


  useEffect(() => {
    root.style.overflowY = "hidden";
    return () => { root.style.overflowY = "unset" };
  }, [])

  /*window?.onscroll(
      "scroll",
      function (event) {
        try {
          console.log(event)
          setIsScrolled(window.scrollY > 100);
        } catch (e) {
          console.log("e =", e);
        }
      },
      false,
  );
*/
  const onBreadcrumbItemClick = (link) => {
    setOffset(1)
    setLoading(true);
    navigate(link);
  }

  const getCartItemNumberCount = (product, skuId) => {
    const foundedIndex = cartItems.findIndex((el) => el.skuId === skuId);
    return foundedIndex >= 0 ? cartItems[foundedIndex].count : 0;
  }

  const decreaseCartItemHandler = (product, size, skuId) => {
    const obj = {
      ...product,
      skuId
    }

    dispatch(decreaseCartItem(obj));
  }

  const getCartItemCount = useCallback((product, size, skuId) => {
    const foundedIndex = cartItems.findIndex((el) => el.skuId === skuId);

    if (foundedIndex < 0 || getCartItemNumberCount(product, skuId) === 0) {
      return null
    }

    return <div className="counter-wrapper">
      <span>
        {cartItems[foundedIndex]?.count}
      </span>
    </div>
  }, [cartItems]);

  const onChangeVariations = (variant) => {
    setSelectedVariation(variant);
  }

  console.log('sizesAndPrices=',sizesAndPrices)

  return (
    <div style={{height: '100%'}} ref={productLayoutRef}>
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
      {isDesktopScreen && <div className="info-block-wrapper" style={{width:'100vw', marginLeft:'-12.5%'}}>
        <div className="info-block">
          <div>
                    <span onClick={() => onInfoBlockItemClick("https://t.me/re_poizon_ru")}>
                        <img src="/telegram-icon.svg" alt="Telegram"/>Мы в телеграм
                    </span>
            <span onClick={() => onInfoBlockItemClick("https://t.me/repoizon_otzovik")}>Отзывы</span>
            <span onClick={() => onInfoBlockItemClick("https://storage.yandexcloud.net/pc-mediafiles/important/public-offer-re-poizon.pdf")}>
                        Оферта
                    </span>
          </div>
          <div>
            <span onClick={() => onInfoBlockItemClick("tg://resolve?domain=re_poizon_store")}>Поддержка</span>
            <span>repoizonstore@gmail.com</span>
          </div>
        </div>
      </div>}
      {isDesktopScreen &&
          <Header
              style={{width:'100vw', marginLeft:'-12.5%'}}
              setLoading={setLoading}
              setOffset={setOffset}
          />
      }
      {isLoadingProduct && (
          //<div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
          <div style={{width: '100%', height: 'calc(100% - 140px)', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
            <LoadingOutlined style={{fontSize: '44px'}} spin />
          </div>)
      }
      {!isLoadingProduct && (
          <div style={{height: '100%'}}>
            {!isDesktopScreen &&
                <div className={`product-bar-wrapper ${isScrolled ? "solid" : ""}`}>
                  <img
                      src="https://storage.yandexcloud.net/pc-mediafiles/icons/%D0%9D%D0%B0%D0%B7%D0%B0%D0%B4%20(1).png"
                      alt="" className="go-back-btn"
                      onClick={goBack}/>
                  <div className="title-wrapper bar">
                    <div className="first-part">
                      <span className="standart" style={{minHeight: '24px', fontWeight: '500'}}>
                            {selectedProduct?.brand || product?.brand}
                      </span>
                      <span className="dot">·</span>
                      <span className="standart" style={{minHeight: '24px'}}>
                            {selectedProduct?.name || product?.name}
                      </span>
                    </div>

                    <div className={isDesktopScreen ? 'title' : 'phone-bar-title'}>
                      {getIntPrice(choice?.price || selectedProduct?.price)}
                    </div>
                  </div>
                  <div className="right-items-wrapper">
                    <div className="link-btn favorite-btn" onClick={onFavoriteIconClick}>
                      <IconHeart/>
                    </div>
                    <img
                        src="https://storage.yandexcloud.net/pc-mediafiles/icons/%D0%9F%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8%D1%82%D1%8C%D1%81%D1%8F(cropped).png"
                        className="link-btn"
                        onClick={copyUrl} alt=""/>
                  </div>

                </div>
            }


            <div className={'layout-wrapper'} style={{padding: isDesktopScreen ? '0 20px' : '0'}}>
              <div className={"content-wrapper"} style={{flexDirection: isDesktopScreen ? 'row' : 'column'}}>
                <div className={"carousel-wrapper"} style={{
                  maxWidth: isDesktopScreen ? 'calc(50% - 24px / 2)' : 'none',
                }}>
                  {isDesktopScreen && product &&
                      <div className="breadcrumb-wrapper">
                      <div className="back-to-main-btn" onClick={goBack}><ArrowLeftOutlined/></div>
                        <Breadcrumb
                            items={[
                              {
                                title: <span
                                    onClick={() => onBreadcrumbItemClick('/')}
                                    className={'breadcrumb-wrapper-item'}
                                >
                                  Главная
                                </span>,
                              },
                              {
                                title: <span onClick={
                                  () => onBreadcrumbItemClick(getCategoryClickedLink(
                                    1,
                                    product.category1,
                                    product?.category?.category1 || ""
                                ))}
                                   className={'breadcrumb-wrapper-item'}
                                >
                                  {
                                      (CATEGORIES.find(el => el.id === product.category1))?.name
                                      || product?.category?.category1 || ""
                                  }
                                </span>,
                              },
                              {
                                title: <span onClick={
                                  () => onBreadcrumbItemClick(getCategoryClickedLink(
                                    2,
                                    product.category2,
                                    product?.category?.category2?.split('/')[1] || ""
                                    ))}
                                   className={'breadcrumb-wrapper-item'}
                                >{
                                    (CATEGORIES.find(el => el.id === product.category2))?.name
                                    || product?.category?.category2?.split('/')[1] || ""
                                }
                                </span>,
                              },
                              {
                                title: <span onClick={
                                  () => onBreadcrumbItemClick(getCategoryClickedLink(
                                    3,
                                    product.category3,
                                    product?.category?.category3?.split('/')[2]
                                ))}
                                   className={'breadcrumb-wrapper-item'}
                                >{
                                    (CATEGORIES.find(el => el.id === product.category3))?.name
                                    || product?.category?.category3?.split('/')[2] || ""
                                  }
                                </span>,
                              },
                            ]}
                        />
                      </div>
                  }

                  {isDesktopScreen &&
                      <ProductGallery
                        images={selectedVariation?.images || []}
                        onLoad={onLoadCarousel}
                        onError={onLoadCarousel}
                    />
                  }
                  {!isDesktopScreen &&
                    <SwiperCarousel
                        images={selectedVariation?.images || []}
                        onLoad={onLoadCarousel}
                        onError={onLoadCarousel}
                    />
                  }

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
                  {isDesktopScreen &&
                      <div
                          className={"product-info__item standart " + (isDesktopScreen ? ' transparent space-between' : '')}
                          style={{borderRadius: '0'}}
                      >
                        {!isDesktopScreen &&
                            <div className="title">
                              {getIntPrice(choice?.price || selectedProduct?.price)}
                            </div>
                        }
                        <div className="title-wrapper">
                          <span className="standart" style={{minHeight: '24px'}}>
                            {selectedProduct?.name || product?.name}
                          </span>
                          {isDesktopScreen &&
                              <div className="title">
                                {getIntPrice(choice?.price || selectedProduct?.price)}
                              </div>
                          }
                        </div>
                        {isDesktopScreen &&
                            <div className="link-btn favorite-btn" onClick={onFavoriteIconClick}>
                              <IconHeart/>
                            </div>
                        }
                      </div>
                  }

                  {!isDesktopScreen &&
                      <div style={{display: 'grid', gap: '10px'}}>
                        {productVariations?.length > 1  &&
                          <ProductColorSelectorV2
                            variants={productVariations}
                            onSelect={onChangeVariations}
                            selectedVariation={selectedVariation}
                          />
                        }
                        <div className={"product-info__item standart"}>
                          {!isDesktopScreen &&
                              <div className="title">
                                {getIntPrice(choice?.price)}
                              </div>
                          }
                          <div className="title-wrapper">
                            <span className="standart" style={{minHeight: '24px'}}>
                              {selectedProduct?.name || product?.name}
                            </span>
                          </div>
                        </div>
                        {!!sizesAndPrices?.length && sizesAndPrices[0]?.size !== 'Стандарт' && (
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
                                {sizesAndPrices?.filter(el => el?.price && el?.size)?.map((el, i) => (
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
                                      {getCartItemCount(product, el?.size, el?.skuId)}
                                      <div
                                          style={{
                                            fontSize: "17px",
                                            fontWeight: "600",
                                            textAlign: "center",
                                          }}
                                      >
                                        {getValue(el?.size)}
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
                        )}
                        {!isDesktopScreen && product?.category?.category2 &&
                            <div className="product-info__item standart brand"
                                 onClick={
                                   () => onBreadcrumbItemClick(getCategoryClickedLink(
                                       2,
                                       product.category2,
                                       product.category?.category2?.split('/')[1] || ""
                                   ))}
                            >
                              <div className="brand-info">
                                <span className={'brand-name'}>
                                  {
                                      (CATEGORIES.find(el => el.id === product.category2))?.name
                                      || product.category?.category2?.split('/')[1] || ""
                                  }
                                </span>
                                <span className="items">Еще товары категории {
                                    (CATEGORIES.find(el => el.id === product.category2))?.name
                                    || product.category?.category2?.split('/')[1] || ""
                                }</span>
                              </div>

                              <span className="brand-name-arrow">
                                <img className="PoizonImage_img__BNSaU"
                                     src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg"
                                     alt=""/>
                              </span>
                            </div>
                        }
                        {!isDesktopScreen && product?.category?.category3 &&
                            <div className="product-info__item standart brand"
                                 onClick={
                                   () => onBreadcrumbItemClick(getCategoryClickedLink(
                                       3,
                                       product.category3,
                                       product.category?.category3?.split('/')[2]
                                   ))}
                            >
                              <div className="brand-info">
                                <span className={'brand-name'}>
                                  {
                                      (CATEGORIES.find(el => el.id === product.category3))?.name
                                      || product.category?.category3?.split('/')[2] || ""
                                  }
                                </span>
                                <span className="items">Еще товары категории {
                                    (CATEGORIES.find(el => el.id === product.category3))?.name
                                    || product.category?.category3?.split('/')[2] || ""
                                }</span>
                              </div>

                              <span className="brand-name-arrow">
                                <img className="PoizonImage_img__BNSaU"
                                     src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg"
                                     alt=""/>
                              </span>
                            </div>
                        }

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
                        {!isDesktopScreen &&
                            <div className="product-info__item standart brand"
                                 onClick={() => onInfoBlockItemClick("https://t.me/repoizon_otzovik")}
                            >
                              <div className="brand-info">
                                <span className="brand-name">Отзывы</span>
                                <span className="items">Отзывы о работе re:Poizon</span>
                              </div>

                              <span className="brand-name-arrow">
                            <img className="PoizonImage_img__BNSaU"
                                 src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg"
                                 alt=""/>
                          </span>
                            </div>
                        }
                        {!isDesktopScreen &&
                            <div className="product-info__item standart brand"
                                 onClick={() => onInfoBlockItemClick("https://t.me/re_poizon_ru")}
                            >
                              <div className="brand-info">
                                <span>
                                  <span className="brand-name">Мы в телеграм
                                  </span>
                                  <img src="/telegram-icon.svg" alt="Telegram"/>
                                </span>
                                <span className="items">Новости проекта и модные тренды</span>
                              </div>

                              <span className="brand-name-arrow">
                            <img className="PoizonImage_img__BNSaU"
                                 src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg"
                                 alt=""/>
                          </span>
                            </div>
                        }
                        <div className="product-info__item standart">
                          <DeliverBlock/>
                        </div>
                        <div className="product-info__item standart">
                          <InsuranceBlock/>
                        </div>
                        <div className="product-info__item standart">
                          <VerifiedBlock/>
                        </div>
                        <PoizonVerifiedBlock />
                      </div>
                  }

                  {!isDesktopScreen && productVariations &&
                      <TelegramButton text="Задать вопрос по товару" productUrl={window.location.href}/>
                  }

                  {isDesktopScreen && productVariations?.length > 1  &&
                      <ProductColorSelectorV2
                          variants={productVariations}
                          onSelect={onChangeVariations}
                          selectedVariation={selectedVariation}
                      />
                  }

                  {isDesktopScreen && !!sizesAndPrices?.length && sizesAndPrices[0]?.size !== 'Стандарт' &&
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
                          {sizesAndPrices?.filter(el => el?.price && el?.size)?.map((el, i) => (
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
                                {getCartItemCount(product, el?.size, el.skuId)}
                                <div
                                    style={{
                                      fontSize: "17px",
                                      fontWeight: "600",
                                      textAlign: "center",
                                    }}
                                >
                                  {getValue(el?.size)}
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
                      <CartButton
                          price={choice?.price || ""}
                          onAddToCart={onAddToCart}
                          decreaseCartItemHandler={() => decreaseCartItemHandler(product, choice?.size, choice?.skuId)}
                          disabled={isDisabledBuyBtn}
                          //showCounter={checkIsCartItem(product, choice?.size)}
                          counterValue={getCartItemNumberCount(product, choice?.skuId)}
                      />
                  }
                  {isDesktopScreen && <div className="telegram-button-wrapper">
                    <TelegramButton text="Задать вопрос по товару" productUrl={window.location.href} />
                  </div>}
                  {isDesktopScreen &&
                      <>
                        <div className="product-info__item standart">
                          <DeliverBlock/>
                        </div>
                        <div className="product-info__item standart">
                          <InsuranceBlock/>
                        </div>
                        <div className="product-info__item standart">
                          <VerifiedBlock/>
                        </div>
                        <PoizonVerifiedBlock />
                      </>
                  }
                </div>

              </div>
            </div>
          </div>
      )}
      {!isDesktopScreen && !isLoadingProduct &&
          <footer className="footer-btn-wrapper">
            <CartButton
                price={choice?.price || ""}
                onAddToCart={onAddToCart}
                decreaseCartItemHandler={() => decreaseCartItemHandler(product, choice?.size)}
                disabled={isDisabledBuyBtn}
                //showCounter={checkIsCartItem(product, choice?.size)}
                counterValue={getCartItemNumberCount(product, choice?.skuId)}
            />
          </footer>
      }
    </div>
  );
}

export default Product;
