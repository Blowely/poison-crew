import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Button, Card, Layout, message, notification, Result, Select, Tabs} from "antd";
import {useNavigate, useSearchParams, useLocation} from "react-router-dom";
import "./cart.scss";
import {
    CopyOutlined, DeleteOutlined,
    LeftOutlined,
    RightOutlined,
} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../store";
import {useGetAccountQuery} from "../store/accounts.store";
import {useAddOrderMutation} from "../store/orders.store";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";
import ChoiceAddressModal from "./ChoiceAddressModal";
import {cleanAddresses} from "../common/accountSlice";
import AuthModal from "./AuthModal";
import {clearCart, removeFromCart} from "../common/cartSlice";
import {iosCopyToClipboard} from "../common/utils";
import {BANKS} from "./constants";
import RePoizonMainBigLogo from "../assets/svg/re-poizon-main-middle-big-logo";
import GenderSwitcher from "../components/GenderSwitcher/GenderSwitcher";
import PromoCode from "../components/PromoCode/PromoCode";
import DeliverBlock from "../components/Delivery/DeliveryBlock";
import PhoneFooter from "../components/PhoneFooter/PhoneFooter";

function Cart() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();
    const [isCodeModalOpen, setCodeModalOpen] = useState(false);
    const [isChoiceAddressModalOpen, setChoiceAddressModalOpen] = useState(false);
    const [activeAddr, setActiveAddr] = useState('');
    const [phone, setPhone] = useState('');
    const [step, setStep] = useState(0);
    const [bank, setBank] = useState('t-bank');
    const [loading, setLoading] = useState(false);

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

            const cartItem = cartItems[cartItems.length - 1];

            const addOrderBody = {
              clientId: accountData?.account?._id,
              products: [cartItem],
              address: activeAddr,
            }

            const res = await addOrder(addOrderBody).unwrap();

            if (res?.qrCode) {
                window.location.href = res.qrCode;
            }

            dispatch(clearCart());
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

    const copyToClickBord = (el) => {
        iosCopyToClipboard(el);
        navigator.clipboard.writeText(el.value);
        message.success( 'Скопировано')
    }

    const getFormattedCardNumber = () => {
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

    /*const onPaymentLinkClick = () => {
        window.open(BANKS[bank].link);
    }*/

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
        },];

    const onChange = (key) => {
        console.log(key);
    };

    const onChangeBank = (bank) => {
        setBank(bank);
    };

    const removeFromCartHandler = (el) => {
        dispatch(removeFromCart(el));
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
                <div className="main-logo-wrapper">
                    {/*<div
                        className="main-logo-line black main-logo-line-left"
                        style={{
                          width: "calc((100vw - 226px - 40px) / 2 )"
                        }}
                    />*/}
                    {<div onClick={() => navigate('/products')} style={{cursor: "pointer", zIndex: "5"}}><RePoizonMainBigLogo/></div>}

                    {/*<div
                        className="main-logo-line black main-logo-line-right"
                        style={{
                          width: "calc((100vw - 226px - 40px) / 2 )"
                        }}
                      />*/}
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

                    {step === 0 && !!cartItems?.length &&
                        <>
                            <div className="cart-item redirect" onClick={onAddressClick}>
                                {activeAddr?.address ??
                                    'Необходимо заполнить адрес доставки'} <RightOutlined/>
                            </div>
                            {cartItems.length
                                ? [cartItems[cartItems.length - 1]].map((el, i) => {
                                    return (
                                    <div
                                        key={i} className="cart-item"
                                        onClick={() => navigate(`/${gender}-products?spuId=${el.spuId}`)}
                                    >
                                        <div className="cart-product-info">
                                            <div style={{display: 'flex', gap: '7px'}}>
                                                <img
                                                    src={`${el?.images?.[0]}?x-oss-process=image/format,webp/resize,w_500`}
                                                    style={{width: '100px'}} alt=""/>
                                                <div>
                                                    <div style={{fontSize: '16px'}}>{el?.name}</div>
                                                    <div>размер: {el?.selectedSize}</div>
                                                </div>
                                            </div>

                                            <div className="cart-product-info-third-column">
                                                <div style={{fontWeight: '500'}}>{getPrice(el?.price)}</div>
                                                <div id="delete-icon-wrapper">
                                                    <DeleteOutlined onClick={() => removeFromCartHandler(el)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                                }) : null}


                            {/*<div className="cart-item">
                                <div className="cart-order-info">
                                    <Tabs defaultActiveKey="1" className="tabs" items={items} onChange={onChange}/>
                                </div>
                            </div>*/}

                            {!!cartItems.length && (
                                <div>
                                    <PromoCode/>
                                    {/*<Button onClick={() => navigate('/sbp')}>Оплатить по СБП</Button>*/}
                                    {/*<Card
                                        className="cart-item-card"
                                        extra={
                                            <Select
                                                placeholder="Выберите банк"
                                                optionFilterProp="label"
                                                onChange={onChangeBank}
                                                menuItemSelectedIcon={<img src={BANKS[bank].src} width="50" alt=""/>}
                                                defaultValue={{
                                                    value: 't-bank',
                                                    label: `Т-БАНК`,
                                                }}
                                                options={[
                                                    {
                                                        value: 't-bank',
                                                        label: 'Т-БАНК',
                                                    },
                                                    {
                                                        value: 'sber',
                                                        label: 'СБЕР',
                                                    },
                                                ]}>
                                                Выбрать
                                            </Select>
                                        }
                                        size="small"
                                    >
                                        <Tabs defaultActiveKey="1" className="tabs" items={items} onChange={onChange}/>
                                    </Card>*/}
                                    <div className="product-info__item standart" style={{marginTop: '15px'}}>
                                        <DeliverBlock/>
                                    </div>
                                    <div className="cart-product-info-submit-btn-wrapper">
                                        <div className="cart-product-info-submit-confirm-oferta">
                                            Нажимая на кнопку "Оплатить", Вы принимаете {' '}
                                            <a href="https://storage.yandexcloud.net/pc-mediafiles/important/public-offer%20re-poizon.ru.pdf">
                                                Условия оферты
                                            </a>
                                        </div>
                                        <Button type="primary"
                                                className="cart-product-info-submit-btn"
                                                loading={loading}
                                                onClick={onOkHandler}>
                                            Оплатить по
                                            <img
                                                src="https://storage.yandexcloud.net/pc-mediafiles/icons/sbp.png"
                                                style={{height: '23px', margin: '0px 5px 0 10px'}}
                                                alt="sbp"
                                            />
                                            СБП {getPrice(orderAmount)}
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
