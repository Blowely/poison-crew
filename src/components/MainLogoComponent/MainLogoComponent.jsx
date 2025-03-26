import RePoizonMainBigLogo from "../../assets/svg/re-poizon-main-middle-big-logo";
import RePoizonMainMiddleLogo from "../../assets/svg/re-poizon-main-middle-logo";
import GenderSwitcher from "../GenderSwitcher/GenderSwitcher";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthModal from "../../pages/AuthModal";

const MainLogoComponent = ({setOffset, setLoading, style}) => {
    const navigate = useNavigate();

    const [openAuth, setOpenAuth] = useState(false);
    const [codeModal, setCodeModal] = useState(false);

    const token = localStorage.getItem("token");
    const isDesktopScreen = window?.innerWidth > 768;


    const onProfileClick = () => {
        if (token) {
            navigate("/profile");
        }

        setOpenAuth(true);
    }

    const onInfoBlockItemClick = (link) => {
        window.open(link);
    }

    return (<>
        {!token && openAuth &&
            <AuthModal
                open={openAuth}
                setRemotePhone={() => {}}
                setModalOpen={() => setOpenAuth(true)}
                onCancel={() => {
                    setOpenAuth(false); setCodeModal(false)}}
                isCodeModalOpen={codeModal}
                setCodeModalOpen={setCodeModal}
            />
        }
        {isDesktopScreen && <div className="info-block-wrapper" style={style}>
            <div className="info-block">
                <div>
                    <span onClick={() => onInfoBlockItemClick("https://t.me/re_poizon_ru")}>
                        <img src="/telegram-icon.svg" alt="Telegram"/>Мы в телеграмм
                    </span>
                    <span onClick={() => onInfoBlockItemClick("https://t.me/+0h_e67SLTwsyMGFi")}>Отзывы</span>
                    <span onClick={() => onInfoBlockItemClick("https://storage.yandexcloud.net/pc-mediafiles/important/public-offer-re-poizon.pdf")}>
                        Оферта
                    </span>
                </div>
                <div>
                    <span onClick={() => onInfoBlockItemClick("tg://resolve?domain=re_poizon_store")}>Поддержка</span>
                    <span>+7 908 156 8531</span>
                    <span>repoizonstore@gmail.com</span>
                </div>
            </div>
        </div>}
            <div className="main-logo-wrapper" style={style}>
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
                        <div className="item" onClick={onProfileClick}>
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
        </div>
    </>
    )
}

export default MainLogoComponent;