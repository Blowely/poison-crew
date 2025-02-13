import React from "react";
import "./BrandTag.scss";
import { X } from "lucide-react";

export const BrandTag = ({ key, brand, brandCount, onRemove, onClick }) => {
    const handleRemoveClick = (e) => {
        e.stopPropagation();
        onRemove(brand);
    };

    return (
        <div className="brand-tag" key={key} onClick={onClick}>
            {brand} <span className="count">{brandCount > 1 ? '+' + (brandCount - 1) : ''}</span>
            <button className="remove-btn" onClick={handleRemoveClick}>
                <X size={16} />
            </button>
        </div>
    );
};