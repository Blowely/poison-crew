import React from "react";
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
    const productId = searchParams.get('pId');
    const { data: ad, isLoadingProduct, refetch } = useGetProductQuery(productId);


    return (
        <Layout >
            FJDSJFLSKDJFfdgblfglb;k

            <img src={ad?.images[0]} alt=""/>
        </Layout>
    );
}
export default Product;
