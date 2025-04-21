import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Button, Layout, message, notification, Result} from "antd";
import {useNavigate, useSearchParams, useLocation} from "react-router-dom";
import "./cart.scss";
import {
    CopyOutlined,
    LeftOutlined,
    RightOutlined,
} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../store";
import {useGetAccountQuery} from "../store/accounts.store";
import {useAddOrderMutation} from "../store/orders.store";
import ChoiceAddressModal from "./ChoiceAddressModal";
import {cleanAddresses} from "../common/accountSlice";
import AuthModal from "./AuthModal";
import {applyCartDiscount, clearCart, removeFromCart} from "../common/cartSlice";
import {iosCopyToClipboard} from "../common/utils";
import {BANKS} from "./constants";
import PromoCode from "../components/PromoCode/PromoCode";
import DeliverBlock from "../components/Delivery/DeliveryBlock";
import PhoneFooter from "../components/PhoneFooter/PhoneFooter";
import MainLogoComponent from "../components/MainLogoComponent/MainLogoComponent";
import CartItemComponent from "../components/CartItemComponent/CartItemComponent";
import HeaderInfoWrapper from "../components/HeaderInfoWrapper/HeaderInfoWrapper";

function Cart() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cachedPromo = localStorage.getItem('promo') || '';

    const [searchParams, setSearchParams] = useSearchParams();
    const [isCodeModalOpen, setCodeModalOpen] = useState(false);
    const [isChoiceAddressModalOpen, setChoiceAddressModalOpen] = useState(false);
    const [activeAddr, setActiveAddr] = useState('');
    const [promo, setPromo] = useState(cachedPromo || '');
    const [phone, setPhone] = useState('');
    const [step, setStep] = useState(0);
    const [bank, setBank] = useState('t-bank');
    const [loading, setLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    const paymentNumberRef = useRef(null);
    const from = searchParams.get('from');
    const token = localStorage.getItem('token');
    const gender = localStorage.getItem("gender") || "men";
    const [orderAmount, setOrderAmount] = useState("");

    const cartItems = useAppSelector((state) => state.cart.items) || [];

    const {data: accountData, refetch: refetchAcc} = useGetAccountQuery(token, {refetchOnMountOrArgChange: true});
    const [addOrder] = useAddOrderMutation({},{refetchOnMountOrArgChange: true});

    useLayoutEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }, []);

    const onGoBackClick = () => {
        window.history.go(-1);
    }

    const onOkHandler = async () => {
        try {
            setLoading(true);
            if (!accountData?.account?.activeAddressId) {
              return notification.open({duration: 2, type: 'error', message:'Не выбран адрес доставки'})
            }
            if (!cartItems.length) {
              return notification.open({duration: 2, type: 'error', message:'Товары не выбраны'})
            }

            const addOrderBody = {
              clientId: accountData?.account?._id,
              products: cartItems.filter(el => selectedIds.includes(el.skuId)),
              address: activeAddr,
              promo: promo,
            }

            const res = await addOrder(addOrderBody).unwrap();

            if (res?.qrCode) {
                window.location.href = res.qrCode;
            }

            setPromo('');
            localStorage.removeItem('promo');

            dispatch(clearCart(selectedIds));
            setLoading(false);

            return navigate('/orders');
        } catch (e) {
            setLoading(false);
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

        if (!orderAmount) {
            setOrderAmount(price);
        }

        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price.toString());
    }

    const getOrderPrice = () => {
        const selectedItems = cartItems.filter(el => selectedIds.includes(el.skuId));
        let totalPrice = 0;
        selectedItems.map((el) => totalPrice += (el?.discountedPrice || el.price) * (el?.count > 0 ? el.count : 1 ));

        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(totalPrice.toString());
    }

    const copyToClickBord = (el) => {
        iosCopyToClipboard(el);
        navigator.clipboard.writeText(el.value);
        message.success( 'Скопировано')
    }

    /*const getFormattedCardNumber = () => {
        const number = BANKS[bank].card_number;

        return <span style={{display: "grid", gap: '8px'}}>
                    <input type="text" style={{visibility: 'hidden'}} ref={paymentNumberRef} value={number}/>
                    Номер карты
                    <span className="formatted-card-number">
                        <span>{number.substring(0,4)}</span>
                        <span>{number.substring(4,8)}</span>
                        <span>{number.substring(8,12)}</span>
                        <span>{number.substring(12,16)}</span>
                        <CopyOutlined onClick={() => copyToClickBord(paymentNumberRef.current)}/>
                    </span>
                </span>
    }

    const CardNumberComponent = () => {
        return (<div className="payment-method-wrapper">
                    <div style={{fontSize: '15px', fontWeight: '500'}}>
                        Выполните перевод.
                        Оплатите {getPrice(cartItems[cartItems.length - 1]?.price)}
                    </div>
                    <div className="cart-product-info-payment-card">
                        <div className="card">
                            <img src={BANKS[bank].src} width="35" alt=''></img>
                            <div>
                                {getFormattedCardNumber()}
                            </div>

                        </div>
                    </div>
                </div>)
    }

    const QrCodeComponent = () => {
        return <div className="payment-method-wrapper">
                <div style={{display: "grid", gap: '7px'}}>
                    <div style={{fontSize: '15px', fontWeight: '500'}}>
                        Отсканируйте qr-code.
                        Оплатите {getPrice(cartItems[cartItems.length - 1]?.price)}
                    </div>
                    <img className="cart-product-info-payment-qr"
                         src={BANKS[bank].qr}
                         alt=""/>
                </div>
            </div>
    }

    const onPaymentLinkClick = () => {
        window.open(BANKS[bank].link);
    }

    const items = [
        {
            key: '1',
            label: 'QR-code',
            children: <QrCodeComponent/>,
        },
        {
            key: '2',
            label: 'Реквизиты',
            children: <CardNumberComponent/>,
        },];*/

    const onChange = (key) => {
        console.log(key);
    };

    const onChangeBank = (bank) => {
        setBank(bank);
    };

    const removeFromCartHandler = (el) => {
        dispatch(removeFromCart(el));
    }

    const applyDiscount = (discount) => {
        dispatch(applyCartDiscount({discount}));
        localStorage.setItem('promo', promo);
    }

    const isDesktopScreen = window?.innerWidth > 768;

    return (
        <Layout>
            {!token && isChoiceAddressModalOpen &&
                <AuthModal
                    open={isChoiceAddressModalOpen}
                    setRemotePhone={setPhone}
                    setModalOpen={() => setChoiceAddressModalOpen(true)}
                    onCancel={() => {
                        setChoiceAddressModalOpen(false); setCodeModalOpen(false)}}
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
            {isDesktopScreen &&
                <HeaderInfoWrapper />
            }

            {!isDesktopScreen &&
                <div className="content-block-header border-radius">
                    <LeftOutlined onClick={onGoBackClick}/>
                    Оформление заказа
                    <div style={{width: '19px'}}/>
                </div>
            }
            <div className="content-block-wrapper">
                <div className="content-block" style={{padding: isDesktopScreen && '30px 0px 0px 0px'}} >
                    {isDesktopScreen &&
                        <div className="category-title" onClick={onGoBackClick}><LeftOutlined/>Корзина</div>
                    }
                    {step === 0 && cartItems?.length === 0 &&
                        <Result
                            status="info"
                            title="Товаров пока нет"
                            subTitle="Добавьте товары в коризну"
                        />
                    }

                    {step === 0 && isDesktopScreen && !!cartItems?.length &&
                        <div className="content-block-items-wrapper">
                            <div className="delivery-info-wrapper">
                                <div className="cart-item redirect" onClick={onAddressClick}>
                                    {activeAddr?.address ??
                                        'Выберите адрес доставки'} <RightOutlined/>
                                </div>
                                <CartItemComponent
                                    cartItems={cartItems}
                                    gender={gender}
                                    navigate={navigate}
                                    getPrice={getPrice}
                                    removeFromCartHandler={removeFromCartHandler}
                                    selectedIds={selectedIds}
                                    setSelectedIds={setSelectedIds}
                                />
                                <div className="product-info__item standart" style={{marginTop: '15px'}}>
                                    <DeliverBlock/>
                                </div>
                            </div>


                            {!!cartItems.length && (
                                <div>
                                    <PromoCode promo={promo} setPromo={setPromo} applyDiscount={applyDiscount}/>
                                    <div className="cart-product-info-submit-btn-wrapper">
                                        <div className="cart-product-info-submit-confirm-oferta">
                                            Нажимая на кнопку "Оплатить", Вы принимаете {' '}
                                            <a href="https://storage.yandexcloud.net/pc-mediafiles/important/public-offer-re-poizon.pdf">
                                                Условия оферты
                                            </a>
                                        </div>
                                        <Button type="primary"
                                                className="cart-product-info-submit-btn"
                                                loading={loading}
                                                onClick={onOkHandler}
                                                disabled={!selectedIds?.length}
                                        >
                                            Оплатить по
                                            <img
                                                src="https://storage.yandexcloud.net/pc-mediafiles/icons/sbp.png"
                                                style={{height: '23px', margin: '0 0 0 5px'}}
                                                alt="sbp"
                                            />
                                            СБП {getOrderPrice()}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    }

                    {step === 0 && !isDesktopScreen && !!cartItems?.length &&
                        <>
                            <div className="cart-item redirect" onClick={onAddressClick}>
                                {activeAddr?.address ??
                                    'Выберите адрес доставки'} <RightOutlined/>
                            </div>
                            <CartItemComponent
                                cartItems={cartItems}
                                gender={gender}
                                navigate={navigate}
                                getPrice={getPrice}
                                removeFromCartHandler={removeFromCartHandler}
                                selectedIds={selectedIds}
                                setSelectedIds={setSelectedIds}
                            />
                            {!!cartItems.length && (
                                <div>
                                    <PromoCode promo={promo} setPromo={setPromo} applyDiscount={applyDiscount}/>
                                    <div className="product-info__item standart" style={{marginTop: '15px'}}>
                                        <DeliverBlock/>
                                    </div>
                                    <div className="cart-product-info-submit-btn-wrapper">
                                        <div className="cart-product-info-submit-confirm-oferta">
                                            Нажимая на кнопку "Оплатить", Вы принимаете {' '}
                                            <a href="https://storage.yandexcloud.net/pc-mediafiles/important/public-offer-re-poizon.pdf">
                                                Условия оферты
                                            </a>
                                        </div>
                                        <Button type="primary"
                                                className="cart-product-info-submit-btn"
                                                loading={loading}
                                                onClick={onOkHandler}
                                                disabled={!selectedIds?.length}
                                        >
                                            Оплатить по
                                            <img
                                                src="https://storage.yandexcloud.net/pc-mediafiles/icons/sbp.png"
                                                style={{height: '23px', margin: '0 0 0 5px'}}
                                                alt="sbp"
                                            />
                                            СБП {getOrderPrice()}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    }
                    {step === 1 &&
                        <div className="loader-block">
                            <Result
                                title="Проверям поступление платежа!"
                                subTitle="Как только поступит платеж, поменяем статус заказа. Обычно занимает не более 2 минут"
                                extra={[
                                    <Button type="primary" key="console"
                                            onClick={() => navigate('/orders')}>
                                        Мои заказы
                                    </Button>,
                                ]}
                            />
                        </div>
                    }
                </div>
            </div>


            {!isDesktopScreen &&
                <PhoneFooter tab="cart" />
            }

        </Layout>
    );
}

export default Cart;
