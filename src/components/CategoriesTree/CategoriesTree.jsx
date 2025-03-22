import React, {useEffect, useState} from "react";
import "./categoriesTree.scss";
import NonActiveProfileIcon from "../../assets/svg/non-active-profile-icon";
import RePoizonMainBigLogo from "../../assets/svg/re-poizon-main-middle-big-logo";
import RePoizonMainMiddleLogo from "../../assets/svg/re-poizon-main-middle-logo";
import GenderSwitcher from "../GenderSwitcher/GenderSwitcher";
import Header from "../Header/Header";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Layout} from "antd";
import CategoryCard from "../CategoryCard";
import {FILLED_CATEGORIES} from "../constants";

function CategoriesTree() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(1);

    const search = searchParams.get("search");
    const sizesParam = searchParams.get("sizes");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const gender = localStorage.getItem("gender") || "men";
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        window.scrollTo({top: 0})
    }, [])

    const handleCategoryClick = (category) => {
        setSelectedCategory(category.name);
        setSubcategories(category.children);
    };

    const handleSubCategoryClick = (subcategory) => {
        if (subcategory?.children?.length > 0) {
            setSelectedCategory(subcategory?.name);
            setSubcategories(subcategory?.children);
        }

        if (subcategory?.children?.length) {
            return;
        }

        window.location.href = `/${gender}-products?category${subcategory.categoryLvl}Id=${subcategory.id}`;
    };

    const isDesktopScreen = window?.innerWidth > 768;
    const isEnabledFilters = !!(minPriceParam || maxPriceParam || sizesParam);


    return (
        <Layout>
            {selectedCategory &&
                <CategoryCard
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    subcategories={subcategories}
                    handleSubCategoryClick={handleSubCategoryClick}
                />
            }
            {!selectedCategory &&
                <>
                    <div className="categoriesWrapper">
                        <div className="main-logo-wrapper">
                            {isDesktopScreen ? <div onClick={() => navigate('/products')} style={{cursor: "pointer", zIndex: "5"}}><RePoizonMainBigLogo/></div> : <div onClick={() => navigate('/products')} style={{cursor: "pointer", zIndex: "5"}}><RePoizonMainMiddleLogo/></div>}
                            {isDesktopScreen ?
                                <div className="actions-btns">
                                    <GenderSwitcher/>
                                    <div className="items-wrapper">
                                        <div className="item" onClick={() => navigate("/profile")}>
                                            <img style={{height: '23px'}}
                                                 src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C.png"
                                                 alt=""/>
                                            Профиль
                                        </div>
                                        <div className="item" onClick={() => navigate("/favorites")}>
                                            <img style={{height: '23px'}}
                                                 src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5.png"
                                                 alt=""/>
                                            Избранное
                                        </div>
                                        <div className="item" onClick={() => navigate("/cart")}>
                                            <img style={{height: '23px'}}
                                                 src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0.png"
                                                 alt=""/>
                                            Корзина
                                        </div>
                                    </div>
                                </div>
                                : <div className="actions-btns">
                                    {/*<MenuOutlined style={{fontSize: '22px'}} onClick={() => navigate(`/products`)}/>
                        <div onClick={() => navigate("/profile")}>
                            <NonActiveProfileIcon/>
                        </div>*/}
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
                        <div className="category-selector">
                            <div className="categories">
                                {!selectedCategory && FILLED_CATEGORIES?.map((category) => (
                                    <div key={category?.name}>
                                        <button
                                            className={`category-button`}
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            {category?.name}
                                        </button>
                                    </div>
                                ))}
                                {selectedCategory && subcategories?.map((subcategory) => (
                                    <div key={subcategory?.id}>
                                        <button
                                            className={`category-button`}
                                            onClick={() => handleSubCategoryClick(subcategory)}
                                        >
                                            {subcategory?.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <footer>
                            <div onClick={() => navigate("/products")}>
                                <img style={{height: '26px'}}
                                     src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/1.%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F.png"
                                     alt=""/>
                            </div>
                            <div onClick={() => navigate(`/${gender}-categories/`)}>
                                <img style={{height: '26px'}}
                                     src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/2.%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%20%D0%B0%D0%BA%D1%82%D0%B8%D0%B2.png"
                                     alt=""/>
                            </div>
                            <div onClick={() => navigate("/cart")}>
                                <img style={{height: '26px'}}
                                     src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0.png"
                                     alt=""/>
                            </div>
                            <div onClick={() => navigate("/favorites")}>
                                <img style={{height: '26px'}}
                                     src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5.png"
                                     alt=""/>
                            </div>
                            <div onClick={() => navigate("/profile")}>
                                <img style={{height: '26px'}}
                                     src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C.png"
                                     alt=""/>
                            </div>
                        </footer>
                    </div>
                </>
            }
        </Layout>


    );
}

export default CategoriesTree;
