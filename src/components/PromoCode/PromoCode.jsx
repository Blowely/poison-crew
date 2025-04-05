import React, { useState } from "react";
import {Input, Button, Collapse, notification} from "antd";
import { TagOutlined } from "@ant-design/icons";
import "./PromoCode.scss";
import axios from "axios";

const { Panel } = Collapse;

const PromoCode = ({promo, setPromo, applyDiscount}) => {
    const isButtonDisabled = promo.trim() === "";
    const [loading, setLoading] = useState(false);

    const onApplyCode = async () => {
        setLoading(true);
        axios.get("https://api.re-poizon.ru/api/promo?code=" + promo).then((res) => {
            if (res?.data?.status === true) {
                notification.open({duration: 1.5, type: 'success', message:'Промокод применен'})
                applyDiscount(res?.data?.discount);
            } else {
                notification.open({duration: 1.5, type: 'warning', message:'Неверный промокод'})
            }
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            notification.open({duration: 1.5, type: 'error', message:'Неизвестная ошибка'})
            setLoading(false);
        });
    }

    return (
        <Collapse defaultActiveKey={["0"]} className="promo-code">
            <Panel
                header={
                    <div className="promo-header">
                        <TagOutlined/> <span>Использовать промокод</span>
                    </div>
                }
                key="1"
            >
                <div className="promo-content">
                    <Input
                        placeholder="Укажите промокод"
                        value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        allowClear
                    />
                    <Button type="primary" onClick={onApplyCode} disabled={isButtonDisabled || loading}
                            loading={loading}>
                        Применить
                    </Button>
                </div>
            </Panel>
        </Collapse>
    )
};

export default PromoCode;
