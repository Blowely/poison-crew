import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthModal from "../../pages/AuthModal";

const PhoneFooter = ({tab}) => {
    const navigate = useNavigate();

    const [openAuth, setOpenAuth] = useState(false);
    const [codeModal, setCodeModal] = useState(false);

    const gender = localStorage.getItem('gender');
    const token = localStorage.getItem('token');

    const onProfileClick = () => {
        if (token) {
            navigate("/profile");
        }

        setOpenAuth(true);
    }

    const iconsData = [
        {
            id: 1,
            tab: 'products',
            onClick: () => navigate(`/${gender}-products`),
            src: "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/1.%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F%20%D0%B0%D0%BA%D1%82%D0%B8%D0%B2.png",
            defaultSrc: "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/1.%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F.png",
            alt: "Главная",
            style: { height: '26px' }
        },
        {
            id: 2,
            tab: 'categories',
            onClick: () => navigate(`/${gender}-categories/`),
            src: "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/2.%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%20%D0%B0%D0%BA%D1%82%D0%B8%D0%B2.png",
            defaultSrc: "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/2.%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3.png",
            alt: "Каталог",
            style: { height: '26px' }
        },
        {
            id: 3,
            tab: 'cart',
            onClick: () => navigate("/cart"),
            src: "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0%20%D0%B0%D0%BA%D1%82%D0%B8%D0%B2.png",
            defaultSrc: "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0.png",
            alt: "Корзина",
            style: { height: '26px' }
        },
        {
            id: 4,
            tab: 'favorites',
            onClick: () => navigate("/favorites"),
            src: "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5%20%D0%B0%D0%BA%D1%82%D0%B8%D0%B2.png",
            defaultSrc: "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5.png",
            alt: "Избранное",
            style: { height: '26px' }
        },
        {
            id: 5,
            tab: 'profile',
            onClick: onProfileClick,
            src: "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C%20%D0%B0%D0%BA%D1%82%D0%B8%D0%B2.png",
            defaultSrc: "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C.png",
            alt: "Профиль",
            style: { height: '26px' }
        }
    ];

    const generateIcons = useCallback(() => {
        return iconsData.map((el) => {
            return (<div onClick={el.onClick} id={el.id} key={el.id}>
                <img style={el.style}
                     src={tab === el.tab ?  el.src : el.defaultSrc}
                     alt={el.alt || ''}/>
            </div>)
        })
    }, [tab])

    return (<footer>
        {!token && openAuth &&
            <AuthModal
                open={openAuth}
                setRemotePhone={() => {}}
                setModalOpen={() => setOpenAuth(true)}
                onCancel={() => {
                    setOpenAuth(false); setCodeModal(false)}}
                isCodeModalOpen={codeModal}
                setCodeModalOpen={setCodeModal}
            />
        }
        {generateIcons()}
    </footer>)
}

export default PhoneFooter;