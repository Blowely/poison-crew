import React, {useEffect, useState} from "react";
import {Button, Layout, Modal, notification, Result} from "antd";
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
import {clearCart, removeFromCart} from "../common/cartSlice";
import { getIntPrice } from "../common/utils";

function Cart({onAddToFavorite, onAddToCart, isLoading}) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isCodeModalOpen, setCodeModalOpen] = useState(false);
    const [isChoiceAddressModalOpen, setChoiceAddressModalOpen] = useState(false);
    const [activeAddr, setActiveAddr] = useState('');
    const [phone, setPhone] = useState('');
    const [step, setStep] = useState(0);

    const from = searchParams.get('from');
    const token = localStorage.getItem('token');

    const cartItems = useAppSelector((state) => state.cart.items) || [];
    const addresses = useAppSelector((state) => state.account.addresses);

    const {data: accountData, isLoadingAcc, error: accError, refetch: refetchAcc} = useGetAccountQuery(token, {refetchOnMountOrArgChange: true});
    const [addOrder, {isLoading: isLoadingAddOrder, error}] = useAddOrderMutation({},{refetchOnMountOrArgChange: true});

    useEffect(() => {
        window.scrollTo({top: 0})
    }, [])

    const onGoBackClick = () => {
        if (from) {
            return navigate('/products');
        } else if (cartItems[0]?._id) {
            return navigate(`/products/view?spuId=${cartItems[0]?.spuId}`);
        } else {
            return navigate('/products');
        }
    }

    const onOkHandler = async () => {
      try {
        if (!accountData?.account?.activeAddressId) {
          return notification.open({duration: 2, type: 'error', message:'Не выбран адрес доставки'})
        }
        if (!cartItems.length) {
          return notification.open({duration: 2, type: 'error', message:'Товары не выбраны'})
        }

        let requests = cartItems.map(el => {
          const addOrderBody = {
              clientId: accountData?.account?._id,
              products: [el],
              address: activeAddr,
          }

          return addOrder(addOrderBody);
        })

        setStep(1);
      } catch (e) {
        return notification.open({duration: 2, type: 'error', message:'Ошибка оформления заказа'})
      }
    }

    const onAddressClick = () => {
        setChoiceAddressModalOpen(true);
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

    const getPrice = (price) => {
        if (!price) {
            return '--';
        }

        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price.toString());
    }

    return (
        <Layout>
            {!token && isChoiceAddressModalOpen &&
                <AuthModal
                    open={isChoiceAddressModalOpen}
                    setRemotePhone={setPhone}
                    setModalOpen={isChoiceAddressModalOpen}
                    onCancel={() => {setChoiceAddressModalOpen(false); setCodeModalOpen(false)}}
                    isCodeModalOpen={isCodeModalOpen}
                    setCodeModalOpen={setCodeModalOpen}
                />
            }
            {token && isChoiceAddressModalOpen &&
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
              Оформление заказа <div />
            </div>
                <div className="content-block">
                    {step === 0 &&
                        <>
                            <div className="cart-item redirect" onClick={onAddressClick}>
                                {activeAddr?.address ??
                                    'Необходимо заполнить адрес доставки'} <RightOutlined/>
                            </div>
                            {cartItems.length
                                ? [cartItems[cartItems.length - 1]].map((el, i) => {
                                    return <div key={i} className="cart-item">
                                        <div className="cart-product-info">
                                            <div style={{display: 'flex', gap: '7px'}}>
                                                <img
                                                    src={`${el?.images?.[0]}?x-oss-process=image/format,webp/resize,w_500`}
                                                    style={{width: '100px'}} alt=""/>
                                                <div>
                                                    <div style={{fontSize: '16px'}}>{el?.name}</div>
                                                    <div>размер: {el.size}</div>
                                                </div>
                                            </div>

                                            <div className="cart-product-info-third-column">
                                                <div style={{fontWeight: '500'}}>{getPrice(el?.price)}</div>
                                            </div>
                                        </div>
                                    </div>
                                }) : null}

                            <div className="cart-item">
                                <div className="cart-order-info">
                                    <div style={{display: "grid", gap: '7px'}}>
                                        {/*<div style={{fontSize: '15px', fontWeight: '500'}}>
                                    Скопируйте реквизиты
                                </div>
                                <div className="cart-product-info-payment-card">
                                    <div className="card">
                                        <SberIcon></SberIcon>
                                        <div>
                                            {getFormattedCardNumber()}
                                        </div>

                                    </div>
                                </div>*/}
                                        <div style={{fontSize: '15px', fontWeight: '500'}}>
                                            Отсканируйте qr-code.
                                            Оплатите {getPrice(cartItems[cartItems.length - 1]?.price)}
                                        </div>
                                        <img className="cart-product-info-payment-qr"
                                             src="https://storage.yandexcloud.net/pc-mediafiles/test1/qr.jpg" alt=""/>
                                    </div>
                                </div>
                            </div>

                            <div className="cart-product-info-submit-btn-wrapper">
                                <div className="cart-product-info-submit-confirm-oferta">
                                    Нажимая на кнопку "Я Оплатил. Подтвердить заказ", Вы принимаете {' '}
                                    <a href="https://storage.yandexcloud.net/pc-mediafiles-dev3/oferta-_2_-_1_.pdf">
                                        Условия оферты
                                    </a>
                                </div>
                                <Button type="primary" className="cart-product-info-submit-btn"
                                        onClick={onOkHandler}>
                                    Я Оплатил. Подтвердить заказ
                                </Button>
                            </div>
                        </>
                    }
                    {step === 1 &&
                        <div className="loader-block">
                            <Result
                                title="Проверям поступление платежа!"
                                subTitle="Как только поступит платеж, поменяем статус заказа. Обычно занимает не более 2 минут"
                                extra={[
                                    <Button type="primary" key="console" onClick={() => navigate('/orders')}>
                                        Мои заказы
                                    </Button>,
                                ]}
                            />
                        </div>
                    }
                </div>


            <footer>
                <div onClick={() => navigate('/products')}>
                    <NonActiveBagIcon/>
                </div>
                <div onClick={() => navigate('/cart?from=products')}>
                    <ActiveCartIcon style={{fontSize: '30px'}}/>
                </div>
                <div onClick={() => navigate('/profile')}>
                    <NonActiveProfileIcon style={{fontSize: '30px'}}/>
                </div>
            </footer>
        </Layout>
    );
}

export default Cart;
