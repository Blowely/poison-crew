import React, {useEffect, useState} from "react";
import {Button, Divider, Layout} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./cart.scss";
import {LeftOutlined, LoadingOutlined, ReloadOutlined,
} from "@ant-design/icons";
import {useGetAccountQuery} from "../store/accounts.store";
import { useGetOrdersQuery} from "../store/orders.store";
import moment from "moment/moment";
import {PRODUCT_STATUS} from "./constants";
import StatusTag from "../components/Status";
import RePoizonMainBigLogo from "../assets/svg/re-poizon-main-middle-big-logo";
import GenderSwitcher from "../components/GenderSwitcher/GenderSwitcher";
import PhoneFooter from "../components/PhoneFooter/PhoneFooter";
import MainLogoComponent from "../components/MainLogoComponent/MainLogoComponent";
import {getSkuImages} from "../common/utils";
import HeaderInfoWrapper from "../components/HeaderInfoWrapper/HeaderInfoWrapper";

const Orders = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const gender = localStorage.getItem("gender") || "men";

    const {data: accountData} = useGetAccountQuery(token);
    const clientId = accountData?.account?._id;
    const {data: orders = [], isFetching: isLoadingOrders, error: ordersError, refetch} = useGetOrdersQuery(clientId, {
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
        if (!price) return '--';

        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price.toString());
    }


    let totalPrice = 0;
    const isDesktopScreen = window?.innerWidth > 768;

    return (
        <Layout>
            {isDesktopScreen &&
                <HeaderInfoWrapper />
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
                <div className="content-block-wrapper" >
                    <div className="content-block" style={{padding: isDesktopScreen && '30px 0px 0px 0px'}}>
                        {isDesktopScreen &&
                            <div className="category-title" onClick={onGoBackClick}><LeftOutlined/>Заказы</div>
                        }
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
                                        <div className="order-products-wrapper">
                                            {el?.products?.map((el, i) => {
                                                if (!el?.product) {
                                                    return null
                                                }
                                                const images = getSkuImages(el?.product?.skus, el?.skuId);

                                                return (
                                                    <div key={i} className="cart-product-info">
                                                        <div style={{display: 'flex', gap: '7px'}}>
                                                            <img src={`${images?.[0]}?x-oss-process=image/format,webp/resize,w_300`}
                                                                 style={{width: '100px'}} alt=""/>
                                                            <div>
                                                                <div style={{
                                                                    fontSize: '16px',
                                                                    marginBottom: '8px',
                                                                    cursor: 'pointer',
                                                                }}>
                                                                    {el.product?.name}
                                                                </div>
                                                                <div style={{
                                                                    fontSize: '13px',
                                                                    color: "gray",
                                                                    marginBottom: '8px',
                                                                    cursor: 'pointer',
                                                                }}>
                                                                    размер: {el?.size}
                                                                </div>
                                                                {el?.count > 1 &&
                                                                    <div style={{
                                                                        fontSize: '13px',
                                                                        color: "gray",
                                                                        cursor: 'pointer',
                                                                    }}>
                                                                        количество: {el?.count || "1"}
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div style={{fontWeight: '500', width: 'max-content'}}>
                                                                {getPrice(el?.price * (el?.count || 1))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                {!isDesktopScreen && el?.status === PRODUCT_STATUS.PAID &&
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
            <PhoneFooter tab="profile" />
        }
        </Layout>
    );
}
export default Orders;
