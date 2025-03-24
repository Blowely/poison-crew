import React, {useState} from "react";
import {Input, Modal, notification} from "antd";
import "./authModal.scss";
import {useLazyGetCodeQuery, useAddCodeMutation} from "../store/accounts.store";
import FormItem from "antd/es/form/FormItem";
import {useAppDispatch} from "../store";
import {addPhone} from "../common/accountSlice";
import {isNaN} from "formik";
import {CheckCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const AuthModal = ({open, onCancel, setModalOpen = () => {}, setRemotePhone, isCodeModalOpen, setCodeModalOpen}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [getCode] = useLazyGetCodeQuery();
  const [sendCode, {error}] = useAddCodeMutation({},{refetchOnMountOrArgChange: true});

  const phoneInputHandler = (value) => {
    const cleanedValue = value.replace(/\D/g, '');

    // Проверяем, что длина значения не превышает 10 символов
    if (cleanedValue.length <= 10) {
      setPhone(cleanedValue);
    }
  }

  const codeInputHandler = (value) => {
    const numVal = Number(value);

    if (value?.length === 4 && !isNaN(numVal)) {
      setOtp(value.toString());
      onOkHandler(value.toString()).then(() => {});
    }
  }

  const renderModalContent = () => {
    return <div style={{display: 'grid', padding: '15px', borderBottom: '1px solid #ececec', gap: '15px'}}>
      {!isCodeModalOpen &&
          <>
            <div style={{fontSize: '22px', fontWeight: '500'}}>Войти или создать профиль</div>
            <Input prefix="+7" type="phone" value={phone} placeholder="000 000-00-00"
                   onChange={(ev) => phoneInputHandler(ev.target.value)}/>
            <span> <CheckCircleOutlined /> {' '}
              Соглашаюсь с <a href="https://storage.yandexcloud.net/pc-mediafiles/important/privacy-policy-re-poizon.ru.pdf"
                              target="_blank">
              политикой конфиденциальности
            </a>
            </span>
          </>

      }
      {isCodeModalOpen &&
          <>
            <div style={{fontSize: '22px', fontWeight: '500'}}>Введите код подтверждения</div>
            <div style={{fontSize: '15px'}}>Отправлен на +7{phone}</div>
          <FormItem help={error?.data.message} validateStatus={error?.data.message ? 'error' : 'success'}>
            <Input.OTP
                 length={4}
                 type="number"
                 autoFocus={true}
                 placeholder="Пожалуйста введите код"
                 onChange={(val) => codeInputHandler(val)}
            />
          </FormItem>
        </>
      }
    </div>
  }

  const onOkHandler = async (otp) => {
    if (!isCodeModalOpen) {
      const userAgent = window?.navigator?.userAgent;
      getCode({phone, userAgent});
      setCodeModalOpen(true);
      return setRemotePhone(phone)
    } else {
      try {
        if (phone?.length !== 10) {
          return notification.open({duration: 1.5, message: 'Заполните все поля', type: "warning"})
        }

        const res = await sendCode({phone: '7' + phone, code: otp});

        if (res?.data?.token) {
          dispatch(addPhone({phone: '7' + phone}));
          localStorage.setItem('token', res?.data?.token);
          navigate("/profile");
        } else {
          setOtp('');
          return notification.error({duration: 1.5, message: 'Неверный код', type: 'error'})
        }
        onCancel();
        setModalOpen(true);
      } catch (e) {
        setOtp('');
        notification.open({duration: 1.5, message: 'Вход выполенен', type: 'success'})
        onCancel();
        setModalOpen(true);
      }

    }
  }

  const isDesktopScreen = window?.innerWidth > 768;

  return (
    <Modal
      open={open}
      onOk={() => onOkHandler(otp)}
      okText={!isCodeModalOpen ? "Получить код подтверждения" : 'Подтвердить'}
      centered={!isDesktopScreen}
      onCancel={onCancel}
    >

      {renderModalContent()}

    </Modal>
  );
}
export default AuthModal;
