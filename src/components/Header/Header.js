import {Link, useSearchParams} from "react-router-dom";
import {Button, Input, Segmented} from "antd";
import React, {useEffect, useMemo, useState} from "react";
import { FilterFilled, FilterOutlined, SearchOutlined } from "@ant-design/icons";
import './header.styles.scss';
import {useGetCollectionsQuery} from "../../store/collections.store";
import {getMultipleRandom} from "../../common/utils";
import RePoizonMainLogo from "../../assets/svg/re-poizon-main-logo.js"

const Header = ({search, showFilters, setShowFilters, setOffset, setLoading, isEnabledFilters}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchValue, setSearchValue] = useState(search || '');

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

    const onChangeCollection = (value) => {
        const collectionIndex = collectionsNames?.findIndex((el) => el === value);
        const fullCollection = randomCollections[collectionIndex];

        searchParams.set('collName', fullCollection?.name);

        if (value === 'Для Вас') {
            searchParams.set('collName', 'personal');
        }

        if (value === 'Популярное') {
            searchParams.set('collName', 'popular');
        }

        setSearchParams(searchParams);
    }

    const buildRequest = () => {
        const obj = {
            limit: 20,
        }
        return obj;
    }
    const { data: collections = { items: [], totalCount: 0 }, isLoading } = useGetCollectionsQuery(buildRequest())

    const randomCollections = useMemo(() => getMultipleRandom(collections.items, 2), [collections])
    const collectionsNames = randomCollections?.map((el, i) => {
        if (i === 1 && el?.name === randomCollections[0].name) {
            return '';
        }

        if (el?.name?.length >= 8) {
            return el?.name.substring(0, 8) + '..'
        }
        return el?.name;
    });

    const filtersBtnHandler = () => {
        setShowFilters(true);
    }

    const isDesktopScreen = window?.innerWidth > 768;

    return (
        <header
          className="header-wrapper d-flex flex-column justify-between align-center pl-20 pt-20 pr-20"
        >
        <div className="header-input-wrapper">
            <Input placeholder="Я ищу..."
                   allowClear
                   value={searchValue}
                   onChange={(e) => onChange(e.target.value)}
                   onPressEnter={onSearch}
                   prefix={<img style={{height: '15px', marginRight: "unset"}}
                                src="https://storage.yandexcloud.net/pc-mediafiles/icons/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA%20(%D0%BF%D0%BE%D0%B8%D1%81%D0%BA%D0%BE%D0%B2%D0%B0%D1%8F%20%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B0)(cropped).png" alt=""/>}
                   suffix={<span style={{borderLeft: '1px solid #d9d9d9', paddingLeft: '10px'}}
                                 onClick={onSearch}>Найти</span>}
            />
            {!isDesktopScreen &&
              <Button onClick={filtersBtnHandler}
                      style={{borderRadius: '20px', display: 'flex', alignItems: 'center', border: "unset"}}>
                  <img style={{height: '15px', marginRight: "unset"}}
                       src="https://storage.yandexcloud.net/pc-mediafiles/icons/%D0%A4%D0%B8%D0%BB%D1%8C%D1%82%D1%80%D1%8B(cropped).png" alt=""/>
              </Button>
            }
        </div>

        {/*<Segmented className="header-segmented mt-15 w100p"
                   onChange={onChangeCollection} options={['Для Вас', 'Популярное', ...collectionsNames]} />*/}
        {/*<Link to="/">
                <div className="d-flex align-center">
                    <svg width={40} height={40} src="svg/logo.png" alt="Logo" />
                    <div>
                        <h3 className="text-uppercase">Sneaker Spot</h3>
                        <p className="opacity-5">Best Sneakers-shop EUW</p>
                    </div>
                </div>
            </Link>*/}
        {/*<ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <svg width={18} height={18} src="svg/cart.svg" alt="trashcan" />
                    <span>1205 eur.</span>
                </li>
                <li className="mr-20 cu-p">
                    <Link to ="/favorites">
                        <svg width={18} height={18} src="svg/heart.svg" alt="favorites" />
                    </Link>
                </li>
                <li>
                    <svg width={18} height={18} src="svg/user.svg" alt="user" />
                </li>
            </ul>*/}
    </header>
    );
}
export default Header;
