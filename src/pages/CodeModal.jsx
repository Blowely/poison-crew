import React, {useEffect, useState} from "react";
import {Button, Input, Modal} from "antd";
import {useSearchParams} from "react-router-dom";
import "./authModal.scss";
import "./codeModal.scss";
import {LoadingOutlined} from "@ant-design/icons";

const CodeModal = ({phone, open, onCancel}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setModalOpen] = useState(true);
  const [code, setCode] = useState(null);

  const productId = searchParams.get('productId');

  return (
    <Modal
      open={open}
      onOk={() => {}}
      okText={"Получить код подтверждения"}
      centered
      onCancel={onCancel}
    >
      <div style={{display: 'grid', padding: '15px', borderBottom: '1px solid #ececec', gap: '15px'}}>
        <div style={{fontSize: '22px', fontWeight: '500'}}>Введите код подтверждения</div>
        <div style={{fontSize: '15px'}}>Отправлен на +7{phone}</div>


        <Input  placeholder="Пожалуйста введите код" onChange={(ev) => setCode(ev.target.value)} />
      </div>
    </Modal>
  );
}
export default CodeModal;
