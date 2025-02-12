import React from "react";
import {BRANDS} from "../constants";
import {Checkbox} from "antd";

const BrandsModalSelector = ({brands, setBrands}) => {
    console.log('brands',brands)
    const toggleSelectColor = (id) => {
        console.log('id',id)
        setBrands((prev) =>
            prev?.includes(id)
                ? prev.filter((c) => c !== id)
                : [...prev, id]
        );
    };

    const isChecked = (id) => {
        return brands?.includes(id);
    }

    return (
        <div className="color-selector">
            <ul>
                {BRANDS?.map((brand) => (
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