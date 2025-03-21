import React, {useEffect, useMemo, useState} from 'react';
import './GenderSwitcher.scss';
import {useNavigate} from "react-router-dom";

const GenderSwitcher = ({setLoading, setOffset}) => {
    const navigate = useNavigate();

    const href = window.location.href;
    const gender = useMemo(() => {
        const genderParamUrl = window.location.href.split("/")[3];
        return genderParamUrl.split('-')[0];
    },[href])

    const [activeTab, setActiveTab] = useState(gender);

    useEffect(() => {
        setActiveTab(gender);
    },[gender])

    const onChange = (tab) => {
        if (!setLoading && !setOffset) {
            return navigate(`/${tab}-products`);
        }

        console.log('tab',tab)
        setActiveTab(tab);
        navigate(`/${tab}-products`);
        localStorage.setItem('gender', tab);
        setLoading(true);
        setOffset(1);
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