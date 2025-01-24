import React, {useEffect, useMemo, useState} from "react";
import "./ColorSelector.scss";
import {Button} from "antd";
import {useSearchParams} from "react-router-dom";
import {COLOR_LIST} from "../../pages/constants";


const ColorSelector = ({setColors, setOffset}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const colors = searchParams.get("colors") || "";

    const [selectedColors, setSelectedColors] = useState( []);
    const [showAll, setShowAll] = useState(false);

    const toggleSelectColor = (color) => {
        setSelectedColors((prev) =>
            prev.includes(color)
                ? prev.filter((c) => c !== color)
                : [...prev, color]
        );

        setColors((prev) =>
            prev.includes(color)
                ? prev.filter((c) => c !== color)
                : [...prev, color]
        );
        setOffset(1)
    };

    useEffect(() => {
        console.log('selectedColors=',selectedColors)
        const colorsMap = selectedColors?.map((c1) => {
            const hexIndex = COLOR_LIST.findIndex((c2) => c2.name === c1);
            return COLOR_LIST[hexIndex]?.hex;
        })

        searchParams.set("colors", colorsMap.join(','));
        setSearchParams(searchParams);
        setOffset(1)
    },[selectedColors]);

    const selectAll = () => {
        const colorsMap = COLOR_LIST.map((c) => c.name)
        setSelectedColors(colorsMap);
        setColors(colorsMap);
        setOffset(1)
    };

    const deselectAll = () => {
        setSelectedColors([]);
        setColors([]);
        searchParams.delete('colors');
        setSearchParams(searchParams);
        setOffset(1)
    };

    const toggleShowAll = () => {
        setShowAll((prev) => !prev);
    };

    const isChecked = (hex) => {
        const colorsMap = colors?.split(',');
        return colorsMap.includes(hex);
    }

    const visibleColors = showAll ? COLOR_LIST : COLOR_LIST.slice(0, 5);

    return (
        <div className="color-selector">
            <button className="select-all" onClick={() => (selectedColors.length === COLOR_LIST.length ? deselectAll() : selectAll())}>
                {selectedColors.length === COLOR_LIST.length ? "Снять все" : "Выбрать все"}
            </button>
            <ul>
                {visibleColors.map((color) => (
                    <li key={color.name} onClick={() => toggleSelectColor(color.name)}>
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
