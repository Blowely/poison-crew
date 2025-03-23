import {useNavigate, useSearchParams} from "react-router-dom";
import {Button, Input} from "antd";
import React, {useEffect, useState} from "react";
import './header.styles.scss';
import {MenuOutlined, SearchOutlined} from "@ant-design/icons";

const Header = ({search, setShowFilters, setOffset, setLoading, setVisibleCategories}) => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const [searchValue, setSearchValue] = useState(search || '');
    const gender = localStorage.getItem("gender") || "men";

    useEffect(() => {
        if (!search) {
            setSearchValue('');
        }
        setSearchValue(search?.replace('+',' '));
    },[search])

    const onChange = (value) => {
        if (search && !value) {
            window.scrollTo({top: 0})
            searchParams.delete('search');
            setSearchParams(searchParams);
        }
        setSearchValue(value);
        onSearch(value);
        setLoading(true);
    }

    const onSearch = (value) => {
        if (!value || !searchValue) {
            return;
        }

        window.scrollTo({top: 0})
        searchParams.set('search', typeof value  === "string" ? value : searchValue);
        setSearchParams(searchParams);
        setOffset(1);
    }

    const buildRequest = () => {
        const obj = {
            limit: 20,
        }
        return obj;
    }

    const filtersBtnHandler = () => {
        setShowFilters(true);
    }

    const isDesktopScreen = window?.innerWidth > 768;

    const onCategoriesClick = () => {
        setVisibleCategories(true);
        //navigate(`/${gender}-categories/`)
    }

    return (
        <header
          className="header-wrapper d-flex flex-column justify-between align-center pl-20 pt-20 pr-20"
        >
        <div className="header-input-wrapper">
            {isDesktopScreen && <Button id="desktop-category-btn" onClick={onCategoriesClick}><MenuOutlined /> Каталог</Button>}
            <Input placeholder="Название, бренд..."
                   allowClear
                   value={searchValue}
                   rootClassName="search-input"
                   onChange={(e) => onChange(e.target.value)}
                   onPressEnter={onSearch}
                   suffix={<img src="https://storage.yandexcloud.net/pc-mediafiles/icons/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA%20(%D0%BF%D0%BE%D0%B8%D1%81%D0%BA%D0%BE%D0%B2%D0%B0%D1%8F%20%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B0)(cropped).png" alt=""/>}
            />
            {!isDesktopScreen &&
              <Button onClick={filtersBtnHandler}
                      style={{borderRadius: '20px', display: 'flex', alignItems: 'center', border: "unset"}}>
                  <img style={{height: '15px', marginRight: "unset"}}
                       src="https://storage.yandexcloud.net/pc-mediafiles/icons/%D0%A4%D0%B8%D0%BB%D1%8C%D1%82%D1%80%D1%8B(cropped).png" alt=""/>
              </Button>
            }
        </div>
    </header>
    );
}
export default Header;
