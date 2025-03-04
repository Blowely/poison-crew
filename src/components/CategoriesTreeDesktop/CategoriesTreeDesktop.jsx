import React, {useEffect, useState} from "react";
import "./categoriesTreeDesktop.scss";
import NonActiveProfileIcon from "../../assets/svg/non-active-profile-icon";
import RePoizonMainBigLogo from "../../assets/svg/re-poizon-main-middle-big-logo";
import RePoizonMainMiddleLogo from "../../assets/svg/re-poizon-main-middle-logo";
import GenderSwitcher from "../GenderSwitcher/GenderSwitcher";
import Header from "../Header/Header";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Layout} from "antd";
import CategoryCard from "../CategoryCard";

const categories = [
    /*{ name: "Идеи", subcategories: [] },
    { name: "Новинки", subcategories: [] },*/
    { name: "Одежда", subcategories: [
        {
            name: "Вся одежда",
            categoryLvl: 1,
            id: 2
        },
        {
            name:"Штаны",
            categoryLvl: 2,
            id: 1002767
        },
        {
            name: 'Верхняя одежда',
            categoryLvl: 2,
            id: 1002606,
            subcategories: [
                {
                    name:"Вся верхняя одежда",
                    categoryLvl: 2,
                    id: 1002606
                },
                {
                    name:"Летняя верхняя одежда",
                    categoryLvl: 3,
                    id: 1001276
                },
                {
                    name:"Бейсбольная верхняя одежда",
                    categoryLvl: 3,
                    id: 285
                },
                {
                    name:"Пиджаки",
                    categoryLvl: 3,
                    id: 15
                },
                {
                    name:"Спортивные куртки",
                    categoryLvl: 3,
                    id: 7
                },
                {
                    name:"Джинсовые куртки",
                    categoryLvl: 3,
                    id: 11
                },
                {
                    name:"Ветровки",
                    categoryLvl: 3,
                    id: 17
                },
                {
                    name:"Кожаные куртки",
                    categoryLvl: 3,
                    id: 1002608
                },
                {
                    name:"Демисезонные куртки",
                    categoryLvl: 3,
                    id: 1001273
                },
                {
                    name:"Пальто",
                    categoryLvl: 3,
                    id: 8
                },
                {
                    name:"Зимние куртки",
                    categoryLvl: 3,
                    id: 12
                },
                {
                    name:"Пуховики",
                    categoryLvl: 3,
                    id: 9
                },
            ]
        },
        {
            name: 'Спортивная одежда',
            categoryLvl: 2,
            id: 1001262,//1002618,1002628
            womenId: 1001262,
            subcategories: [
                {
                    name:"Баскетбольные майки",
                    categoryLvl: 3,
                    id: 1001392
                },
                {
                    name:"Баскетбольные штаны",
                    categoryLvl: 3,
                    id: 1001393
                },
                {
                    name:"Тренировочные костюмы",
                    categoryLvl: 3,
                    id: 295
                },
                {
                    name:"Тренировочные штаны",
                    categoryLvl: 3,
                    id: 1002616
                },
                {
                    name:"Костюмы для горных лыж",
                    categoryLvl: 3,
                    id: 1001268
                },
                {
                    name:"Штаны для горных лыж",
                    categoryLvl: 3,
                    id: 1001271
                },
            ]
        },
        {
            name: 'Футболки',
            categoryLvl: 3,
            id: 4,
            womenId: 4
        },
        {
            name: 'Майки',
            categoryLvl: 3,
            id: 1002849,
            womenId: 1002849
        },
        {
            name: 'Поло',
            categoryLvl: 3,
            id: 10,
            womenId: 10
        },
        {
            name: 'Худи',
            categoryLvl: 3,
            id: 1002848,
            womenId: 1002848
        },
        {
            name: 'Рубашки',
            categoryLvl: 3,
            id: 5,
            womenId: 5
        },
        {
            name: 'Свитшоты',
            categoryLvl: 3,
            id: 13,
            womenId: 13
        },
        {
            name: 'Шорты',
            categoryLvl: 3,
            id: 1002791,
            womenId: 1002791
        },
        {
            name: 'Носки',
            categoryLvl: 3,
            id: 1003050,
            womenId: 1003050
        },
        {
            name: 'Трусы',
            categoryLvl: 3,
            id: 1003036,
            womenId: 1003036
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
    {
        name: "Аксессуары",
        subcategories: [
            {
                name: "Все аксессуары",
                categoryLvl: 1,
                id: 48
            },
            {
                name:"Сумки и рюкзаки",
                categoryLvl: 2,
                id: 49,
                subcategories: [
                    {
                        name: "Все сумки и рюкзаки",
                        categoryLvl: 2,
                        id: 49
                    },
                    {
                        name: "Рюкзаки",
                        categoryLvl: 3,
                        id: 50
                    },
                    {
                        name: "Сумки через плечо",
                        categoryLvl: 3,
                        id: 51
                    },
                    {
                        name: "Поясные сумки",
                        categoryLvl: 3,
                        id: 54
                    },
                    {
                        name: "Портфели",
                        categoryLvl: 3,
                        id: 1001008
                    },
                    {
                        name: "Спортивные сумки",
                        categoryLvl: 3,
                        id: 1000797
                    },
                    {
                        name: "Нагрудные сумки",
                        categoryLvl: 3,
                        id: 277
                    },
                    {
                        name: "Сумки",
                        categoryLvl: 3,
                        id: 52
                    },
                    {
                        name: "Сумочки",
                        categoryLvl: 3,
                        id: 305
                    },
                    {
                        name: "Клатчи",
                        categoryLvl: 3,
                        id: 59
                    },
                    {
                        name: "Косметички",
                        categoryLvl: 3,
                        id: 1000787
                    },
                    {
                        name: "Паспортницы",
                        categoryLvl: 3,
                        id: 60
                    },
                    {
                        name: "Сумки для наушников",
                        categoryLvl: 3,
                        id: 1000382
                    },
                    {
                        name: "Сумки для телефона",
                        categoryLvl: 3,
                        id: 1000385
                    },
                    {
                        name: "Портмоне",
                        categoryLvl: 3,
                        id: 58
                    },
                    {
                        name: "Кошельки",
                        categoryLvl: 3,
                        id: 57
                    },
                    {
                        name: "Карточницы",
                        categoryLvl: 3,
                        id: 185
                    },
                    {
                        name: "Ключницы",
                        categoryLvl: 3,
                        id: 330
                    },
                ]
            },
            {
                name:"Аксессуары для сумок",
                categoryLvl: 2,
                id: 56,
            },
            {
                name:"Украшения",
                categoryLvl: 2,
                id: 421,
            },
            {
                name:"Ремни",
                categoryLvl: 2,
                id: 101,
            },
            {
                name:"Очки",
                categoryLvl: 2,
                id: 121,
                subcategories: []
            },
            {
                name:"Кепки и шапки",
                categoryLvl: 2,
                id: 96,
                subcategories: []
            },
            {
                name:"Шарфы",
                categoryLvl: 2,
                id: 141,
            },
            {
                name:"Разные аксессуары",
                categoryLvl: 2,
                id: 116,
            },
            {
                name:"Аксессуары для волос",
                categoryLvl: 2,
                id: 102,
            },
            {
                name:"Часы",
                categoryLvl: 2,
                id: 500,
            },
        ]
    }
    //{ name: "Обувь", subcategories: ["Новинки от мировых брендов", "Все товары", "Ботинки", "Домашняя обувь", "Кроссовки и кеды", "Мокасины и топсайдеры", "Резиновая обувь", "Сабо", "Сандалии", "Сапоги", "Слипы"] },
    /*{ name: "Красота", subcategories: [] },
    { name: "Аксессуары", subcategories: [] },
    { name: "Premium", subcategories: [] },
    { name: "Спорт", subcategories: [] },
    { name: "Дом", subcategories: [] },
    { name: "Распродажа", subcategories: [] },*/
];


function CategoriesTreeDesktop() {
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

        window.location.href = `/${gender}/products?category${subcategory.categoryLvl}Id=${subcategory.id}`;
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
                            {isDesktopScreen ? <div onClick={() => navigate('/products')} style={{cursor: "pointer"}}><RePoizonMainBigLogo/></div> : <div onClick={() => navigate('/products')} style={{cursor: "pointer"}}><RePoizonMainMiddleLogo/></div>}
                            {isDesktopScreen ?
                                <div className="actions-btns">
                                    <GenderSwitcher/>
                                    <div onClick={() => navigate("/profile")}>
                                        <NonActiveProfileIcon/>
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
                                {!selectedCategory && categories?.map((category) => (
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
                    </div>
                </>
            }
        </Layout>


    );
}

export default CategoriesTreeDesktop;
