import React, {useEffect, useState} from "react";
import {Button, Empty, Layout, Result} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./cart.scss";
import {
    DeleteOutlined,
    LeftOutlined, RightOutlined,
} from "@ant-design/icons";
import Card from "../components/Card";
import Product from "./Product";
import PhoneFooter from "../components/PhoneFooter/PhoneFooter";
import MainLogoComponent from "../components/MainLogoComponent/MainLogoComponent";
import DeliverBlock from "../components/Delivery/DeliveryBlock";
import PromoCode from "../components/PromoCode/PromoCode";
import HeaderInfoWrapper from "../components/HeaderInfoWrapper/HeaderInfoWrapper";

const Favorites = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedProduct, setSelectedProduct] = useState({});
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
            setSelectedProduct(item);
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
                <Product selectedProduct={selectedProduct} />
            </div>
            }
            {isDesktopScreen
                ? <HeaderInfoWrapper />
                : <div className="content-block-header border-radius">
                    <LeftOutlined onClick={onGoBackClick}/>
                    Избранное
                    <div style={{width: '19px'}}/>
                </div>
            }

            {isDesktopScreen &&
                <div className="content-block-wrapper">
                    <div className="content-block" style={{padding: isDesktopScreen && '30px 0px 0px 0px'}}>
                        <div className="category-title" onClick={onGoBackClick}><LeftOutlined/>Избранное</div>
                        {renderItems()}
                    </div>
                </div>
            }

            {!isDesktopScreen &&
                <div className="content-block centered-content-block" style={{paddingLeft: '0', paddingRight: '0'}}>
                    {renderItems()}
                </div>
            }

            {!isDesktopScreen && (
                <PhoneFooter tab="favorites"/>
            )}
        </Layout>
    );
}
export default Favorites;
