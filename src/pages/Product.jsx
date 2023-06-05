import React, {useEffect, useState} from "react";
import {Button, Layout, Modal} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useSearchParams} from "react-router-dom";
import CarouselComponent from "../components/Carousel/Carousel";
import "./product.scss";

function Product({onAddToFavorite, onAddToCart, isLoading}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isModalOpen, setModalOpen] = useState(false);
    const [choice, setChoice] = useState(null);

    const productId = searchParams.get('productId');

    const { data: product, isLoading: isLoadingProduct } = useGetProductQuery(productId);

    return (
        <Layout>
          <Modal
            title="Выберите размер"
            open={isModalOpen}
            onOk={() => {}}
            centered
            onCancel={() => {setModalOpen(false)}}
          >
            <div className="content-size-wrapper">
              {product?.properties?.sizes.map((el, i) => {
                return (
                  <div className={i === choice ? "size-wrapper gap-2 selected" : "size-wrapper gap-2"} onClick={() => setChoice(i)}>
                    <div style={{fontSize: '17px', fontWeight: '600', textAlign: 'center'}}>{el.size}</div>
                    <div style={{fontSize: '13px', textAlign: 'center'}}>₽{el.price}</div>
                  </div>
                )
              })}
            </div>

          </Modal>

          <div style={{width: '100%', height: 'fit-content'}}>

          </div>
          <CarouselComponent images={product?.images} />
          <div style={{backgroundColor: 'white', margin: '10px', padding: '10px'}}>
            <div style={{fontSize: '30px', fontWeight: '600'}}>руб {product?.price}</div>
            <div style={{fontSize: '24px'}}>{product?.title}</div>
          </div>
          <div style={{backgroundColor: 'white', margin: '10px', padding: '10px'}}>
            <div style={{fontSize: '30px', fontWeight: '600'}}>руб {product?.price}</div>
            <div style={{fontSize: '24px'}}>{product?.title}</div>
          </div>
          <div style={{position: "fixed", marginTop: "calc(100vh - 90px)", width: '100%',
            height: '90px', padding: 10, backgroundColor: "white", borderTop: '1px solid #f9f9f9'}} >
            <Button type="primary" style={{width: '100%', height: '100%'}} onClick={() => setModalOpen(true)}>
              Выбрать размер
            </Button>
          </div>
        </Layout>
    );
}
export default Product;
