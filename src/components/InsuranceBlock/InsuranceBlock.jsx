import React from 'react';
import './InsuranceBlock.scss';

const InsuranceBlock = () => {
    return (
        <div className="item-details">
            <div className="details">
                <div className="title">Страховка</div>
                <div className="details-list">
                    Стоимость товара уже включает полное страхование — вам не нужно беспокоиться о дополнительных расходах. Мы гарантируем, что ваш заказ будет доставлен в идеальном состоянии, и берём на себя всю ответственность за его сохранность
                </div>
            </div>
        </div>
    );
};

export default InsuranceBlock;