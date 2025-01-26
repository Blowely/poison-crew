import React, {
  Suspense,
  useEffect,
  useRef,
  useState
} from "react";
import Card from "../components/Card";
import AdidasIcon from "../assets/svg/brands/adidas-icon";
import NikeIcon from "../assets/svg/brands/nike-icon";
import JordanIcon from "../assets/svg/brands/jordan-icon";
import MoreIcon from "../assets/svg/brands/more-icon";
import {Button, Empty, Layout, Pagination, Select} from "antd";
import Header from "../components/Header/Header";
import { useGetProductsQuery } from "../store/products.store";
import "../index.scss";
import ActiveBagIcon from "../assets/svg/active-bag-icon.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePrevious } from "../hooks/usePrevios";
import { useAppDispatch, useAppSelector } from "../store";
import {addProducts, clearProducts} from "../common/productsSlice";
import NonActiveCartIcon from "../assets/svg/non-active-cart-icon";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";
import RePoizonMainLogo from "../assets/svg/re-poizon-main-logo";
import RePoizonMainMiddleLogo from "../assets/svg/re-poizon-main-middle-logo";
import "../components/InitAnimation/InitAnimation.styles.scss";
import { startLoaderAnimation } from "../components/InitAnimation/InitAnimation";
import Product from "./Product";
import Filters from "../components/Filters";
import NewBalanceIcon from "../assets/svg/brands/mlb-icon";
import Categories from "../components/Categories/Categories";
import FilterTags from "../components/Tag/Tag";
import GenderSwitcher from "../components/GenderSwitcher/GenderSwitcher";
import {COLOR_LIST, SORT_OPTIONS, SORT_TYPES} from "./constants";
import CategoriesTree from "../components/CategoriesTree/CategoriesTree";
import {HeartOutlined, MenuOutlined} from "@ant-design/icons";

