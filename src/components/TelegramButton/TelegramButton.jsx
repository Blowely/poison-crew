import React from "react";
import { Button } from "antd";
import "./TelegramButton.scss";

const TelegramButton = ({text, productUrl, size = 'middle'}) => {
    const handleClick = () => {
        if (productUrl) {
            const message = "Здравствуйте! Хочу задать вопрос по товару: " + productUrl;

            const telegramLink = `https://t.me/re_poizon_store?text=${encodeURIComponent(message)}`;
            return window.open(telegramLink, "_blank");

        }

        window.open(`https://t.me/re_poizon_store`, "_blank");
    };

    return (
        <Button className="telegram-button" type="primary" size={size}
                icon={<img src="/telegram-icon.svg" alt="Telegram" className="telegram-icon" />}
                onClick={handleClick}>
            {text || 'Написать в Telegram'}
        </Button>
    );
};

export default TelegramButton;
