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
import {Button, Empty, Layout, Modal, Select} from "antd";
import Header from "../components/Header/Header";
import { useGetProductsQuery } from "../store/products.store";
import "../index.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePrevious } from "../hooks/usePrevios";
import { useAppDispatch, useAppSelector } from "../store";
import {addProducts} from "../common/productsSlice";
import "../components/InitAnimation/InitAnimation.styles.scss";
import { startLoaderAnimation } from "../components/InitAnimation/InitAnimation";
import Product from "./Product";
import Filters from "../components/Filters";
import NewBalanceIcon from "../assets/svg/brands/mlb-icon";
import Categories from "../components/Categories/Categories";
import FilterTags from "../components/Tag/Tag";
import GenderSwitcher from "../components/GenderSwitcher/GenderSwitcher";
import {COLOR_LIST, SORT_OPTIONS, SORT_TYPES} from "./constants";
import {LeftOutlined} from "@ant-design/icons";
import {CATEGORIES} from "../components/constants";
import BrandsModalSelector from "../components/BrandsModalSelector/BrandsModalSelector";
import ConverseIcon from "../assets/svg/brands/converse-icon";
import FilaIcon from "../assets/svg/brands/fila-icon";
import Sidebar from "../components/Sidebar/Sidebar";
import SizesModalSelector from "../components/SizesModalSelector/SizesModalSelector";
import MainLogoComponent from "../components/MainLogoComponent/MainLogoComponent";
import PhoneFooter from "../components/PhoneFooter/PhoneFooter";
import IconHeartSmall from "../assets/svg/iconHeartSmall";
import {clearCart} from "../common/cartSlice";

