import React from "react";
import Card from "../components/Card";
import AdidasIcon from "../assets/svg/brands/adidas-icon";
import NikeIcon from "../assets/svg/brands/nike-icon";
import CoachIcon from "../assets/svg/brands/coach-icon";
import MoreIcon from "../assets/svg/brands/more-icon";


function Home({
                  items,
                  searchValue,
                  setSearchValue,
                  onChangeSearchInput,
                  onAddToFavorite,
                  onAddToCart,
                  isLoading,
              }) {
    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                loading={isLoading}
                {...item}
            />
        ));
    };

    return (
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
        </div>
    );
}
export default Home;
