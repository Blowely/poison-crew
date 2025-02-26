import React from "react";
import { Button, Input, Layout, notification } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../store";
import "./address.scss";
import { useFormik } from "formik";
import {
  useAddAddressMutation,
  useGetAccountQuery,
  useUpdateActiveAddressMutation
} from "../store/accounts.store";
import { setAddress } from "../common/accountSlice";

function Address() {
  const dispatch = useAppDispatch();

  const phone = useAppSelector((state) => state.account.phone);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get("from");
  const token = localStorage.getItem("token");
  const gender = localStorage.getItem("gender");

  const [addAccountAddress, { isLoading: isLoadingAddress, error }] =
    useAddAddressMutation({}, { refetchOnMountOrArgChange: true });
  const {
    data: accountData,
    isLoadingAcc,
    error: accError
  } = useGetAccountQuery(token, { skip: phone });

  const [
    updateActiveAddress,
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

  const onGoBackClick = () => navigate(`/cart`)

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
      <div className="content-block-header border-radius">
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
                "1$nMlzaV3e47EGmeeeJDUgIyPySEMtnJm2",
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
      <div style={{ padding: 15 }}>
        <Button
          type="primary"
          className="cart-product-info-submit-btn"
          style={{ marginTop: 0 }}
          onClick={onOkHandler}
        >
          Добавить адрес
        </Button>
      </div>
      <footer>
        <div onClick={() => navigate("/products")}>
          <img style={{height: '30px'}}
               src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/1.%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F.png"
               alt=""/>
        </div>
        <div onClick={() => navigate(`/${gender}/categories/`)}>
          <img style={{height: '30px'}}
               src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/2.%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3.png"
               alt=""/>
        </div>
        <div onClick={() => navigate("/cart?from=products")}>
          <img style={{height: '30px'}}
               src="https://storage.yandexcloud.net/pc-mediafiles/icons/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0%20%D0%B0%D0%BA%D1%82%D0%B8%D0%B2.png"
               alt=""/>
        </div>
        <div onClick={() => navigate("/favorites")}>
          <img style={{height: '30px'}}
               src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5.png"
               alt=""/>
        </div>
        <div onClick={() => navigate("/profile")}>
          <img style={{height: '30px'}}
               src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C.png"
               alt=""/>
        </div>
      </footer>
    </Layout>
  );
}

export default Address;