function Home({ onAddToFavorite, onAddToCart }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const productsSlice = useAppSelector((state) => state.products);

  const sizesParam = searchParams.get("sizes");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const colorsParam = searchParams.get("colors");
  const category1IdParam = searchParams.get("category1Id");
  const category2IdParam = searchParams.get("category2Id");
  const category3IdParam = searchParams.get("category3Id");
  const brandsParam = searchParams.get("brandIds");
  const categoryName = searchParams.get("categoryName");


  const [limit] = useState(20);
  const [offset, setOffset] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState(minPriceParam || '');
  const [maxPrice, setMaxPrice] = useState(maxPriceParam || '');
  const [sizes, setSizes] = useState(!!sizesParam ? sizesParam?.split(',') : []);
  const [selectedBrands, setSelectedBrands] = useState(!!brandsParam ? brandsParam?.split(',') : []);
  const [colors, setColors] = useState(!!colorsParam ? colorsParam?.split(',') : []);
  const [isOpenBrandsModal, setOpenBrandsModal] = useState(false);
  const [isOpenSizesModal, setOpenSizesModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const search = searchParams.get("search");
  const collection = searchParams.get("collName") || "";
  const type = searchParams.get("type");
  const url = searchParams.get("url");
  const spuId = searchParams.get("spuId");
  const sortBy = searchParams.get("sortBy");
  const category1Id = searchParams.get("category1Id");
  const category2Id = searchParams.get("category2Id");
  const category3Id = searchParams.get("category3Id");

  const selectedCategory = category1Id || category2Id || category3Id;

  const [sort, setSort] = useState(sortBy || 'by-relevance');

  const filtersRef = useRef(null);

  const gender = localStorage.getItem("gender") || "men";

  const isDesktopScreen = window?.innerWidth > 768;

  useEffect(() => {
    startLoaderAnimation();
  }, []);

  const buildRequest = () => {
    const genderToFit = {
      'women': ['FEMALE'],
      'men': ['MALE'],
    }

    let obj = {
      limit: 20,
      search: search?.toLowerCase(),
      fit: genderToFit[gender],
      sort: sortBy || 'by-relevance'
    };

    if (brandsParam) {
      obj.brandIds = brandsParam;
    }
/*
    if (selectedBrands?.length) {
      obj.brandIds = selectedBrands.map(({id}) => id).join(',');
    }*/

    if (collection) {
      obj.collName = collection;
    }

    obj.page = offset || 1;

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

    if (category3IdParam) {
      obj.category3Id = category3IdParam;
    }

    if (category2IdParam) {
      obj.category2Id = category2IdParam;
    }

    if (category1IdParam) {
      obj.category1Id = category1IdParam;
    }

    return obj;
  };

  const {
    data: products = { items: [], totalCount: 0 },
    isFetching: isLoading,
  } = useGetProductsQuery(buildRequest());

  const searchOrCollection = `${category3IdParam}+${category2IdParam}+${category1IdParam}+${search}+${sizesParam}`+
    `+${minPriceParam}+${maxPriceParam}+${sortBy}+${colorsParam}+${brandsParam}+${gender}` || collection;
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

  const onCardClickHandler = (item) => {

    setSelectedProduct(item);
    const spuId = item?.spuId || '';
    searchParams.set('spuId', spuId);
    setSearchParams(searchParams);
    localStorage.setItem('product', JSON.stringify(item));
  };

  let startY = 0;
  let isScrolling = false;

  const onPointerDown = (event) => {
    startY = event.touches ? event.touches[0].clientY : event.clientY;
    isScrolling = false;
  };

  const onPointerMove = () => {
    isScrolling = true;
  };

  const onPointerUp = (item, event) => {
    const endY = event.changedTouches ? event.changedTouches[0].clientY : event.clientY;
    const diff = Math.abs(startY - endY);

    if (!isScrolling && diff < 5) {
      onCardClickHandler(item);
    }
  };

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
    };
  }, []);

  const renderItems = () => {
    console.log('isLoading',isLoading);
    console.log('loading',loading);
    let productsItems = productsSlice[trimCollectionValue] || []

    productsItems = [...productsItems, ...[...Array(15)]];

    if (productsSlice[trimCollectionValue]?.length && products?.items?.length < 20 && !isLoading && !loading) {
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

    return (
        <div className="cards-section-wrapper">
          {productsItems?.filter((product) => !product?.isDeleted)?.map((item, index) => {
            const image = item?.images[0] || '';
            const title = item?.name || '';
            const price = item?.price || '';

            return (
                <div key={`${item?.spuId}-${index}`}>
                  <Card
                      onFavorite={(obj) => onAddToFavorite(obj)}
                      onPlus={(obj) => onAddToCart(obj)}
                      loading={isLoading}
                      image={image}
                      price={price}
                      item={item}
                      name={title}
                      onPointerDown={onPointerDown}
                      onPointerUp={onPointerUp}
                      onTouchStart={onPointerDown}
                      onTouchEnd={onPointerUp}
                  />
                </div>
            );
          })}
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
    if (brand.toString() === brandsParam) {
      searchParams.delete('brandIds');
      return setSearchParams(searchParams);
    }

    setSelectedBrands((prev) => [...prev, Number(brand)]);
    setLoading(true);
    setOffset(1);
    searchParams.set('brandIds', brand);
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
    if (brandsParam === selectedBrandId.toString()) {
      return {border: "1px solid grey"};
    } else {
      return {border: "1px solid white"};
    }
  }

  const handleChange = (value) => {
    setLoading(true);
    searchParams.set('sortBy', value);
    setSearchParams(searchParams);
    setSort(value);
    setOffset(1);
  };

  const getCategoryTitle = () => {
    if (!selectedCategory) {
      return '';
    }

    const index = CATEGORIES.findIndex((el) => el.id === Number(selectedCategory));

    return <span style={{cursor: "pointer"}}>{CATEGORIES[index]?.name
      || categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
      || ''}</span> ;
  }

  const onGoBackClick = () => {
    return window.history.go(-1);
  }

  const onApplyBrandsClick = () => {
    if (!selectedBrands.length) {
      return;
    }

    setLoading(true);
    setOffset(1);
    searchParams.set('brandIds', selectedBrands.join(','));
    setSearchParams(searchParams);
    setOpenBrandsModal(false);
  }

  const onApplySizesClick = () => {
    setLoading(true);
    setOffset(1);

    if (!sizes.length) {
      searchParams.delete('sizes');
    } else {
      searchParams.set('sizes', sizes.join(','));
    }
    setSearchParams(searchParams);
    setOpenSizesModal(false);
  }

  const onCancelBrandsClick = () => {
    setOffset(1);
    setSelectedBrands([]);
    searchParams.delete('brandIds');
    setSearchParams(searchParams);
    setOpenBrandsModal(false);
  }

  const onCancelSizesClick = () => {
    setOffset(1);
    setSizes([]);
    searchParams.delete('sizes');
    setSearchParams(searchParams);
    setOpenSizesModal(false);
  }

  const scrollButton = document.getElementById('scrollToTop');

  window?.addEventListener('scroll', () => {
    if (window?.scrollY > 200) {
      scrollButton?.classList?.add('show');
    } else {
      scrollButton?.classList?.remove('show');
    }
  });

  scrollButton?.addEventListener('click', () => {
    window?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  const onInfoBlockItemClick = (link) => {
    window.open(link);
  }

  return (
      <Layout style={{ backgroundColor: "white", position: "relative" }}>
        {spuId && <div className="productWrapper" id="productWrapper">
          <Product selectedProduct={selectedProduct} setLoading={setLoading} setOffset={setOffset} />
        </div>
        }
        {isOpenBrandsModal && (
            <Modal
                title="Бренды"
                open={isOpenBrandsModal}
                onOk={onApplyBrandsClick}
                cancelButtonProps={(<Button>Сбросить</Button>)}
                cancelText={<Button onClick={onCancelBrandsClick}>Сбросить</Button>}
                okText="Применить"
                centered={!isDesktopScreen}
                onCancel={(e) => {
                  setOpenBrandsModal(false);
                }}
                className="custom-modal"
            >
              <div
                  style={{
                    display: "grid",
                    padding: "15px",
                    borderBottom: "1px solid #ececec",
                    gap: "15px",
                  }}
              >
                <div style={{fontSize: "22px", fontWeight: "500"}}>
                  Бренды
                </div>
                <BrandsModalSelector brands={selectedBrands} setBrands={setSelectedBrands}/>
              </div>
            </Modal>
        )}
        {isOpenSizesModal && (
            <Modal
                title="Размеры, EU"
                open={isOpenSizesModal}
                onOk={onApplySizesClick}
                cancelButtonProps={(<Button>Сбросить</Button>)}
                cancelText={<Button onClick={onCancelSizesClick}>Сбросить</Button>}
                okText="Применить"
                centered={!isDesktopScreen}
                onCancel={(e) => {
                  setOpenSizesModal(false);
                }}
                className="custom-modal"
            >
              <div
                  style={{
                    display: "grid",
                    padding: "15px",
                    borderBottom: "1px solid #ececec",
                    gap: "15px",
                  }}
              >
                <div style={{fontSize: "22px", fontWeight: "500"}}>
                  Размеры, EU
                </div>
                <SizesModalSelector sizes={sizes} setSizes={setSizes}/>
              </div>
            </Modal>
        )}
        <div className="filters-phone-wrapper" style={{display: showFilters ? 'block' : 'none'}}
             ref={filtersRef}>
          <Filters
              setShowFilters={setShowFilters}
              sizes={sizes}
              colors={colors}
              minPrice={minPrice}
              maxPrice={maxPrice}
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
        {isDesktopScreen && <div className="info-block-wrapper">
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
        {!isDesktopScreen && <MainLogoComponent />}
        {!spuId &&
            <Header search={search}
                    showFilters={showFilters}
                    setOffset={setOffset}
                    setLoading={setLoading}
                    setShowFilters={setShowFilters}
                    isEnabledFilters={isEnabledFilters}
            />
        }

        <div className="productsListWrapper">

          {!isDesktopScreen && <GenderSwitcher setOffset={setOffset} setLoading={setLoading}/>}

          <div className="content">

            {selectedCategory && !isDesktopScreen &&
                <div className="category-title" onClick={onGoBackClick}><LeftOutlined/>{getCategoryTitle()}</div>}

            {!selectedCategory &&
                <>
                  <div className="brands-section-wrapper">
                    <div className="brands-section-wrapper_card"
                         onClick={() => onBrandClick(144)}>
                      <div className="brands-section-wrapper_card-icon" style={getBorderStyle(144)}>
                        <NikeIcon/>
                      </div>
                      <div className="brand-section-name">Nike</div>
                    </div>
                    <div
                        className="brands-section-wrapper_card"
                        onClick={() => onBrandClick(494)}
                    >
                      <div className="brands-section-wrapper_card-icon" style={getBorderStyle(494)}>
                        <AdidasIcon/>
                      </div>
                      <div className="brand-section-name">Adidas</div>
                    </div>
                    <div
                        className="brands-section-wrapper_card"
                        onClick={() => onBrandClick(4)}
                    >
                      <div className="brands-section-wrapper_card-icon" style={getBorderStyle(4)}>
                        <NewBalanceIcon/>
                      </div>
                      <div className="brand-section-name">NB</div>
                    </div>

                    <div className="brands-section-wrapper_card"
                         onClick={() => onBrandClick(13)}>
                      <div className="brands-section-wrapper_card-icon" style={getBorderStyle(13)}>
                        <JordanIcon/>
                      </div>
                      <div className="brand-section-name">Jordan</div>
                    </div>
                    <div
                        className="brands-section-wrapper_card"
                        onClick={() => onBrandClick(176)}
                    >
                      <div className="brands-section-wrapper_card-icon" style={getBorderStyle(176)}>
                        <ConverseIcon/>
                      </div>
                      <div className="brand-section-name">Converse</div>
                    </div>
                    <div
                        className="brands-section-wrapper_card"
                        onClick={() => onBrandClick(1318)}
                    >
                      <div className="brands-section-wrapper_card-icon" style={getBorderStyle(1318)}>
                        <FilaIcon/>
                      </div>
                      <div className="brand-section-name">Fila</div>
                    </div>

                    <div className="brands-section-wrapper_card"
                         onClick={() => setOpenBrandsModal(true)}>
                      <div className="brands-section-wrapper_card-icon">
                        <MoreIcon/>
                      </div>
                      <div className="brand-section-name">Больше</div>
                    </div>
                  </div>
                  <Categories setLoading={setLoading} setOffset={setOffset}/>
                </>
            }
            <div className="filters-content-wrapper">
              {isDesktopScreen && (
                  <div className="filters-wrapper" ref={filtersRef}>
                    <Filters
                        search={search}
                        brandIds={selectedBrands}
                        sizes={sizes}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        colors={colors}
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
              <div style={{width: isDesktopScreen ? "calc(100% - 290px)" : "100%"}}>
                {selectedCategory && isDesktopScreen &&
                    <div className="category-title" onClick={onGoBackClick}><LeftOutlined/>{getCategoryTitle()}</div>}
                <div className="filters-tags-wrapper">
                  <FilterTags
                      setOffset={setOffset}
                      setSizes={setSizes}
                      setColors={setColors}
                      setBrands={setSelectedBrands}
                      setOpenBrandsModal={setOpenBrandsModal}
                      setOpenSizesModal={setOpenSizesModal}
                      setLoading={setLoading}
                  />

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
          {!spuId &&
              <div className="scroll-top" id="scrollToTop">
                <img src="https://storage.yandexcloud.net/pc-mediafiles/icons/%D0%9D%D0%B0%D0%B7%D0%B0%D0%B4%20(1).png"
                     alt=""/>
              </div>
          }

          {!isDesktopScreen &&
              <PhoneFooter tab="products"/>
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
