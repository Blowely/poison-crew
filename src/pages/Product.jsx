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
  const productIdUpdatedAt = localStorage.getItem(productId);
  const prevUpdatedAtRef = useRef(null);

  let { data: product, isLoading: isLoadingProduct } = useGetProductQuery(
    {
      productId,
      token,
    },
    //{ pollingInterval: 10000 },
  );

  product = {
    "_id": "65f760e38233854452e00c4e",
    "titleDescription": "【定制球鞋】 Nike Court Borough Low 2 奶咖 高街风 双勾 简约 百搭 低帮 板鞋 GS 灰白",
    "src": "https://dw4.co/t/A/1qrA2oXE",
    "images": [
      "https://cdn.poizon.com/pro-img/origin-img/20231018/1c33ce84d1194090b84a827035194bbf.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20231018/1f780e1cf2ce4ab39ef16696da40ed99.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20231018/e20e0a56570846a2a7d4aa83f6c33558.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20231018/0e1f918091cd416a949fc034fc575f86.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20231018/6fc922945b604ac2ba72a38372479fb8.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20231018/cc1b3314b56c463dac1b39192a161747.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20231018/fa189b3796c74a5ca76bdee8c287216a.png"
    ],
    "createdAt": "2024-03-17T21:30:11.692Z",
    "updatedAt": "2024-03-31T16:22:11.617Z",
    "__v": 0,
    "category": "66029ec83d545163a2435edb",
    "cheapestPrice": 1210610,
    "sizesAndPrices": [
      {
        "skuId": 636448108,
        "price": 1210610,
        "size": "35.5"
      },
      {
        "skuId": 636448109,
        "price": 1210610,
        "size": "36"
      },
      {
        "skuId": 636448110,
        "price": 1210610,
        "size": "36.5"
      },
      {
        "skuId": 636448111,
        "price": 1210610,
        "size": "37.5"
      },
      {
        "skuId": 636448112,
        "price": 1210610,
        "size": "38"
      },
      {
        "skuId": 636448113,
        "price": 1210610,
        "size": "38.5"
      },
      {
        "skuId": 636448114,
        "price": 1210610,
        "size": "39"
      },
      {
        "skuId": 636448115,
        "price": 1210610,
        "size": "40"
      }
    ],
    "title": "【定制球鞋】 Nike Court Borough Low 2 奶咖 高街风 双勾 简约 百搭 低帮 板鞋 GS 灰白",
    "sizeInfoList": [
      {
        "sizeKey": "欧码EU",
        "sizeValue": "35.5,36,36.5,37.5,38,38.5,39,40,40.5,41,42,42.5,43,44,44.5,45,45.5,46,47,47.5,48,48.5,49,50"
      },
      {
        "sizeKey": "US美码",
        "sizeValue": "5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5"
      },
      {
        "sizeKey": "UK英码",
        "sizeValue": "2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14"
      },
      {
        "sizeKey": "JP日本码",
        "sizeValue": "22,22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5,30,30.5,31,31.5,32,32.5,33,33.5"
      },
      {
        "sizeKey": "KR韩国码",
        "sizeValue": "220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,330,335"
      },
      {
        "sizeKey": "适合脚长",
        "sizeValue": "22,22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5,30,30.5,31,31.5,32,32.5,33,33.5"
      },
      {
        "sizeKey": "内长（MM）",
        "sizeValue": "220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,330,335"
      }
    ],
    "spuId": 6741950,
    "isDeleted": false
  };

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
    <Layout style={{ position: "relative" }}>
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
      {false &&
        <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
          <LoadingOutlined style={{fontSize: '24px'}} spin />
        </div>
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
        <div style={{ paddingBottom: "140px" }}>
          <LeftOutlined
            style={{
              zIndex: "99",
              position: "fixed",
              padding: "15px",
              marginTop: "10px",
              fontSize: "25px",
            }}
            onClick={() => navigate("/products")}
          />

          <div className={"content-wrapper"} style={{gridTemplateColumns: `${isDesktopScreen ? '50% 50%' : ''}`}}>
            <div style={{width: '30%'}}>
              <SwiperCarousel
                images={product?.images}
                onLoad={onLoadCarousel}
                onError={onLoadCarousel}
                style={{width: `${isDesktopScreen ? '30%' : '30%'}`}}
              />
            </div>

            <div style={{padding: '10px'}}>
              <div
                style={{
                  backgroundColor: "white",
                  margin: "10px",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: "600",
                    display: "flex",
                    gap: "2px",
                    alignItems: "center",
                  }}
                >
                  {getTitlePrice(product?.cheapestPrice) || "--"}
                  <span style={{ fontSize: "23px" }}>₽</span>
                </div>
                <div style={{ fontSize: "21px" }}>{product?.title}</div>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  margin: "10px",
                  padding: "10px",
                  display: "grid",
                  gap: "10px",
                }}
              >
                <div style={{ fontSize: "19px" }}>Описание</div>
                <div style={{ fontSize: "16px" }}>
                  - Страна-производитель: Китай.
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  margin: "10px",
                  padding: "10px",
                  display: "grid",
                  gap: "10px",
                }}
              >
                <div style={{ fontSize: "19px" }}>Информация о доставке</div>
                <div style={{ fontSize: "16px" }}>- Boxberry</div>
                <div style={{ fontSize: "16px" }}>
                  Среднее время доставки 16-18 дней
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  margin: "10px",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  height: "70px",
                  alignItems: "center",
                }}
                onClick={() => navigate("/products")}
                role="presentation"
              >
                <div style={{ display: "flex", gap: "10px", width: "50%" }}>
                  <AdidasIcon />
                  <div style={{ fontSize: "24px" }}>adidas</div>
                </div>
                <RightOutlined />
              </div>
              {isDesktopScreen &&
                <div
                  style={{
                    width: "100%",
                    height: "90px",
                    margin: 10,
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
      )}
    </Layout>
  );
}
export default Product;
