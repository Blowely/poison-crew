import React from 'react';
import './InsuranceBlock.scss';

const InsuranceBlock = () => {
    return (
        <div className="item-details">
            <div className="details">
                <div className="title">Страховка</div>
                <div className="details-list">
                    В стоимость товара входит его полное страхование. Мы несем ответственность, чтобы вы получили свой заказ в целости и сохранности.
                </div>
            </div>
        </div>
    );
};

export default InsuranceBlock;