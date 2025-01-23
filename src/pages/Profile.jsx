import React, {useEffect} from "react";
import {Layout} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./profile.scss";
import {LogoutOutlined, RightOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../store";
import {useGetAccountQuery} from "../store/accounts.store";
import {useAddOrderMutation} from "../store/orders.store";
import NonActiveBagIcon from "../assets/svg/non-active-bag-icon";
import NonActiveCartIcon from "../assets/svg/non-active-cart-icon";
import ActiveProfileIcon from "../assets/svg/active-profile-icon";
import ActiveProfileLargeIcon from "../assets/svg/active-profile-icon";
import RePoizonMainLogo from "../assets/svg/re-poizon-main-logo";
import GenderSwitcher from "../components/GenderSwitcher/GenderSwitcher";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";

const Profile = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get('from');
  const token = localStorage.getItem('token');

  const cartItems = useAppSelector((state) => state.cart.items);
  const addresses = useAppSelector((state) => state.account.addresses);

  const {data: accountData, isLoadingAcc, error: accError} = useGetAccountQuery(token, {skip: cartItems.length && addresses.length});
  const [addOrder, {isLoading: isLoadingAddOrder, error}] = useAddOrderMutation({},{refetchOnMountOrArgChange: true});


  useEffect(() => {
    window.scrollTo({top: 0})
  }, [])

  const isDesktopScreen = window?.innerWidth > 768;

  return (
      <Layout>
        {isDesktopScreen &&
            <div className="main-logo-wrapper">
              {<RePoizonMainLogo />}
              {isDesktopScreen && <div className="actions-btns">
                <GenderSwitcher/>
                <div onClick={() => navigate("/profile")}>
                  <NonActiveProfileIcon/>
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
              <LogoutOutlined style={{fontSize: '25px'}} onClick={() => {
                alert('в разработке')
              }}/>
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
            </div>
            <div className="cart-item redirect borderless" onClick={() => navigate('/favorites')}>
              Избранное <RightOutlined />
            </div>*/}
              </div>
              <div>
                <div className="cart-item redirect borderless" onClick={() => navigate('/info')}>
                  Информация <RightOutlined/>
                </div>
              </div>
            </div>


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
export default Profile;
