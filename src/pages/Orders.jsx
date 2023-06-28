import React, {useEffect, useState} from "react";
import {Button, Layout, Modal, notification} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./cart.scss";
import {
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

const Orders = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const from = searchParams.get('from');
    const token = localStorage.getItem('token');

    const addresses = useAppSelector((state) => state.account.addresses);

    const {data: accountData, isLoading: isLoadingAcc, error: accError} = useGetAccountQuery(token);
    const clientId = accountData?.account?._id;
    const {data: orders, isLoading: isLoadingOrders, error: ordersError, refetch} = useGetOrdersQuery(clientId, {
        skip: !clientId,
    });
    useEffect(() => {
        refetch();
    }, [])
    const onGoBackClick = () => {
      return navigate('/profile');
    }

    let totalPrice = 0;

    return (
        <Layout>
            <div className="content-block-header">
              <LeftOutlined onClick={onGoBackClick} />
              Заказы <div />
            </div>
            {isLoadingOrders &&
                <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                    <LoadingOutlined style={{fontSize: '24px'}} spin />
                </div>
            }
            {!isLoadingOrders &&
                <div className="content-block">
                    {orders?.map((el, i) => {
                        totalPrice = 0;
                        return <div key={i} className="cart-item">
                            <div className="cart-order-info">
                                <div style={{display: "grid", gap: '7px'}}>
                                    <div>№ {el._id}</div>
                                    <div style={{fontSize: '15px', fontWeight: '500'}}>

                                        <div>Адрес: {el.address.address}</div>
                                        <div>{moment(el?.createdAt).format('lll')}</div>
                                    </div>
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
