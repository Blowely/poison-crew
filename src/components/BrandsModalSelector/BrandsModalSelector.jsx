import React, {useState} from "react";
import {BRANDS} from "../constants";
import {Checkbox, Input} from "antd";
import "./BrandsSelector.scss"

const BrandsModalSelector = ({brands, setBrands, setLoading}) => {
    const [search, setSearch] = useState("");

    const toggleSelectColor = (id) => {
        setBrands((prev) =>
            prev?.includes(id)
                ? prev.filter((c) => c !== id)
                : [...prev, id]
        );
    };

    const isChecked = (id) => {
        return brands?.includes(id);
    }

    const onSearchChange = (val) => {
        setSearch(val);
    }

    const filteredBrands = search
        ? BRANDS.filter((brand) => {
            return brand?.name?.toLowerCase().includes(search?.toLowerCase())
        })
        : BRANDS;

    return (
        <div className="brand-selector">
            <div className="header-input-wrapper">
                <Input placeholder="Название бренда"
                       allowClear
                       value={search}
                       onChange={(e) => onSearchChange(e.target.value)}
                       onPressEnter={(e) => onSearchChange(e.target.value)}
                       prefix={<img style={{height: '15px', marginRight: "unset"}}
                                    src="https://storage.yandexcloud.net/pc-mediafiles/icons/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA%20(%D0%BF%D0%BE%D0%B8%D1%81%D0%BA%D0%BE%D0%B2%D0%B0%D1%8F%20%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B0)(cropped).png"
                                    alt=""/>}
                       suffix={<span style={{borderLeft: '1px solid #d9d9d9', paddingLeft: '10px'}}
                                     onClick={(e) => onSearchChange(e.target.value)}>Найти</span>}
                />
            </div>
            <ul>
                {filteredBrands?.map((brand) => (
                    <li key={brand.name} onClick={() => toggleSelectColor(brand.id)}>
                        <Checkbox
                            checked={isChecked(brand.id)}
                            readOnly
                        />
                        {brand.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default BrandsModalSelector