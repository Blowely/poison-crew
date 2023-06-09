import React, {useEffect, useState} from "react";
import {Button, Input, Modal} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useSearchParams} from "react-router-dom";
import "./authModal.scss";
import {LoadingOutlined} from "@ant-design/icons";
import {useLazyGetCodeQuery, useAddCodeMutation} from "../store/accounts.store";

const AuthModal = ({open, onCancel, setRemotePhone, isCodeModalOpen, setCodeModalOpen}) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState(null);
  const [getCode, {codeData, isLoadingCode} ] = useLazyGetCodeQuery(phone, {skip: phone.length !== 10});
  const [sendCode, {isLoading: isLoadingPostCode, error}] = useAddCodeMutation();

  const phoneInputHandler = (value) => {
    if (value.length <= 10) {
      setPhone(value)
    }
  }

  const renderModalContent = () => {
    return <div style={{display: 'grid', padding: '15px', borderBottom: '1px solid #ececec', gap: '15px'}}>
      {!isCodeModalOpen &&
        <>
          <div style={{fontSize: '22px', fontWeight: '500'}}>Вход по номеру телефона</div>
          <div style={{fontSize: '15px'}}>Незарегистрированные номера будут автоматически зарегетрированы</div>

          <Input prefix="+7" type="number" value={phone} placeholder="Пожалуйста введите ваш номер телефона" onChange={(ev) => phoneInputHandler(ev.target.value)} />

        </>

      }
      {isCodeModalOpen &&
        <>
          <div style={{fontSize: '22px', fontWeight: '500'}}>Введите код подтверждения</div>
          <div style={{fontSize: '15px'}}>Отправлен на +7{phone}</div>

          <Input  placeholder="Пожалуйста введите код" onChange={(ev) => setCode(ev.target.value)} />
        </>
      }
    </div>
  }

  const onOkHandler = async () => {
    if (!isCodeModalOpen) {
      getCode();
      setCodeModalOpen(true);
      return setRemotePhone(phone)
    } else {
      console.log('sendCode')
      const res = await sendCode({phone,code}).unwrap();
      console.log('res=', res);
      //localStorage.setItem('token', res.token);
    }
  }

  return (
    <Modal
      open={open}
      onOk={onOkHandler}
      okText={!isCodeModalOpen ? "Получить код подтверждения" : 'Подтвердить'}
      centered
      onCancel={onCancel}
    >

      {renderModalContent()}

    </Modal>
  );
}
export default AuthModal;
