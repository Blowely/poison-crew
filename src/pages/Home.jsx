import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo, useRef,
  useState
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
import Product from "./Product";
import { Logger } from "sass";
import Filters from "../components/Filters";
import MlbIcon from "../assets/svg/brands/mlb-icon";
import NewBalanceIcon from "../assets/svg/brands/mlb-icon";

function Home({ onAddToFavorite, onAddToCart }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const productsSlice = useAppSelector((state) => state.products);

  const [limit, setLimit] = useState(20);
  const [test, setTest] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [filtersWidth, setFilterWidth] = useState(0);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [size, setSize] = useState('');

  const search = searchParams.get("search");
  const collection = searchParams.get("collName") || "";
  let offset = searchParams.get("offset");
  const type = searchParams.get("type");
  const spuId = searchParams.get("spuId");
  const filtersRef = useRef(null);


  const isDesktopScreen = window?.innerWidth > 768;

  useEffect(() => {
    startLoaderAnimation();
  }, []);

  const buildRequest = () => {
    let obj = {
      limit: 20,
      search: search?.toLowerCase(),
    };

    if (collection) {
      obj.collName = collection;
    }

    if (offset) {
      obj.offset = offset;
    }

    if (minPrice) {
      obj.minPrice = minPrice;
    }

    if (maxPrice) {
      obj.maxPrice = maxPrice;
    }

    if (size) {
      obj.size = size;
    }

    return obj;
  };

  const {
    data: products = { items: [], totalCount: 0 },
    isLoading,
    refetch,
  } = useGetProductsQuery(buildRequest());

  const searchOrCollection = search || collection || size || minPrice || maxPrice;
  const prevCollectionValue = usePrevious(searchOrCollection);
  const trimCollectionValue = searchOrCollection?.replace(/ /g, "");

  useEffect(() => {
    console.log('products',products);
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
  }, [products]);

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

    const onCardClickHandler = (item) => {
      setSelectedProduct(item);
      searchParams.set('spuId', item.spuId);
      setSearchParams(searchParams);
      localStorage.setItem('product', JSON.stringify(item));
    }

    return (
      <div className="cards-section-wrapper">
        {productsItems?.filter((product) => !product?.isDeleted)?.map((item, index) => (
          <div onClick={() => onCardClickHandler(item)} key={index}>
            <Card
              id={item?.spuId}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              loading={isLoading}
              images={item?.images}
              price={item?.cheapestPrice}
              item={item}
              {...item}
            />
          </div>
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

  return (
    <Layout style={{ backgroundColor: "white", position: "relative" }}>
      {spuId && <div className="productWrapper" id="productWrapper">
        <Product selectedProduct={selectedProduct}/>
      </div>
      }
      {showFilters &&
        <div className="filters-phone-wrapper"
             ref={filtersRef}>
          <Filters
            setShowFilters={setShowFilters}
            setSize={setSize}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>
      }
      <div className="productsListWrapper">
        <div className="main-logo-wrapper">
          {/*<div
          className="main-logo-line main-logo-line-left"
          style={{
            width: isDesktopScreen
              ? "calc((100vw - 226px - 40px) / 2 )"
              : "calc((100vw - 158px - 40px) / 2 )",
          }}
        />*/}
          {isDesktopScreen ? <RePoizonMainLogo /> : <RePoizonMainMiddleLogo />}

          {/*<div
          className="main-logo-line main-logo-line-right"
          style={{
            width: isDesktopScreen
              ? "calc((100vw - 226px - 40px) / 2 )"
              : "calc((100vw - 158px - 40px) / 2 )",
          }}
        />*/}
        </div>
        <Header showFilters={showFilters} setShowFilters={setShowFilters}/>
        <div className="content">
          <div className="brands-section-wrapper">
            <div className="brands-section-wrapper_card"
                 onClick={() => navigate("/products?search=nike")}>
              <div className="brands-section-wrapper_card-icon">
                <NikeIcon />
              </div>
              <div style={{ fontWeight: "bold", fontSize: "10px" }}>NIKE</div>
            </div>
          <div
            className="brands-section-wrapper_card"
            onClick={() => navigate("/products?search=adidas")}
          >
            <div className="brands-section-wrapper_card-icon">
              <AdidasIcon />
            </div>
            <div style={{ fontWeight: "bold", fontSize: "10px" }}>ADIDAS</div>
          </div>
          <div
            className="brands-section-wrapper_card"
            onClick={() => navigate("/products?search=new+balance")}
          >
            <div className="brands-section-wrapper_card-icon">
              <NewBalanceIcon />
            </div>
            <div style={{ fontWeight: "bold", fontSize: "10px" }}>NEW BALANCE</div>
          </div>
          {isDesktopScreen &&
            <div className="brands-section-wrapper_card"
                 onClick={() => navigate("/products?search=coach")}>
              <div className="brands-section-wrapper_card-icon">
                <CoachIcon />
              </div>
              <div style={{ fontWeight: "bold", fontSize: "10px" }}>COACH</div>
            </div>
          }
          <div className="brands-section-wrapper_card"
               onClick={() => console.log('more')}>
            <div className="brands-section-wrapper_card-icon">
              <MoreIcon />
            </div>
            <div style={{ fontWeight: "bold", fontSize: "10px" }}>Больше</div>
          </div>
        </div>
        <div className="filters-content-wrapper">
          {isDesktopScreen && (
            <div className="filters-wrapper" ref={filtersRef}>
              <Filters
                 setSize={setSize}
                 setMinPrice={setMinPrice}
                 setMaxPrice={setMaxPrice}
              />
            </div>
          )}

          <Suspense fallback={<div>Loading...</div>}>{renderItems()}</Suspense>
        </div>
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
      </div>
      {/*<div className="loader">
        <div className="loader-box-wrapper">
          <div className="loader-box loader-box_black">
            <div className="loader__item_left_partition"></div>
            <div className="loader-box__item loader__item_left">POIZON</div>
          </div>
          <div className="loader-box loader-box_white">
            <div className="loader-box__item loader__item_right">RE</div>
          </div>
        </div>
      </div>*/}



    </Layout>
  );
}
export default Home;
