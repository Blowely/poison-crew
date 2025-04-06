import React, {useState} from "react";
import { Button, Input, Layout, notification } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import {CheckCircleOutlined, LeftOutlined} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../store";
import "./address.scss";
import { useFormik } from "formik";
import {
  useAddAddressMutation,
  useGetAccountQuery,
  useUpdateActiveAddressMutation
} from "../store/accounts.store";
import { setAddress } from "../common/accountSlice";
import PhoneFooter from "../components/PhoneFooter/PhoneFooter";
import RussianNameInput from "../components/RussianNameInput/RussianNameInput";

function Address() {
  const dispatch = useAppDispatch();

  const phone = useAppSelector((state) => state.account.phone);
  const navigate = useNavigate();

  const [nameError, setNameError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const token = localStorage.getItem("token");

  const [addAccountAddress, { isLoading: isLoadingAddress, error }] =
    useAddAddressMutation({}, { refetchOnMountOrArgChange: true });
  const {
    data: accountData,
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
    const cleanedValue = value.replace(/\D/g, '');

    // Проверяем, что длина значения не превышает 10 символов
    if (cleanedValue.length <= 10) {
      setFieldValue("phone", cleanedValue);
    }
  };

  const onOkHandler = () => {
    if (nameError) {
      return notification.open({
        duration: 1.5,
        type: "warning",
        message: nameError,
      });
    }

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


  const onChangeNameChange = (ev, error) => {
    // Регулярное выражение для проверки русского ФИО
    setNameError(typeof error === "string" ? error : "");
    setFieldValue("fio", ev.target.value)
  };

  const isDesktopScreen = window?.innerWidth > 768;

  return (
      <Layout>
        <div className="content-block-header border-radius">
          <LeftOutlined onClick={onGoBackClick}/>
          Добавление нового адреса <div style={{width: '19px'}}/>
        </div>
        <div className="content-address-block">
          <div className="address-item">
            <div className="field-name">ФИО получателя</div>
            <RussianNameInput
                value={values.fio}
                onChange={onChangeNameChange}
            />
          </div>
          <div className="address-item">
            <div className="field-name">Номер получателя</div>
            <Input
                prefix="+7"
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
                        "1$84r4cMUZm0PRtVGegwW8Pm3IT5Z9tSs3",
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
            <br/>
            <br/>
            <Input value={values.address}/>
          </div>
        </div>
        <div style={{marginLeft: '15px'}}>
          <CheckCircleOutlined/> Я даю свое <a href="https://storage.yandexcloud.net/pc-mediafiles/important/process-personal-data-agreement-re-poizon.ru.pdf"
             target="_blank">
            cогласие на обработку персональных данных
          </a>
        </div>
        <div style={{padding: 15}}>
          <Button
              type="primary"
              className="cart-product-info-submit-btn"
              style={{marginTop: 0}}
              onClick={onOkHandler}
          >
            Добавить адрес
          </Button>
        </div>
        {!isDesktopScreen &&
            <PhoneFooter tab="cart"/>
        }

      </Layout>
  );
}

export default Address;
