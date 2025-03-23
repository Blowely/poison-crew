import React, {useEffect, useState} from "react";
import {Empty, Layout} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./cart.scss";
import {
  LeftOutlined,
} from "@ant-design/icons";
import Card from "../components/Card";
import Product from "./Product";
import PhoneFooter from "../components/PhoneFooter/PhoneFooter";

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
                    <PhoneFooter tab="favorites" />
                </footer>
            )}
        </Layout>
    );
}
export default Favorites;
