import React from "react";
import {Button, Tag} from "antd";
import {useSearchParams} from "react-router-dom";
import {BRANDS, CATEGORIES} from "../constants";
import "./Tag.scss";
import {COLOR_LIST, SORT_TYPES} from "../../pages/constants";

const FilterTags = ({setOffset, setSizes, setColors, setOpenBrandsModal}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());

    const isDesktopScreen = window?.innerWidth > 768;

    const getValue = (key) => {
        if (key === 'brandId') {
            const index = BRANDS.findIndex((el) => el.id === Number(params[key]));

            return index >= 0 ? BRANDS[index]?.name : params[key];
        }

        if (key === 'maxPrice') {
            return `до ${params[key]}`;
        }

        if (key === 'minPrice') {
            return `от ${params[key]}`;
        }

        if (key === 'sizes') {
            return `Размер ${params[key]}`;
        }

        /*if (key === 'category3Id' || key === 'category2Id' || key === 'category1Id') {
            const index = CATEGORIES.findIndex((el) => el.id === Number(params[key]));
            return CATEGORIES[index]?.name || '';
        }*/

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

        if (key === 'colors') {
            const colors = params[key]?.split(',');

            if (colors.length === COLOR_LIST.length) {
                return "Все цвета";
            }

            return colors.map(hex => {
                const colorIndex = COLOR_LIST.findIndex(c => c.hex === hex);
                return colorIndex >= 0 ? COLOR_LIST[colorIndex].name : null;
            }).join(',');
        }

        return params[key]
    }

    const onClose = (key) => {
        if (key === 'colors') {
            setColors([]);
        }

        if (key === 'sizes') {
            setSizes([]);
        }

        searchParams.delete(key);
        setSearchParams(searchParams);
        setOffset(1);
    }

    const filter = (el) => {
        return el !== "sortBy";
    }

    return <div className="tag-wrapper">{Object.keys(params).filter(filter).map((key) => {
        if (key === 'category3Id' || key === 'category2Id' || key === 'category1Id') {
            return <Button key={key}
                           size="small"
                           color="default"
                           className="fast-filters-btn"
                           variant="solid" onClick={() => setOpenBrandsModal(true)}>Бренды</Button>;
        }

        return params[key] && <Tag key={key} closable onClose={() => onClose(key)}>{getValue(key)}</Tag>
    })}</div>
}
export default FilterTags;