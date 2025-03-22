import React from "react";
import "./SizeTag.scss";
import { X } from "lucide-react";

export const SizeTag = ({ key, size, sizeCount, onRemove, onClick }) => {
    const handleRemoveClick = (e) => {
        e.stopPropagation();
        onRemove(size);
    };

    return (
        <div className="size-tag" key={key} onClick={onClick}>
            Размер {size} <span className="count">{sizeCount > 1 ? '+' + (sizeCount - 1) : ''}</span>
            <button className="remove-btn" onClick={handleRemoveClick}>
                <X size={16} />
            </button>
        </div>
    );
};