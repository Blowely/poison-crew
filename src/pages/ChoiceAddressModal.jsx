import React, {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";
import {
    Button,
    Dropdown,
    Input,
    Modal,
    notification,
    Radio
} from "antd";
import {useNavigate} from "react-router-dom";
import "./choiceAddressModal.scss";
import {
    useAddCodeMutation,
    useUpdateActiveAddressMutation,
    useAddAddressMutation,
    useDeleteAddressMutation, useGetAccountQuery
} from "../store/accounts.store";
import {useAppDispatch} from "../store";
import { setAddress } from "../common/accountSlice";
import DotsIcon from "../assets/svg/components/dots-icon";
import {useFormik} from "formik";
import RussianNameInput from "../components/RussianNameInput/RussianNameInput";
import {CheckCircleOutlined} from "@ant-design/icons";

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

    const [phone, setPhone] = useState("");
    const [nameError, setNameError] = useState("");
    const [isOpenDesktopEnterAddressModal, setOpenDesktopEnterAddressModal] = useState(false);

    const [updateActiveAddress] = useUpdateActiveAddressMutation();
    const [deleteAddress] = useDeleteAddressMutation();
    const [addAccountAddress] =
        useAddAddressMutation({}, { refetchOnMountOrArgChange: true });

    const token = localStorage.getItem("token");

    useEffect(() => {
        refetchAcc();
    }, []);

    const phoneInputHandler = (value) => {
        const cleanedValue = value.replace(/\D/g, '');

        // Проверяем, что длина значения не превышает 10 символов
        if (cleanedValue.length <= 10) {
            setPhone(cleanedValue);
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
                            Войти или создать профиль
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            Незарегистрированные номера будут автоматически зарегистрированы
                        </div>

                        <Input
                            prefix="+7"
                            type="phone"
                            value={phone}
                            placeholder="000 000-00-00"
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

    const {
        data: accountData,
    } = useGetAccountQuery(token, { skip: phone });

    const remotePhone = accountData?.account?.phone;

    const { values: vals, setFieldValue, submitForm } = useFormik({
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
                        refetchAcc()
                    }
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

    const onOkHandlerEnterDesktop = () => {
        if (
            Object.values(vals).filter((el) => el.length).length !==
            Object.keys(vals).length
        ) {
            notification.open({
                duration: 1.5,
                type: "warning",
                message: "Заполните все поля"
            });
            return false;
        }
        submitForm();
        return true;
    };

    const renderEnterAddrModalContent = useCallback(
        () => {
            const phoneInputHandler = (value) => {
                const cleanedValue = value.replace(/\D/g, '');

                // Проверяем, что длина значения не превышает 10 символов
                if (cleanedValue.length <= 10) {
                    setFieldValue("phone", cleanedValue);
                }
            };


            const onChangeBoxBerry = (res) => {
                setFieldValue("address", res.address);
                setFieldValue("workschedule", res.workschedule);
            };

            const onChangeNameHandler = (ev, error) => {
                setNameError(typeof error === "string" ? error : "");
                setFieldValue("fio", ev.target.value)
            }

            return (
                <div
                    style={{
                        display: "grid",
                        padding: "15px",
                        borderBottom: "1px solid #ececec",
                        gap: "15px"
                    }}
                >
                    <div style={{fontSize: "22px", fontWeight: "500"}}>
                        Добавление нового адреса
                    </div>

                    <div className="address-items-wrapper">
                        <div className="address-item">
                            <div className="field-name">ФИО получателя</div>
                            <RussianNameInput
                                value={vals.fio}
                                onChange={onChangeNameHandler}
                            />
                        </div>
                        <div className="address-item">
                            <div className="field-name">Номер получателя</div>
                            <Input
                                prefix="+7"
                                type="phone"
                                value={vals.phone}
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
                            <Input value={vals.address}/>
                        </div>
                    </div>
                    <div>
                        <CheckCircleOutlined/> Я даю свое <a
                        href="https://storage.yandexcloud.net/pc-mediafiles/important/process-personal-data-agreement-re-poizon.ru.pdf"
                        target="_blank">
                        cогласие на обработку персональных данных
                    </a>
                    </div>
                </div>
            );
        },
        [vals, setFieldValue]
    );


    const isDesktopScreen = window?.innerWidth > 768;

    const onOkHandler = async () => {
        console.log('isDesktopScreen', isDesktopScreen)
        if (isDesktopScreen) {
            return setOpenDesktopEnterAddressModal(true)
        }

        navigate("/address");
    };

    const onEnterAddressDesktopModalOkHandler = () => {
        if (nameError) {
            return notification.open({
                duration: 1.5,
                type: "warning",
                message: nameError,
            });
        }

        if (vals?.phone?.length !== 10) {
            console.log(',vals?.phone?.length',vals?.phone?.length);

            return notification.open({duration: 1.5, message: 'Заполните все поля', type: "warning"})
        }

        const validRes = onOkHandlerEnterDesktop();

        if (!validRes) {
            return;
        }

        setOpenDesktopEnterAddressModal(false);
        setChoiceAddressModalOpen(false);
    }

    const onEnterAddressDesktopModalCancelHandler = () => {
        console.log('onEnterAddressDesktopModalCancelHandler')
        setOpenDesktopEnterAddressModal(false);
    }


    return (
        <>
            <Modal
                open={isOpenDesktopEnterAddressModal}
                onOk={onEnterAddressDesktopModalOkHandler}
                title="Добавление нового адреса"
                okText="Добавить адрес доставки"
                onCancel={onEnterAddressDesktopModalCancelHandler}
                centered={!isDesktopScreen}
            >
                {renderEnterAddrModalContent()}
            </Modal>
            <Modal
                open={open && !isOpenDesktopEnterAddressModal}
                onOk={onOkHandler}
                okText="Добавить адрес доставки"
                onCancel={onCancel}
                centered={!isDesktopScreen}
            >
                {renderModalContent()}
            </Modal>

        </>
    );
}
export default ChoiceAddressModal;
