import React, {useCallback, useState} from "react";
import { Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "./CartButton.scss";
import {useNavigate} from "react-router-dom";

const CartButton = ({
                        price,
                        isDisabled = false,
                        onAddToCart,
                        removeFromCartHandler,
                        showCounter = false,
    }) => {

    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(0);

    const handleAddToCart = () => {
        onAddToCart();
        setQuantity(1);
    }
    const increaseQuantity = () => {
        onAddToCart();
        setQuantity(quantity + 1);
    }
    const decreaseQuantity = () => {
        if (quantity > 1) {
            removeFromCartHandler()
            setQuantity(quantity - 1);
        } else {
            setQuantity(0);
        }
    };

    const getBtnPrice = (price) => {
        if (!price) {
            return "--";
        }

        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
    };

    const onGoToCart = () => {
        navigate('/cart');
    }

    return (
        <div className="cart-button">
            {!showCounter ? (
                <Button
                    type="primary"
                    className="cart-button__add"
                    onClick={handleAddToCart}
                    disabled={isDisabled}
                    loading={isDisabled}
                >
                    {getBtnPrice(price)} <span>Добавить в корзину</span>
                </Button>
            ) : (
                <div className="cart-button__counter">
                    <Button
                        type="primary"
                        className={"btn btn-cart"}
                        onClick={onGoToCart}
                    >
                        Перейти в корзину
                    </Button>
                    <div className="cart-button__controls">
                        <MinusOutlined onClick={decreaseQuantity}/>
                        <span style={{padding: '0 5px'}}>{quantity}<div>В корзине</div></span>
                        <PlusOutlined onClick={increaseQuantity}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartButton;
