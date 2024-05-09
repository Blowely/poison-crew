import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Layout, Modal } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetProductQuery } from "../store/products.store";
import "./product.scss";
import styles from "./product.module.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import AuthModal from "./AuthModal";
import { useAppDispatch } from "../store";
import { addToCart } from "../common/cartSlice";
import AdidasIcon from "../assets/svg/brands/adidas-icon";
import MeasureTableIcon from "../assets/svg/measure-table-icon";
import { getCheapestPriceOfSize } from "../common/utils";
import SwiperCarousel from "../components/Carousel/SwiperCarousel";
import loadingPanda from "../assets/loading-panda.gif";
import { LoadingOutlined } from "@ant-design/icons";
import { useTimer } from "use-timer";
import RePoizonMainLogo from "../assets/svg/re-poizon-main-logo";
import RePoizonMainMiddleLogo from "../assets/svg/re-poizon-main-middle-logo";

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
  const [isDisabledBuyBtn, setDisabledBuyBtn] = useState(true);

  const productId = searchParams.get("productId");

  const token = localStorage.getItem("token");
  const prevUpdatedAtRef = useRef(null);

  let { data: product, isLoading: isLoadingProduct } = useGetProductQuery(
    {
      productId,
      token,
    },
    //{ pollingInterval: 10000 },
  );

  const { time, start, pause, reset, status } = useTimer({
    initialTime: 10,
    endTime: 0,
    timerType: 'DECREMENTAL',
  });

  useEffect(() => {
    const itemIndex = product?.sizesAndPrices?.findIndex((el) => el?.price === product?.cheapestPrice);
    setChoice({
      price: product?.sizesAndPrices[itemIndex]?.price,
      size: product?.sizesAndPrices[itemIndex]?.size,
      index: itemIndex,
    })

    if (!prevUpdatedAtRef.current) {
      start();
      prevUpdatedAtRef.current = product?.updatedAt;
    } else if (prevUpdatedAtRef.current !== product?.updatedAt) {
      prevUpdatedAtRef.current = product?.updatedAt;
      setDisabledBuyBtn(false);
    }
  }, []);

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
      setChoice({ size: el.size, price: el.price, index: i });
    }
  };

  const getTitlePrice = (price) => {
    if (Number(price) > 0) {
      return Math.ceil(price / 100);
    }
    return "--";
  };

  const getBtnPrice = (price) => {
    if (isDisabledBuyBtn) {
      return `Обновление цен ${time}`
    }

    if (Number(price) > 0) {
      return Math.ceil(price / 100);
    }

    return "--";
  };

  const onMeasureOpenClick = () => {
    setMeasureOpen(true);
  };

  const onLoadCarousel = () => {
    if (!isLoadingImages) {
      return null;
    }
    setIsLoadingImages(false);
  };

  const isDesktopScreen = window?.innerWidth > 768;


  return (
    <div style={{ position: "relative" }}>
      {!token && (
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
      )}
      {token && (
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
          centered
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
                {getTitlePrice(choice.price) || "--"}
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
            <span>Таблица размеров</span>
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
              ))
              .reverse()}
          </div>
        </Modal>
      )}
      {token && measureOpen && (
        <Modal
          title="Таблица размеров"
          open={measureOpen}
          onOk={() => {
            setMeasureOpen(false);
          }}
          centered
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
            <MeasureTableIcon />
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
          <div className={'layout-wrapper'}>
            <div className={"content-wrapper"}>
              <div className={"carousel-wrapper"}>
                <SwiperCarousel
                  style={{width: '100%'}}
                  images={product?.images}
                  onLoad={onLoadCarousel}
                  onError={onLoadCarousel}
                />
              </div>

              <div className={"product-info-wrapper"}>
                <div className="product-info__item title">
                  {product?.title}
                </div>
                <div className="product-info__item">
                </div>
                <div className="product-info__item">
                </div>

                {isDesktopScreen &&
                  <Button
                    type="primary"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    className={"btn"}
                    onClick={() => setModalOpen(true)}
                  >
                    Выбрать размер
                  </Button>
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
                  style={{
                    width: "100%",
                    height: "100%",
                    fontSize: "20px",
                    fontWeight: "400",
                  }}
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
