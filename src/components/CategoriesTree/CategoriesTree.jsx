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
import MainLogoComponent from "../MainLogoComponent/MainLogoComponent";
import PhoneFooter from "../PhoneFooter/PhoneFooter";

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

        navigate(`/${gender}-products?category${subcategory.categoryLvl}Id=${subcategory.id}`)
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
                        <MainLogoComponent />
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
                        <PhoneFooter tab="categories" />
                    </div>
                </>
            }
        </Layout>


    );
}

export default CategoriesTree;
