import React, {useEffect, useState} from "react";
import {Empty, Layout} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./cart.scss";
import {
  LeftOutlined,
} from "@ant-design/icons";
import Card from "../components/Card";
import Product from "./Product";

const Favorites = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const gender = localStorage.getItem("gender") || "men";
    const spuId = searchParams.get("spuId");

    const isDesktopScreen = window?.innerWidth > 768;

    useEffect(() => {
        window.scrollTo({top: 0})
    }, [])

    const onGoBackClick = () => {
        window.history.go(-1);
    }

    const renderItems = () => {
        let productsItems = JSON.parse(localStorage.getItem('favorites')) || [];

        if (!productsItems?.length) {
            return (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{ height: 100, paddingTop: "20px", width: '100%' }}
                    description="Ничего не найдено"
                    className="empty"
                />
            );
        }

        const onCardClickHandler = (item) => {
            const spuId = item?.spuId || '';
            searchParams.set('spuId', spuId);
            setSearchParams(searchParams);
            localStorage.setItem('product', JSON.stringify(item));
        }

        return (
            <div className="cards-section-wrapper">
                {productsItems?.filter((product) => !product?.isDeleted)?.map((item, index) => {
                    const image = item?.images[0] || '';
                    const title = item?.name || '';
                    const price = item?.price || '';

                    return(
                        <div onClick={() => onCardClickHandler(item)} key={index}>
                            <Card
                                image={image}
                                price={price}
                                item={item}
                                name={title}
                                isFavorite={true}
                                onCardClickHandler={onCardClickHandler}
                            />
                        </div>
                    )})}
            </div>
        );
    };

    return (
        <Layout style={{
                    backgroundColor: "white",
                    position: "relative",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
                className="columnLayout">
            {spuId && <div className="productWrapper" id="productWrapper">
                <Product />
            </div>
            }
            <div className="content-block-header border-radius">
                <LeftOutlined onClick={onGoBackClick}/>
                Избранное
                <div style={{width: '19px'}}/>
            </div>
            <div className="content-block centered-content-block" style={{paddingLeft: '0', paddingRight: '0'}} >
                {renderItems()}
            </div>
            {!isDesktopScreen && (
                <footer>
                    <div onClick={() => navigate("/products")}>
                        <img style={{height: '26px'}}
                             src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/1.%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F.png"
                             alt=""/>
                    </div>
                    <div onClick={() => navigate(`/${gender}-categories/`)}>
                        <img style={{height: '26px'}}
                             src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/2.%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3.png"
                             alt=""/>
                    </div>
                    <div onClick={() => navigate("/cart")}>
                        <img style={{height: '26px'}}
                             src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0.png"
                             alt=""/>
                    </div>
                    <div onClick={() => navigate("/favorites")}>
                        <img style={{height: '26px'}}
                             src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5%20%D0%B0%D0%BA%D1%82%D0%B8%D0%B2.png"
                             alt=""/>
                    </div>
                    <div onClick={() => navigate("/profile")}>
                        <img style={{height: '26px'}}
                             src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C.png"
                             alt=""/>
                    </div>
                </footer>
            )}
        </Layout>
    );
}
export default Favorites;
