import RePoizonMainBigLogo from "../../assets/svg/re-poizon-main-middle-big-logo";
import RePoizonMainMiddleLogo from "../../assets/svg/re-poizon-main-middle-logo";
import GenderSwitcher from "../GenderSwitcher/GenderSwitcher";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./FooterDesktop.scss"

const FooterDesktop = ({setOffset, setLoading, style}) => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const isDesktopScreen = window?.innerWidth > 768;


    const onProfileClick = () => {
        if (token) {
            navigate("/profile");
        }
    }
    const val11 = "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C.png"
    const val12 = "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C%20%D0%B0%D0%BA%D1%82%D0%B8%D0%B2.png"

    const val21 = "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5.png"
    const val22 = "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5%20%D0%B0%D0%BA%D1%82%D0%B8%D0%B2.png"

    const val31 = "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0.png"
    const val32 = "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0%20%D0%B0%D0%BA%D1%82%D0%B8%D0%B2.png"

    const [profileIcon, setProfileIcon] = useState(val11)
    const [favIcon, setFavIcon] = useState(val21)
    const [cartIcon, setCartIcon] = useState(val31)

    const onMouseOver = (setIcon, val) => {
        setIcon(val);
    }

    const onMouseLeave = (setIcon, val) => {
        setIcon(val);
    }

    return (<div className="main-footer-wrapper" style={style}>
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
                    <div className="item"
                         onClick={onProfileClick}
                         onMouseOver={() => onMouseOver(setProfileIcon, val12)}
                         onMouseLeave={() => onMouseLeave(setProfileIcon, val11)}
                    >
                        <img style={{height: '23px'}}
                             src={profileIcon}
                             alt=""/>
                        Профиль
                    </div>
                    <div className="item"
                         onClick={() => navigate("/favorites")}
                         onMouseOver={() => onMouseOver(setFavIcon, val22)}
                         onMouseLeave={() => onMouseLeave(setFavIcon, val21)}
                    >
                        <img style={{height: '23px'}}
                             src={favIcon}
                             alt=""/>
                        Избранное
                    </div>
                    <div className="item"
                         onClick={() => navigate("/cart")}
                         onMouseOver={() => onMouseOver(setCartIcon, val32)}
                         onMouseLeave={() => onMouseLeave(setCartIcon, val31)}
                    >
                        <img style={{height: '23px'}}
                             src={cartIcon}
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
    </div>
    )
}

export default FooterDesktop;