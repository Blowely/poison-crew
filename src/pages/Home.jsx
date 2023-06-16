import React, {useEffect, useState} from "react";
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
import BagIcon from "../assets/svg/bag-icon.js";
import {useNavigate, useSearchParams} from "react-router-dom";
import {usePrevious} from "../hooks/usePrevios";


function Home({onAddToFavorite, onAddToCart}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [collectionValue, setCollectionValue] = useState('');

  const [limit, setLimit] = useState(20);

  const search = searchParams.get('search');
  const collection = searchParams.get('collName');
  const type = searchParams.get('type');

  let obj;


  const buildRequest = () => {
    obj = {
      limit: 20,
      search: search,
      collName: 'personal',
    }


    if (collection) {
      obj.collName = collection
    }

    return obj;
  }



  const { data: products = { items: [], totalCount: 0 }, isLoading, refetch } = useGetProductsQuery(buildRequest())

  const [handledProducts, setHandledProducts] = useState([]);

  const prevCollectionValue = usePrevious(collectionValue);

 /* useEffect(() => {
    console.log('obj = ', obj);
    console.log('prevReqObj = ', prevReqObj);
    if (JSON.stringify(prevReqObj) !== JSON.stringify(obj)){
      console.log('1')
      return setHandledProducts(products.items);
    } else if (handledProducts.length){
      return setHandledProducts((prev) => [...prev, ...products?.items]);
    }
  }, [obj, products])*/

  useEffect(() => {
    console.log('collectionValue =',collectionValue);
    console.log('prevCollectionValue =',prevCollectionValue);
    console.log('handledProducts =',handledProducts);
    if (handledProducts.length) {
      if (prevCollectionValue !== collectionValue) {
        console.log('123');

        setHandledProducts(products.items);
      } else {
        console.log('321');
        setHandledProducts((prev) => [...prev, ...products.items])
      }

    } else if (products?.items?.length){
      console.log('products',products.items )
      setHandledProducts(products.items);
    }
  }, [products.items, collectionValue])

  const renderItems = () => {
      return (isLoading ? [...Array(8)] : handledProducts).map((item, index) => (
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
  };

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
      }
    } catch (e) {
      console.log('e =', e);
    }
  }, false);

  return (
    <Layout style={{backgroundColor: 'white'}}>
      <Header setCollectionValue={setCollectionValue}/>
      <div className="content">
        {/*<div className="d-flex align-center justify-between mb-40">
              <h1>{searchValue ? `Search for "${searchValue}"` : "All Sneakers"}</h1>
              <div className="Search-block d-flex">
                  <svg width={20} height={40} src="svg/search.svg" alt="searchIcon" />
                  {searchValue && (
                      <svg
                          onClick={() => setSearchValue("")}
                          className=" clear cu-p"
                          src="/svg/btn-remove.svg"
                          alt="Clear"
                      />
                  )}
                  <input
                      onChange={onChangeSearchInput}
                      value={searchValue}
                      placeholder="Search..."
                  />
              </div>
          </div>*/}
        <div className="brands-section-wrapper">
          <div className="brands-section-wrapper_card" >
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
        <Pagination
          total={products.totalCount}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
        />
      </div>
      <footer>
        <div onClick={() => navigate('/products')}><BagIcon/></div>
        <ShoppingCartOutlined style={{ fontSize: '30px'}} onClick={() => navigate('/cart?from=products')}/>
        <UserOutlined style={{ fontSize: '30px'}} onClick={() => navigate('/profile')} />
      </footer>
    </Layout>

  );
}
export default Home;
