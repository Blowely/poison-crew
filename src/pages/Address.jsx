import React, {useEffect, useState} from "react";
import {Button, Input, Layout, Modal, notification} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useNavigate, useSearchParams} from "react-router-dom";
import {LeftOutlined, LoadingOutlined, RightOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../store";
import BagIcon from "../assets/svg/active-bag-icon";
import "./address.scss";
import {useFormik} from "formik";
import {useAddAddressMutation, useGetAccountQuery} from "../store/accounts.store";
import {addAddress} from "../common/accountSlice";

function Address({onAddToFavorite, onAddToCart, isLoading}) {
  const dispatch = useAppDispatch();

  const phone = useAppSelector((state) => state.account.phone);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get('from');
  const token = localStorage.getItem('token');

  const [addAccountAddress, {isLoading: isLoadingAddress, error}] = useAddAddressMutation({},{refetchOnMountOrArgChange: true});
  const {data: accountData, isLoadingAcc, error: accError} = useGetAccountQuery(token, {skip: phone});

  const remotePhone = accountData?.account?.phone;

  const {values, setValues, setFieldValue, errors, submitForm} = useFormik({
      initialValues: {
        fio: '',
        phone: (phone || remotePhone)?.substring(1) || '',
        city: '',
        address: '',
        postalCode: '',
      },
      onSubmit(body) {
        console.log('account=', accountData?.account);
        console.log('phone=',phone);
        addAccountAddress({token: token, address: body}).then(res => {
          console.log('resAddAddress =', res);
          const address = {...body,id: Date.now(), phone: '7'+ body.phone}
          dispatch(addAddress(address));
          notification.open({duration: 2, type: 'success', message:'Адрес добавлен'})
          navigate('/cart');
        }).catch((err) => {
          console.log('err=', err);
          navigate('/cart');
          notification.open({duration: 2, type: 'error', message:'Ошибка добавления адреса'})
        })
      }
  })

  const onGoBackClick = () => {
    return from ? navigate('/cart?from=address') : navigate(`/cart?from=address`);
  }

  const phoneInputHandler = (value) => {
    if (value.length <= 10) {
      setFieldValue('phone',value)
    }
  }

  const onOkHandler = () => {
    if (Object.values(values).filter(el => el.length).length !== Object.keys(values).length) {
      return notification.open({duration: 1.5, type: 'warning', message:'Заполните все поля'})
    }
    submitForm();
  }

  return (
      <Layout >
          <div className="content-block-header">
            <LeftOutlined onClick={onGoBackClick} />
            Добавление нового адреса <div /></div>
          <div className="content-address-block">

            <div className="address-item">
              <div className="field-name">ФИО получателя</div>
              <Input value={values.fio} onChange={(ev) => setFieldValue('fio',ev.target.value)} />
            </div>
            <div className="address-item">
              <div className="field-name">Номер получателя</div>
              <Input prefix="+7" type="number" value={values.phone} onChange={(ev) => phoneInputHandler(ev.target.value)} />
            </div>
            <div className="address-item">
              <div className="field-name">Город в России</div>
              <Input value={values.city} onChange={(ev) => setFieldValue('city',ev.target.value)} />
            </div>
            <div className="address-item">
              <div className="field-name">Адрес</div>
              <Input value={values.address} onChange={(ev) => setFieldValue('address',ev.target.value)} />
            </div>
            <div className="address-item">
              <div className="field-name">Почтовый индекс</div>
              <Input value={values.postalCode} onChange={(ev) => setFieldValue('postalCode',ev.target.value)} />
            </div>
          </div>
          <div className="cart-product-info-submit-btn-wrapper">
            <Button type="primary" className="cart-product-info-submit-btn"
                    onClick={onOkHandler}>
              Добавить адрес
            </Button>
          </div>
          <footer>
            <div onClick={() => navigate('/products')}><BagIcon/></div>
            <ShoppingCartOutlined style={{ fontSize: '30px'}} onClick={() => navigate('/cart?from=products')}/>
            <UserOutlined style={{ fontSize: '30px'}} onClick={() => navigate('/profile')} />
          </footer>
      </Layout>
  );
}
export default Address;
