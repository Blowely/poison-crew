import React, {useEffect, useMemo, useRef, useState} from "react";
import {Button, Layout, message, Result} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./payment.scss";
import {
    CopyOutlined, CreditCardOutlined,
    DeleteOutlined,
    LeftOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../store";
import {useGetAccountQuery} from "../store/accounts.store";
import {useAddOrderMutation, useGetOrdersQuery, useUpdateStatusMutation} from "../store/orders.store";
import NonActiveBagIcon from "../assets/svg/non-active-bag-icon";
import ActiveCartIcon from "../assets/svg/active-cart-icon";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";
import SberIcon from "../assets/svg/payment/sber-icon";
import {getCurrentPriceOfSize, iosCopyToClipboard} from "../common/utils";
import {PRODUCT_STATUS} from "./constants";
import axios from "axios";

const Payment = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [step, setStep] = useState(0);

    const from = searchParams.get('from');
    const orderId = searchParams.get('id');
    const token = localStorage.getItem('token');
    const cartItems = useAppSelector((state) => state.cart.items) || [];


    const {data: accountData, isLoading: isLoadingAcc, error: accError} = useGetAccountQuery(token);
    const clientId = accountData?.account?._id;
    const {data: orders = [], isFetching: isLoadingOrders, error: ordersError, refetch} = useGetOrdersQuery(clientId, {
        skip: !clientId,
        refetchOnMountOrArgChange: true
    });

    const [updateOrderStatus, {isLoading: isLoadingAddOrder, error}] = useUpdateStatusMutation();


    useEffect(() => {
        window.scrollTo({top: 0})
    }, [])

    const onGoBackClick = () => {
      return navigate('/orders');
    }

    const paymentNumberRef = useRef(null);
    const paymentCostRef = useRef(null);

    const copyToClickBord = (el) => {
        iosCopyToClipboard(el);
        navigator.clipboard.writeText(el.value);
        message.success( 'Скопировано')
    }

    const deliveryCost = 1700;

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

    const memoTotalPricer = useMemo(() => {
        let totalPrice = 0;
        memoOrder?.products?.map((p, i) => totalPrice += Number(p?.price?.toString().substring(0, p?.price?.length - 2)));
        return totalPrice;
    }, [memoOrder])

    const onNextStepClick = () => {
        copyToClickBord(paymentNumberRef.current);
        setStep((prevStep) => ++prevStep);
    }

    const onIPaidClick = () => {
        try {
            setStep((prev) => ++prev);
            updateOrderStatus({clientId, orderId, status: PRODUCT_STATUS.PAYMENT_CHECK}).unwrap();
        } catch (e) {
            message.error('Произошла ошибка')
        }

    }

    const getPrice = (price) => {
        if (!price) {
            return '--';
        }

        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price.toString());
    }
    console.log('cartItems[cartItems.length - 1]=',cartItems[cartItems.length - 1]);

    return (
        <Layout>
            <div className="content-block-header border-radius">
              <LeftOutlined onClick={onGoBackClick} />
              Оплата <div />
            </div>
            {isLoadingOrders &&
                <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                    <LoadingOutlined style={{fontSize: '24px'}} spin />
                </div>
            }
            <div className="content-block">
                <div className="cart-item">
                    <div className="cart-order-info">
                        <div style={{display: "grid", gap: '7px'}}>
                            <div className="cart-product-info-payment-card">
                                <div className="order-info-block-item">
                                    <CreditCardOutlined
                                        style={{fontSize: '28px'}}
                                    />
                                    <div className="order-info-block-item-info">
                                        <input type="text" style={{display: 'none'}} ref={paymentCostRef}
                                               value={memoTotalPricer + deliveryCost}/>
                                        <div>Товар <span className="total-price">{memoTotalPricer} ₽</span></div>
                                        <span className="total-price">Итого {memoTotalPricer} ₽
                                                <CopyOutlined style={{marginLeft: '5px'}}
                                                              onClick={() => copyToClickBord(paymentCostRef.current)}/>
                                            </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                {step === 0 &&
                    <div className="cart-item">
                        <div className="cart-order-info">
                            <div style={{display: "grid", gap: '7px'}}>
                                {/*<div style={{fontSize: '15px', fontWeight: '500'}}>
                                    Скопируйте реквизиты
                                </div>
                                <div className="cart-product-info-payment-card">
                                    <div className="card">
                                        <SberIcon></SberIcon>
                                        <div>
                                            {getFormattedCardNumber()}
                                        </div>

                                    </div>
                                </div>*/}
                                <div style={{fontSize: '15px', fontWeight: '500'}}>
                                    Отсканируйте qr-code. Оплатите {getPrice(cartItems[cartItems.length - 1]?.price)}
                                </div>
                                <img className="cart-product-info-payment-qr"
                                     src="https://storage.yandexcloud.net/pc-mediafiles/test1/qr.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                }
                {step === 1 &&
                    <div className="cart-item">
                        <div className="cart-order-info">
                            <div style={{display: "grid", gap: '7px'}}>
                                <div style={{fontSize: '15px', fontWeight: '500'}}>
                                    Выполните перевод средств
                                </div>
                                <div className="cart-product-info-payment-card">
                                    <div className="order-info-block-item">
                                        <CreditCardOutlined
                                            style={{fontSize: '28px'}}
                                        />
                                        <div className="order-info-block-item-info">
                                            <input type="text" style={{display: 'none'}} ref={paymentCostRef}
                                                   value={memoTotalPricer + deliveryCost}/>
                                            <div>Товар <span className="total-price">{memoTotalPricer} ₽</span></div>
                                            <span className="total-price">Итого {memoTotalPricer} ₽
                                                <CopyOutlined style={{marginLeft: '5px'}}
                                                              onClick={() => copyToClickBord(paymentCostRef.current)}/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                }
            </div>
            <div className="cart-product-info-submit-btn-wrapper">
                {step === 0 &&
                    <Button type="primary" className="cart-product-info-submit-btn"
                            onClick={onNextStepClick}>
                        Скопировать и продолжить
                    </Button>
                }
                {step === 1 &&
                    <Button type="primary" className="cart-product-info-submit-btn"
                            onClick={onIPaidClick}>
                        Я оплатил
                    </Button>
                }
            </div>
            <footer>
                <div onClick={() => navigate('/products')}>
                    <NonActiveBagIcon/>
                </div>
                <div onClick={() => navigate('/cart')}>
                    <ActiveCartIcon style={{fontSize: '30px'}}/>
                </div>
                <div onClick={() => navigate('/profile')}>
                    <NonActiveProfileIcon style={{fontSize: '30px'}}/>
                </div>
            </footer>
        </Layout>
    );
}
export default Payment;
