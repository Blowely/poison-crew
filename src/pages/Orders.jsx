import React, {useEffect, useState} from "react";
import {Button, Divider, Layout} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./cart.scss";
import {LeftOutlined, LoadingOutlined, ReloadOutlined,
} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../store";
import {useGetAccountQuery} from "../store/accounts.store";
import { useGetOrdersQuery} from "../store/orders.store";
import moment from "moment/moment";
import NonActiveBagIcon from "../assets/svg/non-active-bag-icon";
import NonActiveCartIcon from "../assets/svg/non-active-cart-icon";
import ActiveProfileIcon from "../assets/svg/active-profile-icon";
import {PRODUCT_STATUS} from "./constants";
import StatusTag from "../components/Status";
import RePoizonMainBigLogo from "../assets/svg/re-poizon-main-middle-big-logo";
import GenderSwitcher from "../components/GenderSwitcher/GenderSwitcher";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";

const Orders = () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const from = searchParams.get('from');
    const token = localStorage.getItem('token');
    const gender = localStorage.getItem("gender");

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
      return navigate('/profile');
    }

    const onGoToPaymentClick = (id, status) => {
        if (status !== PRODUCT_STATUS.APPROVED && status !== PRODUCT_STATUS.APPROVED_WITH_CHANGES) {
            return;
        }
        return navigate(`/payment?id=${id}`);
    }

    const onGoToTraceClick = (id) => {
        return navigate(`/trace?id=${id}`);
    }

    const onGoOrderClick = (id) => {
      return navigate(`/order?id=${id}`);
    }

    const getPrice = (price) => {
        if (!price) {
            return '--';
        }

        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price.toString());
    }


    let totalPrice = 0;
    const isDesktopScreen = window?.innerWidth > 768;

    return (
        <Layout>
            {isDesktopScreen &&
                <div className="main-logo-wrapper">
                    {<div onClick={() => navigate('/products')} style={{cursor: "pointer"}}><RePoizonMainBigLogo/></div>}
                    {isDesktopScreen &&
                        <div className="actions-btns">
                            <GenderSwitcher/>
                            <div className="items-wrapper">
                                <div className="item" onClick={() => navigate("/profile")}>
                                    <img style={{height: '26px'}}
                                         src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C.png"
                                         alt=""/>
                                    Профиль
                                </div>
                                <div className="item" onClick={() => navigate("/favorites")}>
                                    <img style={{height: '26px'}}
                                         src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5.png"
                                         alt=""/>
                                    Избранное
                                </div>
                                <div className="item" onClick={() => navigate("/cart")}>
                                    <img style={{height: '26px'}}
                                         src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0.png"
                                         alt=""/>
                                    Корзина
                                </div>
                            </div>
                        </div>}
                </div>
            }
            {!isDesktopScreen &&
                <div className="content-block-header border-radius">
                    <LeftOutlined onClick={onGoBackClick}/>
                    Заказы
                    <ReloadOutlined onClick={async () => {
                        setLoading(true);
                        await refetch()
                        setLoading(false);
                    }}/>
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
                        {orders?.map((el, i) => {
                            totalPrice = 0;
                            return <div key={i} className="cart-item" style={{cursor: "pointer"}}>
                                <div className="cart-order-info" onClick={() => onGoOrderClick(el?._id)}>
                                    <div style={{display: "grid", gap: '7px'}}>
                                        <div style={{fontSize: '15px', fontWeight: '500'}}>
                                            <div>Заказ от {moment(el?.createdAt).format('lll')}</div>
                                        </div>
                                        <div>№ <a onClick={() => onGoOrderClick(el?._id)}>{el._id}</a></div>
                                        <Divider style={{margin: '6px 0'}}></Divider>
                                        <div style={{paddingBottom: '10px'}}>
                                            <StatusTag status={el?.status}/>
                                        </div>
                                        {el?.products?.map((p, i) => {
                                            return (
                                                <div key={i} className="cart-product-info">
                                                    <div style={{display: 'flex', gap: '7px'}}>
                                                        <img src={p?.images[0]} style={{width: '100px'}} alt=""/>
                                                        <div>
                                                            <div style={{fontSize: '16px'}}>{p?.name}</div>
                                                            <div>размер: {el?.size}</div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div style={{fontWeight: '500', width: 'max-content'}}>
                                                            {getPrice(el?.price)}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                {el?.status === PRODUCT_STATUS.PAID &&
                                    <Button
                                        type="primary"
                                        onClick={() => onGoToTraceClick(el?._id, el?.status)}
                                        style={{width: '100%', marginTop: '10px'}}
                                    >
                                        Отследить
                                    </Button>
                                    /*<Button
                                        disabled={!(el?.status === PRODUCT_STATUS.APPROVED ||
                                            el?.status === PRODUCT_STATUS.APPROVED_WITH_CHANGES)}
                                        type="primary"
                                        onClick={() => onGoToPaymentClick(el?._id, el?.status)}
                                        style={{width: '100%', marginTop:'10px'}}
                                    >
                                        Оплатить
                                    </Button>*/
                                }

                            </div>
                        })}
                    </div>
                </div>
            }

        {!isDesktopScreen &&
            <footer>
                <div onClick={() => navigate("/products")}>
                    <img style={{height: '26px'}}
                         src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/1.%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F.png"
                         alt=""/>
                </div>
                <div onClick={() => navigate(`/${gender}/categories/`)}>
                    <img style={{height: '26px'}}
                         src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/2.%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3.png"
                         alt=""/>
                </div>
                <div onClick={() => navigate("/cart?from=products")}>
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
export default Orders;
