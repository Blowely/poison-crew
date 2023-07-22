import React, {useEffect, useMemo, useRef, useState} from "react";
import {Button, Layout, message} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./payment.scss";
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

const Payment = () => {
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

    const deliveryCost = 799;

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
        return orders.find((order) => order._id === orderId);
    }, [orderId, orders])

    const memoTotalPricer = useMemo(() => {
        console.log('memoOrder',memoOrder);
        let totalPrice = 0;
        memoOrder?.products?.map((p, i) => totalPrice += Math.ceil(Number(p?.price) * 11.9 + 1000));
        console.log('totalPrice', totalPrice);
        return totalPrice;
    }, [memoOrder])

    const onNextStepClick = () => {
        copyToClickBord(paymentNumberRef.current);
        setStep((prevStep) => ++prevStep);
    }

    return (
        <Layout>
            <div className="content-block-header">
              <LeftOutlined onClick={onGoBackClick} />
              Оплата <div />
            </div>
            {isLoadingOrders &&
                <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                    <LoadingOutlined style={{fontSize: '24px'}} spin />
                </div>
            }
            <div className="content-block">
                {step === 0 &&
                    <div className="cart-item">
                        <div className="cart-order-info">
                            <div style={{display: "grid", gap: '7px'}}>
                                <div style={{fontSize: '15px', fontWeight: '500'}}>
                                    Скопируйте реквизиты
                                </div>
                                <div className="cart-product-info-payment-card">
                                    <div className="card">
                                        <SberIcon></SberIcon>
                                        <div>
                                            {getFormattedCardNumber(totalPrice + deliveryCost)}
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                }
                {step === 1 &&
                    <div className="cart-item">
                        <div className="cart-order-info">
                            <div style={{display: "grid", gap: '7px'}}>
                                <div style={{fontSize: '15px', fontWeight: '500'}}>
                                    Скопируйте сумму платежа
                                </div>
                                <div className="cart-product-info-payment-card">
                                    <div className="order-info-block-item">
                                        <CreditCardOutlined
                                            style={{fontSize: '28px'}}
                                        />
                                        <div className="order-info-block-item-info">
                                            <div>Товары <span className="total-price">{memoTotalPricer} ₽</span></div>
                                            <div>Доставка <span className="total-price">{799} ₽</span></div>
                                            <span className="total-price">Итого {memoTotalPricer + 799} ₽</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                }
                {step === 2 &&
                    <div className="cart-item">
                        <div className="cart-order-info">
                            <div style={{display: "grid", gap: '7px'}}>
                                <div style={{fontSize: '15px', fontWeight: '500'}}>
                                    Перевод на карту
                                </div>
                                <div className="cart-product-info-payment-card">
                                    <div className="actions-way">
                                        <input type="text" style={{display: 'none'}} ref={paymentCostRef} value={totalPrice + deliveryCost}/>
                                        <span>1. Скопируйте реквизиты</span>
                                        <span>2. Сделайте перевод на <span style={{fontWeight: 500}}>{totalPrice + deliveryCost}</span> RUB(Сбер) <CopyOutlined onClick={() => copyToClickBord(paymentCostRef.current)}/></span>
                                        <span>3. Нажмите кнопку "Я оплатил". Ожидайте обработки платежа</span>

                                    </div>
                                    <div className="card">
                                        <SberIcon></SberIcon>
                                        <div>
                                            {getFormattedCardNumber(totalPrice + deliveryCost)}
                                        </div>

                                    </div>
                                </div>

                                <div className="total-price">Итого ₽{totalPrice + 799}</div>
                            </div>


                        </div>
                    </div>
                }


            </div>
            }
            <div className="cart-product-info-submit-btn-wrapper">
                {step === 0 &&
                    <Button type="primary" className="cart-product-info-submit-btn"
                            onClick={onNextStepClick}>
                        Скопировать и продолжить
                    </Button>
                }
                {step === 1 &&
                    <Button type="primary" className="cart-product-info-submit-btn"
                            onClick={() => {}}>
                        Я оплатил
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
export default Payment;
