import React, {useState} from "react";
import {BRANDS} from "../constants";
import {Checkbox, Input} from "antd";
import "./SizesSelector.scss"
import {APPAREL_SIZES, SIZES} from "../../pages/constants";
import {useSearchParams} from "react-router-dom";

const SizesModalSelector = ({sizes, setSizes, setLoading}) => {
    const [searchParams] = useSearchParams();

    const category1Id = searchParams.get("category1Id") || "";
    const category2Id = searchParams.get("category2Id") || "";
    const category3Id = searchParams.get("category3Id") || "";

    const isSelectedCategory = !!(category1Id || category2Id || category3Id);

    const onChangeChoiceHandler = (el) => {
        setSizes((prev) => prev.includes(el)
            ? prev.filter((c) => c !== el)
            : [...prev, el]);
    };

    const isFootwear = () => {
        if (category1Id === '29') {
            return true;
        }

        const footwear2Categories = ['35', '30', '410', '292'];
        const footwear3Categories = ['38'];

        if (footwear2Categories.includes(category2Id) || footwear3Categories.includes(category3Id)) {
            return true;
        }

        return !isSelectedCategory;
    }

    return (
        <div className="brand-selector">
            <div className="params-item-wrapper">
                <div className="list">
                    {isFootwear() && SIZES?.map((el, i) => (
                        <div
                            className={
                                sizes?.includes(el)
                                    ? "size-wrapper gap-2 selected"
                                    : "size-wrapper gap-2"
                            }
                            onClick={() => onChangeChoiceHandler(el)}
                            key={i}
                            role="presentation"
                        >
                            <div
                                style={{
                                    fontSize: "15px",
                                    fontWeight: "400",
                                    textAlign: "center",
                                }}
                            >
                                {el}
                            </div>
                        </div>
                    ))}
                    {!isFootwear() && APPAREL_SIZES?.map((el, i) => (
                        <div
                            className={
                                sizes?.includes(el)
                                    ? "size-wrapper gap-2 selected"
                                    : "size-wrapper gap-2"
                            }
                            onClick={() => onChangeChoiceHandler(el)}
                            key={i}
                            role="presentation"
                        >
                            <div
                                style={{
                                    fontSize: "15px",
                                    fontWeight: "400",
                                    textAlign: "center",
                                }}
                            >
                                {el}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default SizesModalSelector