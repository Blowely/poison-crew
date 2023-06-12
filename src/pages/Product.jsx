import React, {useEffect, useState} from "react";
import {Button, Layout, Modal} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useNavigate, useSearchParams} from "react-router-dom";
import CarouselComponent from "../components/Carousel/Carousel";
import "./product.scss";
import {LeftOutlined, LoadingOutlined} from "@ant-design/icons";
import AuthModal from "./AuthModal";
import {useAppDispatch} from "../store";
import {addToCart} from "../common/cartSlice";

function Product({onAddToFavorite, isLoading}) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isCodeModalOpen, setCodeModalOpen] = useState(false);
    const [choice, setChoice] = useState({});
    const [phone, setPhone] = useState('');

    const token = localStorage.getItem('token');

    const productId = searchParams.get('productId');

    const { data: product, isLoading: isLoadingProduct } = useGetProductQuery({productId, token});
    const onAddToCart = () => {
        dispatch(addToCart({...product, size: choice.size, price: choice.price}));
        navigate('/cart');
    }

    return (
        <Layout style={{position: 'relative'}}>
          {!token &&
            <AuthModal
                open={isModalOpen}
                setRemotePhone={setPhone}
                setModalOpen={setModalOpen}
                onCancel={() => {setModalOpen(false); setCodeModalOpen(false)}}
                isCodeModalOpen={isCodeModalOpen}
                setCodeModalOpen={setCodeModalOpen}
            />
          }
          {token &&
            <Modal
              title="Выберите размер"
              open={isModalOpen}
              onOk={onAddToCart}
              okText={"₽" + choice.price}
              centered
              onCancel={() => {setModalOpen(false)}}
            >
              <div style={{display: "flex",padding: '15px', borderBottom: '1px solid #ececec', gap: '20px'}}>
                <img src={product?.images[0]} style={{width: '20%'}} alt=""/>
                <div style={{display: "flex", flexDirection: 'column', justifyContent: 'space-between'}}>
                  <div style={{fontSize: '22px', fontWeight: '700'}}>₽{choice.price}</div>
                  <div style={{fontSize: '15px'}}>Размер: {choice.size}</div>
                </div>

              </div>
              <div style={{display: 'flex', padding: '15px',paddingRight: '25px', justifyContent: 'space-between'}}>
                <span>Таблица размеров</span>
                >
              </div>
              <div className="content-size-wrapper">
                {product?.properties?.sizes.map((el, i) => {
                  return (
                    <div className={i === choice.index ? "size-wrapper gap-2 selected" : "size-wrapper gap-2"}
                         onClick={() => setChoice({ size: el.size, price: el.price, index: i})} key={i}>
                      <div style={{fontSize: '17px', fontWeight: '600', textAlign: 'center'}}>{el.size}</div>
                        <div style={{fontSize: '13px', textAlign: 'center'}}>₽{el.price}</div>
                    </div>
                  )
                })}
              </div>

            </Modal>
          }
          {isLoadingProduct &&
            <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
              <LoadingOutlined style={{fontSize: '24px'}} spin />
            </div>
          }
          {!isLoadingProduct &&
            <>
                <LeftOutlined
                    style={{zIndex: '99', position: 'absolute', padding: '15px', marginTop: '10px', fontSize: '25px'}}
                    onClick={() => navigate('/products')}
                />
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
                    <Button type="primary" style={{width: '100%', height: '100%', fontSize: '20px', fontWeight: '400'}} onClick={() => setModalOpen(true)}>
                      Выбрать размер
                    </Button>
                </div>
            </>
          }
        </Layout>
    );
}
export default Product;
