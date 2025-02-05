import React, {useState} from "react";
import "./categoriesTree.scss";
import ActiveBagIcon from "../../assets/svg/active-bag-icon";
import {HeartOutlined, MenuOutlined} from "@ant-design/icons";
import NonActiveCartIcon from "../../assets/svg/non-active-cart-icon";
import NonActiveProfileIcon from "../../assets/svg/non-active-profile-icon";
import RePoizonMainLogo from "../../assets/svg/re-poizon-main-logo";
import RePoizonMainMiddleLogo from "../../assets/svg/re-poizon-main-middle-logo";
import GenderSwitcher from "../GenderSwitcher/GenderSwitcher";
import Header from "../Header/Header";
import {useNavigate, useSearchParams} from "react-router-dom";

const categories = [
    /*{ name: "Идеи", subcategories: [] },
    { name: "Новинки", subcategories: [] },*/
    { name: "Одежда", subcategories: [
        {
            name: "Все товары",
            id: 'all'
        },
        {
            name:"Штаны",
            categoryLvl: 2,
            id: 1002767
        },
        {
            name: 'Верхняя одежда',
            categoryLvl: 2,
            id: 1002606
        }]
    },
    { name: "Обувь", subcategories: [
            {
                name: "Все товары",
                categoryLvl: 1,
                id: 29
            },
            {
                name: "Кроссовки и кеды",
                categoryLvl: 2,
                id: 35
            },
            {
                name: "Обувь для спорта",
                categoryLvl: 2,
                id: 30
            },
            {
                name: 'Тапки',
                categoryLvl: 2,
                id: 410
            },
            {
                name: 'Ботинки',
                categoryLvl: 2,
                id: 292
            },
        ]
    },
    //{ name: "Обувь", subcategories: ["Новинки от мировых брендов", "Все товары", "Ботинки", "Домашняя обувь", "Кроссовки и кеды", "Мокасины и топсайдеры", "Резиновая обувь", "Сабо", "Сандалии", "Сапоги", "Слипы"] },
    /*{ name: "Красота", subcategories: [] },
    { name: "Аксессуары", subcategories: [] },
    { name: "Premium", subcategories: [] },
    { name: "Спорт", subcategories: [] },
    { name: "Дом", subcategories: [] },
    { name: "Распродажа", subcategories: [] },*/
];


function CategoriesTree() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(1);

    const search = searchParams.get("search");
    const sizesParam = searchParams.get("sizes");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const gender = localStorage.getItem("gender") || "men";
    const [showFilters, setShowFilters] = useState(false);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category.name);
        setSubcategories(category.subcategories);
    };

    const handleSubCategoryClick = (subcategory) => {
        setSelectedCategory(subcategory?.name);
        setSubcategories(subcategory?.subcategories);
        console.log('subcategory=',subcategory)
        console.log('subcategory.id=',subcategory.id)
        window.location.href = `/${gender}/products?category${subcategory.categoryLvl}Id=${subcategory.id}`;
    };

    const isDesktopScreen = window?.innerWidth > 768;
    const isEnabledFilters = !!(minPriceParam || maxPriceParam || sizesParam);

    return (
        <div className="categoriesWrapper">
            <div className="main-logo-wrapper">
                {isDesktopScreen ? <RePoizonMainLogo/> : <RePoizonMainMiddleLogo />}
                {isDesktopScreen ?
                    <div className="actions-btns">
                        <GenderSwitcher/>
                        <div onClick={() => navigate("/profile")}>
                            <NonActiveProfileIcon/>
                        </div>
                    </div>
                    : <div className="actions-btns">
                        <MenuOutlined style={{fontSize: '22px'}} onClick={() => navigate(`/products`)}/>
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
            <div className="category-selector">
                <div className="categories">
                    {!selectedCategory && categories?.map((category) => (
                        <div key={category.name}>
                            <button
                                className={`category-button`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category.name}
                            </button>
                        </div>
                    ))}
                    {selectedCategory && subcategories?.map((subcategory) => (
                        <div key={subcategory.id}>
                            <button
                                className={`category-button`}
                                onClick={() => handleSubCategoryClick(subcategory)}
                            >
                                {subcategory.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <footer>
                <div onClick={() => navigate("/products")}>
                    <ActiveBagIcon/>
                </div>
                <div>
                    <MenuOutlined style={{fontSize: '22px'}} onClick={() => navigate('/products')}/>
                </div>
                <div onClick={() => navigate("/cart?from=products")}>
                    <NonActiveCartIcon/>
                </div>
                <div style={{fontSize: '26px'}} onClick={() => navigate("/favorites")}>
                    <HeartOutlined/>
                </div>
                <div onClick={() => navigate("/profile")}>
                    <NonActiveProfileIcon/>
                </div>
            </footer>
        </div>

    );
}

export default CategoriesTree;
