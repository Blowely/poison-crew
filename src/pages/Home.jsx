import React, {useCallback, useEffect, useMemo, useState} from "react";
import Card from "../components/Card";
import AdidasIcon from "../assets/svg/brands/adidas-icon";
import NikeIcon from "../assets/svg/brands/nike-icon";
import CoachIcon from "../assets/svg/brands/coach-icon";
import MoreIcon from "../assets/svg/brands/more-icon";
import {Layout, Pagination} from "antd";
import Header from "../components/Header/Header";
import {useGetProductsQuery} from "../store/products.store";
import "../index.scss"
import {ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import ActiveBagIcon from "../assets/svg/active-bag-icon.js";
import {useNavigate, useSearchParams} from "react-router-dom";
import {usePrevious} from "../hooks/usePrevios";
import {useAppDispatch, useAppSelector} from "../store";
import {addAddress} from "../common/accountSlice";
import {addProducts} from "../common/productsSlice";
import NonActiveCartIcon from "../assets/svg/non-active-cart-icon";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";
import RePoizonMainLogo from "../assets/svg/re-poizon-main-logo";
import RePoizonMainMiddleLogo from "../assets/svg/re-poizon-main-middle-logo";


function Home({onAddToFavorite, onAddToCart}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const productsSlice = useAppSelector((state) => state.products);

  const [searchParams, setSearchParams] = useSearchParams();

  const [limit, setLimit] = useState(20);
  const [test, setTest] = useState([]);

  const search = searchParams.get('search');
  const collection = searchParams.get('collName') || 'personal';
  const offset = searchParams.get('offset');
  const type = searchParams.get('type');

  const buildRequest = () => {
    let obj = {
      limit: 20,
      search: search?.toLowerCase(),
      collName: 'personal',
    }

    if (collection) {
      obj.collName = collection
    }

    if (offset) {
      obj.offset = offset;
    }

    return obj;
  }

  const { data: products = { items: [], totalCount: 0 }, isLoading, refetch } = useGetProductsQuery(buildRequest())

  const searchOrCollection = search || collection;
  const prevCollectionValue = usePrevious(searchOrCollection);
  const trimCollectionValue = (searchOrCollection).replace(/ /g,'');

  useEffect(() => {
    if (productsSlice[trimCollectionValue]?.length) {
      if (prevCollectionValue !== searchOrCollection) {
        dispatch(addProducts({
          [trimCollectionValue]: products?.items
        }));
      } else {
        dispatch(addProducts({
          [trimCollectionValue]: [...productsSlice[trimCollectionValue], ...products?.items]
        }));
      }
    } else if (products?.items?.length){
      try {
        dispatch(addProducts({
          [trimCollectionValue]: products?.items
        }));
      } catch (e) {
        console.log('e =', e);
      }
    }
  }, [products?.items])

  const renderItems = () => {
      return (isLoading ? [...Array(8)] : productsSlice[trimCollectionValue] || []).map((item, index) => (
          <Card
              id={item?._id}
              key={index}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              loading={isLoading}
              imageUrl={item?.images[0]}
              price={item?.price}
              {...item}
          />
      ));
  }

  const docElements = document.getElementsByClassName('cards-section-wrapper');

  let currentPage = true;

  useEffect(() => {
    currentPage = false;
  }, [products])

  window.addEventListener("scroll", function(event) {
    try {
      const lastEl = docElements[0]?.children[docElements[0]?.children?.length - 1]?.offsetTop - 600;
      const windowPageYOffset = window.pageYOffset;

      if (windowPageYOffset >= lastEl && !isLoading && !currentPage) {
        currentPage = true;
        refetch();

        if (products.items.length === limit) {
          let prevOffset = Number(offset);
          searchParams.set('offset', (prevOffset += 20).toString())
        }
      }
    } catch (e) {
      console.log('e =', e);
    }
  }, false);

  const isDesktopScreen = window.screen.availWidth > 600;

  return (
    <Layout style={{backgroundColor: 'white'}}>
        <div className="main-logo-wrapper">
          <div className="main-logo-line"></div>
          {isDesktopScreen
            ? <RePoizonMainLogo/>
            : <RePoizonMainMiddleLogo/>
          }

          <div className="main-logo-line"></div>
        </div>
      <Header/>
      <div className="content">
        <div className="brands-section-wrapper">
          <div className="brands-section-wrapper_card" onClick={() => navigate('/products')}>
            <div className="brands-section-wrapper_card-icon">
              <AdidasIcon  />
            </div>
            <div style={{fontWeight: "bold", fontSize:'10px'}}>ADIDAS</div>
          </div>
          <div className="brands-section-wrapper_card" >
            <div className="brands-section-wrapper_card-icon">
              <NikeIcon  />
            </div>
            <div style={{fontWeight: "bold", fontSize:'10px'}}>NIKE</div>
          </div>
          <div className="brands-section-wrapper_card" >
            <div className="brands-section-wrapper_card-icon">
              <CoachIcon  />
            </div>
            <div style={{fontWeight: "bold", fontSize:'10px'}}>COACH</div>
          </div>
          <div className="brands-section-wrapper_card" >
            <div className="brands-section-wrapper_card-icon">
              <MoreIcon  />
            </div>
            <div style={{fontWeight: "bold", fontSize:'10px'}}>Больше</div>
          </div>
        </div>
        <div className="cards-section-wrapper">{renderItems()}</div>
      </div>
      <footer>
        <div onClick={() => navigate('/products')}><ActiveBagIcon/></div>
        <div onClick={() => navigate('/cart?from=products')}>
          <NonActiveCartIcon  />
        </div>
        <div onClick={() => navigate('/profile')}>
          <NonActiveProfileIcon  />
        </div>
      </footer>
    </Layout>

  );
}
export default Home;
