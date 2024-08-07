import React, {useEffect, useState} from "react";
import {Button, Divider, Layout, Modal, notification, Tag} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./cart.scss";
import {
    DeleteOutlined,
    LeftOutlined,
    LoadingOutlined, ReloadOutlined,
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
import {PRODUCT_STATUS, PRODUCT_STATUS_DICTIONARY} from "./constants";
import StatusTag from "../components/Status";
import {getCurrentPriceOfSize} from "../common/utils";

const Orders = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const from = searchParams.get('from');
    const token = localStorage.getItem('token');

    const addresses = useAppSelector((state) => state.account.addresses);

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

    let totalPrice = 0;

    return (
        <Layout>
            <div className="content-block-header">
                <LeftOutlined onClick={onGoBackClick} />
                Заказы
                <ReloadOutlined onClick={async () => {
                    setLoading(true);
                    await refetch()
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
                    {orders?.map((el, i) => {
                        totalPrice = 0;
                        return <div key={i} className="cart-item">
                            <div className="cart-order-info" onClick={() => onGoOrderClick(el?._id)}>
                                <div style={{display: "grid", gap: '7px'}}>
                                    <div style={{fontSize: '15px', fontWeight: '500'}}>
                                        <div>Заказ от {moment(el?.createdAt).format('lll')}</div>
                                    </div>
                                    <div>№ <a onClick={() => onGoOrderClick(el?._id)}>{el._id}</a></div>
                                    <Divider style={{margin: '6px 0'}}></Divider>
                                    <div  style={{paddingBottom: '10px'}}>
                                        <StatusTag status={el?.status}/>
                                    </div>
                                    {el?.products?.map((p, i) => {
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
                                                    <div style={{fontWeight: '500', width: 'max-content'}}>
                                                        {p?.price.toString().substring(0, p?.price?.length - 2)} ₽
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            {el?.status === PRODUCT_STATUS.PAID
                                ?
                                <Button
                                    type="primary"
                                    onClick={() => onGoToTraceClick(el?._id, el?.status)}
                                    style={{width: '100%', marginTop:'10px'}}
                                >
                                    Отследить
                                </Button>
                                :
                                <Button
                                    disabled={!(el?.status === PRODUCT_STATUS.APPROVED ||
                                        el?.status === PRODUCT_STATUS.APPROVED_WITH_CHANGES)}
                                    type="primary"
                                    onClick={() => onGoToPaymentClick(el?._id, el?.status)}
                                    style={{width: '100%', marginTop:'10px'}}
                                >
                                    Оплатить
                                </Button>
                            }

                        </div>
                    })}
                </div>
            }
            <footer>
                <div onClick={() => navigate('/products')}>
                    <NonActiveBagIcon/>
                </div>
                <div onClick={() => navigate('/cart?from=products') }>
                    <NonActiveCartIcon style={{ fontSize: '30px'}} />
                </div>
                <div onClick={() => navigate('/profile')}>
                    <ActiveProfileIcon style={{ fontSize: '30px'}} />
                </div>
            </footer>
        </Layout>
    );
}
export default Orders;
