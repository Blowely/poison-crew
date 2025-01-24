import React, {useEffect, useState} from "react";
import "./ColorSelector.scss";
import {Button} from "antd";
import {useSearchParams} from "react-router-dom";
import {COLOR_LIST} from "../../pages/constants";


const ColorSelector = ({setColors}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedColors, setSelectedColors] = useState([]);
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
    };

    useEffect(() => {
        console.log('selectedColors=',selectedColors)
        const colorsMap = selectedColors?.map((c1) => {
            const hexIndex = COLOR_LIST.findIndex((c2) => c2.name === c1);
            return COLOR_LIST[hexIndex].hex;
        })

        searchParams.set("colors", colorsMap.join(','));
        setSearchParams(searchParams);
    },[selectedColors]);

    const selectAll = () => {
        const colorsMap = COLOR_LIST.map((c) => c.name)
        setSelectedColors(colorsMap);
        setColors(colorsMap);
    };

    const deselectAll = () => {
        setSelectedColors([]);
        setColors([]);
        searchParams.delete('colors');
        setSearchParams(searchParams);
    };

    const toggleShowAll = () => {
        setShowAll((prev) => !prev);
    };

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
                            checked={selectedColors.includes(color.name)}
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
