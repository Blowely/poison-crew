import React from "react";
import {BRANDS} from "../constants";

const BrandsModalSelector = ({brands, setBrands}) => {

    const toggleSelectColor = (color) => {
        setBrands((prev) =>
            prev?.includes(color)
                ? prev.filter((c) => c !== color)
                : [...prev, color]
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
                        <input
                            type="checkbox"
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