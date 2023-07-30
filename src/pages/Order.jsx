import React, {useEffect, useMemo, useRef, useState} from "react";
import {Button, Divider, Layout, message, Tag, Tooltip} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./payment.scss";
import "./order.scss";
import {
    CopyOutlined, CreditCardOutlined,
    DeleteOutlined, InfoCircleOutlined,
    LeftOutlined,
    LoadingOutlined, ReloadOutlined,
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

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        window.scrollTo({top: 0})
    },[orders])

    const onGoBackClick = () => {
      return navigate('/orders');
    }

    let totalPrice = 0;

    const orderNumberRef = useRef(null);

    const copyToClickBord = (el) => {
        iosCopyToClipboard(el);
        navigator.clipboard.writeText(el.value);
        message.success( 'Скопировано')
    }

    const memoOrder = useMemo(() => {
        return orders?.find((order) => order._id === orderId);
    }, [orderId, orders])

    const deliveryCost = 1700 * (memoOrder?.products?.length || 1);

    const onGoToPaymentClick = (id) => {
        return navigate(`/payment?id=${id}`);
    }

    const onGoToTraceClick = (id) => {
        return navigate(`/trace?id=${id}`);
    }

    const priceChangesTooltipText = `1. Цена изменилась на POIZON. \n  2. Изменился курс`

    return (
        <Layout>
            <div className="content-block-header content-block-header-order">
                <input type="text" style={{display: "none"}} value={orderId} ref={orderNumberRef}/>
                <LeftOutlined onClick={onGoBackClick} />
                Заказ № {orderId}
                <CopyOutlined
                onClick={() => copyToClickBord(orderNumberRef.current)}
                />
            </div>
            {(isLoading || isLoadingOrders) &&
                <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                    <LoadingOutlined style={{fontSize: '24px'}} spin />
                </div>
            }
            {!isLoading &&
                <div className="content-block">
                    {[memoOrder]?.map((el, i) => {
                        totalPrice = 0;
                        return <div key={i} className="cart-item">
                            <div className="cart-order-info">
                                <div style={{fontSize: '15px', fontWeight: '500', display: "flex", justifyContent: 'space-between'}}>
                                    Статус заказа
                                    <ReloadOutlined
                                        style={{fontSize: '20px'}}
                                        onClick={async () => {
                                            setLoading(true);
                                            await refetch();
                                            setLoading(false);
                                        }}
                                    />
                                </div>
                                <div className="status-block-wrapper">
                                    <StatusTag status={el?.status}/>
                                    {el?.status === PRODUCT_STATUS.CREATED && 'Сразу после подтверждения(~3мин) ' +
                                        'заказ станет доступным к оплате'
                                    }
                                    {el?.status === PRODUCT_STATUS.CANCELED && <>
                                        Нет в наличии
                                        <Button
                                            size="small"
                                            style={{marginLeft: '10px'}}
                                            type="text"
                                        >
                                            Сменить размер
                                        </Button>
                                    </>
                                    }
                                    {el?.status === PRODUCT_STATUS.APPROVED_WITH_CHANGES &&
                                        <Tooltip title={priceChangesTooltipText}>
                                            <InfoCircleOutlined style={{fontSize: '20px'}}/>
                                        </Tooltip>
                                    }
                                </div>

                                <Divider style={{margin: '10px 0'}}></Divider>

                                <div style={{display: "grid", gap: '7px'}}>
                                    {el?.products?.map((p, i) => {
                                        totalPrice += Math.ceil(Number(p?.price) * 13.3 + 1000);
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
                                                    <div style={{fontWeight: '500', width: 'max-content'}}>
                                                        {Math.ceil(Number(p?.price) * 13.3 + 1000)} ₽
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

                                <div className="total-price">Доставка {deliveryCost} ₽</div>
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
                                                    <div>{memoOrder?.address?.fio}</div>
                                                </div>

                                            </div>
                                            <Divider style={{margin: '6px 0'}}></Divider>
                                            <div className="order-info-block-item">
                                                <CreditCardOutlined
                                                    style={{fontSize: '28px'}}
                                                />
                                                <div className="order-info-block-item-info">
                                                    <div>
                                                        { memoOrder?.status === PRODUCT_STATUS.PAID
                                                            ?  'Оплачено'
                                                            : 'Не оплачено'}
                                                    </div>
                                                    <div>Товары <span className="total-price">{totalPrice} ₽</span></div>
                                                    <div>Доставка <span className="total-price">{deliveryCost} ₽</span></div>
                                                    <div>Итого <span className="total-price">{totalPrice + deliveryCost} ₽</span></div>
                                                </div>
                                            </div>
                                        </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
            <div className="cart-product-info-submit-btn-wrapper">
                {(memoOrder?.status === PRODUCT_STATUS.APPROVED
                        || memoOrder?.status === PRODUCT_STATUS.APPROVED_WITH_CHANGES) &&
                    <Button
                        type="primary"
                        className="cart-product-info-submit-btn"
                        onClick={() => onGoToPaymentClick(memoOrder?._id)}
                    >
                        Оплатить
                    </Button>
                }
                {memoOrder?.status === PRODUCT_STATUS.PAID &&
                    <Button
                        type="primary"
                        className="cart-product-info-submit-btn"
                        onClick={() => onGoToTraceClick(memoOrder?._id)}
                    >
                        Отследить
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
