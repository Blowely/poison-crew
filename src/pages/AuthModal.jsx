import React, {useEffect, useState} from "react";
import {Button, Input, Modal} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useSearchParams} from "react-router-dom";
import "./authModal.scss";
import {LoadingOutlined} from "@ant-design/icons";
import { useLazyGetCodeQuery} from "../store/accounts.store";

const AuthModal = ({open, onCancel, setRemotePhone, setCodeModalOpen}) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [phone, setPhone] = useState('');
  const [trigger, {data, isLoading} ] = useLazyGetCodeQuery(phone, {skip: phone.length !== 10});


  return (
    <Modal
      open={open}
      onOk={() => { trigger(); setCodeModalOpen(true); setRemotePhone(phone)}}
      okText={"Получить код подтверждения"}
      centered
      onCancel={onCancel}
    >
      <div style={{display: 'grid', padding: '15px', borderBottom: '1px solid #ececec', gap: '15px'}}>
        <div style={{fontSize: '22px', fontWeight: '500'}}>Вход по номеру телефона</div>
        <div style={{fontSize: '15px'}}>Незарегистрированные номера будут автоматически зарегетрированы</div>

        <Input prefix="+7" placeholder="Пожалуйста введите ваш номер телефона" onChange={(ev) => setPhone(ev.target.value)} />
      </div>
    </Modal>
  );
}
export default AuthModal;
