import React, { useEffect, useState } from "react";
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

  const token = localStorage.getItem("token");

  const productId = searchParams.get("productId");

  const { data: product, isLoading: isLoadingProduct } = useGetProductQuery({
    productId,
    token,
  });

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
      return Math.ceil(price * 13.3 + 1000);
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
          okText={`${Math.ceil(Number(choice.price) * 13.3 + 1000) || "--"} ₽`}
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
                {Math.ceil(Number(choice.price) * 13.3 + 1000) || "--"}
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
            {product?.properties?.sizes
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
                    {Math.ceil(el.price * 13.3 + 1000) || "--"}
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
      {(isLoadingProduct || isLoadingImages) && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            background: "white",
          }}
        >
          <img src={loadingPanda} alt="PANDA" />
        </div>
      )}
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
          <div className={styles.contentWrapper}>
            <div className={styles.carouselWrapper}>
              <SwiperCarousel
                images={product?.images}
                onLoad={onLoadCarousel}
                onError={onLoadCarousel}
              />
            </div>
            <div>
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
                  {getTitlePrice(
                    getCheapestPriceOfSize(
                      product?.price,
                      product?.properties?.sizes || [],
                    ),
                  ) || "--"}
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
            </div>
          </div>

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
        </div>
      )}
    </Layout>
  );
}
export default Product;
