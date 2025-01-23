import React from "react";
import {Tag} from "antd";
import {useSearchParams} from "react-router-dom";
import {BRANDS, CATEGORIES} from "../constants";
import "./Tag.scss";
import {SORT_TYPES} from "../../pages/constants";

const FilterTags = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());

    const isDesktopScreen = window?.innerWidth > 768;

    const getValue = (key) => {
        if (key === 'brandId') {
            const index = BRANDS.findIndex((el) => el.id === Number(params[key]));
            return BRANDS[index].name || '';
        }

        if (key === 'maxPrice') {
            return `до ${params[key]}`;
        }

        if (key === 'minPrice') {
            return `от ${params[key]}`;
        }

        if (key === 'size') {
            return `Размер ${params[key]}`;
        }

        if (key === 'categoryId') {
            const index = CATEGORIES.findIndex((el) => el.id === Number(params[key]));
            return CATEGORIES[index].name || '';
        }

        if (key === 'sortBy') {
            if (isDesktopScreen) {
                return;
            }

            if (SORT_TYPES[params[key]] === SORT_TYPES["by-relevance"]) {
                searchParams.delete('sortBy');
                setSearchParams(searchParams);
                return null;
            }

            return SORT_TYPES[params[key]];
        }

        return params[key]
    }

    const onClose = (key) => {
        searchParams.delete(key);
        setSearchParams(searchParams);
    }

    const filter = (el) => {
        if (isDesktopScreen) {
            return  el !== "sortBy"
        }
        return true
    }

    return <div className="tag-wrapper">{Object.keys(params).filter(filter).map((key) => {
        return params[key] && <Tag key={key} closable onClose={() => onClose(key)}>{getValue(key)}</Tag>
    })}</div>
}
export default FilterTags;