function Home({ onAddToFavorite, onAddToCart }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const productsSlice = useAppSelector((state) => state.products);

  const sizesParam = searchParams.get("sizes");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const colorsParam = searchParams.get("colors");

  const [limit] = useState(20);
  const [offset, setOffset] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState(minPriceParam || '');
  const [maxPrice, setMaxPrice] = useState(maxPriceParam || '');
  const [sizes, setSizes] = useState(!!sizesParam ? sizesParam?.split(',') : []);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [colors, setColors] = useState(!!colorsParam ? colorsParam?.split(',') : []);
  const [isShowCategories, setShowCategories] = useState(false);


  const [loading, setLoading] = useState(false);

  const search = searchParams.get("search");
  const brandId = searchParams.get("brandId");
  const categoryId = searchParams.get("categoryId");
  const collection = searchParams.get("collName") || "";
  const type = searchParams.get("type");
  const url = searchParams.get("url");
  const spuId = searchParams.get("spuId");
  const sortBy = searchParams.get("sortBy");

  const [sort, setSort] = useState(sortBy || 'by-relevance');

  const filtersRef = useRef(null);
  const gender = localStorage.getItem("gender");
  const sortRef = useRef(null);

  const isDesktopScreen = window?.innerWidth > 768;

  useEffect(() => {
    startLoaderAnimation();
  }, []);

  const buildRequest = () => {
    const genderToFit = {
      'women': ['FEMALE'],
      'men': ['MALE'],
      'kid': ['MALE']
    }

    let obj = {
      limit: 20,
      search: search?.toLowerCase(),
      fit: genderToFit[gender],
      sort: sortBy || 'by-relevance'
    };

    if (brandId) {
      obj.brandId = brandId;
    }

    if (selectedBrands?.length) {
      obj.brandIds = selectedBrands.map(({id}) => id).join(',');
    }

    if (categoryId) {
      obj.categoryId = categoryId;
    }

    if (collection) {
      obj.collName = collection;
    }

    if (offset) {
      obj.page = offset;
    }

    if (minPriceParam) {
      obj.minPrice = minPriceParam;
    }

    if (maxPriceParam) {
      obj.maxPrice = maxPriceParam;
    }

    if (sizesParam) {
      obj.sizes = sizesParam;
    }

    if (colorsParam) {
      obj.colors = colorsParam;
    }

    return obj;
  };

  const {
    data: products = { items: [], totalCount: 0 },
    isLoading,
    refetch,
  } = useGetProductsQuery(buildRequest());

  const searchOrCollection = `${categoryId}+${brandId}+${search}+${sizesParam}`+
    `+${minPriceParam}+${maxPriceParam}+${sortBy}+${colorsParam}${selectedBrands?.map(({id}) => `+${id}`)}` || collection;
  const prevCollectionValue = usePrevious(searchOrCollection);
  const trimCollectionValue = searchOrCollection?.replace(/ /g, "");

  useEffect(() => {
    setLoading(false);

    if (productsSlice[trimCollectionValue]?.length) {
      if (prevCollectionValue !== searchOrCollection) {
        dispatch(
          addProducts({
            [trimCollectionValue]: products?.items || [],
          }),
        );
      } else {
        dispatch(
          addProducts({
            [trimCollectionValue]: [
              ...productsSlice[trimCollectionValue],
              ...products?.items || [],
            ],
          }),
        );
      }
    } else if (products?.items?.length) {
      try {
        dispatch(
          addProducts({
            [trimCollectionValue]: products?.items || [],
          }),
        );
      } catch (e) {
        console.log("e =", e);
      }
    }
  }, [products]);

  const renderItems = () => {
    let productsItems = isLoading
      ? [...Array(60)]
      : productsSlice[trimCollectionValue] || []

    productsItems = [...productsItems, ...[...Array(15)]];

    if (productsSlice[trimCollectionValue]?.length && products?.items?.length < 60 && !isLoading && !loading) {
      productsItems = productsSlice[trimCollectionValue]
    }

    if (!productsSlice[trimCollectionValue]?.length && !loading && !isLoading) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{ height: 100, paddingTop: "20px", width: '100%' }}
          description="Ничего не найдено"
          className="empty"
        />
      );
    }

    const onCardClickHandler = (item) => {
      setSelectedProduct(item);
      const spuId = item?.spuId || '';
      searchParams.set('spuId', spuId);
      setSearchParams(searchParams);
      localStorage.setItem('product', JSON.stringify(item));
    }

    return (
      <div className="cards-section-wrapper">
        {productsItems?.filter((product) => !product?.isDeleted)?.map((item, index) => {
          const image = item?.images[0] || '';
          const title = item?.name || '';
          const price = item?.price || '';

          return(
            <div onClick={() => onCardClickHandler(item)} key={index}>
              <Card
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                loading={isLoading}
                image={image}
                price={price}
                item={item}
                name={title}
              />
            </div>
        )})}
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
                  ?.offsetTop - 3500;
          const windowPageYOffset = window.pageYOffset;


          if (windowPageYOffset >= lastEl && !isLoading && !currentPage) {
            currentPage = true;

            if (products.items.length === limit) {
              setOffset((prev) => {
                /*if ((productsSlice?.[trimCollectionValue]?.length || 1) + 1 === prev + 1) {
                  return prev + 1;
                }*/
              console.log('prev=',prev)
              return prev + 1;
            })
          }
        }
      } catch (e) {
        console.log("e =", e);
      }
    },
    false,
  );

  const onBrandClick = (brand) => {
    if (brand.toString() === brandId) {
      searchParams.delete('brandId');
      return setSearchParams(searchParams);
    }

    setLoading(true);
    setOffset(1);
    searchParams.set('brandId', brand);
    setSearchParams(searchParams);
  }

  const onMinPriceChange = (val) => {
    setMinPrice(val);
  }

  const onMaxPriceChange = (val) => {
    setMaxPrice(val);
  }

  const applyFilters = () => {
    window.scrollTo(0, 0);
    setLoading(true);
    setOffset(1);
    setShowFilters(false);

    const params = {
      sizes: sizes.join(',') || null,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      colors: colors
          ?.map((c1) => COLOR_LIST.find((c2) => c2.hex === c1)?.hex)
          .filter(Boolean)
          .join(',') || null,
    };

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });

    setSearchParams(searchParams);
  };


  const isEnabledFilters = !!(minPriceParam || maxPriceParam || sizesParam);

  const body = document.body;

  if (showFilters || url) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }

  const getBorderStyle = (selectedBrandId) => {
    if (brandId === selectedBrandId.toString()) {
      return {border: "1px solid grey"};
    }
  }

  const handleChange = (value) => {
    searchParams.set('sortBy', value);
    setSearchParams(searchParams);
    setSort(value);
    setOffset(1);
  };

  return (
    <Layout style={{ backgroundColor: "white", position: "relative" }}>
      {spuId && <div className="productWrapper" id="productWrapper">
        <Product selectedProduct={selectedProduct}/>
      </div>
      }
      <div className="filters-phone-wrapper" style={{display: showFilters ? 'block' : 'none'}}
           ref={filtersRef}>
        <Filters
          setShowFilters={setShowFilters}
          sizes={sizes}
          colors={colors}
          minPrice={minPrice}
          maxPrice={maxPrice}
          categoryId={categoryId}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          setSizes={setSizes}
          setMinPrice={onMinPriceChange}
          setMaxPrice={onMaxPriceChange}
          setLoading={setLoading}
          setOffset={setOffset}
          setColors={setColors}
        />
        {!isDesktopScreen &&
          <div className="filters-phone-apply-btn">
            <Button
              type="primary"
              className={"btn"}
              onClick={applyFilters}
            >
              <span>Применить</span>
            </Button>
          </div>
        }
      </div>
      <div className="productsListWrapper" style={{position: isShowCategories ? 'fixed' : 'unset'}}>
        <div className="main-logo-wrapper">
          {isDesktopScreen ? <RePoizonMainLogo/> : !isShowCategories && <RePoizonMainMiddleLogo />}
          {isDesktopScreen ?
              <div className="actions-btns">
                <GenderSwitcher/>
                <div onClick={() => navigate("/profile")}>
                  <NonActiveProfileIcon/>
                </div>
              </div>
            : !isShowCategories && <div className="actions-btns">
                <MenuOutlined style={{fontSize: '22px'}} onClick={() => setShowCategories(prev => !prev)}/>
                <div onClick={() => navigate("/profile")}>
                  <NonActiveProfileIcon/>
                </div>
              </div>
          }
        </div>
        <Header search={search}
                showFilters={showFilters}
                setOffset={setOffset}
                setLoading={setLoading}
                setShowFilters={setShowFilters}
                isEnabledFilters={isEnabledFilters}
        />
        {!isDesktopScreen && <GenderSwitcher/>}
        {!isDesktopScreen && isShowCategories &&
            (<div className="categoriesWrapper">
                  <CategoriesTree/>
                  <footer>
                    <div onClick={() => navigate("/products")}>
                      <ActiveBagIcon/>
                    </div>
                    <div>
                      <MenuOutlined style={{fontSize: '22px'}} onClick={() => setShowCategories(prev => !prev)}/>
                    </div>
                    <div onClick={() => navigate("/cart?from=products")}>
                      <NonActiveCartIcon/>
                    </div>
                    <div style={{fontSize: '26px'}} onClick={() => navigate("/favorites")}>
                      <HeartOutlined />
                    </div>
                    <div onClick={() => navigate("/profile")}>
                      <NonActiveProfileIcon/>
                    </div>
                  </footer>
            </div>
        )}

        <div className="content">
          <div className="brands-section-wrapper">
            <div className="brands-section-wrapper_card"
                 onClick={() => onBrandClick(144)}>
              <div className="brands-section-wrapper_card-icon" style={getBorderStyle(144)}>
                <NikeIcon />
              </div>
              <div style={{ fontWeight: "bold", fontSize: "10px" }}>NIKE</div>
            </div>
          <div
            className="brands-section-wrapper_card"
            onClick={() => onBrandClick(494)}
          >
            <div className="brands-section-wrapper_card-icon" style={getBorderStyle(494)}>
              <AdidasIcon />
            </div>
            <div style={{ fontWeight: "bold", fontSize: "10px" }}>ADIDAS</div>
          </div>
          <div
            className="brands-section-wrapper_card"
            onClick={() => onBrandClick(4)}
          >
            <div className="brands-section-wrapper_card-icon" style={getBorderStyle(4)}>
              <NewBalanceIcon />
            </div>
            <div style={{ fontWeight: "bold", fontSize: "10px" }}>NB</div>
          </div>

          <div className="brands-section-wrapper_card"
               onClick={() => onBrandClick(13)}>
            <div className="brands-section-wrapper_card-icon" style={getBorderStyle(13)}>
              <JordanIcon />
            </div>
            <div style={{fontWeight: "bold", fontSize: "10px"}}>Jordan</div>
          </div>

            {isDesktopScreen &&
                <div className="brands-section-wrapper_card"
                     onClick={() => console.log('more')}>
                  <div className="brands-section-wrapper_card-icon">
                    <MoreIcon/>
                  </div>
                  <div style={{fontWeight: "bold", fontSize: "10px"}}>Больше</div>
                </div>
            }
          </div>
          <Categories setLoading={setLoading}/>
          <div className="filters-content-wrapper">
            {isDesktopScreen && (
                <div className="filters-wrapper" ref={filtersRef}>
                  <Filters
                      search={search}
                      brandId={brandId}
                      sizes={sizes}
                      minPrice={minPrice}
                      maxPrice={maxPrice}
                      colors={colors}
                      categoryId={categoryId}
                      selectedBrands={selectedBrands}
                      setSelectedBrands={setSelectedBrands}
                      setSizes={setSizes}
                      setMinPrice={onMinPriceChange}
                      setMaxPrice={onMaxPriceChange}
                      applyFilters={applyFilters}
                      setLoading={setLoading}
                      setOffset={setOffset}
                      setColors={setColors}
                  />
                </div>
            )}
            <div style={{width: "100%"}}>
              <div className="filters-tags-wrapper">
                <FilterTags setOffset={setOffset} setSizes={setSizes} setColors={setColors} />

                <div className="inputs-wrapper">
                  <Select
                      defaultValue={SORT_TYPES[sortBy] || SORT_TYPES["by-relevance"]}
                      value={sort}
                      size="middle"
                      onChange={handleChange}
                      options={SORT_OPTIONS}
                  />
                </div>
              </div>

              <Suspense fallback={<div>Loading...</div>}>{renderItems()}</Suspense>
            </div>
          </div>
        </div>
        {!isDesktopScreen &&
            <footer>
              <div onClick={() => navigate("/products")}>
                <ActiveBagIcon/>
              </div>
              <div>
                <MenuOutlined style={{fontSize: '22px'}} onClick={() => setShowCategories(prev => !prev)}/>
              </div>
              <div onClick={() => navigate("/cart?from=products")}>
                <NonActiveCartIcon/>
              </div>
              <div style={{fontSize: '26px'}} onClick={() => navigate("/favorites")}>
                <HeartOutlined />
              </div>
              <div onClick={() => navigate("/profile")}>
                <NonActiveProfileIcon/>
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
