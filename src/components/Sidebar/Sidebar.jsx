import React from "react";
import { Menu, Drawer } from "antd";
import "./Sidebar.scss";
import {useNavigate} from "react-router-dom";
import {FILLED_CATEGORIES} from "../constants";

const Sidebar = ({visible, setVisibleCategories, setOffset, setLoading}) => {
    const navigate = useNavigate();

    const onCategoryClick = ({item}) => {
        const {props} = item;

        setOffset(0);
        setLoading(true);
        setVisibleCategories(false);
        navigate(`?category${props?.categoryLvl}Id=${props.id}`);
    }

    function addLabelField(categories) {
        return categories.map(category => {
            // Добавляем поле label, равное полю name
            if (category?.id) {
                category.key = category.id;
            }


            // Если есть вложенные элементы, рекурсивно обрабатываем их
            if (category.children && category.children.length > 0) {
                category.children = addLabelField(category.children);
            }

            return category;
        });
    }

// Добавляем поле label ко всем объектам
    /*const FILLED_CATEGORIES_WITH_LABEL = addLabelField(FILLED_CATEGORIES);

    console.log(FILLED_CATEGORIES_WITH_LABEL);*/

    return (
        <div className="sidebar-container">
            <Drawer title="Меню" placement="left" onClose={() => setVisibleCategories(false)} visible={visible}>
                <Menu mode="inline"  items={FILLED_CATEGORIES} onClick={onCategoryClick} />
            </Drawer>
        </div>
    );
};

export default Sidebar;