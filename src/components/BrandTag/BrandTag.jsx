import React from "react";
import "./BrandTag.scss";
import { X } from "lucide-react";

export const BrandTag = ({ brand, brandCount, onRemove, onClick }) => {
    const handleRemoveClick = (e) => {
        e.stopPropagation();
        onRemove(brand);
    };

    return (
        <div className="brand-tag" onClick={onClick}>
            {brand} <span className="count">{brandCount > 1 ? '+' + (brandCount - 1) : ''}</span>
            <button className="remove-btn" onClick={handleRemoveClick}>
                <X size={16} />
            </button>
        </div>
    );
};