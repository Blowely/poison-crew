import {PRODUCT_STATUS, PRODUCT_STATUS_DICTIONARY} from "../pages/constants";
import {Tag} from "antd";
import React from "react";

const StatusTag = ({status}) => {
    const getTag = () => {
        const data = {};
        switch (status) {
            case PRODUCT_STATUS.CREATED:
                data.color = 'blue';
                data.text = 'Проверка товара';
                break;
            case PRODUCT_STATUS.APPROVED:
                data.color = 'blue';
                data.text = 'Готов к оплате';
                break;
            case PRODUCT_STATUS.PAYMENT_CHECK:
                data.color = 'blue';
                data.text = 'Проверка платежа';
                break;
            case PRODUCT_STATUS.PAID:
                data.color = 'green';
                data.text = 'Оплачен';
                break;
            default: break;
        }

        return <Tag color={data.color} style={{width: 'fit-content', height: "fit-content"}}>
            {data.text}
        </Tag>;
    }

    return <>{getTag()}</>
}
export default StatusTag;