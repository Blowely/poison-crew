import React, { useEffect, useState } from "react";
import { Button, Input, Layout, Modal, notification } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import axios from "axios";
import { useGetProductQuery } from "../store/products.store";
import { useAppDispatch, useAppSelector } from "../store";
import BagIcon from "../assets/svg/active-bag-icon";
import "./address.scss";
import { useFormik } from "formik";
import {
  useAddAddressMutation,
  useGetAccountQuery,
  useUpdateActiveAddressMutation
} from "../store/accounts.store";
import { addAddress, setAddress } from "../common/accountSlice";
import NonActiveBagIcon from "../assets/svg/non-active-bag-icon";
import NonActiveCartIcon from "../assets/svg/non-active-cart-icon";
import ActiveProfileIcon from "../assets/svg/active-profile-icon";

function Address({ onAddToFavorite, onAddToCart, isLoading }) {
  const dispatch = useAppDispatch();

  const phone = useAppSelector((state) => state.account.phone);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get("from");
  const token = localStorage.getItem("token");

  const [addAccountAddress, { isLoading: isLoadingAddress, error }] =
    useAddAddressMutation({}, { refetchOnMountOrArgChange: true });
  const {
    data: accountData,
    isLoadingAcc,
    error: accError
  } = useGetAccountQuery(token, { skip: phone });

  const [
    updateActiveAddress,
    { isLoading: isLoadingUpdateActiveAddress, activeAddressError }
  ] = useUpdateActiveAddressMutation();

  const remotePhone = accountData?.account?.phone;

  const { values, setValues, setFieldValue, errors, submitForm } = useFormik({
    initialValues: {
      fio: "",
      phone: (phone || remotePhone)?.substring(1) || "",
      address: "",
      workschedule: "",
      type: "BB_PVZ"
    },
    onSubmit(body) {
      addAccountAddress({ token, address: body })
        .then(async (res) => {
          const address = {
            ...body,
            _id: `${Date.now()}`,
            phone: `7${body.phone}`
          };
          dispatch(setAddress(address));
          const activeAddrRes = await updateActiveAddress({
            token,
            addressId: res?.data?.addressId
          }).unwrap();

          if (activeAddrRes) {
            notification.open({
              duration: 2,
              type: "success",
              message: "Адрес добавлен"
            });
          }
          navigate("/cart");
        })
        .catch((err) => {
          console.log("err=", err);
          navigate("/cart");
          notification.open({
            duration: 2,
            type: "error",
            message: "Ошибка добавления адреса"
          });
        });
    }
  });

  const onGoBackClick = () =>
    from ? navigate("/cart?from=address") : navigate(`/cart?from=address`);

  const phoneInputHandler = (value) => {
    if (value.length <= 10) {
      setFieldValue("phone", value);
    }
  };

  const onOkHandler = () => {
    if (
      Object.values(values).filter((el) => el.length).length !==
      Object.keys(values).length
    ) {
      return notification.open({
        duration: 1.5,
        type: "warning",
        message: "Заполните все поля"
      });
    }
    submitForm();
  };

  const onChangeBoxBerry = (res) => {
    setFieldValue("address", res.address);
    setFieldValue("workschedule", res.workschedule);
  };

  return (
    <Layout>
      <div className="content-block-header">
        <LeftOutlined onClick={onGoBackClick} />
        Добавление нового адреса <div />
      </div>
      <div className="content-address-block">
        <div className="address-item">
          <div className="field-name">ФИО получателя</div>
          <Input
            value={values.fio}
            onChange={(ev) => setFieldValue("fio", ev.target.value)}
          />
        </div>
        <div className="address-item">
          <div className="field-name">Номер получателя</div>
          <Input
            prefix="+7"
            type="number"
            value={values.phone}
            onChange={(ev) => phoneInputHandler(ev.target.value)}
          />
        </div>

        <div className="address-item">
          <div className="field-name">Адрес</div>
          <a
            href="#"
            onClick={() =>
              window?.boxberry?.open(
                onChangeBoxBerry,
                "333d8a0ba433f89a5b8b7f313b654f9c",
                "Москва",
                "",
                1000,
                500,
                0,
                50,
                50,
                50
              )
            }
          >
            Выбрать пункт выдачи на карте
          </a>
          <br />
          <br />
          <Input value={values.address} />
        </div>
      </div>
      <div className="cart-product-info-submit-btn-wrapper">
        <Button
          type="primary"
          className="cart-product-info-submit-btn"
          onClick={onOkHandler}
        >
          Добавить адрес
        </Button>
      </div>
      <footer>
        <div onClick={() => navigate("/products")} role="presentation">
          <NonActiveBagIcon />
        </div>
        <div
          onClick={() => navigate("/cart?from=products")}
          role="presentation"
        >
          <NonActiveCartIcon style={{ fontSize: "30px" }} />
        </div>
        <div onClick={() => navigate("/profile")} role="presentation">
          <ActiveProfileIcon style={{ fontSize: "30px" }} />
        </div>
      </footer>
    </Layout>
  );
}
export default Address;
