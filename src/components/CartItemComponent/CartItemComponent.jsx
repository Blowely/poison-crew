import { useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const CartItemComponent = (props) => {
    const { selectedIds, setSelectedIds, cartItems, gender, navigate, getPrice, removeFromCartHandler } = props;

    // Инициализация выбранных элементов
    useEffect(() => {
        const initialIds = (cartItems || []).map(item => item.spuId);
        setSelectedIds(initialIds);
    }, [cartItems]);

    // Обработчик выбора всех
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = (cartItems || []).map(item => item.spuId);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    // Переключение отдельного элемента
    const handleToggleItem = (spuId) => {
        setSelectedIds(prev => prev.includes(spuId)
            ? prev.filter(id => id !== spuId)
            : [...prev, spuId]
        );
    };

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
                            checked={selectedIds.includes(el.spuId)}
                            onChange={() => handleToggleItem(el.spuId)}
                            style={{
                                marginTop: '4px',
                                position: 'absolute',
                                padding: '0 6px 6px 0',
                            }}
                        />

                        {/* Основная информация о товаре */}
                        <div
                            onClick={() => navigate(`/${gender}-products?spuId=${el.spuId}`)}
                            style={{
                                display: 'flex',
                                gap: '12px',
                                cursor: 'pointer',
                                flex: 1
                            }}
                        >
                            <img
                                src={`${el?.images?.[0]}?x-oss-process=image/format,webp/resize,w_400`}
                                style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                                alt=""
                            />
                            <div>
                                <div style={{ fontSize: '16px', marginBottom: '8px' }}>{el?.name}</div>
                                <div>Размер: {el?.selectedSize}</div>
                            </div>
                        </div>

                        {/* Правая колонка с ценой и удалением */}
                        <div className="cart-product-info-third-column" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: '8px'
                        }}>
                            <div style={{ fontWeight: '500' }}>{getPrice(el?.price)}</div>
                            <div id="delete-icon-wrapper">
                                <DeleteOutlined
                                    onClick={() => removeFromCartHandler(el)}
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