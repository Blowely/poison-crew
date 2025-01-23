import React, {useMemo, useState} from 'react';
import './GenderSwitcher.scss';

const GenderSwitcher = () => {
    const href = window.location.href;
    const gender = useMemo(() => {
        const parts = href.split("/");
        return parts[4];
    },[href])

    const [activeTab, setActiveTab] = useState(gender);

    const onChange = (tab) => {
        setActiveTab(tab);
        window.location.href = `/products/${tab}`;
        localStorage.setItem('gender', tab);
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
                <div
                    className={`tab ${activeTab === "kid" ? "active" : ""}`}
                    onClick={() => onChange("kid")}
                >
                    Детям
                </div>
            </div>
        </div>

    );
};

export default GenderSwitcher;