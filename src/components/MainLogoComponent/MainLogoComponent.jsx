import RePoizonMainBigLogo from "../../assets/svg/re-poizon-main-middle-big-logo";
import RePoizonMainMiddleLogo from "../../assets/svg/re-poizon-main-middle-logo";
import GenderSwitcher from "../GenderSwitcher/GenderSwitcher";
import React from "react";
import {useNavigate} from "react-router-dom";

const MainLogoComponent = ({setOffset, setLoading, style}) => {
    const navigate = useNavigate();
    const isDesktopScreen = window?.innerWidth > 768;

    return (<div className="main-logo-wrapper" style={style}>
        {isDesktopScreen
            ? <div onClick={() => navigate('/products')}
                   style={{cursor: "pointer", zIndex: "1", display: "flex", alignItems: "center"}}>
                <RePoizonMainBigLogo/></div>
            : <div onClick={() => navigate('/products')}
                   style={{cursor: "pointer", zIndex: "1", display: "flex", alignItems: "center"}}>
                <RePoizonMainMiddleLogo/></div>}
        {isDesktopScreen ?
            <div className="actions-btns" style={{width: "80%"}}>
                <GenderSwitcher setOffset={setOffset} setLoading={setLoading}/>
                <div className="items-wrapper">
                    <div className="item" onClick={() => navigate("/profile")}>
                        <img style={{height: '23px'}}
                             src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C.png"
                             alt=""/>
                        Профиль
                    </div>
                    <div className="item" onClick={() => navigate("/favorites")}>
                        <img style={{height: '23px'}}
                             src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5.png"
                             alt=""/>
                        Избранное
                    </div>
                    <div className="item" onClick={() => navigate("/cart")}>
                        <img style={{height: '23px'}}
                             src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0.png"
                             alt=""/>
                        Корзина
                    </div>
                </div>

            </div>
            : <div className="actions-btns">
                {/*<MenuOutlined style={{fontSize: '22px'}} onClick={() => navigate(`/${gender}-categories/`)}/>
                <div onClick={() => navigate("/profile")}>
                  <NonActiveProfileIcon/>
                </div>*/}
            </div>
        }
    </div>)
}

export default MainLogoComponent;