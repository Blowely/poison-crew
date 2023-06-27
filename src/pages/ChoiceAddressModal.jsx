import React, {useEffect, useState} from "react";
import {Button, Divider, Dropdown, Input, message, Modal, notification, Radio} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./choiceAddressModal.scss";
import {LoadingOutlined, UserOutlined} from "@ant-design/icons";
import {useLazyGetCodeQuery, useAddCodeMutation, useUpdateActiveAddressMutation} from "../store/accounts.store";
import FormItem from "antd/es/form/FormItem";
import {useAppDispatch} from "../store";
import {addPhone} from "../common/accountSlice";
import DotsIcon from "../assets/svg/components/dots-icon";

const ChoiceAddressModal = ({addresses, open, onCancel, setModalOpen, setRemotePhone, isChoiceAddressModalOpen, setChoiceAddressModalOpen}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState(null);
  const [getCode, {codeData, isLoadingCode} ] = useLazyGetCodeQuery();
  const [sendCode, {isLoading: isLoadingPostCode, error}] = useAddCodeMutation({},{refetchOnMountOrArgChange: true});
  const [updateActiveAddress, {isLoading: isLoadingUpdateActiveAddress, activeAddressError}] = useUpdateActiveAddressMutation();

  const token = localStorage.getItem('token');

  const phoneInputHandler = (value) => {
    if (value.length <= 10) {
      setPhone(value)
    }
  }

  const items = [
    {
      label: 'Редактировать',
      key: '1',
    },
    {
      label: <span style={{color: 'red'}}>Удалить</span>,
      key: '2',
    },
  ];

  const onChangeActiveAddress = (addressId) => {
    try {
      if (!token) {
        return notification.open({duration: 1.5, type: "error", message: 'Неавторизированный запрос'})
      }
      const res = updateActiveAddress({token, addressId});

      if (res?.data?.status === 'ok') {
        notification.open({duration: 1.5, type: "success", message: 'Адрес доставки изменен'})
      }
      setChoiceAddressModalOpen(false);
    } catch (e) {
      notification.open({duration: 1.5, type: "error", message: 'Не удалось сменить адрес'})
    }
  }

  const addressSettingsBtn = () => (<Dropdown menu={{ items }} placement="bottomLeft">
    <Button style={{backgroundColor: 'unset', border: 'none'}}><DotsIcon/></Button>
  </Dropdown>)

  const renderModalContent = () => {
    return <div style={{display: 'grid', padding: '15px', borderBottom: '1px solid #ececec', gap: '15px'}}>
      {!isChoiceAddressModalOpen &&
          <>
            <div style={{fontSize: '22px', fontWeight: '500'}}>Вход по номеру телефона</div>
            <div style={{fontSize: '15px'}}>Незарегистрированные номера будут автоматически зарегетрированы</div>

            <Input prefix="+7" type="number" value={phone} placeholder="Пожалуйста введите ваш номер телефона"
                   onChange={(ev) => phoneInputHandler(ev.target.value)} />

          </>

      }
      {isChoiceAddressModalOpen &&
          <>
            <div style={{fontSize: '22px', fontWeight: '500'}}>Куда доставить заказ?</div>
            <div style={{fontSize: '15px'}}>Выберете адрес, чтобы увидеть условия доставки</div>
            <Radio.Group name="radiogroup" className="address-items-wrapper" defaultValue={1}>
              {addresses?.map((adr, i) => {
                return <div className="address-item-wrapper" key={i}>
                  <Radio value={i} onClick={() => onChangeActiveAddress(adr?._id)}/>
                  <div className="address-item-wrapper-data">{adr?.address} {addressSettingsBtn()} </div>
                </div>
              })}
            </Radio.Group>
          </>
      }
    </div>
  }

  const onOkHandler = async () => {
    navigate('/address');
  }



  return (
      <Modal
          open={open}
          onOk={onOkHandler}
          okText={'Добавить адрес доставки'}
          centered
          onCancel={onCancel}
      >

        {renderModalContent()}

      </Modal>
  );
}
export default ChoiceAddressModal;
