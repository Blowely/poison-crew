import React, {useState} from "react";
import "./ColorSelector.scss";
import {Button} from "antd";
import {COLOR_LIST} from "../../pages/constants";


const ColorSelector = ({colors, setColors}) => {
    const [showAll, setShowAll] = useState(false);

    const toggleSelectColor = (color) => {
        setColors((prev) =>
            prev.includes(color)
                ? prev.filter((c) => c !== color)
                : [...prev, color]
        );
    };

    const toggleShowAll = () => {
        setShowAll((prev) => !prev);
    };

    const isChecked = (hex) => {
        return colors.includes(hex);
    }

    const visibleColors = showAll ? COLOR_LIST : COLOR_LIST.slice(0, 5);

    return (
        <div className="color-selector">
            <ul>
                {visibleColors.map((color) => (
                    <li key={color.name} onClick={() => toggleSelectColor(color.hex)}>
                        <input
                            type="checkbox"
                            checked={isChecked(color.hex)}
                            readOnly
                        />

                        <span
                            className="color-box"
                            style={
                                color.name === "Мультиколор" || color.name === "Серебряный"
                                    ? {background: color.color}
                                    : {backgroundColor: color.color}
                            }
                        ></span>
                        {color.name}
                    </li>
                ))}
            </ul>
            <Button type="link" style={{background: "unset"}} className="toggle-show" onClick={toggleShowAll}>
                {showAll ? "Свернуть" : "Показать все"}
            </Button>
        </div>
    );
};

export default ColorSelector;
