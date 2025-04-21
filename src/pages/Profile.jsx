import React, {useEffect} from "react";
import {Layout} from "antd";
import {useNavigate} from "react-router-dom";
import "./profile.scss";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {useAppSelector} from "../store";
import {useGetAccountQuery} from "../store/accounts.store";
import ActiveProfileLargeIcon from "../assets/svg/active-profile-icon";
import PhoneFooter from "../components/PhoneFooter/PhoneFooter";
import MainLogoComponent from "../components/MainLogoComponent/MainLogoComponent";
import Header from "../components/Header/Header";
import HeaderInfoWrapper from "../components/HeaderInfoWrapper/HeaderInfoWrapper";

const Profile = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const gender = localStorage.getItem("gender") || "men";

  const cartItems = useAppSelector((state) => state.cart.items);
  const addresses = useAppSelector((state) => state.account.addresses);

  const {data: accountData} = useGetAccountQuery(token, {skip: cartItems.length && addresses.length});


  useEffect(() => {
    window.scrollTo({top: 0})
  }, [])

  const onGoBackClick = () => {
    window.history.go(-1);
  }

  const isDesktopScreen = window?.innerWidth > 768;

  return (
      <Layout>
        {isDesktopScreen &&
            <HeaderInfoWrapper />
        }
        <div className="content-block-wrapper">
          <div className="content-block content-block-profile" style={{padding: isDesktopScreen && '30px 0px 0px 0px'}}>
            {isDesktopScreen && (
                <div className="category-title" onClick={onGoBackClick}><LeftOutlined/>Профиль</div>
            )}

            <div className="cart-item cart-item-transparent padding-bottom">
              <div className="transparent">
                <ActiveProfileLargeIcon/>
                +{accountData?.account?.phone}
              </div>
              {/*<LogoutOutlined style={{fontSize: '25px'}} onClick={() => {
                alert('в разработке')
              }}/>*/}
            </div>
            {/*<div className="balance-wrapper">
          <div style={{fontSize: '27px', fontWeight: '600', display: "flex", gap: '10px', alignItems: 'center'}}>
            <span>
              <span style={{fontSize: '23px'}}>₽</span>{accountData?.account?.balance  || '12355'}
            </span>
            <Button type="link" size="small" className="fillUpBtn" icon={<ReloadOutlined />} onClick={refreshBalance}>Обновить</Button>
          </div>
          <div>
            <Button type="primary" size="small" className="fillUpBtn" onClick={onAddMoney}>Пополнить</Button>
          </div>
        </div>*/}

            <div className="profile-items-wrapper">
              <div>
                <div className="cart-item redirect borderless" onClick={() => navigate('/orders')}>
                  Мои заказы <RightOutlined/>
                </div>
                {/*<div className="cart-item redirect borderless" onClick={() => navigate('/visited')}>
                Просмотренные товары <RightOutlined />
                </div>*/}
                <div className="cart-item redirect borderless" onClick={() => navigate('/favorites')}>
                  Избранное <RightOutlined/>
                </div>
              </div>
              <div>
                <div className="cart-item redirect borderless" onClick={() => navigate('/info')}>
                  Информация <RightOutlined/>
                </div>
              </div>
              <div className="link">
                <a href="https://storage.yandexcloud.net/pc-mediafiles/important/public-offer-re-poizon.pdf">
                  Условия оферты
                </a>
                <div style={{marginTop: '15px'}}>
                  <a href="https://storage.yandexcloud.net/pc-mediafiles/important/privacy-policy-re-poizon.ru.pdf"
                     target="_blank">
                    Политика конфиденциальности
                  </a>
                </div>
                <div style={{marginTop: '15px'}}>
                  <a href="https://storage.yandexcloud.net/pc-mediafiles/important/process-personal-data-agreement-re-poizon.ru.pdf"
                     target="_blank">
                    Согласие на обработку персональных данных
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isDesktopScreen &&
            <PhoneFooter tab="profile"/>
        }
      </Layout>
  );
}
export default Profile;
