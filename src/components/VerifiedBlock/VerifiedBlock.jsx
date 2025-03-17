import React from 'react';
import './VerifiedBlock.scss';
import {CheckCircleOutlined} from "@ant-design/icons";

const VerifiedBlock = () => {
    return (
        <div className="item-details">
            <div className="details">
                <div className="title">Сторого оригинал <CheckCircleOutlined /></div>
                <div className="details-list">
                    Мы гарантируем подлинность всех товаров, приобретённых в Re-Poizon. Каждый продукт проходит тщательную проверку, чтобы обеспечить его оригинальность. Если же вам попадётся подделка, мы вернём полную стоимость в двойном размере.
                </div>
            </div>
        </div>
    );
};

export default VerifiedBlock;