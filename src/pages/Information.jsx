import React from "react";
import {Layout} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./cart.scss";
import {LeftOutlined} from "@ant-design/icons";
import {useAppSelector} from "../store";
import {useGetAccountQuery} from "../store/accounts.store";
import { useGetOrdersQuery} from "../store/orders.store";
import NonActiveBagIcon from "../assets/svg/non-active-bag-icon";
import NonActiveCartIcon from "../assets/svg/non-active-cart-icon";
import ActiveProfileIcon from "../assets/svg/active-profile-icon";
import RePoizonMainLogo from "../assets/svg/re-poizon-main-logo";
import GenderSwitcher from "../components/GenderSwitcher/GenderSwitcher";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";

const Information = () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const from = searchParams.get('from');
    const token = localStorage.getItem('token');

    const {data: accountData, isLoading: isLoadingAcc, error: accError} = useGetAccountQuery(token);
    const clientId = accountData?.account?._id;
    const {data: orders, isLoading: isLoadingOrders, error: ordersError, refetch} = useGetOrdersQuery(clientId, {
        skip: !clientId,
        refetchOnMountOrArgChange: true
    });

    const onGoBackClick = () => {
      return navigate('/profile');
    }

    const isDesktopScreen = window?.innerWidth > 768;

    return (
        <Layout>
            {isDesktopScreen &&
                <div className="main-logo-wrapper">
                    {<RePoizonMainLogo/>}
                    {isDesktopScreen && <div className="actions-btns">
                        <GenderSwitcher/>
                        <div onClick={() => navigate("/profile")}>
                            <NonActiveProfileIcon/>
                        </div>
                    </div>}
                </div>
            }
            {!isDesktopScreen &&
                <div className="content-block-header">
                    <LeftOutlined onClick={onGoBackClick}/>Информация <div/>
                </div>
            }
            <div className="content-block-wrapper">
                <div className="content-block" style={{height: '100%'}}>
                    <div className="cart-item">
                        <div className="cart-order-info">
                            <div style={{display: "grid", gap: '7px'}}>
                                <h3>Телефоны и e-mail</h3>
                                <div style={{fontSize: '16px'}}>tg: in_a_state_of_flux</div>
                                <div style={{fontSize: '16px'}}>8-920-297-2447</div>
                                <div style={{fontSize: '16px'}}>moviefokll@gmail.com</div>

                            </div>
                        </div>

                    </div>
                    {/*<div className="cart-item">
                    <div className="cart-order-info">
                        <div style={{display: "grid", gap: '7px'}}>
                            <h3>Юридический адрес</h3>
                            <div style={{fontSize: '16px'}}>ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ МАРЯШИН АНДРЕЙ ЕВГЕНЬЕВИЧ</div>
                            <div style={{fontSize: '16px'}}>ИНН: 524810791330</div>
                            <div style={{fontSize: '16px'}}>ОГРН: 323527500074580</div>
                            <div style={{fontSize: '16px'}}>606500, РОССИЯ, НИЖЕГОРОДСКАЯ ОБЛ, ГОРОДЕЦКИЙ Р-Н, Г ГОРОДЕЦ, ПЕР 3-Й ЗАВОДСКОЙ, Д 3</div>

                        </div>
                    </div>

                </div>*/}
                </div>
            </div>

            {!isDesktopScreen &&
                <footer>
                    <div onClick={() => navigate('/products')}>
                        <NonActiveBagIcon/>
                    </div>
                    <div onClick={() => navigate('/cart?from=products')}>
                        <NonActiveCartIcon style={{fontSize: '30px'}}/>
                    </div>
                    <div onClick={() => navigate('/profile')}>
                        <ActiveProfileIcon style={{fontSize: '30px'}}/>
                    </div>
                </footer>
            }
        </Layout>
);
}
export default Information;
