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

    return (
        <div className="sidebar-container">
            <Drawer title="Каталог" placement="left" onClose={() => setVisibleCategories(false)} visible={visible}>
                <Menu mode="inline"  items={FILLED_CATEGORIES} onClick={onCategoryClick} />
            </Drawer>
        </div>
    );
};

export default Sidebar;