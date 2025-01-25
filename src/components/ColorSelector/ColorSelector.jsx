import React, {useEffect, useMemo, useState} from "react";
import "./ColorSelector.scss";
import {Button} from "antd";
import {useSearchParams} from "react-router-dom";
import {COLOR_LIST} from "../../pages/constants";


const ColorSelector = ({colors, setColors, setOffset}) => {
    console.log('colorsHere =', colors);

    const [searchParams, setSearchParams] = useSearchParams();
    const [showAll, setShowAll] = useState(false);

    const toggleSelectColor = (color) => {
        setColors((prev) =>
            prev.includes(color)
                ? prev.filter((c) => c !== color)
                : [...prev, color]
        );
        setOffset(1)
    };

    const selectAll = () => {
        const colorsMap = COLOR_LIST.map((c) => c.name)
        setColors(colorsMap);
        setOffset(1)
    };

    const deselectAll = () => {
        setColors([]);
        searchParams.delete('colors');
        setSearchParams(searchParams);
        setOffset(1)
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
            <button className="select-all" onClick={() => (colors.length === COLOR_LIST.length ? deselectAll() : selectAll())}>
                {colors.length === COLOR_LIST.length ? "Снять все" : "Выбрать все"}
            </button>
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
