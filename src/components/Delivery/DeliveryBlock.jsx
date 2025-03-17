import React from 'react';
import './DeliverBlock.scss';

const DeliverBlock = () => {
    return (
        <div className="item-details">
            <div className="details">
                <div className="title">Доставка</div>
                <div className="details-list">
                    <span>Среднее время доставки:</span>
                    <ul style={{ listStyle: 'none', margin: '0 7px', paddingInlineStart: "20px" }}>
                        <li>До Москвы: 16–20 дней</li>
                        <li>По России: 18–25 дней</li>
                    </ul>
                    <span>После оплаты вы получите доступ к отслеживанию статуса заказа в режиме реального времени. Мы
                        будем оперативно уведомлять вас обо всех изменениях, чтобы вы всегда были в курсе, где находится
                        ваш заказ.</span>
                </div>
            </div>
        </div>
    );
};

export default DeliverBlock;