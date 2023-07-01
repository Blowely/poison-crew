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

const Information = () => {
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
        refetchOnMountOrArgChange: true
    });

    const onGoBackClick = () => {
      return navigate('/profile');
    }

    return (
        <Layout>
            <div className="content-block-header">
              <LeftOutlined onClick={onGoBackClick} />
              Информация <div />
            </div>

            <div className="content-block" style={{height: '100%'}}>

                <div className="cart-item">
                    <div className="cart-order-info">
                        <div style={{display: "grid", gap: '7px'}}>
                            <h3>Телефоны и e-mail</h3>
                            <div style={{fontSize: '16px'}}>8-920-297-2447</div>
                            с 10.00 до 19.00 (пнд-пятница)
                            <div style={{fontSize: '16px'}}>moviefokll@gmail.com</div>

                        </div>
                    </div>

                </div>
                <div className="cart-item">
                    <div className="cart-order-info">
                        <div style={{display: "grid", gap: '7px'}}>
                            <h3>Юридический адрес</h3>
                            <div style={{fontSize: '16px'}}>ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ МАРЯШИН АНДРЕЙ ЕВГЕНЬЕВИЧ</div>
                            <div style={{fontSize: '16px'}}>ИНН: 524810791330</div>
                            <div style={{fontSize: '16px'}}>ОГРН: 323527500074580</div>
                            <div style={{fontSize: '16px'}}>606500, РОССИЯ, НИЖЕГОРОДСКАЯ ОБЛ, ГОРОДЕЦКИЙ Р-Н, Г ГОРОДЕЦ, ПЕР 3-Й ЗАВОДСКОЙ, Д 3</div>

                        </div>
                    </div>

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
export default Information;
