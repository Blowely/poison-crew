import React, {useEffect} from "react";
import {Layout} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useSearchParams} from "react-router-dom";


function Product({
                  item,
                  onAddToFavorite,
                  onAddToCart,
                  isLoading,
              }) {

    const [searchParams, setSearchParams] = useSearchParams();
    const productId = searchParams.get('productId');
    console.log('productId= ', productId);

    const { data: ad, isLoading: isLoadingProduct } = useGetProductQuery(productId);

    return (
        <Layout>

          <img src={ad?.images[0]} alt=""/>
          <div style={{backgroundColor: 'white', margin: '10px', padding: '10px'}}>
            <div style={{fontSize: '30px', fontWeight: '600'}}>руб {ad?.price}</div>
            <div style={{fontSize: '24px'}}>{ad?.title}</div>
          </div>
          <div style={{position: "fixed", marginTop: "calc(100vh - 90px)", width: '100%',
            height: '90px', backgroundColor: "white", borderTop: '1px solid #f9f9f9'}} >

          </div>
        </Layout>
    );
}
export default Product;
