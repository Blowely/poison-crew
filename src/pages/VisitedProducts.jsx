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
import {useAddCodeMutation, useGetAccountQuery} from "../store/accounts.store";
import {useAddOrderMutation} from "../store/orders.store";
import NonActiveBagIcon from "../assets/svg/non-active-bag-icon";
import NonActiveCartIcon from "../assets/svg/non-active-cart-icon";
import ActiveProfileIcon from "../assets/svg/active-profile-icon";

const VisitedProducts = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const from = searchParams.get('from');
    const token = localStorage.getItem('token');

    const cartItems = useAppSelector((state) => state.cart.items);
    const addresses = useAppSelector((state) => state.account.addresses);

    const {data: accountData, isLoadingAcc, error: accError} = useGetAccountQuery(token, {skip: cartItems.length && addresses.length});
    const [addOrder, {isLoading: isLoadingAddOrder, error}] = useAddOrderMutation({},{refetchOnMountOrArgChange: true});

  const onGoBackClick = () => {
    return navigate('/profile');
  }

    const onOkHandler = async () => {
      try {
        if (!addresses.length && !accountData?.account?.addresses?.length) {
          notification.open({duration: 2, type: 'warning', message:'Не выбран адрес доставки'})
        }
        if (!cartItems.length) {
          notification.open({duration: 2, type: 'warning', message:'Товары не выбраны'})
        }

        const addOrderBody = {
          clientId: accountData?.account?._id,
          products: cartItems || [],
          address: addresses[0] || accountData?.account?.addresses[0] || {},
        }

        const res = await addOrder(addOrderBody);

        if (res.data.status === 'ok') {
          return notification.open({duration: 2, type: 'success', message:'Заказ успешно оформлен'})
        } else {
          notification.open({duration: 2, type: 'error', message:'Ошибка оформления заказа'})
        }

      } catch (e) {
        notification.open({duration: 2, type: 'error', message:'Ошибка оформления заказа'})
      }
    }

    return (
        <Layout>
            <div className="content-block-header border-radius">
              <LeftOutlined onClick={onGoBackClick} />
              Просмотренные товары <div /></div>
            <div className="content-block">
                {cartItems?.map((el, i) => {
                    return <div key={i} className="cart-item">
                      <div className="cart-product-info">
                        <div style={{display: 'flex', gap: '7px'}}>
                          <img src={el?.images[0]} style={{width: '100px'}} alt=""/>
                          <div>
                            <div style={{fontSize: '16px'}}>{el.title}</div>
                            <div>размер: {el.size}</div>
                          </div>
                        </div>

                        <div>
                          <div style={{fontWeight: '500'}}>₽{el.price}</div>
                        </div>
                      </div>
                    </div>
                })}
            </div>

            <footer>
                <div onClick={() => navigate('/products')}>
                    <NonActiveBagIcon/>
                </div>
                <div onClick={() => navigate('/cart') }>
                    <NonActiveCartIcon style={{ fontSize: '30px'}} />
                </div>
                <div onClick={() => navigate('/profile')}>
                    <ActiveProfileIcon style={{ fontSize: '30px'}} />
                </div>
            </footer>
        </Layout>
    );
}
export default VisitedProducts;
