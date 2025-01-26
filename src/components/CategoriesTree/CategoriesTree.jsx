import React, {useState} from "react";
import "./categoriesTree.scss";

const categories = [
    { name: "Идеи", subcategories: [] },
    { name: "Новинки", subcategories: [] },
    { name: "Одежда", subcategories: ["Новинки от мировых брендов", "Все товары", "Брюки", "Верхняя одежда", "Джемперы, свитеры и кардиганы", "Джинсы", "Домашняя одежда", "Комбинезоны", "Майки", "Нижнее белье", "Носки и гетры"] },
    { name: "Обувь", subcategories: ["Новинки от мировых брендов", "Все товары", "Ботинки", "Домашняя обувь", "Кроссовки и кеды", "Мокасины и топсайдеры", "Резиновая обувь", "Сабо", "Сандалии", "Сапоги", "Слипы"] },
    { name: "Аксессуары", subcategories: [] },
    { name: "Premium", subcategories: [] },
    { name: "Спорт", subcategories: [] },
    { name: "Красота", subcategories: [] },
    { name: "Дом", subcategories: [] },
    { name: "Распродажа", subcategories: [] },
];


function CategoriesTree() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category === selectedCategory ? null : category);
    };

    return (
        <div className="category-selector">
            <div className="categories">
                {categories.map((category) => (
                    <div key={category.name}>
                        <button
                            className={`category-button ${selectedCategory === category.name ? "active" : ""}`}
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            {category.name}
                        </button>
                        {selectedCategory === category.name && category.subcategories.length > 0 && (
                            <div className="subcategories">
                                {category.subcategories.map((sub, index) => (
                                    <div key={index} className="subcategory">
                                        {sub}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesTree;
