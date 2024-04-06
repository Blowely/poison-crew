import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Card from "../components/Card";
import AdidasIcon from "../assets/svg/brands/adidas-icon";
import NikeIcon from "../assets/svg/brands/nike-icon";
import CoachIcon from "../assets/svg/brands/coach-icon";
import MoreIcon from "../assets/svg/brands/more-icon";
import { Empty, Layout, Pagination } from "antd";
import Header from "../components/Header/Header";
import { useGetProductsQuery } from "../store/products.store";
import "../index.scss";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import ActiveBagIcon from "../assets/svg/active-bag-icon.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePrevious } from "../hooks/usePrevios";
import { useAppDispatch, useAppSelector } from "../store";
import { addAddress } from "../common/accountSlice";
import { addProducts } from "../common/productsSlice";
import NonActiveCartIcon from "../assets/svg/non-active-cart-icon";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";
import RePoizonMainLogo from "../assets/svg/re-poizon-main-logo";
import RePoizonMainMiddleLogo from "../assets/svg/re-poizon-main-middle-logo";
import "../components/InitAnimation/InitAnimation.styles.scss";
import { startLoaderAnimation } from "../components/InitAnimation/InitAnimation";
import ContentLoader from "react-content-loader";

function Home({ onAddToFavorite, onAddToCart }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const productsSlice = useAppSelector((state) => state.products);

  const [searchParams, setSearchParams] = useSearchParams();

  const [limit, setLimit] = useState(20);
  const [test, setTest] = useState([]);

  const search = searchParams.get("search");
  const collection = searchParams.get("collName") || "personal";
  let offset = searchParams.get("offset");
  const type = searchParams.get("type");

  useEffect(() => {
    startLoaderAnimation();
  }, []);

  const buildRequest = () => {
    let obj = {
      limit: 20,
      search: search?.toLowerCase(),
      collName: "personal",
    };

    if (collection) {
      obj.collName = collection;
    }

    if (offset) {
      obj.offset = offset;
    }

    return obj;
  };

  const {
    data: products = { items: [], totalCount: 0 },
    isLoading,
    refetch,
  } = useGetProductsQuery(buildRequest());

  const searchOrCollection = search || collection;
  const prevCollectionValue = usePrevious(searchOrCollection);
  const trimCollectionValue = searchOrCollection.replace(/ /g, "");

  useEffect(() => {
    if (productsSlice[trimCollectionValue]?.length) {
      if (prevCollectionValue !== searchOrCollection) {
        dispatch(
          addProducts({
            [trimCollectionValue]: products?.items,
          }),
        );
      } else {
        dispatch(
          addProducts({
            [trimCollectionValue]: [
              ...productsSlice[trimCollectionValue],
              ...products?.items,
            ],
          }),
        );
      }
    } else if (products?.items?.length) {
      try {
        dispatch(
          addProducts({
            [trimCollectionValue]: products?.items,
          }),
        );
      } catch (e) {
        console.log("e =", e);
      }
    }
  }, [products?.items]);

  const renderItems = () => {
    const productsItems = isLoading
      ? [...Array(20)]
      : productsSlice[trimCollectionValue] || [];

    if (!productsItems?.length && !isLoading) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{ height: 100, paddingTop: "20px" }}
          description="Ничего не найдено"
        />
      );
    }

    return (
      <div className="cards-section-wrapper">
        {productsItems.map((item, index) => (
          <Suspense fallback={<div>Loading...</div>} key={index}>
            <Card
              id={item?._id}
              key={index}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              loading={isLoading}
              images={item?.images}
              price={item?.cheapestPrice}
              {...item}
            />
          </Suspense>
        ))}
      </div>
    );
  };

  const docElements = document.getElementsByClassName("cards-section-wrapper");

  let currentPage = true;

  useEffect(() => {
    currentPage = false;
  }, [products]);

  window.addEventListener(
    "scroll",
    function (event) {
      try {
        const lastEl =
          docElements[0]?.children[docElements[0]?.children?.length - 1]
            ?.offsetTop - 2000;
        const windowPageYOffset = window.pageYOffset;

        if (windowPageYOffset >= lastEl && !isLoading && !currentPage) {
          currentPage = true;
          refetch();

          if (products.items.length === limit) {
            const prevOffset = 20 + Number(offset);
            searchParams.set("offset", prevOffset.toString());
          }
        }
      } catch (e) {
        console.log("e =", e);
      }
    },
    false,
  );

  const isDesktopScreen = window?.innerWidth > 768;

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <div className="loader">
        <div className="loader-box-wrapper">
          <div className="loader-box loader-box_black">
            <div className="loader__item_left_partition"></div>
            <div className="loader-box__item loader__item_left">POIZON</div>
          </div>
          <div className="loader-box loader-box_white">
            <div className="loader-box__item loader__item_right">RE</div>
          </div>
        </div>
      </div>

      <div className="main-logo-wrapper">
        <div
          className="main-logo-line main-logo-line-left"
          style={{
            width: isDesktopScreen
              ? "calc((100vw - 226px - 40px) / 2 )"
              : "calc((100vw - 158px - 40px) / 2 )",
          }}
        />
        {isDesktopScreen ? <RePoizonMainLogo /> : <RePoizonMainMiddleLogo />}

        <div
          className="main-logo-line main-logo-line-right"
          style={{
            width: isDesktopScreen
              ? "calc((100vw - 226px - 40px) / 2 )"
              : "calc((100vw - 158px - 40px) / 2 )",
          }}
        />
      </div>
      <Header />
      <div className="content">
        {/*<div className="brands-section-wrapper">
          <div
            className="brands-section-wrapper_card"
            onClick={() => navigate("/products")}
          >
            <div className="brands-section-wrapper_card-icon">
              <AdidasIcon />
            </div>
            <div style={{ fontWeight: "bold", fontSize: "10px" }}>ADIDAS</div>
          </div>
          <div className="brands-section-wrapper_card">
            <div className="brands-section-wrapper_card-icon">
              <NikeIcon />
            </div>
            <div style={{ fontWeight: "bold", fontSize: "10px" }}>NIKE</div>
          </div>
          <div className="brands-section-wrapper_card">
            <div className="brands-section-wrapper_card-icon">
              <CoachIcon />
            </div>
            <div style={{ fontWeight: "bold", fontSize: "10px" }}>COACH</div>
          </div>
          <div className="brands-section-wrapper_card">
            <div className="brands-section-wrapper_card-icon">
              <MoreIcon />
            </div>
            <div style={{ fontWeight: "bold", fontSize: "10px" }}>Больше</div>
          </div>
        </div>*/}
        <Suspense fallback={<div>Loading...</div>}>{renderItems()}</Suspense>
      </div>
      {!isDesktopScreen &&
        <footer>
          <div onClick={() => navigate("/products")}>
            <ActiveBagIcon />
          </div>
          <div onClick={() => navigate("/cart?from=products")}>
            <NonActiveCartIcon />
          </div>
          <div onClick={() => navigate("/profile")}>
            <NonActiveProfileIcon />
          </div>
        </footer>
      }
    </Layout>
  );
}
export default Home;
