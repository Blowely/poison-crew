import React, {useEffect, useState} from "react";
import {Button, Layout, Modal, notification} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./payment.scss";
import {
    CopyOutlined,
    DeleteOutlined,
    LeftOutlined,
    LoadingOutlined,
    RightOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../store";
import BagIcon from "../assets/svg/active-bag-icon";
import {useGetAccountQuery} from "../store/accounts.store";
import { useGetOrdersQuery} from "../store/orders.store";
import moment from "moment/moment";
import NonActiveBagIcon from "../assets/svg/non-active-bag-icon";
import NonActiveCartIcon from "../assets/svg/non-active-cart-icon";
import ActiveProfileIcon from "../assets/svg/active-profile-icon";
import ActiveCartIcon from "../assets/svg/active-cart-icon";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";

const Payment = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const from = searchParams.get('from');
    const token = localStorage.getItem('token');


    const {data: accountData, isLoading: isLoadingAcc, error: accError} = useGetAccountQuery(token);
    const clientId = accountData?.account?._id;
    const {data: orders = [], isLoading: isLoadingOrders, error: ordersError, refetch} = useGetOrdersQuery(clientId, {
        skip: !clientId,
        refetchOnMountOrArgChange: true
    });

    const onGoBackClick = () => {
      return navigate('/profile');
    }

    let totalPrice = 0;
    const el = {};

    const getFormattedCardNumber = () => {
        const number = '1234567812345678';

        return <span>
                    <span className="formatted-card-number">
                        <span>{number.substring(0,4)}</span>
                        <span>{number.substring(4,8)}</span>
                        <span>{number.substring(8,12)}</span>
                        <span>{number.substring(12,16)}</span>
                        <CopyOutlined />
                    </span>
                    Маряшин Андрей Евгеньевич
                </span>
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
            {!isLoadingOrders &&
                <div className="content-block">
                    {[orders[0]]?.map((el, i) => {
                        totalPrice = 0;
                        return <div key={i} className="cart-item">
                            <div className="cart-order-info">
                                <div style={{display: "grid", gap: '7px'}}>
                                    {el?.products?.map((p, i) => {
                                        totalPrice += Math.ceil(Number(p?.price) * 11.9 + 1000);
                                        return (
                                            <div key={i} className="cart-product-info">
                                                <div style={{display: 'flex', gap: '7px'}}>
                                                    <img src={p?.images[0]} style={{width: '100px'}} alt=""/>
                                                    <div>
                                                        <div style={{fontSize: '16px'}}>{p?.title}</div>
                                                        <div>размер: {p?.size}</div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div style={{fontWeight: '500'}}>
                                                        ₽{Math.ceil(Number(p?.price) * 11.9 + 1000)}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    <div className="total-price">Стоимость заказа ₽{totalPrice}</div>
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

                                <div className="cart-product-info">
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

                                <div className="total-price">Стоимость доставки ₽{799}</div>
                            </div>


                        </div>
                    </div>
                    <div className="cart-item">
                        <div className="cart-order-info">
                            <div style={{display: "grid", gap: '7px'}}>
                                <div style={{fontSize: '15px', fontWeight: '500'}}>
                                    Перевод на карту
                                </div>

                                        <div className="cart-product-info">
                                            <div className="card">
                                                Сбер
                                                Номер карты
                                                {getFormattedCardNumber()}
                                            </div>
                                        </div>

                                <div className="total-price">Итого ₽{totalPrice + 799}</div>
                            </div>


                        </div>
                    </div>
                </div>
            }
            <div className="cart-product-info-submit-btn-wrapper">
                <Button type="primary" className="cart-product-info-submit-btn"
                        onClick={() => {}}>
                    Я оплатил
                </Button>
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
