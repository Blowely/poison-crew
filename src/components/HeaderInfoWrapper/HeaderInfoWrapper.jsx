import Header from "../Header/Header";
import React from "react";

const HeaderInfoWrapper = ({style = {width:'100vw'}}) => {
    const onInfoBlockItemClick = (link) => {
        window.open(link);
    }

    const isDesktopScreen = window?.innerWidth > 768;

    return (
        <div>
            {/*{isDesktopScreen && <div className="info-block-wrapper" style={{width:'100vw', marginLeft:'-12.5%'}}>*/}
            {isDesktopScreen && <div className="info-block-wrapper" style={style}>
                <div className="info-block">
                    <div>
                    <span onClick={() => onInfoBlockItemClick("https://t.me/re_poizon_ru")}>
                        <img src="/telegram-icon.svg" alt="Telegram"/>Мы в телеграм
                    </span>
                        <span onClick={() => onInfoBlockItemClick("https://t.me/repoizon_otzovik")}>Отзывы</span>
                        <span onClick={() => onInfoBlockItemClick("https://storage.yandexcloud.net/pc-mediafiles/important/public-offer-re-poizon.pdf")}>
                        Оферта
                    </span>
                    </div>
                    <div>
                        <span onClick={() => onInfoBlockItemClick("tg://resolve?domain=re_poizon_store")}>Поддержка</span>
                        <span>repoizonstore@gmail.com</span>
                    </div>
                </div>
            </div>}
            {isDesktopScreen &&
                <Header
                    style={style}
                    setLoading={() => {}}
                    setOffset={() => {}}
                />
            }
        </div>

    )
}

export default HeaderInfoWrapper