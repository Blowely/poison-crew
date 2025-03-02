import React from "react";
import {Layout} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./cart.scss"
//import styles from "./Information.module.scss";
import {LeftOutlined} from "@ant-design/icons";
import {useGetAccountQuery} from "../store/accounts.store";
import { useGetOrdersQuery} from "../store/orders.store";
import RePoizonMainBigLogo from "../assets/svg/re-poizon-main-middle-big-logo";
import GenderSwitcher from "../components/GenderSwitcher/GenderSwitcher";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";
import TelegramButton from "../components/TelegramButton/TelegramButton";

const Information = () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const from = searchParams.get('from');
    const token = localStorage.getItem('token');
    const gender = localStorage.getItem("gender");

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
                    {<div onClick={() => navigate('/products')} style={{cursor: "pointer"}}><RePoizonMainBigLogo/></div>}
                    {isDesktopScreen && <div className="actions-btns">
                        <GenderSwitcher/>
                        <div onClick={() => navigate("/profile")}>
                            <NonActiveProfileIcon/>
                        </div>
                    </div>}
                </div>
            }
            {!isDesktopScreen &&
                <div className="content-block-header border-radius">
                    <LeftOutlined onClick={onGoBackClick}/>Информация <div/>
                </div>
            }
            <div className="content-block-wrapper">
                <div className="content-block" style={{height: '100%'}}>
                    <div className="product-info__item standart template" style={{marginTop: '15px'}}>
                            <div className="title">Телефоны и e-mail</div>
                            <div style={{fontSize: '16px'}}>tg: in_a_state_of_flux</div>
                            <div style={{fontSize: '16px'}}>8-920-297-2447</div>
                            <div style={{fontSize: '16px'}}>moviefokll@gmail.com</div>
                    </div>
                    <div className="telegram-button-wrapper" style={{marginTop: '15px'}}><TelegramButton /></div>
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
                    <div onClick={() => navigate("/products")}>
                        <img style={{height: '30px'}}
                             src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/1.%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F.png"
                             alt=""/>
                    </div>
                    <div onClick={() => navigate(`/${gender}/categories/`)}>
                        <img style={{height: '30px'}}
                             src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/2.%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3.png"
                             alt=""/>
                    </div>
                    <div onClick={() => navigate("/cart?from=products")}>
                        <img style={{height: '30px'}}
                             src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0.png"
                             alt=""/>
                    </div>
                    <div onClick={() => navigate("/favorites")}>
                        <img style={{height: '30px'}}
                             src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5.png"
                             alt=""/>
                    </div>
                    <div onClick={() => navigate("/profile")}>
                        <img style={{height: '30px'}}
                             src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C%20%D0%B0%D0%BA%D1%82%D0%B8%D0%B2.png"
                             alt=""/>
                    </div>
                </footer>
            }
        </Layout>
    );
}
export default Information;
