import {PRODUCT_STATUS, PRODUCT_STATUS_DICTIONARY} from "../pages/constants";
import {Tag} from "antd";
import React from "react";

const StatusTag = ({status}) => {
    const getTag = () => {
        const data = {};
        switch (status) {
            case PRODUCT_STATUS.CREATED:
                data.color = 'blue';
                data.text = 'Ожидание оплаты';
                break;
            case PRODUCT_STATUS.CANCELED:
                data.color = 'red';
                data.text = 'Отклонен';
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