import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  Button,
  Divider,
  Dropdown,
  Input,
  message,
  Modal,
  notification,
  Radio
} from "antd";
import { useGetProductQuery } from "../store/products.store";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./choiceAddressModal.scss";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import {
  useLazyGetCodeQuery,
  useAddCodeMutation,
  useUpdateActiveAddressMutation,
  useAddAddressMutation,
  useDeleteAddressMutation
} from "../store/accounts.store";
import FormItem from "antd/es/form/FormItem";
import { useAppDispatch, useAppSelector } from "../store";
import { addPhone, setAddress } from "../common/accountSlice";
import DotsIcon from "../assets/svg/components/dots-icon";
import { addressTypes } from "./constants";

function ChoiceAddressModal({
  addresses,
  open,
  onCancel,
  isChoiceAddressModalOpen,
  setChoiceAddressModalOpen,
  refetchAcc,
  activeAddr
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(null);
  const [getCode, { codeData, isLoadingCode }] = useLazyGetCodeQuery();
  const [sendCode, { isLoading: isLoadingPostCode, error }] =
    useAddCodeMutation({}, { refetchOnMountOrArgChange: true });
  const [updateActiveAddress] = useUpdateActiveAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [addAccountAddress, { isLoading: isLoadingAddress, AccError }] =
    useAddAddressMutation({}, { refetchOnMountOrArgChange: true });

  const token = localStorage.getItem("token");

  useEffect(() => {
    refetchAcc();
  }, []);

  const phoneInputHandler = (value) => {
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const currentBtnMenu = useRef(null);

  const onMenuBtnClick = (id) => {
    currentBtnMenu.current = id;
  };

  const deleteRemoteAdr = async () => {
    try {
      if (!currentBtnMenu.current) {
        return;
      }

      if (!token) {
        return notification.open({
          duration: 1.5,
          type: "error",
          message: "Неавторизированный запрос"
        });
      }

      const res = await deleteAddress({
        token,
        addressId: currentBtnMenu.current
      }).unwrap();

      if (res?.status === "ok") {
        notification.open({
          duration: 1.5,
          type: "success",
          message: "Адрес удален"
        });
        refetchAcc();
      }
    } catch (e) {
      return notification.error({ content: "Ошибка удаления" });
    }
  };

  const items = [
    {
      label: <span style={{ color: "red" }}>Удалить</span>,
      key: "1",
      onClick: () => deleteRemoteAdr()
    }
  ];

  const onChangeActiveAddress = async (adr) => {
    try {
      setChoiceAddressModalOpen(false);

      if (!token) {
        return notification.open({
          duration: 1.5,
          type: "error",
          message: "Неавторизированный запрос"
        });
      }

      const res = await updateActiveAddress({
        token,
        addressId: adr?._id
      }).unwrap();

      if (res?.status === "ok") {
        notification.open({
          duration: 1.5,
          type: "success",
          message: "Адрес доставки изменен"
        });
        refetchAcc();
        dispatch(setAddress(adr));
      }
    } catch (e) {
      notification.open({
        duration: 1.5,
        type: "error",
        message: "Не удалось сменить адрес"
      });
    }
  };

  const addressSettingsBtn = (id) => (
    <Dropdown menu={{ items }} placement="bottomLeft">
      <Button
        style={{ backgroundColor: "unset", border: "none" }}
        onClick={() => onMenuBtnClick(id)}
      >
        <DotsIcon />
      </Button>
    </Dropdown>
  );

  const [activeAddressCheckboxIndex, setActiveAddressCheckboxIndex] = useState(
    []
  );

  useEffect(() => {
    const foundIndex = addresses?.findIndex(
      (el) => el?._id === activeAddr?._id
    );
    setActiveAddressCheckboxIndex(foundIndex);
  }, [addresses, activeAddr]);

  const renderModalContent = useCallback(
    () => (
      <div
        style={{
          display: "grid",
          padding: "15px",
          borderBottom: "1px solid #ececec",
          gap: "15px"
        }}
      >
        {!isChoiceAddressModalOpen && (
          <>
            <div style={{ fontSize: "22px", fontWeight: "500" }}>
              Вход по номеру телефона
            </div>
            <div style={{ fontSize: "15px" }}>
              Незарегистрированные номера будут автоматически зарегистрированы
            </div>

            <Input
              prefix="+7"
              type="number"
              value={phone}
              placeholder="Пожалуйста введите ваш номер телефона"
              onChange={(ev) => phoneInputHandler(ev.target.value)}
            />
          </>
        )}
        {isChoiceAddressModalOpen && (
          <>
            <div style={{ fontSize: "22px", fontWeight: "500" }}>
              Куда доставить заказ?
            </div>
            <div style={{ fontSize: "15px" }}>
              Выберете адрес, чтобы увидеть условия доставки
            </div>
            <Radio.Group
              name="radiogroup"
              className="address-items-wrapper"
              value={activeAddressCheckboxIndex}
            >
              {addresses?.map((adr, i) => {
                if (adr.isArchived) {
                  return;
                }

                return (
                  <div className="address-item-wrapper" key={i}>
                    <Radio
                      checked={adr?._id === activeAddr._id}
                      value={i}
                      onClick={() => onChangeActiveAddress(adr)}
                    />
                    <div className="address-item-wrapper-data">
                      {adr?.address} {addressSettingsBtn(adr._id)}{" "}
                    </div>
                  </div>
                );
              })}
            </Radio.Group>
          </>
        )}
      </div>
    ),
    [activeAddressCheckboxIndex, addresses]
  );

  const onChangeBoxBerry = (res) => {
    const body = {
      type: addressTypes.BB_PVZ,
      ...res
    };

    addAccountAddress({ token, address: body })
      .then(async (res) => {
        const address = { ...body, _id: `${Date.now()}` };
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

        setChoiceAddressModalOpen(false);
        refetchAcc();
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
  };

  const onOkHandler = async () => {
    navigate("/address");
    // window?.boxberry?.open(onChangeBoxBerry)
  };

  const isDesktopScreen = window?.innerWidth > 768;

  return (
    <Modal
      open={open}
      onOk={onOkHandler}
      okText="Добавить адрес доставки"
      onCancel={onCancel}
      centered={!isDesktopScreen}
    >
      {renderModalContent()}
    </Modal>
  );
}
export default ChoiceAddressModal;
