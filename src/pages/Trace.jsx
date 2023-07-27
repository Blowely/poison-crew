import React, {useEffect, useMemo, useRef, useState} from "react";
import {Button, Divider, Layout, message, Result, Steps, Typography} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
    CopyOutlined, CreditCardOutlined,
    DeleteOutlined,
    LeftOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import {useAppDispatch} from "../store";
import {useGetAccountQuery} from "../store/accounts.store";
import {useAddOrderMutation, useGetOrdersQuery, useUpdateStatusMutation} from "../store/orders.store";
import NonActiveBagIcon from "../assets/svg/non-active-bag-icon";
import ActiveCartIcon from "../assets/svg/active-cart-icon";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";
import SberIcon from "../assets/svg/payment/sber-icon";
import {iosCopyToClipboard} from "../common/utils";
import {PRODUCT_STATUS} from "./constants";
import axios from "axios";
import moment from "moment";


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

    const onGoBackClick = () => {
      return navigate('/orders');
    }

    const traceNumberRef = useRef(null);

    const copyToClickBord = (el) => {
        iosCopyToClipboard(el);
        navigator.clipboard.writeText(el.value);
        message.success( 'Скопировано')
    }

    const [deliveryStatus, setDeliveryStatus] = useState(null);


    const memoOrder = useMemo(() => {
        const order = orders?.find((order) => order._id === orderId);
        setDeliveryStatus(order?.deliveryStatus);

        return order;
    }, [orderId, orders])

    const createdAtAdded20Days = moment(memoOrder?.createdAt).add(20, "days").format('ll');

    return (
        <Layout>
            <div className="content-block-header">
              <LeftOutlined onClick={onGoBackClick} />
              Отслеживание <div />
            </div>
            {isLoadingOrders &&
                <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                    <LoadingOutlined style={{fontSize: '24px'}} spin />
                </div>
            }
            <div className="content-block">
                <div className="cart-item">
                    <div className="cart-order-info">
                        <div style={{display: 'flex', alignItems: "center", gap: '10px'}}>
                            <img src={memoOrder?.products[0]?.images[0]} style={{width: '70px'}} alt=""/>
                            <span style={{minWidth: "30%", fontWeight: '500'}}>Ожидается <br/>{createdAtAdded20Days}</span>
                            <Steps
                                size="small"
                                current={1}
                                style={{paddingTop: '15px', height: '100px'}}
                                items={[
                                    {
                                        title: 'Finished',
                                    },
                                    {
                                        title: 'In Progress',
                                    },
                                ]}
                            />
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
                            current={1}
                            direction="vertical"
                            items={[
                                {
                                    title: 'Заказ создан',
                                    description: 'Заказ обработан и подтвержден менеджером',
                                },
                                {
                                    title: 'Выкуплен в POIZON',
                                    description: 'This is a description. This is a description.',
                                },
                                {
                                    title: 'In Progress',
                                    description: 'This is a description. This is a description.',
                                },
                                {
                                    title: 'Waiting',
                                    description: 'This is a description.',
                                },
                                {
                                    title: 'Waiting',
                                    description: 'This is a description.',
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
            <footer>
                <div onClick={() => navigate('/products')}>
                    <NonActiveBagIcon/>
                </div>
                <div onClick={() => navigate('/cart?from=products') }>
                    <ActiveCartIcon style={{ fontSize: '30px'}} />
                </div>
                <div onClick={() => navigate('/profile')}>
                    <NonActiveProfileIcon style={{ fontSize: '30px'}} />
                </div>
            </footer>
        </Layout>
    );
}
export default Trace;
