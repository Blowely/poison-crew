import React, {useEffect, useState} from 'react';
import './GenderSwitcher.scss';
import {useNavigate} from "react-router-dom";

const GenderSwitcher = ({setLoading = () => {}, setOffset = () => {}}) => {
    const navigate = useNavigate();

    const getGender = () => {
        const genderParamUrl = window.location.href.split("/")[3];
        return genderParamUrl.split('-')[0];
    }

    const gender = getGender();

    const localGender = localStorage.getItem("gender") || gender || "men";

    const [activeTab, setActiveTab] = useState();

    useEffect(() => {
        if (localGender) {
            setActiveTab(localGender || "men");
        }
    },[localGender])

    const onChange = (tab) => {
        if (!setLoading && !setOffset) {
            return navigate(`/${tab}-products`);
        }

        setActiveTab(tab);
        localStorage.setItem('gender', tab);
        setLoading(true);
        setOffset(1);

        if (window.location.href.includes("category")) {
            const category = window.location.href.split("?")[1];
            return navigate(`/${tab}-products?${category}`);
        }

        if (window.location.href.includes("products")) {
            return navigate(`/${tab}-products`);
        }

        if (window.location.href.includes("categories")) {
            return navigate(`/${tab}-categories`);
        }

        return navigate(`/${tab}-products`);
    }

    const isDesktopScreen = window?.innerWidth > 768;

    return (
        <div className={`${!isDesktopScreen ? 'tabs-wrapper' : ''}`}>
            <div className={`${isDesktopScreen ? 'tabs' : 'custom-tabs'}`}>
                <div
                    className={`tab ${activeTab === "men" ? "active" : ""}`}
                    onClick={() => onChange("men")}
                >
                    Мужчинам
                </div>
                <div
                    className={`tab ${activeTab === "women" ? "active" : ""}`}
                    onClick={() => onChange("women")}
                >
                    Женщинам
                </div>
                {/*<div
                    className={`tab ${activeTab === "kid" ? "active" : ""}`}
                    onClick={() => onChange("kid")}
                >
                    Детям
                </div>*/}
            </div>
        </div>

    );
};

export default GenderSwitcher;