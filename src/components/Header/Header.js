import {useSearchParams} from "react-router-dom";
import {AutoComplete, Button, Input} from "antd";
import React, {useEffect, useRef, useState} from "react";
import './header.styles.scss';
import {MenuOutlined} from "@ant-design/icons";
import axios from "axios";

const Header = ({search, setShowFilters, setOffset, setLoading, setVisibleCategories}) => {
    const defaultOptions = [
        { value: 'Куртка' },
        { value: 'Джинсы' },
        { value: 'Бутсы' },
    ];

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(search || '');
    const [options, setOptions] = useState(defaultOptions || []);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!search) {
            setSearchValue('');
        }
        setSearchValue(search?.replace('+',' '));
    },[search])

    const onChange = async (value) => {
        if (search && !value) {
            window.scrollTo({top: 0})
            searchParams.delete('search');
            setSearchParams(searchParams);
        }

        axios.get(`https://api.re-poizon.ru/api/synonyms?search=${value}`)
            .then(res => setOptions(res.data.suggested?.map(el => ({value: el}))))
            .catch(err => setOptions(defaultOptions));

        setSearchValue(value);
        onSearch(value);
        setLoading(true);
    }

    const onSearch = (value) => {
        if (!value) {
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

    const val1 = "https://storage.yandexcloud.net/pc-mediafiles/icons/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA%20(%D0%BF%D0%BE%D0%B8%D1%81%D0%BA%D0%BE%D0%B2%D0%B0%D1%8F%20%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B0)(cropped).png"
    const val2 = "https://storage.yandexcloud.net/pc-mediafiles/icons/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA%20(%D0%BF%D0%BE%D0%B8%D1%81%D0%BA%D0%BE%D0%B2%D0%B0%D1%8F%20%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B0)%20(blue).png"
    const [icon, setIcon] = useState(val1)

    const onMouseOver = () => {
        setIcon(val2);
    }

    const onMouseLeave = () => {
        setIcon(val1);
    }

    const onSelectHandler = (value) => {
        inputRef?.current?.blur()
        onSearch(value);
    }

    return (
        <header
          className="header-wrapper d-flex flex-column justify-between align-center pl-20 pt-20 pr-20"
        >
        <div className="header-input-wrapper">
            {isDesktopScreen && <Button id="desktop-category-btn" onClick={onCategoriesClick}><MenuOutlined /> Каталог</Button>}
            <AutoComplete
                style={{width: '100%', height: 'auto'}}
                options={options}
                filterOption={(inputValue, option) => {
                    return option?.value?.toUpperCase()?.indexOf(inputValue?.toUpperCase()) !== -1
                }}
                optionRender={(option) => {
                    return <><img style={{height: '11px'}} src={icon} alt={icon}/>{option.value}</>
                }}
                onChange={onChange}
                onPressEnter={onSearch}
                onSelect={onSelectHandler}
            >
                <Input rootClassName="input-search" size="large" placeholder="Название, бренд, категория..."
                       suffix={<div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
                           <img className="search-icon" src={icon} alt="search" />
                       </div>}
                       ref={inputRef}
                       allowClear
                />
            </AutoComplete>

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
