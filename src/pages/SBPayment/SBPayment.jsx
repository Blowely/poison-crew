import React, { useState, useEffect } from 'react';
import {QRCodeSVG} from 'qrcode.react';
import styles from './SBPayment.module.scss';
import axios from 'axios';

const SBPayment = () => {
    const [orderId, setOrderId] = useState('');
    const [qrData, setQrData] = useState('');
    const [status, setStatus] = useState('');
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState(10000);
    const [token, setToken] = useState('');

    // Авторизация и получение токена
    const login = async () => {
        try {
            const response = await axios.post('/public/login', {
                login: 'your_login',
                password: 'your_password'
            });
            setToken(response.data.accessToken);
        } catch (error) {
            console.error('Authorization error:', error);
        }
    };

    // Создание заказа
    const createOrder = async () => {
        try {
            const response = await axios.post('/order', {
                merchantOrderId: `order_${Date.now()}`,
                paymentAmount: amount,
                orderCurrency: 'RUB',
                tspId: 1,
                description: 'Оплата через СБП',
                callbackUrl: 'https://your-domain.com/callback'
            }, {
                headers: {
                    'Authorization-Token': token,
                    'x-req-id': generateUniqueId()
                }
            });

            setOrderId(response.data.order.id);
            return response.data.order.id;
        } catch (error) {
            console.error('Order creation error:', error);
        }
    };

    // Генерация QR-кода
    const generateQR = async (orderId) => {
        try {
            const response = await axios.post(`/order/qrcData/${orderId}`, {
                phoneNumber: phone
            }, {
                headers: {
                    'Authorization-Token': token,
                    'x-req-id': generateUniqueId()
                }
            });

            setQrData(response.data.order.payload);
            startStatusPolling(orderId);
        } catch (error) {
            console.error('QR generation error:', error);
        }
    };

    // Опрос статуса заказа
    const startStatusPolling = (orderId) => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`/status/${orderId}`, {
                    headers: {
                        'Authorization-Token': token
                    }
                });

                setStatus(response.data.order.status);
                if (['IPS_ACCEPTED', 'DECLINED', 'EXPIRED'].includes(response.data.order.status)) {
                    clearInterval(interval);
                }
            } catch (error) {
                console.error('Status check error:', error);
            }
        }, 5000);
    };

    // Обработчик начала оплаты
    const handlePaymentStart = async () => {
        const newOrderId = await createOrder();
        if (newOrderId) {
            await generateQR(newOrderId);
        }
    };

    // Генерация уникального ID для идемпотентности
    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    useEffect(() => {
        login();
    }, []);

    return (
        <div className={styles.paymentContainer}>
            <h1>Оплата через СБП</h1>

            <div className={styles.formGroup}>
                <label>Сумма (в копейках):</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Телефон (необязательно):</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7XXXXXXXXXX"
                />
            </div>

            <button className={styles.sbpButton} onClick={handlePaymentStart} disabled={!token}>
                Начать оплату
            </button>

            {qrData && (
                <div className={styles.qrSection}>
                    <h2>Отсканируйте QR-код:</h2>
                    <QRCodeSVG value={qrData} size={256} />
                </div>
            )}

            {status && (
                <div className={`status ${status.toLowerCase()}`}>
                    Статус платежа: {status}
                </div>
            )}
        </div>
    );
};

export default SBPayment;