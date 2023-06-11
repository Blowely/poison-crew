import React from "react";
import Card from "../components/Card";
import AdidasIcon from "../assets/svg/brands/adidas-icon";
import NikeIcon from "../assets/svg/brands/nike-icon";
import CoachIcon from "../assets/svg/brands/coach-icon";
import MoreIcon from "../assets/svg/brands/more-icon";
import {Layout, Pagination} from "antd";
import Header from "../components/Header/Header";
import {useGetProductsQuery} from "../store/products.store";


function Home({
                  onAddToFavorite,
                  onAddToCart,
              }) {


  const buildRequest = () => {
    const obj = {
      limit: 20,
    }
    return obj;
  }

  const { data: products = { items: [], totalCount: 0 }, isLoading } = useGetProductsQuery(buildRequest())

  const renderItems = () => {
      return (isLoading ? [...Array(8)] : products.items).map((item, index) => (
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

  return (
    <Layout style={{backgroundColor: 'white'}}>
      <Header />
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
      <footer></footer>
    </Layout>

  );
}
export default Home;
