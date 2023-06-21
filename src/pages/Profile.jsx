import React, {useEffect, useState} from "react";
import {Button, Layout, Modal, notification} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./cart.scss";
import {
  DeleteOutlined,
  LeftOutlined,
  LoadingOutlined, LogoutOutlined,
  RightOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../store";
import BagIcon from "../assets/svg/active-bag-icon";
import {useAddCodeMutation, useGetAccountQuery} from "../store/accounts.store";
import {useAddOrderMutation} from "../store/orders.store";
import NonActiveBagIcon from "../assets/svg/non-active-bag-icon";
import ActiveCartIcon from "../assets/svg/active-cart-icon";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";
import NonActiveCartIcon from "../assets/svg/non-active-cart-icon";
import ActiveProfileIcon from "../assets/svg/active-profile-icon";
import ActiveProfileLargeIcon from "../assets/svg/active-profile-icon";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get('from');
  const token = localStorage.getItem('token');

  const cartItems = useAppSelector((state) => state.cart.items);
  const addresses = useAppSelector((state) => state.account.addresses);

  const {data: accountData, isLoadingAcc, error: accError} = useGetAccountQuery(token, {skip: cartItems.length && addresses.length});
  const [addOrder, {isLoading: isLoadingAddOrder, error}] = useAddOrderMutation({},{refetchOnMountOrArgChange: true});


  return (
    <Layout>
      <div className="content-block">
        <div className="cart-item cart-item-transparent padding-bottom">
          <div className="transparent">
            <ActiveProfileLargeIcon />
            +{accountData?.account?.phone}
          </div>
          <LogoutOutlined style={{fontSize: '25px'}} onClick={() => {alert('в разработке')}}/>
        </div>
        <div className="cart-item redirect borderless" onClick={() => navigate('/orders')}>
          Мои заказы <RightOutlined />
        </div>
        <div className="cart-item redirect borderless" onClick={() => navigate('/visited')}>
          Просмотренные товары <RightOutlined />
        </div>
        <div className="cart-item redirect borderless" onClick={() => navigate('/favorites')}>
          Избранное <RightOutlined />
        </div>
      </div>

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
export default Profile;
