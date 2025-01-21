import React from "react";
import {Tag} from "antd";
import {useSearchParams} from "react-router-dom";
import {BRANDS} from "../constants";
import "./Tag.scss";

const FilterTags = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());

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

        return params[key]
    }

    const onClose = (key) => {
        searchParams.delete(key);
        setSearchParams(searchParams);
    }

    return <div className="tag-wrapper">{Object.keys(params).map((key) => {
        return params[key] && <Tag key={key} closable onClose={() => onClose(key)}>{getValue(key)}</Tag>
    })}</div>
}
export default FilterTags;