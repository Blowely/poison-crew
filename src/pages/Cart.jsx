import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Layout, message, Modal, notification, Result, Select, Tabs} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./cart.scss";
import {
    CopyOutlined,
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
import {getIntPrice, iosCopyToClipboard} from "../common/utils";
import SberIcon from "../assets/svg/payment/sber-icon";
import {BANK_ICONS, BANKS, banksIcons} from "./constants";
import RePoizonMainLogo from "../assets/svg/re-poizon-main-logo";
import GenderSwitcher from "../components/GenderSwitcher/GenderSwitcher";

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
    const [bank, setBank] = useState('t-bank');

    const paymentNumberRef = useRef(null);
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

        const cartItem = cartItems[cartItems.length - 1];

        const addOrderBody = {
          clientId: accountData?.account?._id,
          products: [cartItem],
          address: activeAddr,
        }

        addOrder(addOrderBody);
        dispatch(clearCart());

        return setStep(1);
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
                    Андрей Евгеньевич М
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
        }];

    const onChange = (key) => {
        console.log(key);
    };

    const onChangeBank = (bank) => {
        setBank(bank);
    };

    const isDesktopScreen = window?.innerWidth > 768;

    return (
        <Layout>
            {!token && isChoiceAddressModalOpen &&
                <AuthModal
                    open={isChoiceAddressModalOpen}
                    setRemotePhone={setPhone}
                    setModalOpen={isChoiceAddressModalOpen}
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
                    {<RePoizonMainLogo />}

                    {/*<div
                        className="main-logo-line black main-logo-line-right"
                        style={{
                          width: "calc((100vw - 226px - 40px) / 2 )"
                        }}
                      />*/}
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
                  <LeftOutlined onClick={onGoBackClick} />
                  Оформление заказа <div />
                </div>
            }
            <div className="content-block-wrapper">
                <div className="content-block">
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
                                    return <div key={i} className="cart-item">
                                        <div className="cart-product-info">
                                            <div style={{display: 'flex', gap: '7px'}}>
                                                <img
                                                    src={`${el?.images?.[0]}?x-oss-process=image/format,webp/resize,w_500`}
                                                    style={{width: '100px'}} alt=""/>
                                                <div>
                                                    <div style={{fontSize: '16px'}}>{el?.name}</div>
                                                    <div>размер: {el.selectedSize}</div>
                                                </div>
                                            </div>

                                            <div className="cart-product-info-third-column">
                                                <div style={{fontWeight: '500'}}>{getPrice(el?.price)}</div>
                                            </div>
                                        </div>
                                    </div>
                                }) : null}


                            {/*<div className="cart-item">
                                <div className="cart-order-info">
                                    <Tabs defaultActiveKey="1" className="tabs" items={items} onChange={onChange}/>
                                </div>
                            </div>*/}

                            {!!cartItems.length && (
                                <div>
                                    <Card
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
                                    </Card>

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
            }

        </Layout>
    );
}

export default Cart;
