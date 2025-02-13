import React from "react";
import {Button, Tag} from "antd";
import {useSearchParams} from "react-router-dom";
import {BRANDS, CATEGORIES} from "../constants";
import "./Tag.scss";
import {COLOR_LIST, SORT_TYPES} from "../../pages/constants";
import {BrandTag} from "../BrandTag/BrandTag";

const FilterTags = ({setOffset, setSizes, setColors, setBrands, setOpenBrandsModal}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const params = Object.keys(Object.fromEntries(searchParams.entries())).length
        ? Object.fromEntries(searchParams.entries())
        : {brandIds: null};
    const brandsParams = searchParams.get("brandIds");

    const isDesktopScreen = window?.innerWidth > 768;

    const getValue = (key) => {
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

        if (key === 'brandIds') {
            setBrands([]);
        }

        searchParams.delete(key);
        setSearchParams(searchParams);
        setOffset(1);
    }

    const filter = (el) => {
        return el !== "sortBy";
    }

    return <div className="tag-wrapper">{Object.keys(params).filter(filter).map((key) => {
        if ((key === 'category3Id' || key === 'category2Id' || key === 'category1Id') && !brandsParams) {
            return <Button key={key}
                           size="middle"
                           color="default"
                           className="fast-filters-btn"
                           variant="solid" onClick={() => setOpenBrandsModal(true)}>Бренды</Button>;
        } else if (key === 'brandIds') {
            const brandsIds = params[key]?.split(',');

            if (!brandsIds?.length) {
                return <Button key={key}
                          size="middle"
                          color="default"
                          className="fast-filters-btn"
                          variant="solid" onClick={() => setOpenBrandsModal(true)}>Бренды</Button>;
            }

            const brandIndex = BRANDS.findIndex(c => c.id === Number(brandsIds[0]));
            const firstBrand = brandIndex >= 0 ? BRANDS[brandIndex].name : null

            return <BrandTag key={key} brand={firstBrand} onClick={() => setOpenBrandsModal(true)}
                             brandCount={brandsIds?.length} onRemove={() => onClose(key)}/>
        } else if ((key === 'category3Id' || key === 'category2Id' || key === 'category1Id')) {
            return null;
        }

        return params[key] && <Tag key={key} closable onClose={() => onClose(key)}>{getValue(key)}</Tag>
    })}</div>
}
export default FilterTags;