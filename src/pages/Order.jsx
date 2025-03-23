import React, {useEffect, useMemo, useRef, useState} from "react";
import {Button, Divider, Layout, message, Tooltip} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./payment.scss";
import "./order.scss";
import {
    CopyOutlined, CreditCardOutlined,
    InfoCircleOutlined,
    LeftOutlined,
    LoadingOutlined, ReloadOutlined,
} from "@ant-design/icons";
import {useGetAccountQuery} from "../store/accounts.store";
import { useGetOrdersQuery} from "../store/orders.store";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";
import {getPrice, iosCopyToClipboard} from "../common/utils";
import {PRODUCT_STATUS} from "./constants";
import ActiveProfileLargeIcon from "../assets/svg/active-profile-icon";
import StatusTag from "../components/Status";
import RePoizonMainBigLogo from "../assets/svg/re-poizon-main-middle-big-logo";
import GenderSwitcher from "../components/GenderSwitcher/GenderSwitcher";
import TelegramButton from "../components/TelegramButton/TelegramButton";

const Order = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('id');
    const token = localStorage.getItem('token');
    const gender = localStorage.getItem("gender") || "men";

    const {data: accountData, isLoading: isLoadingAcc, error: accError} = useGetAccountQuery(token);
    const clientId = accountData?.account?._id;
    const {data: orders = [], isLoading: isLoadingOrders, error: ordersError, refetch} = useGetOrdersQuery(clientId, {
        skip: !clientId,
        refetchOnMountOrArgChange: true
    });

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    },[orders])

    useEffect(() => {
        window.scrollTo({top: 0})
    }, [])

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

    const onGoToPaymentClick = (id) => {
        return navigate(`/payment?id=${id}`);
    }

    const onGoToTraceClick = (id) => {
        return navigate(`/trace?id=${id}`);
    }

    const priceChangesTooltipText = `1. Цена изменилась на POIZON \n  2. Изменился курс`
    const isDesktopScreen = window?.innerWidth > 768;

    return (
        <Layout>
            {isDesktopScreen &&
                <div className="main-logo-wrapper">
                    {<div onClick={() => navigate('/products')} style={{cursor: "pointer", zIndex: "5"}}><RePoizonMainBigLogo/></div>}
                    {isDesktopScreen && <div className="actions-btns">
                        <GenderSwitcher/>
                        <div className="items-wrapper">
                            <div className="item" onClick={() => navigate("/profile")}>
                                <img style={{height: '23px'}}
                                     src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C.png"
                                     alt=""/>
                                Профиль
                            </div>
                            <div className="item" onClick={() => navigate("/favorites")}>
                                <img style={{height: '23px'}}
                                     src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5.png"
                                     alt=""/>
                                Избранное
                            </div>
                            <div className="item" onClick={() => navigate("/cart")}>
                                <img style={{height: '23px'}}
                                     src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0.png"
                                     alt=""/>
                                Корзина
                            </div>
                        </div>
                    </div>}
                </div>
            }
            {!isDesktopScreen &&
                <div className="content-block-header content-block-header-order border-radius">
                    <input type="text" style={{display: "none"}} value={orderId} ref={orderNumberRef}/>
                    <LeftOutlined onClick={onGoBackClick}/>
                    Заказ № {orderId}
                    <CopyOutlined
                        onClick={() => copyToClickBord(orderNumberRef.current)}
                    />
                </div>
            }
            {(isLoading || isLoadingOrders) &&
                <div style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <LoadingOutlined style={{fontSize: '24px'}} spin/>
                </div>
            }
            {!isLoading &&
                <div className="content-block-wrapper">
                    <div className="content-block">
                        {[memoOrder]?.map((el, i) => {
                            totalPrice = 0;
                            return <div key={i} className="cart-item">
                                <div className="cart-order-info">
                                    <div style={{
                                        fontSize: '15px',
                                        fontWeight: '500',
                                        display: "flex",
                                        justifyContent: 'space-between'
                                    }}>
                                        <div className="status-block-wrapper">
                                            <StatusTag status={el?.status}/>
                                            {/*{el?.status === PRODUCT_STATUS.CREATED && 'Сразу после подтверждения(~3мин) ' +
                                        'заказ станет доступным к оплате'
                                    }*/}
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
                                        <ReloadOutlined
                                            style={{fontSize: '20px'}}
                                            onClick={async () => {
                                                setLoading(true);
                                                await refetch();
                                                setLoading(false);
                                            }}
                                        />
                                    </div>


                                    <Divider style={{margin: '10px 0'}}></Divider>

                                    <div style={{display: "grid", gap: '7px'}}>
                                        {el?.products?.map((p, i) => {
                                            totalPrice += el?.price;
                                            return (
                                                <div key={i} className="cart-product-info-payment">
                                                    <div style={{display: 'flex', gap: '7px'}}>
                                                        <img src={p?.images[0]} style={{width: '100px'}} alt=""/>
                                                        <div>
                                                            <div style={{fontSize: '16px'}}>{p?.name}</div>
                                                            <div>размер: {el?.size}</div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div style={{fontWeight: '500', width: 'max-content'}}>
                                                            {getPrice(el.price)}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        <div className="total-price">Товар {totalPrice} ₽</div>
                                    </div>
                                </div>
                            </div>
                        })}
                        <div className="cart-item">
                            <div className="delivery-header">
                                <img src="https://storage.yandexcloud.net/boxberrysite-public/logo/logo-boxberry-mobile.png?v=3"
                                     alt="BoxBerry" className="delivery-logo"/>
                            </div>
                            <p className="delivery-point">📍 Пункт выдачи заказов</p>
                            <p className="delivery-address">{orders[0]?.address?.address}</p>
                            <p className="delivery-time">⏳ Ожидаемое время доставки: <strong>16-18 дней</strong></p>
                            <p className="delivery-cost">💰 Доставка (при получении): <strong>~700 ₽</strong></p>
                        </div>
                        <div className="cart-item">
                            <div className="cart-order-info">
                                <div style={{display: "grid", gap: '7px'}}>
                                    <div style={{fontSize: '15px', fontWeight: '500', paddingBottom: '10px'}}>
                                        Информация о заказе
                                    </div>
                                    <div className="cart-product-info-payment-card">
                                        <div className="order-info-block-item">
                                            <ActiveProfileLargeIcon/>
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
                                                    {memoOrder?.paid === true
                                                        ? 'Оплачено'
                                                        : 'Не оплачено'}
                                                </div>
                                                <div>Товар <span className="total-price">{totalPrice} ₽</span></div>
                                                <div>Итого <span className="total-price">{totalPrice} ₽</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="telegram-button-wrapper" style={{marginTop: '15px'}}>
                            <TelegramButton msg="Здравствуйте! Хочу задать вопрос по заказу: "
                                            text="Задать вопрос по заказу"
                                            productUrl={window.location.href}/>
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
                {!isDesktopScreen &&
                    <footer>
                        <div onClick={() => navigate(`/${gender}-products`)}>
                            <img style={{height: '26px'}}
                                 src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/1.%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F.png"
                                 alt=""/>
                        </div>
                        <div onClick={() => navigate(`/${gender}-categories/`)}>
                            <img style={{height: '26px'}}
                                 src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/2.%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3.png"
                                 alt=""/>
                        </div>
                        <div onClick={() => navigate("/cart")}>
                            <img style={{height: '26px'}}
                                 src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0.png"
                                 alt=""/>
                        </div>
                        <div onClick={() => navigate("/favorites")}>
                            <img style={{height: '26px'}}
                                 src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5.png"
                                 alt=""/>
                        </div>
                        <div onClick={() => navigate("/profile")}>
                            <img style={{height: '26px'}}
                                 src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C%20%D0%B0%D0%BA%D1%82%D0%B8%D0%B2.png"
                                 alt=""/>
                        </div>
                    </footer>
                }
        </Layout>
    );
}
export default Order;
