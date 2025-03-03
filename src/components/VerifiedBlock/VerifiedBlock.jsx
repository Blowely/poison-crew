import React from 'react';
import './VerifiedBlock.scss';
import {CheckCircleOutlined} from "@ant-design/icons";

const VerifiedBlock = () => {
    return (
        <div className="item-details">
            <div className="details">
                <div className="title">Сторого оригинал <CheckCircleOutlined /></div>
                <div className="details-list">
                    Мы гарантируем, что все купленные товары в Re-Poizon оригинальные и прошли проверку на подлинность. Если по каким-то причинам у вас на руках окажется подделка — мы вернем деньги в двойном размере.
                </div>
            </div>
        </div>
    );
};

export default VerifiedBlock;