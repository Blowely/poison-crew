import React from "react";
import {Button, Tag} from "antd";
import {useSearchParams} from "react-router-dom";
import {BRANDS} from "../constants";
import "./Tag.scss";
import {COLOR_LIST, SORT_TYPES} from "../../pages/constants";
import {BrandTag} from "../BrandTag/BrandTag";
import {SizeTag} from "../SizeTag/SizeTag";

const excludedTags = ['category1Id', 'category2Id', 'category3Id', 'categoryName', 'brandName'];

const FilterTags = ({setOffset, setSizes, setColors, setBrands, setOpenBrandsModal, setOpenSizesModal, setLoading}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    /*const params = (Object.keys(Object.fromEntries(searchParams.entries()))?.includes('brandIds')
    || Object.keys(Object.fromEntries(searchParams.entries()))?.includes('sizes'))
        ? Object.fromEntries(searchParams.entries())
        : {...Object.fromEntries(searchParams.entries()), brandIds: "", sizes: ""};*/
    const params = {...Object.fromEntries(searchParams.entries())};
    params.brandIds = params.brandIds ? params.brandIds : "";
    params.sizes = params.sizes ? params.sizes : "";

    const isDesktopScreen = window?.innerWidth > 768;

    const getValue = (key) => {
        if (key === 'maxPrice') {
            return `до ${params[key]}`;
        }

        if (key === 'minPrice') {
            return `от ${params[key]}`;
        }

        /*
        if (key === 'sizes') {
            return `Размер ${params[key]}`;
        }*/

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
        setLoading(true)

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
        if (excludedTags.includes(key)) {
            return null;
        }

        if (key === 'brandIds') {
            const brandsIds = params[key]?.length ? params[key]?.split(',') : [];

            if (!brandsIds?.length) {
                return <Button key={key}
                               size="middle"
                               color="default"
                               className="fast-filters-btn"
                               onClick={() => setOpenBrandsModal(true)}>Бренды</Button>;
            }

            const brandName = searchParams.get('brandName') || "";

            const brandIndex = BRANDS.findIndex(c => c.id === Number(brandsIds[0]));
            const firstBrand = brandIndex >= 0 ? BRANDS[brandIndex].name : brandName

            return <BrandTag key={key} brand={firstBrand} onClick={() => setOpenBrandsModal(true)}
                             brandCount={brandsIds?.length} onRemove={() => onClose(key)}/>
        }

        if (key === 'sizes') {
            const sizesIds = params[key]?.length ? params[key]?.split(',') : [];

            if (!sizesIds?.length) {
                return <Button key={key}
                               size="middle"
                               color="default"
                               className="fast-filters-btn"
                               onClick={() => setOpenSizesModal(true)}>Размеры</Button>;
            }

            return <SizeTag key={key} size={sizesIds[0]} onClick={() => setOpenSizesModal(true)}
                             sizeCount={sizesIds?.length} onRemove={() => onClose(key)}/>
        }

        return params[key] && <Tag key={key} closable onClose={() => onClose(key)} style={{display: 'flex'}}>
            <div className="text-wrapper">{getValue(key)}</div>
        </Tag>
    })}</div>
}
export default FilterTags;