import React, {useEffect, useState} from "react";
import {Button, Input, Layout, Modal, notification} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useNavigate, useSearchParams} from "react-router-dom";
import {LeftOutlined, LoadingOutlined, RightOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../store";
import BagIcon from "../assets/svg/bag-icon";
import "./address.scss";
import {useFormik} from "formik";
import {useAddAddressMutation, useAddCodeMutation} from "../store/accounts.store";

function Address({onAddToFavorite, onAddToCart, isLoading}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get('from');

  const [addAddress, {isLoading: isLoadingAddress, error}] = useAddAddressMutation({},{refetchOnMountOrArgChange: true});

  const {values, setValues, setFieldValue, errors, submitForm} = useFormik({
      initialValues: {
        fio: '',
        city: '',
        address: '',
        phone: '',
      },
      onSubmit(body) {
        addAddress(body);
        navigate('/cart');
        console.log('body =', body);
      }
  })

  const onGoBackClick = () => {
    return from ? navigate('/cart') : navigate(`/cart`);
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

    notification.open({duration: 1.5, type: 'success', message:'Адрес добавлен'})
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
            <UserOutlined style={{ fontSize: '30px'}} onClick={() => navigate('/products')} />
          </footer>
      </Layout>
  );
}
export default Address;
