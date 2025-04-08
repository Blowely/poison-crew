import React, { useState, useEffect } from 'react';
import {Button, Checkbox} from 'antd';
import {DeleteOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {addToCart, decreaseCartItem} from "../../common/cartSlice";
import {useAppDispatch} from "../../store";
import DiscountedPrice from "../DiscountedPrice/DiscountedPrice";

const CartItemComponent = (props) => {
    const { selectedIds, setSelectedIds, cartItems, gender, navigate, getPrice, removeFromCartHandler } = props;

    const dispatch = useAppDispatch();

    // Инициализация выбранных элементов
    useEffect(() => {
        const initialIds = (cartItems || []).map(item => item.cartId);
        setSelectedIds(initialIds);
    }, [cartItems]);

    // Обработчик выбора всех
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = (cartItems || []).map(item => item.cartId);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    // Переключение отдельного элемента
    const handleToggleItem = (cartId) => {
        setSelectedIds(prev => prev.includes(cartId)
            ? prev.filter(id => id !== cartId)
            : [...prev, cartId]
        );
    };

    const getCartItemNumberCount = (product, size) => {
        const cartId = `${product.spuId}-${size}`;
        const foundedIndex = cartItems.findIndex((el) => el.cartId === cartId);
        return foundedIndex >= 0 ? cartItems[foundedIndex].count : 0;
    }

    const onAddToCart = (product, size, price) => {
        if (getCartItemNumberCount(product, size) === 2) return;

        if (!price) {
            return;
        }

        dispatch(
            addToCart({
                ...product,
                selectedSize: size,
                price: price,
                cartId: `${product.spuId}-${size}`
            }),
        );
    };

    const decreaseCartItemHandler = (product, size) => {
        const cartId = `${product.spuId}-${size}`;

        const obj = {
            ...product,
            cartId,
        }

        dispatch(decreaseCartItem(obj));
    }

    return (
        <div>
            {/* Чекбокс "Выбрать все" */}
            <div style={{ margin: '16px 0', padding: '0 16px' }}>
                <Checkbox
                    checked={selectedIds.length === (cartItems || []).length && (cartItems || []).length > 0}
                    indeterminate={selectedIds.length > 0 && selectedIds.length < (cartItems || []).length}
                    onChange={handleSelectAll}
                >
                    Выбрать все
                </Checkbox>
            </div>

            {/* Список товаров */}
            {(cartItems || []).map((el, i) => (
                <div key={i} className="cart-item">
                    <div className="cart-product-info" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                    }}>
                        {/* Чекбокс товара */}
                        <Checkbox
                            checked={selectedIds.includes(el.cartId)}
                            onChange={() => handleToggleItem(el.cartId)}
                            style={{
                                marginTop: '4px',
                                position: 'absolute',
                                padding: '0 6px 6px 0',
                            }}
                        />

                        {/* Основная информация о товаре */}
                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                flex: 1
                            }}
                        >
                            <img
                                onClick={() => navigate(`/${gender}-products?spuId=${el.spuId}`)}
                                src={`${el?.images?.[0]}?x-oss-process=image/format,webp/resize,w_400`}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'contain',
                                    cursor: 'pointer',
                                }}
                                alt=""
                            />
                            <div>
                                <div
                                    onClick={() => navigate(`/${gender}-products?spuId=${el.spuId}`)}
                                    style={{
                                        fontSize: '16px',
                                        marginBottom: '8px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {el?.name}
                                </div>
                                <div
                                    onClick={() => navigate(`/${gender}-products?spuId=${el.spuId}`)}
                                    style={{
                                        fontSize: '13px',
                                        color: "gray",
                                        marginBottom: '8px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Размер: {el?.selectedSize}
                                </div>
                                <div className="cart-button__controls small">
                                    <MinusOutlined onClick={() => decreaseCartItemHandler(el, el.selectedSize)}/>
                                    <span style={{padding: '0 5px'}}>{el?.count || "1"}</span>
                                    <PlusOutlined onClick={() => onAddToCart(el, el.selectedSize, el.price)}/>
                                </div>
                            </div>
                        </div>

                        {/* Правая колонка с ценой и удалением */}
                        <div className="cart-product-info-third-column" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: '8px'
                        }}>
                        <div style={{fontWeight: '500', textDecoration: el?.discountedPrice && "line-through"}}>
                            {getPrice(el?.price * (el?.count || 1))}
                        </div>
                        {el?.discountedPrice &&
                            <DiscountedPrice
                                discountedPrice={el.discountedPrice}
                                discount={el.discount}
                                count={el?.count || 1}
                            />
                        }
                        <div id="delete-icon-wrapper">
                            <img src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/remove-cropped.png"
                                 onClick={() => removeFromCartHandler(el)}
                                 alt="delete"
                            />
                        </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartItemComponent;