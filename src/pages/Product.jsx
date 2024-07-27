import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Divider, Modal } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetProductQuery, useParseProductQuery } from "../store/products.store";
import "./product.scss";
import { LeftOutlined } from "@ant-design/icons";
import AuthModal from "./AuthModal";
import { useAppDispatch } from "../store";
import { addToCart } from "../common/cartSlice";
import SwiperCarousel from "../components/Carousel/SwiperCarousel";
import { LoadingOutlined } from "@ant-design/icons";
import { useTimer } from "use-timer";
import RePoizonMainLogo from "../assets/svg/re-poizon-main-logo";
import MeasureTable from "../components/MeasureTable/MeasureTable";
import { getIntPrice } from "../common/utils";

function Product({ onAddToFavorite, isLoading }) {
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

  const spuId = searchParams.get("spuId");

  const token = localStorage.getItem("token");
  const prevUpdatedAtRef = useRef(null);

  useParseProductQuery({
    spuId,
    token,
  });

  let { data: product, isLoading: isLoadingProduct } = useGetProductQuery(
    {
      spuId,
      token,
    },
    { pollingInterval: 13000 },
  );

  const { time, start, pause, reset, status } = useTimer({
    //initialTime: 13,
    initialTime: 0,
    endTime: 0,
    timerType: 'DECREMENTAL',
  });

  useEffect(() => {
    const itemIndex = product?.sizesAndPrices?.findIndex((el) => el?.price === product?.cheapestPrice);
    console.log('itemIndex =',itemIndex);
    console.log('product =',product);
    setChoice({
      price: product?.sizesAndPrices[itemIndex]?.price.toString(),
      size: product?.sizesAndPrices[itemIndex]?.size,
      index: itemIndex,
    })

    if (!prevUpdatedAtRef.current) {
      start();
      prevUpdatedAtRef.current = product?.updatedAt;
    } else if (prevUpdatedAtRef.current !== product?.updatedAt) {
      prevUpdatedAtRef.current = product?.updatedAt;
      //setDisabledBuyBtn(false);
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
      addToCart({ ...product, size: choice?.size, price: choice?.price }),
    );
    navigate("/cart");
  };

  const onChangeChoiceHandler = (el, i) => {
    if (Number(el.price) > 0) {
      setChoice({ size: el.size, price: el.price.toString(), index: i });
    }
  };

  const getTitlePrice = (price) => {
    if (!price) {
      return "--";
    }
    const str = JSON.stringify(price);

    return str?.substring(0, str?.length - 2);
  };

  const getBtnPrice = useCallback((price) => {
    if (isDisabledBuyBtn) {
      return `Обновление цен ${time}`
    }

    if (!price) {
      return "--";
    }

    return price.substring(0, price?.length - 2);

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

  const isDesktopScreen = window?.innerWidth > 768;



  return (
    <div style={{ position: "relative" }}>
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
      {true && (
        <Modal
          title="Выберите размер"
          open={isModalOpen}
          onOk={onAddToCart}
          okText={<>{getBtnPrice(choice?.price) || "--"}
            <span style={{ fontSize: "19px" }}>{isDisabledBuyBtn ? '' : ' ₽'}</span></>}
          okButtonProps={{
            disabled: isDisabledBuyBtn,
            loading: isDisabledBuyBtn,
          }}
          centered={!isDesktopScreen}
          onCancel={() => {
            setModalOpen(false);
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "15px",
              borderBottom: "1px solid #ececec",
              gap: "20px",
            }}
          >
            <img src={product?.images[0]} style={{ width: "20%" }} alt="" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  display: "flex",
                  gap: "3px",
                  alignItems: "flex-end",
                }}
              >
                {choice?.price?.substring(0, choice.price.length - 2) || "--"}
                <span style={{ fontSize: "19px" }}>₽</span>
              </div>
              <div style={{ fontSize: "15px" }}>Размер: {choice.size}</div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "15px",
              paddingRight: "25px",
              justifyContent: "space-between",
            }}
            onClick={onMeasureOpenClick}
            role="presentation"
          >
            <span>Таблица размеров</span><span>></span>
          </div>
          <div className="content-size-wrapper">
            {product?.sizesAndPrices
              .map((el, i) => (
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
                    {el.size}
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
                    <span style={{ fontSize: "13px" }}>₽</span>
                  </div>
                </div>
              ))}
          </div>
        </Modal>
      )}
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
            <MeasureTable sizeInfoList={product?.sizeInfoList} />
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
        <div>
          <LeftOutlined
            className="go-back-btn"
            onClick={() => navigate("/products")}
          />
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
              </div>

              <div className={isDesktopScreen ? 'product-info-wrapper' : 'product-info-phone-wrapper'}>
                <div className="product-info__item title">
                  {getClearTitle(product?.title)}
                </div>
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
                <Divider></Divider>

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
                      {product?.sizesAndPrices
                        .map((el, i) => (
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
                              {el.size}
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
                              <span style={{ fontSize: "13px" }}>₽</span>
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
                      <>{getBtnPrice(choice?.price)}
                        <span>{isDisabledBuyBtn ? '' : ' ₽'}</span></>
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
                  height: "90px",
                  padding: 10,
                  backgroundColor: "white",
                  borderTop: "1px solid #f9f9f9",
                }}
              >
                <Button
                  type="primary"
                  className={"btn"}
                  onClick={() => setModalOpen(true)}
                >
                  Выбрать размер
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
