import React, { useState } from "react";
import "./ColorSelector.scss";
import {Button} from "antd";

const colors = [
    { name: "Бежевый", color: "#d2b48c" },
    { name: "Белый", color: "#ffffff" },
    { name: "Бирюзовый", color: "#40e0d0" },
    { name: "Бордовый", color: "#800020" },
    { name: "Голубой", color: "#87ceeb" },
    { name: "Желтый", color: "#ffff00" },
    { name: "Зеленый", color: "#00FF00" },
    { name: "Золотой", color: "#FFD700" },
    { name: "Коралловый", color: "#FF7F50" },
    { name: "Коричневый", color: "#964B00" },
    { name: "Красный", color: "#FF0000" },
    { name: "Мультиколор", color: "linear-gradient(90deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #8F00FF)" },
    { name: "Оранжевый", color: "#FFA500" },
    { name: "Прозрачный", color: "#FFFFFF" },
    { name: "Розовый", color: "#FFC0CB" },
    { name: "Серебряный", color: "linear-gradient(90deg, #C0C0C0, #D3D3D3)" },
    { name: "Серый", color: "#808080" },
    { name: "Синий", color: "#0000FF" },
    { name: "Фиолетовый", color: "#7D3C98" },
    { name: "Фуксия", color: "#FF00FF" },
    { name: "Хаки", color: "#808000" },
    { name: "Чёрный", color: "#000000" }
];

const ColorSelector = () => {
    const [selectedColors, setSelectedColors] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const toggleSelectColor = (color) => {
        setSelectedColors((prev) =>
            prev.includes(color)
                ? prev.filter((c) => c !== color)
                : [...prev, color]
        );
    };

    const selectAll = () => {
        setSelectedColors(colors.map((c) => c.name));
    };

    const deselectAll = () => {
        setSelectedColors([]);
    };

    const toggleShowAll = () => {
        setShowAll((prev) => !prev);
    };

    const visibleColors = showAll ? colors : colors.slice(0, 5);

    return (
        <div className="color-selector">
            <button className="select-all" onClick={() => (selectedColors.length === colors.length ? deselectAll() : selectAll())}>
                {selectedColors.length === colors.length ? "Снять все" : "Выбрать все"}
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
