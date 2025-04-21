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
import TelegramButton from "../components/TelegramButton/TelegramButton";
import PhoneFooter from "../components/PhoneFooter/PhoneFooter";
import MainLogoComponent from "../components/MainLogoComponent/MainLogoComponent";
import HeaderInfoWrapper from "../components/HeaderInfoWrapper/HeaderInfoWrapper";

const Information = () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const from = searchParams.get('from');
    const token = localStorage.getItem('token');
    const gender = localStorage.getItem("gender") || "men";

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
                <HeaderInfoWrapper />
            }
            {!isDesktopScreen &&
                <div className="content-block-header border-radius">
                    <LeftOutlined onClick={onGoBackClick}/>Информация <div style={{width: '19px'}}/>
                </div>
            }
            <div className="content-block-wrapper">
                <div className="content-block" style={{padding: isDesktopScreen && '30px 0px 0px 0px'}}>
                    {isDesktopScreen && (
                        <div className="category-title" onClick={onGoBackClick}><LeftOutlined/>Информация</div>
                    )}

                    <div className="product-info__item standart template" style={{marginTop: '15px'}}>
                        <div className="title">Телефоны и e-mail</div>
                        <div style={{fontSize: '16px'}}>tg: re_poizon_store</div>
                        <div style={{fontSize: '16px'}}>repoizonstore@gmail.com</div>
                    </div>
                    <div className="telegram-button-wrapper" style={{marginTop: '15px'}}><TelegramButton/></div>
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
                <PhoneFooter tab="profile"/>
            }
        </Layout>
    );
}
export default Information;
