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
import ActiveBagIcon from "../assets/svg/active-bag-icon";
import NonActiveCartIcon from "../assets/svg/non-active-cart-icon";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";
import NonActiveBagIcon from "../assets/svg/non-active-bag-icon";
import ActiveCartIcon from "../assets/svg/active-cart-icon";
import ChoiceAddressModal from "./ChoiceAddressModal";
import {cleanAddresses, removeAddress} from "../common/accountSlice";
import AuthModal from "./AuthModal";
import {removeFromCart} from "../common/cartSlice";

function Cart({onAddToFavorite, onAddToCart, isLoading}) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isCodeModalOpen, setCodeModalOpen] = useState(false);
    const [isChoiceAddressModalOpen, setChoiceAddressModalOpen] = useState(false);
    const [activeAddr, setActiveAddr] = useState('');
    const [phone, setPhone] = useState('');

    const from = searchParams.get('from');
    const token = localStorage.getItem('token');

    const cartItems = useAppSelector((state) => state.cart.items);
    const addresses = useAppSelector((state) => state.account.addresses);

    const {data: accountData, isLoadingAcc, error: accError, refetch: refetchAcc} = useGetAccountQuery(token, {refetchOnMountOrArgChange: true});
    const [addOrder, {isLoading: isLoadingAddOrder, error}] = useAddOrderMutation({},{refetchOnMountOrArgChange: true});

    const onGoBackClick = () => {
        if (from) {
            return navigate('/products');
        } else if (cartItems[0]?._id) {
            return navigate(`/products/view?productId=${cartItems[0]?._id}`);
        } else {
            return navigate('/products');
        }
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
          address: activeAddr,
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

    const onAddressClick = () => {
        if (accountData?.account?.addresses?.length) {
            setChoiceAddressModalOpen(true)
        } else {
            setModalOpen(true)
        }
    }

    useEffect(() => {
        dispatch(cleanAddresses())
        const arrAcitveAddr = accountData?.account?.addresses?.filter((el) => {
            return el._id === accountData?.account?.activeAddressId;
        });
        setActiveAddr(arrAcitveAddr?.[0] || {})
    },[accountData?.account]);


    const onDeleteItem = (id) => {
        dispatch(removeFromCart({id}));
    }

    return (
        <Layout>
            {!token &&
                <AuthModal
                    open={isModalOpen}
                    setRemotePhone={setPhone}
                    setModalOpen={setModalOpen}
                    onCancel={() => {setModalOpen(false); setCodeModalOpen(false)}}
                    isCodeModalOpen={isCodeModalOpen}
                    setCodeModalOpen={setCodeModalOpen}
                />
            }
            {isChoiceAddressModalOpen &&
                <ChoiceAddressModal
                    addresses={accountData?.account?.addresses}
                    open={isChoiceAddressModalOpen}
                    onCancel={() => {setChoiceAddressModalOpen(false)}}
                    isChoiceAddressModalOpen={isChoiceAddressModalOpen}
                    setChoiceAddressModalOpen={setChoiceAddressModalOpen}
                    refetchAcc={refetchAcc}
                    activeAddr={activeAddr}
                />
            }
            <div className="content-block-header">
              <LeftOutlined onClick={onGoBackClick} />
              Корзина <div /></div>
            <div className="content-block">

                <div className="cart-item redirect" onClick={onAddressClick}>
                  {activeAddr?.address ??
                    'Необходимо заполнить адрес доставки'} <RightOutlined />
                </div>
                {cartItems.map((el, i) => {
                    return <div key={i} className="cart-item">
                      <div className="cart-product-info">
                        <div style={{display: 'flex', gap: '7px'}}>
                          <img src={el?.images[0]} style={{width: '100px'}} alt=""/>
                          <div>
                            <div style={{fontSize: '16px'}}>{el.title}</div>
                            <div>размер: {el.size}</div>
                          </div>
                        </div>

                        <div className="cart-product-info-third-column">
                          <div style={{fontWeight: '500'}}>₽{Math.ceil(Number(el.price) * 11.9 + 1000)}</div>
                          <div style={{fontSize: '23px', textAlign: 'right'}} onClick={() => onDeleteItem(el?._id)}>
                              <DeleteOutlined />
                          </div>
                        </div>
                      </div>
                    </div>
                })}
            </div>

            <div className="cart-product-info-submit-btn-wrapper">
                <div className="cart-product-info-submit-confirm-oferta">
                    Нажимая на кнопку "Перейти к оплате", Вы принимаете {' '}
                    <a href="https://storage.yandexcloud.net/pc-mediafiles-dev3/oferta-_2_-_1_.pdf">
                        Условия оферты
                    </a>
                </div>
              <Button type="primary" className="cart-product-info-submit-btn"
                      onClick={onOkHandler}>
                Перейти к оплате
              </Button>
            </div>

            <footer>
                <div onClick={() => navigate('/products')}>
                    <NonActiveBagIcon/>
                </div>
                <div onClick={() => navigate('/cart?from=products') }>
                    <ActiveCartIcon style={{ fontSize: '30px'}} />
                </div>
                <div onClick={() => navigate('/profile')}>
                    <NonActiveProfileIcon style={{ fontSize: '30px'}} />
                </div>
            </footer>
        </Layout>
    );
}
export default Cart;
