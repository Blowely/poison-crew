import React, {useEffect, useMemo, useRef, useState} from "react";
import {Button, Divider, Layout, message, Tag} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./payment.scss";
import "./order.scss";
import {
    CopyOutlined, CreditCardOutlined,
    DeleteOutlined,
    LeftOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import {useAppDispatch} from "../store";
import {useGetAccountQuery} from "../store/accounts.store";
import { useGetOrdersQuery} from "../store/orders.store";
import NonActiveBagIcon from "../assets/svg/non-active-bag-icon";
import ActiveCartIcon from "../assets/svg/active-cart-icon";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";
import SberIcon from "../assets/svg/payment/sber-icon";
import {iosCopyToClipboard} from "../common/utils";
import {PRODUCT_STATUS, PRODUCT_STATUS_DICTIONARY} from "./constants";
import ActiveProfileLargeIcon from "../assets/svg/active-profile-icon";
import StatusText from "../components/Status";
import StatusTag from "../components/Status";

const Order = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const from = searchParams.get('from');
    const orderId = searchParams.get('id');
    const token = localStorage.getItem('token');


    const {data: accountData, isLoading: isLoadingAcc, error: accError} = useGetAccountQuery(token);
    const clientId = accountData?.account?._id;
    const {data: orders = [], isLoading: isLoadingOrders, error: ordersError, refetch} = useGetOrdersQuery(clientId, {
        skip: !clientId,
        refetchOnMountOrArgChange: true
    });

    useEffect(() => {
        window.scrollTo({top: 0})
    }, [])

    const onGoBackClick = () => {
      return navigate('/orders');
    }

    let totalPrice = 0;

    const paymentNumberRef = useRef(null);
    const paymentCostRef = useRef(null);

    const copyToClickBord = (el) => {
        iosCopyToClipboard(el);
        navigator.clipboard.writeText(el.value);
        message.success( 'Скопировано')
    }

    const deliveryCost = 1399;

    const getFormattedCardNumber = () => {
        const number = '2202201875038123';

        return <span style={{display: "grid", gap: '8px'}}>
                    <input type="text" style={{visibility: 'hidden'}} ref={paymentNumberRef} value={number}/>
                    Номер карты
                    <span className="formatted-card-number">
                        <span>{number.substring(0,4)}</span>
                        <span>{number.substring(4,8)}</span>
                        <span>{number.substring(8,12)}</span>
                        <span>{number.substring(12,16)}</span>
                        <CopyOutlined onClick={() => copyToClickBord(paymentNumberRef.current)}/>
                    </span>
                    Андрей Евгеньевич М
                </span>
    }

    const memoOrder = useMemo(() => {
        return orders?.find((order) => order._id === orderId);
    }, [orderId, orders])

    const onGoToPaymentClick = (id) => {
        return navigate(`/payment?id=${id}`);
    }

    return (
        <Layout>
            <div className="content-block-header content-block-header-order">
                <LeftOutlined onClick={onGoBackClick} />
                Заказ № {orderId}
                <CopyOutlined
                onClick={() => copyToClickBord(paymentCostRef.current)}
                />
            </div>
            {isLoadingOrders &&
                <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                    <LoadingOutlined style={{fontSize: '24px'}} spin />
                </div>
            }
            {!isLoadingOrders &&
                <div className="content-block">
                    {[memoOrder]?.map((el, i) => {
                        totalPrice = 0;
                        return <div key={i} className="cart-item">
                            <div className="cart-order-info">
                                <div style={{fontSize: '15px', fontWeight: '500'}}>
                                    Статус заказа
                                </div>
                                <div className="status-block-wrapper">
                                    <StatusTag status={el?.status}/>
                                    {el?.status === PRODUCT_STATUS.CREATED && 'Сразу после подтверждения(~3мин) ' +
                                        'заказ станет доступным к оплате'
                                    }
                                </div>

                                <Divider style={{margin: '10px 0'}}></Divider>

                                <div style={{display: "grid", gap: '7px'}}>
                                    {el?.products?.map((p, i) => {
                                        totalPrice += Math.ceil(Number(p?.price) * 11.9 + 1000);
                                        return (
                                            <div key={i} className="cart-product-info-payment">
                                                <div style={{display: 'flex', gap: '7px'}}>
                                                    <img src={p?.images[0]} style={{width: '100px'}} alt=""/>
                                                    <div>
                                                        <div style={{fontSize: '16px'}}>{p?.title}</div>
                                                        <div>размер: {p?.size}</div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div style={{fontWeight: '500'}}>
                                                        {Math.ceil(Number(p?.price) * 11.9 + 1000)} ₽
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    <div className="total-price">Товары {totalPrice} ₽</div>
                                </div>
                            </div>
                        </div>
                    })}
                    <div className="cart-item">
                        <div className="cart-order-info">
                            <div style={{display: "grid", gap: '7px'}}>
                                <div style={{fontSize: '15px', fontWeight: '500'}}>
                                    Доставка
                                </div>

                                <div className="cart-product-info-payment">
                                    <div style={{display: 'flex', gap: '7px'}}>
                                        <div>
                                            <img src="https://storage.yandexcloud.net/boxberrysite-public/logo/logo-boxberry-mobile.png?v=3"
                                                 style={{ height: '20px'}} alt=""/>
                                            <div style={{fontSize: '16px'}}>BoxBerry</div>
                                            <div>Пункт выдачи заказов</div>
                                            <div>{orders[0]?.address?.address}</div>
                                            <br/>
                                            <div>Ожидаемое время доставки 16-18 дней</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="total-price">Доставка {1399} ₽</div>
                            </div>


                        </div>
                    </div>
                    <div className="cart-item">
                        <div className="cart-order-info">
                            <div style={{display: "grid", gap: '7px'}}>
                                <div style={{fontSize: '15px', fontWeight: '500', paddingBottom: '10px'}}>
                                    Информация о заказе
                                </div>
                                        <div className="cart-product-info-payment-card">
                                            <div className="order-info-block-item">
                                                <ActiveProfileLargeIcon />
                                                <div className="order-info-block-item-info">
                                                    <div>Получатель</div>
                                                    +{accountData?.account?.phone}
                                                    <div>{memoOrder?.address?.fio || 'Маряшин Андрей Евгеньевич'}</div>
                                                </div>

                                            </div>
                                            <Divider style={{margin: '6px 0'}}></Divider>
                                            <div className="order-info-block-item">
                                                <CreditCardOutlined
                                                    style={{fontSize: '28px'}}
                                                />
                                                <div className="order-info-block-item-info">
                                                    <div>Не оплачено</div>
                                                    <div>Товары <span className="total-price">{totalPrice} ₽</span></div>
                                                    <div>Доставка <span className="total-price">{1399} ₽</span></div>
                                                    <div>Итого <span className="total-price">{totalPrice + 1399} ₽</span></div>
                                                </div>
                                            </div>
                                        </div>


                            </div>


                        </div>
                    </div>
                </div>
            }
            <div className="cart-product-info-submit-btn-wrapper">
                {memoOrder?.status === PRODUCT_STATUS.APPROVED &&
                    <Button
                        type="primary"
                        className="cart-product-info-submit-btn"
                        onClick={() => onGoToPaymentClick(memoOrder?._id)}
                    >
                        Оплатить
                    </Button>
                }
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
export default Order;
