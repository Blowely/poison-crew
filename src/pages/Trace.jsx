import React, {useEffect, useMemo, useRef, useState} from "react";
import {Button, Divider, Layout, message, Result, Steps, Typography} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
    CopyOutlined, CreditCardOutlined,
    DeleteOutlined,
    LeftOutlined,
    LoadingOutlined, ReloadOutlined,
} from "@ant-design/icons";
import {useAppDispatch} from "../store";
import {useGetAccountQuery} from "../store/accounts.store";
import {useAddOrderMutation, useGetOrdersQuery, useUpdateStatusMutation} from "../store/orders.store";
import NonActiveBagIcon from "../assets/svg/non-active-bag-icon";
import ActiveCartIcon from "../assets/svg/active-cart-icon";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";
import SberIcon from "../assets/svg/payment/sber-icon";
import {iosCopyToClipboard} from "../common/utils";
import {PRODUCT_DELIVERY_STATUS, PRODUCT_DELIVERY_STATUS_DICTIONARY, PRODUCT_STATUS} from "./constants";
import axios from "axios";
import moment from "moment";
import NonActiveCartIcon from "../assets/svg/non-active-cart-icon";
import ActiveProfileIcon from "../assets/svg/active-profile-icon";


const Trace = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [step, setStep] = useState(0);

    const from = searchParams.get('from');
    const orderId = searchParams.get('id');
    const token = localStorage.getItem('token');


    const {data: accountData, isLoading: isLoadingAcc, error: accError} = useGetAccountQuery(token);
    const clientId = accountData?.account?._id;
    const {data: orders = [], isLoading: isLoadingOrders, error: ordersError, refetch} = useGetOrdersQuery(clientId, {
        skip: !clientId,
        refetchOnMountOrArgChange: true
    });

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    },[orders]);

    useEffect(() => {
        window.scrollTo({top: 0})
    }, [])

    const onGoBackClick = () => {
      return navigate('/orders');
    }

    const traceNumberRef = useRef(null);

    const copyToClickBord = (el) => {
        iosCopyToClipboard(el);
        navigator.clipboard.writeText(el.value);
        message.success( 'Скопировано')
    }

    const deliveryStatusKey = useRef(0);


    const memoOrder = useMemo(() => {
        const order = orders?.find((order) => order._id === orderId);
        const activeDeliveryKey = Object.values(PRODUCT_DELIVERY_STATUS)
            .findIndex((el) => el === order?.delivery_status);

        deliveryStatusKey.current = activeDeliveryKey >= 0 ? activeDeliveryKey : 0
        return order;
    }, [orderId, orders])

    const createdAtAdded20Days = moment(memoOrder?.createdAt).add(20, "days").format('ll');

    const deliverySteps = Object.values(PRODUCT_DELIVERY_STATUS_DICTIONARY).map((el) => (
        {
            title: el.title,
            description: el.description
        }));

    return (
        <Layout>
            <div className="content-block-header border-radius">
                <LeftOutlined onClick={onGoBackClick} />
                Отслеживание
                <ReloadOutlined onClick={async () => {
                    setLoading(true);
                    await refetch();
                    setLoading(false);
                }}/>
            </div>
            {(isLoading || isLoadingOrders) &&
                <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                    <LoadingOutlined style={{fontSize: '24px'}} spin />
                </div>
            }
            {!isLoading &&
                <div className="content-block">
                    <div className="cart-item">
                        <div className="cart-order-info">
                            <div style={{display: 'flex', alignItems: "center", gap: '10px'}}>
                                <img src={memoOrder?.products[0]?.product?.images[0]} style={{width: '70px'}} alt=""/>
                                <span style={{minWidth: "30%", fontWeight: '500'}}>Ожидается <br/>{createdAtAdded20Days}</span>
                            </div>
                            <Divider style={{margin: '6px 0'}}></Divider>
                            <div style={{display: 'flex', gap: '7px'}}>
                                <div style={{display: 'flex', gap: '7px'}}>
                                    <span style={{fontSize: '14px', width: 'auto'}}>Трек-номер:</span>
                                    <span>{memoOrder?.trace_number || ''}</span>

                                </div>
                                {memoOrder?.trace_number &&
                                    <CopyOutlined style={{marginLeft:'5px'}}
                                                  onClick={() => copyToClickBord(traceNumberRef.current)}/>
                                }
                                <input type="text" style={{display: 'none'}} ref={traceNumberRef} value={memoOrder?.trace_number}/>
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
            }
            <footer>
                <div onClick={() => navigate('/products')}>
                    <NonActiveBagIcon/>
                </div>
                <div onClick={() => navigate('/cart') }>
                    <NonActiveCartIcon style={{ fontSize: '30px'}} />
                </div>
                <div onClick={() => navigate('/profile')}>
                    <ActiveProfileIcon style={{ fontSize: '30px'}} />
                </div>
            </footer>
        </Layout>
    );
}
export default Trace;
