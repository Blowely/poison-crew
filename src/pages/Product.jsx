import React, {useEffect} from "react";
import {Button, Layout} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useSearchParams} from "react-router-dom";
import CarouselComponent from "../components/Carousel/Carousel";

function Product({onAddToFavorite, onAddToCart, isLoading}) {

    const [searchParams, setSearchParams] = useSearchParams();
    const productId = searchParams.get('productId');
    console.log('productId= ', productId);

    const { data: ad, isLoading: isLoadingProduct } = useGetProductQuery(productId);

    return (
        <Layout>
          <div style={{width: '100%', height: 'fit-content'}}>

          </div>
          <CarouselComponent images={ad?.images} />
          <div style={{backgroundColor: 'white', margin: '10px', padding: '10px'}}>
            <div style={{fontSize: '30px', fontWeight: '600'}}>руб {ad?.price}</div>
            <div style={{fontSize: '24px'}}>{ad?.title}</div>
          </div>
          <div style={{backgroundColor: 'white', margin: '10px', padding: '10px'}}>
            <div style={{fontSize: '30px', fontWeight: '600'}}>руб {ad?.price}</div>
            <div style={{fontSize: '24px'}}>{ad?.title}</div>
          </div>
          <div style={{position: "fixed", marginTop: "calc(100vh - 90px)", width: '100%',
            height: '90px', padding: 10, backgroundColor: "white", borderTop: '1px solid #f9f9f9'}} >
            <Button style={{width: '100%', height: '100%'}}>Выбрать размер</Button>
          </div>
        </Layout>
    );
}
export default Product;
