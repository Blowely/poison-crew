import React, {useEffect} from "react";
import {Layout} from "antd";
import {useNavigate} from "react-router-dom";
import "./profile.scss";
import {LogoutOutlined, RightOutlined} from "@ant-design/icons";
import {useAppSelector} from "../store";
import {useGetAccountQuery} from "../store/accounts.store";
import ActiveProfileLargeIcon from "../assets/svg/active-profile-icon";
import RePoizonMainBigLogo from "../assets/svg/re-poizon-main-middle-big-logo";
import GenderSwitcher from "../components/GenderSwitcher/GenderSwitcher";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";

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

  const isDesktopScreen = window?.innerWidth > 768;

  return (
      <Layout>
        {isDesktopScreen &&
            <div className="main-logo-wrapper">
              {<div onClick={() => navigate('/products')} style={{cursor: "pointer", zIndex: "5"}}><RePoizonMainBigLogo/></div>}
              {isDesktopScreen && <div className="actions-btns">
                <GenderSwitcher/>
                <div className="items-wrapper">
                  <div className="item" onClick={() => navigate("/profile")}>
                    <img style={{height: '23px'}}
                         src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C.png"
                         alt=""/>
                    Профиль
                  </div>
                  <div className="item" onClick={() => navigate("/favorites")}>
                    <img style={{height: '23px'}}
                         src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5.png"
                         alt=""/>
                    Избранное
                  </div>
                  <div className="item" onClick={() => navigate("/cart")}>
                    <img style={{height: '23px'}}
                         src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0.png"
                         alt=""/>
                    Корзина
                  </div>
                </div>
              </div>}
            </div>
        }
        <div className="content-block-wrapper">
          <div className="content-block content-block-profile">
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
                <a href="https://storage.yandexcloud.net/pc-mediafiles/important/public-offer%20re-poizon.ru.pdf">
                  Условия оферты
                </a>
                <div style={{marginTop: '15px'}}>
                  <a href="https://storage.yandexcloud.net/pc-mediafiles/important/privacy-policy-re-poizon.ru.pdf"
                     target="_blank">
                    Политика конфиденциальности
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isDesktopScreen &&
            <footer>
              <div onClick={() => navigate(`/${gender}-products`)}>
              <img style={{height: '26px'}}
                     src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/1.%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F.png"
                     alt=""/>
              </div>
              <div onClick={() => navigate(`/${gender}-categories/`)}>
                <img style={{height: '26px'}}
                     src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/2.%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3.png"
                     alt=""/>
              </div>
              <div onClick={() => navigate("/cart")}>
                <img style={{height: '26px'}}
                     src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0.png"
                     alt=""/>
              </div>
              <div onClick={() => navigate("/favorites")}>
                <img style={{height: '26px'}}
                     src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5.png"
                     alt=""/>
              </div>
              <div onClick={() => navigate("/profile")}>
                <img style={{height: '26px'}}
                     src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C%20%D0%B0%D0%BA%D1%82%D0%B8%D0%B2.png"
                     alt=""/>
              </div>
            </footer>
        }
      </Layout>
  );
}
export default Profile;
