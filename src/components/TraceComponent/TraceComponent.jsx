import React, {useEffect, useRef} from "react";
import {Divider, message, Steps} from "antd";
import {
    CopyOutlined,
} from "@ant-design/icons";
import {iosCopyToClipboard} from "../../common/utils";
import moment from "moment";
import {PRODUCT_DELIVERY_STATUS, PRODUCT_DELIVERY_STATUS_DICTIONARY} from "../../pages/constants";


const TraceComponent = ({order}) => {

    useEffect(() => {
        window.scrollTo({top: 0})
    }, [])


    const traceNumberRef = useRef(null);

    const copyToClickBord = (el) => {
        iosCopyToClipboard(el);
        navigator.clipboard.writeText(el.value);
        message.success( 'Скопировано')
    }

    const deliveryStatusKey = useRef(0);

    useEffect(() => {
        const activeDeliveryKey = Object.values(PRODUCT_DELIVERY_STATUS)
            .findIndex((el) => el === order?.delivery_status);

        deliveryStatusKey.current = activeDeliveryKey >= 0 ? activeDeliveryKey : 0
    },[order])

    const createdAtAdded20Days = moment(order?.createdAt).add(20, "days").format('ll');

    const deliverySteps = Object.values(PRODUCT_DELIVERY_STATUS_DICTIONARY).map((el) => (
        {
            title: el.title,
            description: el.description
        }));

    return (
        <div>
            <div className="cart-item">
                <div className="cart-order-info">
                    <div style={{display: 'flex', alignItems: "center", gap: '10px'}}>
                        <span style={{minWidth: "30%", fontWeight: '500'}}>Ожидается <br/>{createdAtAdded20Days}</span>
                    </div>
                    <Divider style={{margin: '6px 0'}}></Divider>
                    <div style={{display: 'flex', gap: '7px'}}>
                        <div style={{display: 'flex', gap: '7px'}}>
                            <span style={{fontSize: '14px', width: 'auto'}}>Трек-номер:</span>
                            <span>{order?.trace_number || ''}</span>

                        </div>
                        {order?.trace_number &&
                            <CopyOutlined style={{marginLeft: '5px'}}
                                          onClick={() => copyToClickBord(traceNumberRef.current)}/>
                        }
                        <input type="text" style={{display: 'none'}} ref={traceNumberRef}
                               value={order?.trace_number}/>
                    </div>

                </div>
            </div>
            <div className="cart-item">
                <div className="cart-order-info">
                    <Steps
                        progressDot
                        current={deliveryStatusKey.current}
                        direction="vertical"
                        items={deliverySteps}
                    />
                </div>
            </div>
        </div>
    );
}
export default TraceComponent;
