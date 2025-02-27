import React, { useState } from "react";
import { Input, Button, Collapse } from "antd";
import { TagOutlined } from "@ant-design/icons";
import "./PromoCode.scss";

const { Panel } = Collapse;

const PromoCode = () => {
    const [promoCode, setPromoCode] = useState("");
    const isButtonDisabled = promoCode.trim() === "";

    const onApplyCode = () => {

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
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        allowClear
                    />
                    <Button type="primary" onClick={onApplyCode} disabled={isButtonDisabled}>
                        Применить
                    </Button>
                </div>
            </Panel>
        </Collapse>
        )};

            export default PromoCode;
