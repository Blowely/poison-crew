import React, {useCallback, useState} from "react";
import { Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "./CartButton.scss";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../store";

const CartButton = ({
                        price,
                        isDisabled = false,
                        onAddToCart,
                        decreaseCartItemHandler,
                        counterValue,
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
        decreaseCartItemHandler()

        if (quantity > 1) {
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
            {!counterValue ? (
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
                        <span style={{padding: '0 5px'}}>{counterValue}<div>В корзине</div></span>
                        <PlusOutlined onClick={increaseQuantity}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartButton;
