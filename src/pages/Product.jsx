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
        <Layout >
            FJDSJFLSKDJFfdgblfglb;k

            <img src={ad?.images[0]} alt=""/>
        </Layout>
    );
}
export default Product;
