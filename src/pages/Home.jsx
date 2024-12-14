import React, {
  Suspense,
  useEffect,
  useRef,
  useState
} from "react";
import Card from "../components/Card";
import AdidasIcon from "../assets/svg/brands/adidas-icon";
import NikeIcon from "../assets/svg/brands/nike-icon";
import CoachIcon from "../assets/svg/brands/coach-icon";
import MoreIcon from "../assets/svg/brands/more-icon";
import { Button, Empty, Layout, Pagination } from "antd";
import Header from "../components/Header/Header";
import { useGetProductsQuery } from "../store/products.store";
import "../index.scss";
import ActiveBagIcon from "../assets/svg/active-bag-icon.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePrevious } from "../hooks/usePrevios";
import { useAppDispatch, useAppSelector } from "../store";
import { addProducts } from "../common/productsSlice";
import NonActiveCartIcon from "../assets/svg/non-active-cart-icon";
import NonActiveProfileIcon from "../assets/svg/non-active-profile-icon";
import RePoizonMainLogo from "../assets/svg/re-poizon-main-logo";
import RePoizonMainMiddleLogo from "../assets/svg/re-poizon-main-middle-logo";
import "../components/InitAnimation/InitAnimation.styles.scss";
import { startLoaderAnimation } from "../components/InitAnimation/InitAnimation";
import Product from "./Product";
import Filters from "../components/Filters";
import NewBalanceIcon from "../assets/svg/brands/mlb-icon";
import Categories from "../components/Categories/Categories";

function Home({ onAddToFavorite, onAddToCart }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const productsSlice = useAppSelector((state) => state.products);

  const sizeParam = searchParams.get("size");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");

  const [limit] = useState(60);
  const [offset, setOffset] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState(minPriceParam || '');
  const [maxPrice, setMaxPrice] = useState(maxPriceParam || '');
  const [size, setSize] = useState(sizeParam || '');
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [loading, setLoading] = useState(false);

  const search = searchParams.get("search");
  const brandId = searchParams.get("brandId");
  const categoryId = searchParams.get("categoryId");
  const collection = searchParams.get("collName") || "";
  const type = searchParams.get("type");
  const url = searchParams.get("url");
  const spuId = searchParams.get("spuId");
  const filtersRef = useRef(null);


  const isDesktopScreen = window?.innerWidth > 768;

  useEffect(() => {
    startLoaderAnimation();
  }, []);

  const buildRequest = () => {

    let obj = {
      limit: 20,
      search: search?.toLowerCase(),
    };

    if (brandId) {
      obj.brandId = brandId;
    }

    if (selectedBrands?.length) {
      obj.brandIds = selectedBrands.map(({id}) => id).join(',');
    }

    if (categoryId) {
      obj.categoryId = categoryId;
    }

    if (collection) {
      obj.collName = collection;
    }

    if (offset) {
      obj.page = offset;
    }

    if (minPriceParam) {
      obj.minPrice = minPriceParam;
    }

    if (maxPriceParam) {
      obj.maxPrice = maxPriceParam;
    }

    if (sizeParam) {
      obj.size = sizeParam;
    }

    return obj;
  };

  const {
    data: products = { items: [], totalCount: 0 },
    isLoading,
    refetch,
  } = useGetProductsQuery(buildRequest());

  const searchOrCollection = `${categoryId}+${brandId}+${search}+${sizeParam}`+
    `+${minPriceParam}+${maxPriceParam}${selectedBrands.map(({id}) => `+${id}`)}` || collection;
  const prevCollectionValue = usePrevious(searchOrCollection);
  const trimCollectionValue = searchOrCollection?.replace(/ /g, "");

  useEffect(() => {
    setLoading(false);

    if (productsSlice[trimCollectionValue]?.length) {
      if (prevCollectionValue !== searchOrCollection) {
        dispatch(
          addProducts({
            [trimCollectionValue]: products?.items,
          }),
        );
      } else {
        dispatch(
          addProducts({
            [trimCollectionValue]: [
              ...productsSlice[trimCollectionValue],
              ...products?.items,
            ],
          }),
        );
      }
    } else if (products?.items?.length) {
      try {
        dispatch(
          addProducts({
            [trimCollectionValue]: products?.items,
          }),
        );
      } catch (e) {
        console.log("e =", e);
      }
    }
  }, [products]);

  const renderItems = () => {
    /*let productsItems = isLoading
      ? [...Array(60)]
      : productsSlice[trimCollectionValue] || []*/

    let productsItems = [
      {
        "_id": "66e9b20f5061b0c9599ca5e0",
        "spuId": 61873001,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 61873001,
              "globalSpuId": 10003436251,
              "categoryId": 33,
              "level1CategoryId": 29,
              "level2CategoryId": 30,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20220923/d5171fa9d583498686928f6416f22648.jpg",
              "title": "Nike Zoom Winflo 9 舒適 織物減震耐磨透氣 低幫 休閒跑步鞋 男款 黑色",
              "subTitle": "Nike Zoom Winflo 9 舒適 織物減震耐磨透氣 低幫 休閒跑步鞋 男款 黑色",
              "authPrice": 116,
              "sellDate": "2022.11",
              "sourceName": "default",
              "articleNumber": "DM1106-007",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 2,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220923/d5171fa9d583498686928f6416f22648.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220923/c8fd2e5dbfe4426d86ae2f38a7147f3a.jpg",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220923/240793ff839842d493a0874a74a855a1.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220923/d3aba614431c4a29aa25bf14c7d4204a.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220923/f76483b5be90408abd9363b049486dbd.jpg",
                  "imgType": 0,
                  "sort": 5,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220923/72b5b8b3a9294d8ab37a75d3ddbc3130.jpg",
                  "imgType": 0,
                  "sort": 6,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "DM1106-007",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "配色",
                  "value": "黑色",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 245915054,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 243286939,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 243286940,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 243286941,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 243286942,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 243286943,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 243286944,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 243286945,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 243286946,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 243286947,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 14,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 243286948,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 15,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "45.5",
                  "propertyValueId": 441792605,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 16,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 246023227,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 17,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "47",
                  "propertyValueId": 362205932,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 18,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "47.5",
                  "propertyValueId": 249279204,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 19,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "48.5",
                  "propertyValueId": 362205926,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 21,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 4700,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 889648118,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243286939
                  }
                ]
              },
              {
                "skuId": 889648119,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243286940
                  }
                ]
              },
              {
                "skuId": 889648120,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243286948
                  }
                ]
              },
              {
                "skuId": 889648121,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243286945
                  }
                ]
              },
              {
                "skuId": 889648122,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243286946
                  }
                ]
              },
              {
                "skuId": 889648123,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243286944
                  }
                ]
              },
              {
                "skuId": 889648124,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243286947
                  }
                ]
              },
              {
                "skuId": 889648125,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243286943
                  }
                ]
              },
              {
                "skuId": 889648126,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243286942
                  }
                ]
              },
              {
                "skuId": 889648127,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243286941
                  }
                ]
              },
              {
                "skuId": 890930113,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 245915054
                  }
                ]
              },
              {
                "skuId": 891003436,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 246023227
                  }
                ]
              },
              {
                "skuId": 892581714,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 249279204
                  }
                ]
              },
              {
                "skuId": 942546476,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 362205926
                  }
                ]
              },
              {
                "skuId": 942546482,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 362205932
                  }
                ]
              },
              {
                "skuId": 978290697,
                "spuId": 61873001,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 441792605
                  }
                ]
              }
            ],
            "styleMode": 1,
            "favoriteList": [
              {
                "skuId": 889648118,
                "isAdded": 0
              },
              {
                "skuId": 889648119,
                "isAdded": 0
              },
              {
                "skuId": 889648120,
                "isAdded": 0
              },
              {
                "skuId": 889648121,
                "isAdded": 0
              },
              {
                "skuId": 889648122,
                "isAdded": 0
              },
              {
                "skuId": 889648123,
                "isAdded": 0
              },
              {
                "skuId": 889648124,
                "isAdded": 0
              },
              {
                "skuId": 889648125,
                "isAdded": 0
              },
              {
                "skuId": 889648126,
                "isAdded": 0
              },
              {
                "skuId": 889648127,
                "isAdded": 0
              },
              {
                "skuId": 890930113,
                "isAdded": 0
              },
              {
                "skuId": 891003436,
                "isAdded": 0
              },
              {
                "skuId": 892581714,
                "isAdded": 0
              },
              {
                "skuId": 942546476,
                "isAdded": 0
              },
              {
                "skuId": 942546482,
                "isAdded": 0
              },
              {
                "skuId": 978290697,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171822個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "61873001",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "f9f3ed0001191527c5541e68ff1f6eb5"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.160, 91.236.247.160",
            "x-forwarded-for": "91.236.247.160, 91.236.247.160",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T16:45:03.497Z",
        "updatedAt": "2024-09-18T22:06:29.395Z",
        "__v": 0
      },
      {
        "_id": "66e9dcf95061b0c9599ca5ef",
        "spuId": 68292081,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 68292081,
              "globalSpuId": 10004820857,
              "categoryId": 1001189,
              "level1CategoryId": 29,
              "level2CategoryId": 35,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20231012/89b1c5bf130744399734b76824bacd8f.jpg",
              "title": "Nike Phoenix Waffle 運動百搭 耐磨透氣 低幫 生活休閒鞋 女款 黑紫",
              "subTitle": "Nike Phoenix Waffle 運動百搭 耐磨透氣 低幫 生活休閒鞋 女款 黑紫",
              "authPrice": 152,
              "sellDate": "2023夏季",
              "sourceName": "default",
              "articleNumber": "FJ1409-001",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 3,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20231012/89b1c5bf130744399734b76824bacd8f.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20231012/a548fde79d8043118d31c6b5659e345d.jpg",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20231012/2e319d07cf664b528e5df5ff598e2f51.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20231012/c57eae336b5e43fa854506c4323884d1.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20231012/ac4156409759423f8ecd178cfc839538.jpg",
                  "imgType": 0,
                  "sort": 5,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20231012/4c9503bca1a849f58c9deef8fa959fec.jpg",
                  "imgType": 0,
                  "sort": 6,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "FJ1409-001",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "發售日期",
                  "value": "2023夏季",
                  "defaultShow": 1
                },
                {
                  "key": "配色",
                  "value": "黑紫",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "35.5",
                  "propertyValueId": 986416639,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 0,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "36",
                  "propertyValueId": 986416594,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "36.5",
                  "propertyValueId": 986416602,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "37.5",
                  "propertyValueId": 986416593,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "38",
                  "propertyValueId": 986416670,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 986416633,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 343896811,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 343896812,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 343896813,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 343896814,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 343896815,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 343896816,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 343896817,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 343896818,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 343896819,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 14,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 343896820,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 15,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 343896821,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 16,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "47.5",
                  "propertyValueId": 343896822,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 17,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "48.5",
                  "propertyValueId": 343896823,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 18,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 3500,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 934369384,
                "spuId": 68292081,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343896811
                  }
                ]
              },
              {
                "skuId": 934369385,
                "spuId": 68292081,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343896812
                  }
                ]
              },
              {
                "skuId": 934369389,
                "spuId": 68292081,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343896816
                  }
                ]
              },
              {
                "skuId": 934369390,
                "spuId": 68292081,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343896813
                  }
                ]
              },
              {
                "skuId": 934369391,
                "spuId": 68292081,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343896818
                  }
                ]
              },
              {
                "skuId": 934369392,
                "spuId": 68292081,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343896815
                  }
                ]
              },
              {
                "skuId": 934369393,
                "spuId": 68292081,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343896819
                  }
                ]
              },
              {
                "skuId": 934369394,
                "spuId": 68292081,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343896814
                  }
                ]
              },
              {
                "skuId": 934369395,
                "spuId": 68292081,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343896817
                  }
                ]
              },
              {
                "skuId": 1500742521,
                "spuId": 68292081,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 986416593
                  }
                ]
              },
              {
                "skuId": 1500742522,
                "spuId": 68292081,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 986416594
                  }
                ]
              },
              {
                "skuId": 1500742530,
                "spuId": 68292081,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 986416602
                  }
                ]
              },
              {
                "skuId": 1500742563,
                "spuId": 68292081,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 986416633
                  }
                ]
              },
              {
                "skuId": 1500742569,
                "spuId": 68292081,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 986416639
                  }
                ]
              },
              {
                "skuId": 1500742602,
                "spuId": 68292081,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 986416670
                  }
                ]
              }
            ],
            "styleMode": 1,
            "favoriteList": [
              {
                "skuId": 934369384,
                "isAdded": 0
              },
              {
                "skuId": 934369385,
                "isAdded": 0
              },
              {
                "skuId": 934369389,
                "isAdded": 0
              },
              {
                "skuId": 934369390,
                "isAdded": 0
              },
              {
                "skuId": 934369391,
                "isAdded": 0
              },
              {
                "skuId": 934369392,
                "isAdded": 0
              },
              {
                "skuId": 934369393,
                "isAdded": 0
              },
              {
                "skuId": 934369394,
                "isAdded": 0
              },
              {
                "skuId": 934369395,
                "isAdded": 0
              },
              {
                "skuId": 1500742521,
                "isAdded": 0
              },
              {
                "skuId": 1500742522,
                "isAdded": 0
              },
              {
                "skuId": 1500742530,
                "isAdded": 0
              },
              {
                "skuId": 1500742563,
                "isAdded": 0
              },
              {
                "skuId": 1500742569,
                "isAdded": 0
              },
              {
                "skuId": 1500742602,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171213個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "68292081",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "b6dbdab6298f717609894f7eb370ffa0"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T19:48:09.970Z",
        "updatedAt": "2024-09-17T21:07:09.370Z",
        "__v": 0
      },
      {
        "_id": "66e9de9a5061b0c9599ca5f4",
        "spuId": 588292525,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 588292525,
              "globalSpuId": 12002181192,
              "categoryId": 33,
              "level1CategoryId": 29,
              "level2CategoryId": 30,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20240503/20dfb6bc2af343148af90a8b5874fb87.png",
              "title": "Nike Cortez 輕盈防滑耐磨輕便 低幫 訓練跑步鞋 男款 白綠",
              "subTitle": "Nike Cortez 輕盈防滑耐磨輕便 低幫 訓練跑步鞋 男款 白綠",
              "authPrice": 98,
              "sellDate": "2023秋冬",
              "sourceName": "default",
              "articleNumber": "DM4044-104",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 2,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240503/20dfb6bc2af343148af90a8b5874fb87.png",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240503/46b0d10be75e470487d37507a2ed5bec.png",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240503/a9f4cab43ba046b99b8a9c57af4ebd45.png",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240503/b8fb465db50744fdbdebeb0ed2611743.png",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240503/3d8eb2bf982a431a973e5fdc87524353.png",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240503/32762356ae2d45bf810dc586a5303626.png",
                  "sort": 10000
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "DM4044-104",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "發售日期",
                  "value": "2023秋冬",
                  "defaultShow": 1
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 1205325151,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 0,
                  "definitionId": 6
                },
                {
                  "propertyId": 4366,
                  "name": "顏色",
                  "value": "帆白/球場綠",
                  "propertyValueId": 1205325148,
                  "level": 1,
                  "customValue": "帆白/球場綠",
                  "showValue": 0,
                  "sort": 1,
                  "definitionId": 1
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 1205325154,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 1205325157,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 1205325160,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 1205325163,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 1205325166,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 1205325169,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 1205325171,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 1205325175,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 1205325178,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 1205325180,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 1254955841,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "45.5",
                  "propertyValueId": 1762672801,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "48.5",
                  "propertyValueId": 1858340660,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 4500,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 1630457546,
                "spuId": 588292525,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1205325148
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1205325154
                  }
                ]
              },
              {
                "skuId": 1630457547,
                "spuId": 588292525,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1205325148
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1205325151
                  }
                ]
              },
              {
                "skuId": 1630457548,
                "spuId": 588292525,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1205325148
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1205325160
                  }
                ]
              },
              {
                "skuId": 1630457549,
                "spuId": 588292525,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1205325148
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1205325157
                  }
                ]
              },
              {
                "skuId": 1630457550,
                "spuId": 588292525,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1205325148
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1205325169
                  }
                ]
              },
              {
                "skuId": 1630457551,
                "spuId": 588292525,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1205325148
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1205325166
                  }
                ]
              },
              {
                "skuId": 1630457552,
                "spuId": 588292525,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1205325148
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1205325163
                  }
                ]
              },
              {
                "skuId": 1630457553,
                "spuId": 588292525,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1205325148
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1205325171
                  }
                ]
              },
              {
                "skuId": 1630457554,
                "spuId": 588292525,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1205325148
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1205325178
                  }
                ]
              },
              {
                "skuId": 1630457555,
                "spuId": 588292525,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1205325148
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1205325175
                  }
                ]
              },
              {
                "skuId": 1630457556,
                "spuId": 588292525,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1205325148
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1205325180
                  }
                ]
              },
              {
                "skuId": 1666795514,
                "spuId": 588292525,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1205325148
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1254955841
                  }
                ]
              },
              {
                "skuId": 2036040433,
                "spuId": 588292525,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1205325148
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1762672801
                  }
                ]
              },
              {
                "skuId": 2128420358,
                "spuId": 588292525,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1205325148
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1858340660
                  }
                ]
              }
            ],
            "styleMode": 2,
            "favoriteList": [
              {
                "skuId": 1630457546,
                "isAdded": 0
              },
              {
                "skuId": 1630457547,
                "isAdded": 0
              },
              {
                "skuId": 1630457548,
                "isAdded": 0
              },
              {
                "skuId": 1630457549,
                "isAdded": 0
              },
              {
                "skuId": 1630457550,
                "isAdded": 0
              },
              {
                "skuId": 1630457551,
                "isAdded": 0
              },
              {
                "skuId": 1630457552,
                "isAdded": 0
              },
              {
                "skuId": 1630457553,
                "isAdded": 0
              },
              {
                "skuId": 1630457554,
                "isAdded": 0
              },
              {
                "skuId": 1630457555,
                "isAdded": 0
              },
              {
                "skuId": 1630457556,
                "isAdded": 0
              },
              {
                "skuId": 1666795514,
                "isAdded": 0
              },
              {
                "skuId": 2036040433,
                "isAdded": 0
              },
              {
                "skuId": 2128420358,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171921個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "588292525",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "1b7812234dfb37442d44d6dcfec09114"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.162, 91.236.247.162",
            "x-forwarded-for": "91.236.247.162, 91.236.247.162",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T19:55:06.894Z",
        "updatedAt": "2024-09-19T11:13:23.135Z",
        "__v": 0
      },
      {
        "_id": "66e9ecfa5061b0c9599cbab4",
        "spuId": 62462672,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 62462672,
              "globalSpuId": 10003571257,
              "categoryId": 1001189,
              "level1CategoryId": 29,
              "level2CategoryId": 35,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20221024/ebef8041e67c4b01942dc1d2ddb3b6d9.jpg",
              "title": "Nike Air Max Bliss 皮革 運動 防滑耐磨 低幫 生活休閒鞋 女款 米白色",
              "subTitle": "Nike Air Max Bliss 皮革 運動 防滑耐磨 低幫 生活休閒鞋 女款 米白色",
              "authPrice": 137,
              "sellDate": "2022冬季",
              "sourceName": "default",
              "articleNumber": "FB1860-101",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 3,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240718/2ae09677eb2f4d52892587764579aa3a.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240718/a31a46dc590b4cf78427d782fe1fce17.jpg",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240718/c69b4d61031546fcb79201d490b78900.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240718/83b087e18cf646d0ac1f6fb8137dce49.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240718/cb1695bfa35e43ad8003b21c071ef899.jpg",
                  "imgType": 0,
                  "sort": 5,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "FB1860-101",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "發售日期",
                  "value": "2022冬季",
                  "defaultShow": 1
                },
                {
                  "key": "配色",
                  "value": "白色/米色",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "35.5",
                  "propertyValueId": 251697949,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 0,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "36",
                  "propertyValueId": 251697950,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "36.5",
                  "propertyValueId": 251697951,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "37.5",
                  "propertyValueId": 251697952,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "38",
                  "propertyValueId": 251697953,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 251697954,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 251697955,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 251697956,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 251697957,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 251697958,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 251697959,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 4600,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 893703627,
                "spuId": 62462672,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 251697956
                  }
                ]
              },
              {
                "skuId": 893703628,
                "spuId": 62462672,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 251697954
                  }
                ]
              },
              {
                "skuId": 893703629,
                "spuId": 62462672,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 251697953
                  }
                ]
              },
              {
                "skuId": 893703630,
                "spuId": 62462672,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 251697955
                  }
                ]
              },
              {
                "skuId": 893703631,
                "spuId": 62462672,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 251697951
                  }
                ]
              },
              {
                "skuId": 893703632,
                "spuId": 62462672,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 251697950
                  }
                ]
              },
              {
                "skuId": 893703633,
                "spuId": 62462672,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 251697952
                  }
                ]
              },
              {
                "skuId": 893703634,
                "spuId": 62462672,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 251697949
                  }
                ]
              },
              {
                "skuId": 893703635,
                "spuId": 62462672,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 251697959
                  }
                ]
              },
              {
                "skuId": 893703636,
                "spuId": 62462672,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 251697957
                  }
                ]
              },
              {
                "skuId": 893703637,
                "spuId": 62462672,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 251697958
                  }
                ]
              }
            ],
            "styleMode": 1,
            "favoriteList": [
              {
                "skuId": 893703627,
                "isAdded": 0
              },
              {
                "skuId": 893703628,
                "isAdded": 0
              },
              {
                "skuId": 893703629,
                "isAdded": 0
              },
              {
                "skuId": 893703630,
                "isAdded": 0
              },
              {
                "skuId": 893703631,
                "isAdded": 0
              },
              {
                "skuId": 893703632,
                "isAdded": 0
              },
              {
                "skuId": 893703633,
                "isAdded": 0
              },
              {
                "skuId": 893703634,
                "isAdded": 0
              },
              {
                "skuId": 893703635,
                "isAdded": 0
              },
              {
                "skuId": 893703636,
                "isAdded": 0
              },
              {
                "skuId": 893703637,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171423個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "62462672",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "b8a1bafb1b4caee795b1b88f0156917f"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T20:56:26.023Z",
        "updatedAt": "2024-09-18T06:46:06.255Z",
        "__v": 0
      },
      {
        "_id": "66e9eef05061b0c9599cbc82",
        "spuId": 591329182,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 591329182,
              "globalSpuId": 12002989311,
              "categoryId": 33,
              "level1CategoryId": 29,
              "level2CategoryId": 30,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20240620/dd4b18b1f41349e0bd6692c8874962fb.jpg",
              "title": "Nike Air Zoom Vomero 5 舒適輕便減震透氣 低幫 休閒跑步鞋 女款 綠色",
              "subTitle": "Nike Air Zoom Vomero 5 舒適輕便減震透氣 低幫 休閒跑步鞋 女款 綠色",
              "authPrice": 152,
              "sellDate": "2024夏季",
              "sourceName": "default",
              "articleNumber": "FN6742-001",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 3,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240620/dd4b18b1f41349e0bd6692c8874962fb.jpg",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240620/ff74d290ab5f4cc0ae0ff32097a87d89.jpg",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240620/c4fac2f4f55b470a951f7ea43bf201bb.jpg",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240620/29b95fee79274abaa8cb1386ad81e064.jpg",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240620/4652a7d95f694dc6a786bfae984fd893.jpg",
                  "sort": 10000
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "FN6742-001",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "發售日期",
                  "value": "2024夏季",
                  "defaultShow": 1
                },
                {
                  "key": "配色",
                  "value": "綠白",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "35.5",
                  "propertyValueId": 1260002005,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 0,
                  "definitionId": 6
                },
                {
                  "propertyId": 4366,
                  "name": "顏色",
                  "value": "綠白",
                  "propertyValueId": 1260002004,
                  "level": 1,
                  "customValue": "綠白",
                  "showValue": 0,
                  "sort": 1,
                  "definitionId": 1
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "36",
                  "propertyValueId": 1260002006,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "36.5",
                  "propertyValueId": 1260002007,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "37.5",
                  "propertyValueId": 1260002008,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38",
                  "propertyValueId": 1260002009,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 1260002010,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 1260002011,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 1260002012,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 1266364980,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 1266367503,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 1266888530,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 1267843206,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 1267841762,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 1267845735,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 1267838389,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 14,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 6300,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 1670536073,
                "spuId": 591329182,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1260002004
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1260002012
                  }
                ]
              },
              {
                "skuId": 1670536074,
                "spuId": 591329182,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1260002004
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1260002011
                  }
                ]
              },
              {
                "skuId": 1670536075,
                "spuId": 591329182,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1260002004
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1260002005
                  }
                ]
              },
              {
                "skuId": 1670536076,
                "spuId": 591329182,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1260002004
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1260002010
                  }
                ]
              },
              {
                "skuId": 1670536077,
                "spuId": 591329182,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1260002004
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1260002009
                  }
                ]
              },
              {
                "skuId": 1670536078,
                "spuId": 591329182,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1260002004
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1260002007
                  }
                ]
              },
              {
                "skuId": 1670536079,
                "spuId": 591329182,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1260002004
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1260002006
                  }
                ]
              },
              {
                "skuId": 1670536080,
                "spuId": 591329182,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1260002004
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1260002008
                  }
                ]
              },
              {
                "skuId": 1675368947,
                "spuId": 591329182,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1260002004
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1266364980
                  }
                ]
              },
              {
                "skuId": 1675379739,
                "spuId": 591329182,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1260002004
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1266367503
                  }
                ]
              },
              {
                "skuId": 1675841940,
                "spuId": 591329182,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1260002004
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1266888530
                  }
                ]
              },
              {
                "skuId": 1676565505,
                "spuId": 591329182,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1260002004
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1267845735
                  }
                ]
              },
              {
                "skuId": 1676566079,
                "spuId": 591329182,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1260002004
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1267838389
                  }
                ]
              },
              {
                "skuId": 1676569567,
                "spuId": 591329182,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1260002004
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1267841762
                  }
                ]
              },
              {
                "skuId": 1676570328,
                "spuId": 591329182,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1260002004
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1267843206
                  }
                ]
              }
            ],
            "styleMode": 2,
            "favoriteList": [
              {
                "skuId": 1670536073,
                "isAdded": 0
              },
              {
                "skuId": 1670536074,
                "isAdded": 0
              },
              {
                "skuId": 1670536075,
                "isAdded": 0
              },
              {
                "skuId": 1670536076,
                "isAdded": 0
              },
              {
                "skuId": 1670536077,
                "isAdded": 0
              },
              {
                "skuId": 1670536078,
                "isAdded": 0
              },
              {
                "skuId": 1670536079,
                "isAdded": 0
              },
              {
                "skuId": 1670536080,
                "isAdded": 0
              },
              {
                "skuId": 1675368947,
                "isAdded": 0
              },
              {
                "skuId": 1675379739,
                "isAdded": 0
              },
              {
                "skuId": 1675841940,
                "isAdded": 0
              },
              {
                "skuId": 1676565505,
                "isAdded": 0
              },
              {
                "skuId": 1676566079,
                "isAdded": 0
              },
              {
                "skuId": 1676569567,
                "isAdded": 0
              },
              {
                "skuId": 1676570328,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171921個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "591329182",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "0d0433d3aa844cde51e78585ce5d401d"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.162, 91.236.247.162",
            "x-forwarded-for": "91.236.247.162, 91.236.247.162",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:04:48.857Z",
        "updatedAt": "2024-09-19T11:13:45.992Z",
        "__v": 0
      },
      {
        "_id": "66e9eef65061b0c9599cbc96",
        "spuId": 58745815,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 58745815,
              "globalSpuId": 10003159218,
              "categoryId": 34,
              "level1CategoryId": 29,
              "level2CategoryId": 30,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20230529/881c8cb0c9f342f5946a13a2dcdfc169.jpg",
              "title": "Nike Air Trainer 1 Black Grey 皮革 減震耐磨透氣 中幫 訓練鞋 男款 黑色",
              "subTitle": "Nike Air Trainer 1 Black Grey 皮革 減震耐磨透氣 中幫 訓練鞋 男款 黑色",
              "authPrice": 137,
              "sellDate": "2022秋季",
              "sourceName": "default",
              "articleNumber": "FD0808-001",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 2,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230529/881c8cb0c9f342f5946a13a2dcdfc169.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230529/1a453b1b07f742179cb62902fa519095.jpg",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230529/268e8d402a464d1aa9156e56f7d3733d.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230529/9a82fff71a064e96a261fb7b8aeeed5f.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "FD0808-001",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "發售日期",
                  "value": "2022秋季",
                  "defaultShow": 1
                },
                {
                  "key": "配色",
                  "value": "黑/白",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 3740,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 194575413,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 3740,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 194575414,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 3740,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 194575415,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 3740,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 194575416,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 3740,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 194575417,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 3740,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 194575418,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 3740,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 194575419,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 3740,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 194575420,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 3740,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 194575421,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 3740,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 194575422,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 3740,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 194575423,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 3740,
                  "name": "尺碼",
                  "value": "45.5",
                  "propertyValueId": 343222646,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 3740,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 194575424,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 3740,
                  "name": "尺碼",
                  "value": "47.5",
                  "propertyValueId": 194575425,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 15,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 4200,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 865367592,
                "spuId": 58745815,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 194575425
                  }
                ]
              },
              {
                "skuId": 865367593,
                "spuId": 58745815,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 194575424
                  }
                ]
              },
              {
                "skuId": 865367594,
                "spuId": 58745815,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 194575421
                  }
                ]
              },
              {
                "skuId": 865367595,
                "spuId": 58745815,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 194575417
                  }
                ]
              },
              {
                "skuId": 865367596,
                "spuId": 58745815,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 194575419
                  }
                ]
              },
              {
                "skuId": 865367597,
                "spuId": 58745815,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 194575415
                  }
                ]
              },
              {
                "skuId": 865367598,
                "spuId": 58745815,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 194575420
                  }
                ]
              },
              {
                "skuId": 865367599,
                "spuId": 58745815,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 194575418
                  }
                ]
              },
              {
                "skuId": 865367600,
                "spuId": 58745815,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 194575422
                  }
                ]
              },
              {
                "skuId": 865367601,
                "spuId": 58745815,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 194575416
                  }
                ]
              },
              {
                "skuId": 865367602,
                "spuId": 58745815,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 194575413
                  }
                ]
              },
              {
                "skuId": 865367603,
                "spuId": 58745815,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 194575414
                  }
                ]
              },
              {
                "skuId": 865367604,
                "spuId": 58745815,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 194575423
                  }
                ]
              },
              {
                "skuId": 934083687,
                "spuId": 58745815,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343222646
                  }
                ]
              }
            ],
            "styleMode": 1,
            "favoriteList": [
              {
                "skuId": 865367592,
                "isAdded": 0
              },
              {
                "skuId": 865367593,
                "isAdded": 0
              },
              {
                "skuId": 865367594,
                "isAdded": 0
              },
              {
                "skuId": 865367595,
                "isAdded": 0
              },
              {
                "skuId": 865367596,
                "isAdded": 0
              },
              {
                "skuId": 865367597,
                "isAdded": 0
              },
              {
                "skuId": 865367598,
                "isAdded": 0
              },
              {
                "skuId": 865367599,
                "isAdded": 0
              },
              {
                "skuId": 865367600,
                "isAdded": 0
              },
              {
                "skuId": 865367601,
                "isAdded": 0
              },
              {
                "skuId": 865367602,
                "isAdded": 0
              },
              {
                "skuId": 865367603,
                "isAdded": 0
              },
              {
                "skuId": 865367604,
                "isAdded": 0
              },
              {
                "skuId": 934083687,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171921個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "58745815",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "ea2989c69341007561ba6230cdfd35ee"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.162, 91.236.247.162",
            "x-forwarded-for": "91.236.247.162, 91.236.247.162",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:04:54.800Z",
        "updatedAt": "2024-09-19T11:13:46.120Z",
        "__v": 0
      },
      {
        "_id": "66e9eefa5061b0c9599cbca8",
        "spuId": 579802748,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 579802748,
              "globalSpuId": 12000491285,
              "categoryId": 33,
              "level1CategoryId": 29,
              "level2CategoryId": 30,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20231219/89aa4929297947a9b797a44e2a7cbb63.jpg",
              "title": "Nike React Infinity Run Flyknit 4 緩震防水 織物耐磨透氣 低幫 訓練跑步鞋 女款 白色",
              "subTitle": "Nike React Infinity Run Flyknit 4 緩震防水 織物耐磨透氣 低幫 訓練跑步鞋 女款 白色",
              "authPrice": 149,
              "sellDate": "2023.12",
              "sourceName": "default",
              "articleNumber": "DR2670-104",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 3,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 1050298178,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20231219/89aa4929297947a9b797a44e2a7cbb63.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1050298178,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20231219/d62df6aeb30d4e39a4022661dfa7980c.jpg",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1050298178,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20231219/8be97d6f5b4e4d8abcfbca609456afe5.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1050298178,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20231219/6edbf9c518ed4a288d88b21390a7cf9d.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1050298178,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20231219/1bcf168fd3f144e48f8c4d5d8db7bd8b.jpg",
                  "imgType": 0,
                  "sort": 5,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1050298178,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20231219/8cca21d950b04f31948605dd689fe0f2.jpg",
                  "imgType": 0,
                  "sort": 6,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "DR2670-104",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "配色",
                  "value": "白色",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "35.5",
                  "propertyValueId": 1050298179,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 0,
                  "definitionId": 6
                },
                {
                  "propertyId": 4366,
                  "name": "顏色",
                  "value": "白色",
                  "propertyValueId": 1050298178,
                  "level": 1,
                  "customValue": "白色",
                  "showValue": 0,
                  "sort": 1,
                  "definitionId": 1
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "36",
                  "propertyValueId": 1050298180,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "36.5",
                  "propertyValueId": 1050298181,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "37.5",
                  "propertyValueId": 1050298182,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38",
                  "propertyValueId": 1050298183,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 1050298184,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 1050298185,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 1050298186,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 1075366117,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 1265378066,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 1088904691,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 1349450709,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 1349444803,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 1349429383,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 1349451461,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 14,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 5900,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 1534948222,
                "spuId": 579802748,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1050298178
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1050298182
                  }
                ]
              },
              {
                "skuId": 1534948223,
                "spuId": 579802748,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1050298178
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1050298179
                  }
                ]
              },
              {
                "skuId": 1534948224,
                "spuId": 579802748,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1050298178
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1050298184
                  }
                ]
              },
              {
                "skuId": 1534948225,
                "spuId": 579802748,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1050298178
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1050298185
                  }
                ]
              },
              {
                "skuId": 1534948226,
                "spuId": 579802748,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1050298178
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1050298180
                  }
                ]
              },
              {
                "skuId": 1534948227,
                "spuId": 579802748,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1050298178
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1050298186
                  }
                ]
              },
              {
                "skuId": 1534948228,
                "spuId": 579802748,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1050298178
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1050298181
                  }
                ]
              },
              {
                "skuId": 1534948229,
                "spuId": 579802748,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1050298178
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1050298183
                  }
                ]
              },
              {
                "skuId": 1548267312,
                "spuId": 579802748,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1050298178
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1075366117
                  }
                ]
              },
              {
                "skuId": 1555981950,
                "spuId": 579802748,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1050298178
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1088904691
                  }
                ]
              },
              {
                "skuId": 1674545893,
                "spuId": 579802748,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1050298178
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1265378066
                  }
                ]
              },
              {
                "skuId": 1737935092,
                "spuId": 579802748,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1050298178
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1349429383
                  }
                ]
              },
              {
                "skuId": 1737935382,
                "spuId": 579802748,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1050298178
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1349444803
                  }
                ]
              },
              {
                "skuId": 1737958523,
                "spuId": 579802748,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1050298178
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1349450709
                  }
                ]
              },
              {
                "skuId": 1737959067,
                "spuId": 579802748,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1050298178
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1349451461
                  }
                ]
              }
            ],
            "styleMode": 2,
            "favoriteList": [
              {
                "skuId": 1534948222,
                "isAdded": 0
              },
              {
                "skuId": 1534948223,
                "isAdded": 0
              },
              {
                "skuId": 1534948224,
                "isAdded": 0
              },
              {
                "skuId": 1534948225,
                "isAdded": 0
              },
              {
                "skuId": 1534948226,
                "isAdded": 0
              },
              {
                "skuId": 1534948227,
                "isAdded": 0
              },
              {
                "skuId": 1534948228,
                "isAdded": 0
              },
              {
                "skuId": 1534948229,
                "isAdded": 0
              },
              {
                "skuId": 1548267312,
                "isAdded": 0
              },
              {
                "skuId": 1555981950,
                "isAdded": 0
              },
              {
                "skuId": 1674545893,
                "isAdded": 0
              },
              {
                "skuId": 1737935092,
                "isAdded": 0
              },
              {
                "skuId": 1737935382,
                "isAdded": 0
              },
              {
                "skuId": 1737958523,
                "isAdded": 0
              },
              {
                "skuId": 1737959067,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171213個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "579802748",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "279df6ff7e5259f36052ea60ba27366a"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:04:58.308Z",
        "updatedAt": "2024-09-17T21:07:26.095Z",
        "__v": 0
      },
      {
        "_id": "66e9eefe5061b0c9599cbcae",
        "spuId": 581439467,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 581439467,
              "globalSpuId": 12000814249,
              "categoryId": 38,
              "level1CategoryId": 29,
              "level2CategoryId": 35,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20240108/5c7888749b474436beb7a6caea13690f.jpg",
              "title": "Nike Air Force 1 SHADOW 耐磨透氣 低幫 板鞋 女款 米藍色",
              "subTitle": "Nike Air Force 1 SHADOW 耐磨透氣 低幫 板鞋 女款 米藍色",
              "authPrice": 148,
              "sellDate": "2023.12.29",
              "sourceName": "default",
              "articleNumber": "DZ1847-103",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 3,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 1078680031,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240108/5c7888749b474436beb7a6caea13690f.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1078680031,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240108/d75c7b5567cb494ebed8c9b50f968240.jpg",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1078680031,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240108/cddbbeda53b24638be3de5dee3c06519.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1078680031,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240108/a2244ed2f96e40a9b0087e9579676dec.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "DZ1847-103",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "配色",
                  "value": "米藍色",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 3427,
                  "name": "顏色",
                  "value": "米藍色",
                  "propertyValueId": 1078680031,
                  "level": 1,
                  "customValue": "米藍色",
                  "showValue": 0,
                  "sort": 0,
                  "definitionId": 1
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "35.5",
                  "propertyValueId": 1147589974,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "36",
                  "propertyValueId": 1078680036,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "36.5",
                  "propertyValueId": 1078680032,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "37.5",
                  "propertyValueId": 1078680034,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "38",
                  "propertyValueId": 1078680035,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 1078680037,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 1078680038,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 1078680039,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 1078680040,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 1078680041,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 1078680042,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 1078680043,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 1078680044,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 1078680045,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 14,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 1078680046,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 15,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 1078680047,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 16,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "45.5",
                  "propertyValueId": 1078680048,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 17,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 1078680049,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 18,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "47",
                  "propertyValueId": 1078680050,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 19,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "47.5",
                  "propertyValueId": 1078680051,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 20,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "48",
                  "propertyValueId": 1078680052,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 21,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "48.5",
                  "propertyValueId": 1078680053,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 22,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "49",
                  "propertyValueId": 1078680054,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 23,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "50",
                  "propertyValueId": 1078680056,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 24,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "37",
                  "propertyValueId": 1078680033,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 25,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "49.5",
                  "propertyValueId": 1078680055,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 26,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "50.5",
                  "propertyValueId": 1078680057,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 27,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "51",
                  "propertyValueId": 1078680058,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 28,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "51.5",
                  "propertyValueId": 1078680059,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 29,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "52.5",
                  "propertyValueId": 1078680060,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 30,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 7500,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 1550261373,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680053
                  }
                ]
              },
              {
                "skuId": 1550261374,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680039
                  }
                ]
              },
              {
                "skuId": 1550261375,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680036
                  }
                ]
              },
              {
                "skuId": 1550261376,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680043
                  }
                ]
              },
              {
                "skuId": 1550261378,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680052
                  }
                ]
              },
              {
                "skuId": 1550261379,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680047
                  }
                ]
              },
              {
                "skuId": 1550261380,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680038
                  }
                ]
              },
              {
                "skuId": 1550261381,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680042
                  }
                ]
              },
              {
                "skuId": 1550261382,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680049
                  }
                ]
              },
              {
                "skuId": 1550261383,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680051
                  }
                ]
              },
              {
                "skuId": 1550261385,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680040
                  }
                ]
              },
              {
                "skuId": 1550261386,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680041
                  }
                ]
              },
              {
                "skuId": 1550261387,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680032
                  }
                ]
              },
              {
                "skuId": 1550261389,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680050
                  }
                ]
              },
              {
                "skuId": 1550261390,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680044
                  }
                ]
              },
              {
                "skuId": 1550261392,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680046
                  }
                ]
              },
              {
                "skuId": 1550261393,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680035
                  }
                ]
              },
              {
                "skuId": 1550261396,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680045
                  }
                ]
              },
              {
                "skuId": 1550261397,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680034
                  }
                ]
              },
              {
                "skuId": 1550261398,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680056
                  }
                ]
              },
              {
                "skuId": 1550261399,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680048
                  }
                ]
              },
              {
                "skuId": 1550261401,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1078680037
                  }
                ]
              },
              {
                "skuId": 1592422263,
                "spuId": 581439467,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1078680031
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1147589974
                  }
                ]
              }
            ],
            "styleMode": 2,
            "favoriteList": [
              {
                "skuId": 1550261373,
                "isAdded": 0
              },
              {
                "skuId": 1550261374,
                "isAdded": 0
              },
              {
                "skuId": 1550261375,
                "isAdded": 0
              },
              {
                "skuId": 1550261376,
                "isAdded": 0
              },
              {
                "skuId": 1550261378,
                "isAdded": 0
              },
              {
                "skuId": 1550261379,
                "isAdded": 0
              },
              {
                "skuId": 1550261380,
                "isAdded": 0
              },
              {
                "skuId": 1550261381,
                "isAdded": 0
              },
              {
                "skuId": 1550261382,
                "isAdded": 0
              },
              {
                "skuId": 1550261383,
                "isAdded": 0
              },
              {
                "skuId": 1550261385,
                "isAdded": 0
              },
              {
                "skuId": 1550261386,
                "isAdded": 0
              },
              {
                "skuId": 1550261387,
                "isAdded": 0
              },
              {
                "skuId": 1550261389,
                "isAdded": 0
              },
              {
                "skuId": 1550261390,
                "isAdded": 0
              },
              {
                "skuId": 1550261392,
                "isAdded": 0
              },
              {
                "skuId": 1550261393,
                "isAdded": 0
              },
              {
                "skuId": 1550261396,
                "isAdded": 0
              },
              {
                "skuId": 1550261397,
                "isAdded": 0
              },
              {
                "skuId": 1550261398,
                "isAdded": 0
              },
              {
                "skuId": 1550261399,
                "isAdded": 0
              },
              {
                "skuId": 1550261401,
                "isAdded": 0
              },
              {
                "skuId": 1592422263,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171213個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "581439467",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "eb2f55ed1e06e61c38299fccc6459534"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:05:02.828Z",
        "updatedAt": "2024-09-17T21:07:29.722Z",
        "__v": 0
      },
      {
        "_id": "66e9ef1a5061b0c9599cbcfe",
        "spuId": 74858686,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 74858686,
              "globalSpuId": 10006458855,
              "categoryId": 1001189,
              "level1CategoryId": 29,
              "level2CategoryId": 35,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20230924/840fd224a8b243a089f5df310c26aceb.jpg",
              "title": "Nike Air Max Pulse 織物皮革 舒適日常 減震耐磨 低幫 生活休閒鞋 男款 淺灰色",
              "subTitle": "Nike Air Max Pulse 織物皮革 舒適日常 減震耐磨 低幫 生活休閒鞋 男款 淺灰色",
              "authPrice": 168,
              "sellDate": "2023.09.24",
              "sourceName": "default",
              "articleNumber": "FN7459-002",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 2,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 463624284,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230924/840fd224a8b243a089f5df310c26aceb.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 463624284,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230924/f722b50263c946ffb703ae55767b22a0.jpg",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 463624284,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230924/33520a08c9c94a94af7d11685e772fdb.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 463624284,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230924/16f22957668d4f85b4a09a60b7924bbd.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                },
                {
                  "propertyValueId": 463624284,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230924/38b93e955b794ef88337da758ee01f57.jpg",
                  "imgType": 0,
                  "sort": 5,
                  "isShow": 1
                },
                {
                  "propertyValueId": 463624284,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230924/93a7e44ee29f4787a5feca6459b10363.jpg",
                  "imgType": 0,
                  "sort": 6,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "FN7459-002",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 1012497,
                  "name": "顏色",
                  "value": "淺灰色",
                  "propertyValueId": 463624284,
                  "level": 1,
                  "customValue": "淺灰色",
                  "showValue": 0,
                  "sort": 1,
                  "definitionId": 1
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 463624285,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 463624286,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 463624287,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 463624288,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 463624289,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 463624290,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 463624291,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 463624292,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 463624293,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 463624294,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 463624295,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "45.5",
                  "propertyValueId": 463624296,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 463624297,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "47",
                  "propertyValueId": 1693280120,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 14,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "47.5",
                  "propertyValueId": 1700440553,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 15,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "48.5",
                  "propertyValueId": 1696683040,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 17,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "49.5",
                  "propertyValueId": 1700757119,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 19,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 6000,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 988936010,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 463624296
                  }
                ]
              },
              {
                "skuId": 988936011,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 463624293
                  }
                ]
              },
              {
                "skuId": 988936012,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 463624290
                  }
                ]
              },
              {
                "skuId": 988936013,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 463624292
                  }
                ]
              },
              {
                "skuId": 988936014,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 463624297
                  }
                ]
              },
              {
                "skuId": 988936015,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 463624289
                  }
                ]
              },
              {
                "skuId": 988936016,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 463624291
                  }
                ]
              },
              {
                "skuId": 988936017,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 463624295
                  }
                ]
              },
              {
                "skuId": 988936018,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 463624287
                  }
                ]
              },
              {
                "skuId": 988936019,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 463624286
                  }
                ]
              },
              {
                "skuId": 988936020,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 463624285
                  }
                ]
              },
              {
                "skuId": 988936021,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 463624288
                  }
                ]
              },
              {
                "skuId": 988936022,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 463624294
                  }
                ]
              },
              {
                "skuId": 1969871384,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1693280120
                  }
                ]
              },
              {
                "skuId": 1973579362,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1696683040
                  }
                ]
              },
              {
                "skuId": 1976732325,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1700440553
                  }
                ]
              },
              {
                "skuId": 1976950706,
                "spuId": 74858686,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 463624284
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1700757119
                  }
                ]
              }
            ],
            "styleMode": 2,
            "favoriteList": [
              {
                "skuId": 988936010,
                "isAdded": 0
              },
              {
                "skuId": 988936011,
                "isAdded": 0
              },
              {
                "skuId": 988936012,
                "isAdded": 0
              },
              {
                "skuId": 988936013,
                "isAdded": 0
              },
              {
                "skuId": 988936014,
                "isAdded": 0
              },
              {
                "skuId": 988936015,
                "isAdded": 0
              },
              {
                "skuId": 988936016,
                "isAdded": 0
              },
              {
                "skuId": 988936017,
                "isAdded": 0
              },
              {
                "skuId": 988936018,
                "isAdded": 0
              },
              {
                "skuId": 988936019,
                "isAdded": 0
              },
              {
                "skuId": 988936020,
                "isAdded": 0
              },
              {
                "skuId": 988936021,
                "isAdded": 0
              },
              {
                "skuId": 988936022,
                "isAdded": 0
              },
              {
                "skuId": 1969871384,
                "isAdded": 0
              },
              {
                "skuId": 1973579362,
                "isAdded": 0
              },
              {
                "skuId": 1976732325,
                "isAdded": 0
              },
              {
                "skuId": 1976950706,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171213個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "74858686",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "2f018c3366b158033c9140159baa8c2e"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:05:30.792Z",
        "updatedAt": "2024-09-17T21:07:34.313Z",
        "__v": 0
      },
      {
        "_id": "66e9ef215061b0c9599cbd21",
        "spuId": 75175955,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 75175955,
              "globalSpuId": 10006525126,
              "categoryId": 33,
              "level1CategoryId": 29,
              "level2CategoryId": 30,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20230928/720413844db042c6bab4bf29a8549e87.jpg",
              "title": "Nike Air Zoom Vomero 5 舒適運動防滑耐磨 低幫 休閒跑步鞋 男女同款 黑色",
              "subTitle": "Nike Air Zoom Vomero 5 舒適運動防滑耐磨 低幫 休閒跑步鞋 男女同款 黑色",
              "authPrice": 183,
              "sellDate": "2023.11",
              "sourceName": "default",
              "articleNumber": "FQ8174-237",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 1,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 469303904,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230928/720413844db042c6bab4bf29a8549e87.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 469303904,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230928/6768dc879fb5477fafd221b04ef9c0fa.jpg",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 469303904,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230928/21a95d8127534d398c5deb5562e04105.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 469303904,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230928/4a5dc53a2d93409784389359f43cfb76.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                },
                {
                  "propertyValueId": 469303904,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230928/761f424ab7044a42b40e917e8b15d15d.jpg",
                  "imgType": 0,
                  "sort": 5,
                  "isShow": 1
                },
                {
                  "propertyValueId": 469303904,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230928/0341f9b22e814afeb8154b86aaf996a8.jpg",
                  "imgType": 0,
                  "sort": 6,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "FQ8174-237",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "配色",
                  "value": "黑色",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 4366,
                  "name": "顏色",
                  "value": "黑色",
                  "propertyValueId": 469303904,
                  "level": 1,
                  "customValue": "黑色",
                  "showValue": 0,
                  "sort": 0,
                  "definitionId": 1
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "35.5",
                  "propertyValueId": 1371086529,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "36",
                  "propertyValueId": 1154867579,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "36.5",
                  "propertyValueId": 994819369,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "37.5",
                  "propertyValueId": 994824995,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38",
                  "propertyValueId": 977536037,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 469303905,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 469303906,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 469303907,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 469303908,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 469303909,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 469303910,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 469303911,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 469303912,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 469303913,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 14,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 469303914,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 15,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 469303915,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 16,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "45.5",
                  "propertyValueId": 1716734716,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 17,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 469303916,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 18,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "47.5",
                  "propertyValueId": 469303917,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 19,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "48.5",
                  "propertyValueId": 469303918,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 20,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "49",
                  "propertyValueId": 469303919,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 21,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "49.5",
                  "propertyValueId": 469303920,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 22,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "50",
                  "propertyValueId": 469303921,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 23,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "50.5",
                  "propertyValueId": 469303922,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 24,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "51",
                  "propertyValueId": 469303923,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 25,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "51.5",
                  "propertyValueId": 469303924,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 26,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 6800,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 991774855,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303912
                  }
                ]
              },
              {
                "skuId": 991774856,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303914
                  }
                ]
              },
              {
                "skuId": 991774857,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303913
                  }
                ]
              },
              {
                "skuId": 991774858,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303922
                  }
                ]
              },
              {
                "skuId": 991774859,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303923
                  }
                ]
              },
              {
                "skuId": 991774860,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303924
                  }
                ]
              },
              {
                "skuId": 991774861,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303921
                  }
                ]
              },
              {
                "skuId": 991774863,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303917
                  }
                ]
              },
              {
                "skuId": 991774864,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303918
                  }
                ]
              },
              {
                "skuId": 991774865,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303920
                  }
                ]
              },
              {
                "skuId": 991774866,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303905
                  }
                ]
              },
              {
                "skuId": 991774867,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303908
                  }
                ]
              },
              {
                "skuId": 991774868,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303910
                  }
                ]
              },
              {
                "skuId": 991774869,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303911
                  }
                ]
              },
              {
                "skuId": 991774870,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303906
                  }
                ]
              },
              {
                "skuId": 991774871,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303909
                  }
                ]
              },
              {
                "skuId": 991774872,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303907
                  }
                ]
              },
              {
                "skuId": 991774873,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303915
                  }
                ]
              },
              {
                "skuId": 991774874,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 469303916
                  }
                ]
              },
              {
                "skuId": 1496010498,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 977536037
                  }
                ]
              },
              {
                "skuId": 1505365322,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 994824995
                  }
                ]
              },
              {
                "skuId": 1505365504,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 994819369
                  }
                ]
              },
              {
                "skuId": 1597046362,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1154867579
                  }
                ]
              },
              {
                "skuId": 1753889575,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1371086529
                  }
                ]
              },
              {
                "skuId": 1990746451,
                "spuId": 75175955,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 469303904
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1716734716
                  }
                ]
              }
            ],
            "styleMode": 2,
            "favoriteList": [
              {
                "skuId": 991774855,
                "isAdded": 0
              },
              {
                "skuId": 991774856,
                "isAdded": 0
              },
              {
                "skuId": 991774857,
                "isAdded": 0
              },
              {
                "skuId": 991774858,
                "isAdded": 0
              },
              {
                "skuId": 991774859,
                "isAdded": 0
              },
              {
                "skuId": 991774860,
                "isAdded": 0
              },
              {
                "skuId": 991774861,
                "isAdded": 0
              },
              {
                "skuId": 991774863,
                "isAdded": 0
              },
              {
                "skuId": 991774864,
                "isAdded": 0
              },
              {
                "skuId": 991774865,
                "isAdded": 0
              },
              {
                "skuId": 991774866,
                "isAdded": 0
              },
              {
                "skuId": 991774867,
                "isAdded": 0
              },
              {
                "skuId": 991774868,
                "isAdded": 0
              },
              {
                "skuId": 991774869,
                "isAdded": 0
              },
              {
                "skuId": 991774870,
                "isAdded": 0
              },
              {
                "skuId": 991774871,
                "isAdded": 0
              },
              {
                "skuId": 991774872,
                "isAdded": 0
              },
              {
                "skuId": 991774873,
                "isAdded": 0
              },
              {
                "skuId": 991774874,
                "isAdded": 0
              },
              {
                "skuId": 1496010498,
                "isAdded": 0
              },
              {
                "skuId": 1505365322,
                "isAdded": 0
              },
              {
                "skuId": 1505365504,
                "isAdded": 0
              },
              {
                "skuId": 1597046362,
                "isAdded": 0
              },
              {
                "skuId": 1753889575,
                "isAdded": 0
              },
              {
                "skuId": 1990746451,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171213個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "75175955",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "b92249dc4f8f90f8198b73cc340e981c"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:05:37.005Z",
        "updatedAt": "2024-09-17T21:07:38.969Z",
        "__v": 0
      },
      {
        "_id": "66e9efa05061b0c9599cbe4b",
        "spuId": 69540012,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 69540012,
              "globalSpuId": 10005171675,
              "categoryId": 33,
              "level1CategoryId": 29,
              "level2CategoryId": 30,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20230731/5ed68c45baee4644ba10733ae3c68cd2.jpg",
              "title": "Nike Cortez 舒適百塔 絨面革減震防滑耐磨 低幫 休閒跑步鞋 女款 綠色",
              "subTitle": "Nike Cortez 舒適百塔 絨面革減震防滑耐磨 低幫 休閒跑步鞋 女款 綠色",
              "authPrice": 108,
              "sellDate": "2023夏季",
              "sourceName": "default",
              "articleNumber": "DZ2795-300",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 3,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230731/5ed68c45baee4644ba10733ae3c68cd2.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230731/233e5a6315604f28b8075ba8bf414ea8.jpg",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230731/18598117cbcb486da6977f11b14d76b7.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230731/752ea39cb9394806aa7b98f4c834e4f6.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230731/bdd992fba1d84dbe95088d5f4b4a11d9.jpg",
                  "imgType": 0,
                  "sort": 5,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230731/3bc60413a0ee4fcd954bdc480808bc5b.jpg",
                  "imgType": 0,
                  "sort": 6,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "DZ2795-300",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "配色",
                  "value": "綠",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "35.5",
                  "propertyValueId": 477035636,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 0,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "36",
                  "propertyValueId": 477035630,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "36.5",
                  "propertyValueId": 477035675,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "37.5",
                  "propertyValueId": 477035771,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38",
                  "propertyValueId": 477035709,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 477035811,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 477035827,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 366204102,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 366204103,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 366204104,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 366204105,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 366204106,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 366204107,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 366204108,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 366204109,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 14,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 366204110,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 15,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "45.5",
                  "propertyValueId": 477035873,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 16,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 366204111,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 17,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "47",
                  "propertyValueId": 477035762,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 18,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "47.5",
                  "propertyValueId": 366204112,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 19,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "48",
                  "propertyValueId": 477035697,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 20,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "48.5",
                  "propertyValueId": 366204113,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 21,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "50",
                  "propertyValueId": 477035664,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 22,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "51",
                  "propertyValueId": 366204114,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 23,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 4200,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 944372722,
                "spuId": 69540012,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 366204108
                  }
                ]
              },
              {
                "skuId": 944372723,
                "spuId": 69540012,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 366204109
                  }
                ]
              },
              {
                "skuId": 944372724,
                "spuId": 69540012,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 366204107
                  }
                ]
              },
              {
                "skuId": 944372728,
                "spuId": 69540012,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 366204102
                  }
                ]
              },
              {
                "skuId": 944372730,
                "spuId": 69540012,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 366204104
                  }
                ]
              },
              {
                "skuId": 944372732,
                "spuId": 69540012,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 366204105
                  }
                ]
              },
              {
                "skuId": 944372733,
                "spuId": 69540012,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 366204103
                  }
                ]
              },
              {
                "skuId": 944372734,
                "spuId": 69540012,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 366204106
                  }
                ]
              },
              {
                "skuId": 995965239,
                "spuId": 69540012,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 477035630
                  }
                ]
              },
              {
                "skuId": 995965245,
                "spuId": 69540012,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 477035636
                  }
                ]
              },
              {
                "skuId": 995965267,
                "spuId": 69540012,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 477035675
                  }
                ]
              },
              {
                "skuId": 995965284,
                "spuId": 69540012,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 477035709
                  }
                ]
              },
              {
                "skuId": 995965316,
                "spuId": 69540012,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 477035771
                  }
                ]
              },
              {
                "skuId": 995965339,
                "spuId": 69540012,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 477035811
                  }
                ]
              },
              {
                "skuId": 995965346,
                "spuId": 69540012,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 477035827
                  }
                ]
              }
            ],
            "styleMode": 1,
            "favoriteList": [
              {
                "skuId": 944372722,
                "isAdded": 0
              },
              {
                "skuId": 944372723,
                "isAdded": 0
              },
              {
                "skuId": 944372724,
                "isAdded": 0
              },
              {
                "skuId": 944372728,
                "isAdded": 0
              },
              {
                "skuId": 944372730,
                "isAdded": 0
              },
              {
                "skuId": 944372732,
                "isAdded": 0
              },
              {
                "skuId": 944372733,
                "isAdded": 0
              },
              {
                "skuId": 944372734,
                "isAdded": 0
              },
              {
                "skuId": 995965239,
                "isAdded": 0
              },
              {
                "skuId": 995965245,
                "isAdded": 0
              },
              {
                "skuId": 995965267,
                "isAdded": 0
              },
              {
                "skuId": 995965284,
                "isAdded": 0
              },
              {
                "skuId": 995965316,
                "isAdded": 0
              },
              {
                "skuId": 995965339,
                "isAdded": 0
              },
              {
                "skuId": 995965346,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171213個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "69540012",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "559367959dd172eacd5fd426a2dd1e75"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:07:44.446Z",
        "updatedAt": "2024-09-17T21:07:44.446Z",
        "__v": 0
      },
      {
        "_id": "66e9efa45061b0c9599cbe5a",
        "spuId": 51292398,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 51292398,
              "globalSpuId": 10001953897,
              "categoryId": 33,
              "level1CategoryId": 29,
              "level2CategoryId": 30,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20220212/1c0871d7924747e782741e642cfed182.jpg",
              "title": "Nike REVOLUTION 6 next nature 網面緩震 織物防滑耐磨透氣輕便 低幫 休閒跑步鞋 女款 白色 可再生材料",
              "subTitle": "Nike REVOLUTION 6 next nature 網面緩震 織物防滑耐磨透氣輕便 低幫 休閒跑步鞋 女款 白色 可再生材料",
              "authPrice": 152,
              "sellDate": "2021春季",
              "sourceName": "default",
              "articleNumber": "DC3729-101",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 3,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220212/1c0871d7924747e782741e642cfed182.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220212/bc5919f48b274a50a1267d56c106edab.jpg",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220212/2628399a35c04448b44307e85fea1a2f.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220212/a67d04828458428a978d3eab264b9c2a.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220212/d8b6b431aec94641b2d1994c7262e2b9.jpg",
                  "imgType": 0,
                  "sort": 5,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220212/1833e9cc90f7439ea4a1e5cca5058a51.jpg",
                  "imgType": 0,
                  "sort": 6,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "DC3729-101",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "發售日期",
                  "value": "2021春季",
                  "defaultShow": 1
                },
                {
                  "key": "配色",
                  "value": "白",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "35.5",
                  "propertyValueId": 102637206,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 0,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "36",
                  "propertyValueId": 102637208,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "36.5",
                  "propertyValueId": 102637207,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "37.5",
                  "propertyValueId": 102637155,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38",
                  "propertyValueId": 102637197,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 74970555,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 74970556,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 74970557,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 74970558,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 74970559,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 74970560,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 74970561,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 74970562,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 74970563,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 74970564,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 14,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 74970565,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 15,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 74970566,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 16,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "47.5",
                  "propertyValueId": 74970567,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 17,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "48.5",
                  "propertyValueId": 74970568,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 18,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 2800,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 812939254,
                "spuId": 51292398,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 74970555
                  }
                ]
              },
              {
                "skuId": 812939255,
                "spuId": 51292398,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 74970557
                  }
                ]
              },
              {
                "skuId": 812939256,
                "spuId": 51292398,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 74970558
                  }
                ]
              },
              {
                "skuId": 812939257,
                "spuId": 51292398,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 74970560
                  }
                ]
              },
              {
                "skuId": 812939258,
                "spuId": 51292398,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 74970556
                  }
                ]
              },
              {
                "skuId": 812939259,
                "spuId": 51292398,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 74970559
                  }
                ]
              },
              {
                "skuId": 812939261,
                "spuId": 51292398,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 74970562
                  }
                ]
              },
              {
                "skuId": 812939262,
                "spuId": 51292398,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 74970564
                  }
                ]
              },
              {
                "skuId": 812939263,
                "spuId": 51292398,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 74970563
                  }
                ]
              },
              {
                "skuId": 812939264,
                "spuId": 51292398,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 74970561
                  }
                ]
              },
              {
                "skuId": 823511118,
                "spuId": 51292398,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 102637155
                  }
                ]
              },
              {
                "skuId": 823511199,
                "spuId": 51292398,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 102637197
                  }
                ]
              },
              {
                "skuId": 823511229,
                "spuId": 51292398,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 102637208
                  }
                ]
              },
              {
                "skuId": 823511237,
                "spuId": 51292398,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 102637207
                  }
                ]
              },
              {
                "skuId": 823511242,
                "spuId": 51292398,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 102637206
                  }
                ]
              }
            ],
            "styleMode": 1,
            "favoriteList": [
              {
                "skuId": 812939254,
                "isAdded": 0
              },
              {
                "skuId": 812939255,
                "isAdded": 0
              },
              {
                "skuId": 812939256,
                "isAdded": 0
              },
              {
                "skuId": 812939257,
                "isAdded": 0
              },
              {
                "skuId": 812939258,
                "isAdded": 0
              },
              {
                "skuId": 812939259,
                "isAdded": 0
              },
              {
                "skuId": 812939261,
                "isAdded": 0
              },
              {
                "skuId": 812939262,
                "isAdded": 0
              },
              {
                "skuId": 812939263,
                "isAdded": 0
              },
              {
                "skuId": 812939264,
                "isAdded": 0
              },
              {
                "skuId": 823511118,
                "isAdded": 0
              },
              {
                "skuId": 823511199,
                "isAdded": 0
              },
              {
                "skuId": 823511229,
                "isAdded": 0
              },
              {
                "skuId": 823511237,
                "isAdded": 0
              },
              {
                "skuId": 823511242,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171213個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "51292398",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "e34dd20f15389c042b84ee4dc0183bcd"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:07:48.767Z",
        "updatedAt": "2024-09-17T21:07:48.767Z",
        "__v": 0
      },
      {
        "_id": "66e9efa85061b0c9599cbe64",
        "spuId": 69371982,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 69371982,
              "globalSpuId": 10005131508,
              "categoryId": 38,
              "level1CategoryId": 29,
              "level2CategoryId": 35,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20230613/357731f6459243c5aa515c78697c1448.jpg",
              "title": "Nike Court Vision 1 潮流舒適百搭 休閒 靈活適應 防滑耐磨 低幫 板鞋 男款 白色",
              "subTitle": "Nike Court Vision 1 潮流舒適百搭 休閒 靈活適應 防滑耐磨 低幫 板鞋 男款 白色",
              "authPrice": 81,
              "sellDate": "2023夏季",
              "sourceName": "default",
              "articleNumber": "DH2987-103",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 2,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230613/357731f6459243c5aa515c78697c1448.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230613/c0aedce083c94551a3b5b8f936932e17.jpg",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230613/000f8f89e0244368bb4df8ddf666d5b8.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230613/dcc214774947485d89ab571be8d6e199.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230613/f54faa27143249bf858ff25c138b17e2.jpg",
                  "imgType": 0,
                  "sort": 5,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "DH2987-103",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "發售日期",
                  "value": "2023夏季",
                  "defaultShow": 1
                },
                {
                  "key": "配色",
                  "value": "白色",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 377731522,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 0,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 363233100,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 363233101,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 363233102,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 363233103,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 363233104,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 363233105,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 363233106,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 363233107,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 363233108,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 363233109,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "45.5",
                  "propertyValueId": 429420091,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 370252604,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "47",
                  "propertyValueId": 371302672,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 4665,
                  "name": "尺碼",
                  "value": "47.5",
                  "propertyValueId": 371299170,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 14,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 5200,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 943048483,
                "spuId": 69371982,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 363233109
                  }
                ]
              },
              {
                "skuId": 943048484,
                "spuId": 69371982,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 363233102
                  }
                ]
              },
              {
                "skuId": 943048485,
                "spuId": 69371982,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 363233100
                  }
                ]
              },
              {
                "skuId": 943048486,
                "spuId": 69371982,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 363233108
                  }
                ]
              },
              {
                "skuId": 943048487,
                "spuId": 69371982,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 363233103
                  }
                ]
              },
              {
                "skuId": 943048488,
                "spuId": 69371982,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 363233106
                  }
                ]
              },
              {
                "skuId": 943048489,
                "spuId": 69371982,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 363233107
                  }
                ]
              },
              {
                "skuId": 943048490,
                "spuId": 69371982,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 363233101
                  }
                ]
              },
              {
                "skuId": 943048491,
                "spuId": 69371982,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 363233104
                  }
                ]
              },
              {
                "skuId": 943048492,
                "spuId": 69371982,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 363233105
                  }
                ]
              },
              {
                "skuId": 946055808,
                "spuId": 69371982,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 370252604
                  }
                ]
              },
              {
                "skuId": 946534138,
                "spuId": 69371982,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 371299170
                  }
                ]
              },
              {
                "skuId": 946535601,
                "spuId": 69371982,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 371302672
                  }
                ]
              },
              {
                "skuId": 949300205,
                "spuId": 69371982,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 377731522
                  }
                ]
              },
              {
                "skuId": 972298459,
                "spuId": 69371982,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 429420091
                  }
                ]
              }
            ],
            "styleMode": 1,
            "favoriteList": [
              {
                "skuId": 943048483,
                "isAdded": 0
              },
              {
                "skuId": 943048484,
                "isAdded": 0
              },
              {
                "skuId": 943048485,
                "isAdded": 0
              },
              {
                "skuId": 943048486,
                "isAdded": 0
              },
              {
                "skuId": 943048487,
                "isAdded": 0
              },
              {
                "skuId": 943048488,
                "isAdded": 0
              },
              {
                "skuId": 943048489,
                "isAdded": 0
              },
              {
                "skuId": 943048490,
                "isAdded": 0
              },
              {
                "skuId": 943048491,
                "isAdded": 0
              },
              {
                "skuId": 943048492,
                "isAdded": 0
              },
              {
                "skuId": 946055808,
                "isAdded": 0
              },
              {
                "skuId": 946534138,
                "isAdded": 0
              },
              {
                "skuId": 946535601,
                "isAdded": 0
              },
              {
                "skuId": 949300205,
                "isAdded": 0
              },
              {
                "skuId": 972298459,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171213個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "69371982",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "8f70a5a22e14cfca8dba6e6577aa7ea7"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:07:52.517Z",
        "updatedAt": "2024-09-17T21:07:52.517Z",
        "__v": 0
      },
      {
        "_id": "66e9efab5061b0c9599cbe72",
        "spuId": 68262133,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 68262133,
              "globalSpuId": 10004816023,
              "categoryId": 1001176,
              "level1CategoryId": 29,
              "level2CategoryId": 35,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20230528/f7c04adafb1844e19612ff5736c678cb.jpg",
              "title": "Nike Foamposite One \"Black and Varsity Purple\" 紫噴 茄子噴 耐磨 中幫 復古籃球鞋 男款 紫黑 2024版",
              "subTitle": "Nike Foamposite One \"Black and Varsity Purple\" 紫噴 茄子噴 耐磨 中幫 復古籃球鞋 男款 紫黑 2024版",
              "authPrice": 258,
              "sellDate": "2024.02.29",
              "sourceName": "default",
              "articleNumber": "FN5212-001",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 2,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 4593,
              "soldNum": 4593,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230528/f7c04adafb1844e19612ff5736c678cb.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240116/f7952f2664ae45f48b08906725caeec6.jpg",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230528/8eddb4b4cca64abf9d335d1d967b1b02.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230528/0286056ace954607a9c975387ea56eba.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230528/176581211aa2482192d5e76e42e86b06.jpg",
                  "imgType": 0,
                  "sort": 5,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20230528/89858748b4cf40ccbac7e37c92928f5f.jpg",
                  "imgType": 0,
                  "sort": 6,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "FN5212-001",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "配色",
                  "value": "紫黑",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 1012480,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 1065624613,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012480,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 343336779,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012480,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 343336782,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012480,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 343336785,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012480,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 343336788,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012480,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 343336791,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012480,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 343336794,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012480,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 343336797,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012480,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 343336801,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012480,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 343336802,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012480,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 343336803,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012480,
                  "name": "尺碼",
                  "value": "45.5",
                  "propertyValueId": 1065624628,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012480,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 343336804,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 14,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012480,
                  "name": "尺碼",
                  "value": "47.5",
                  "propertyValueId": 343336805,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 16,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012480,
                  "name": "尺碼",
                  "value": "48.5",
                  "propertyValueId": 343336806,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 18,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 14000,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 934132016,
                "spuId": 68262133,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343336805
                  }
                ]
              },
              {
                "skuId": 934132017,
                "spuId": 68262133,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343336803
                  }
                ]
              },
              {
                "skuId": 934132018,
                "spuId": 68262133,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343336804
                  }
                ]
              },
              {
                "skuId": 934132019,
                "spuId": 68262133,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343336782
                  }
                ]
              },
              {
                "skuId": 934132020,
                "spuId": 68262133,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343336801
                  }
                ]
              },
              {
                "skuId": 934132021,
                "spuId": 68262133,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343336794
                  }
                ]
              },
              {
                "skuId": 934132022,
                "spuId": 68262133,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343336785
                  }
                ]
              },
              {
                "skuId": 934132023,
                "spuId": 68262133,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343336791
                  }
                ]
              },
              {
                "skuId": 934132024,
                "spuId": 68262133,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343336802
                  }
                ]
              },
              {
                "skuId": 934132025,
                "spuId": 68262133,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343336779
                  }
                ]
              },
              {
                "skuId": 934132026,
                "spuId": 68262133,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343336788
                  }
                ]
              },
              {
                "skuId": 934132027,
                "spuId": 68262133,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343336806
                  }
                ]
              },
              {
                "skuId": 934132028,
                "spuId": 68262133,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 343336797
                  }
                ]
              },
              {
                "skuId": 1542979083,
                "spuId": 68262133,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1065624613
                  }
                ]
              },
              {
                "skuId": 1542979089,
                "spuId": 68262133,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1065624628
                  }
                ]
              }
            ],
            "styleMode": 1,
            "favoriteList": [
              {
                "skuId": 934132016,
                "isAdded": 0
              },
              {
                "skuId": 934132017,
                "isAdded": 0
              },
              {
                "skuId": 934132018,
                "isAdded": 0
              },
              {
                "skuId": 934132019,
                "isAdded": 0
              },
              {
                "skuId": 934132020,
                "isAdded": 0
              },
              {
                "skuId": 934132021,
                "isAdded": 0
              },
              {
                "skuId": 934132022,
                "isAdded": 0
              },
              {
                "skuId": 934132023,
                "isAdded": 0
              },
              {
                "skuId": 934132024,
                "isAdded": 0
              },
              {
                "skuId": 934132025,
                "isAdded": 0
              },
              {
                "skuId": 934132026,
                "isAdded": 0
              },
              {
                "skuId": 934132027,
                "isAdded": 0
              },
              {
                "skuId": 934132028,
                "isAdded": 0
              },
              {
                "skuId": 1542979083,
                "isAdded": 0
              },
              {
                "skuId": 1542979089,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171213個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "68262133",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "7fd04ccf788f80bd04703d7536f327a7"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:07:55.830Z",
        "updatedAt": "2024-09-17T21:07:55.830Z",
        "__v": 0
      },
      {
        "_id": "66e9efaf5061b0c9599cbe78",
        "spuId": 61887044,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 61887044,
              "globalSpuId": 10003439388,
              "categoryId": 33,
              "level1CategoryId": 29,
              "level2CategoryId": 30,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20220923/7ecc1256a4df4b9182dc9ac0221ffb7f.jpg",
              "title": "Nike Run Swift 2 織物減震防滑耐磨 低幫跑步鞋 男款 白色",
              "subTitle": "Nike Run Swift 2 織物減震防滑耐磨 低幫跑步鞋 男款 白色",
              "authPrice": 91,
              "sellDate": "2022秋季",
              "sourceName": "default",
              "articleNumber": "CU3517-101",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 2,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240718/0e5605d246824edd83b494d3efec8835.jpg",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240718/f4077e77763d4fd7b35382921fbc667e.jpg",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240718/39bce78c1bb84306922147154dddf0df.jpg",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240718/7f5e420a1de14d60822f416ecd2abe25.jpg",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240718/16b42c711a2845a792bce747f2baa729.jpg",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240718/56c3fe44c8d1497f8843d98fe3873e10.jpg",
                  "sort": 10000
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "CU3517-101",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "發售日期",
                  "value": "2022秋季",
                  "defaultShow": 1
                },
                {
                  "key": "配色",
                  "value": "白色",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 243502707,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 243502708,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 243502709,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 243502710,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 243502711,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 243502712,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 243502713,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 243502714,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 243502715,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 243502716,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 14,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 243502717,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 15,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 243502718,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 17,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "47.5",
                  "propertyValueId": 243502719,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 19,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "48.5",
                  "propertyValueId": 243502720,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 21,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 5100,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 889780813,
                "spuId": 61887044,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243502717
                  }
                ]
              },
              {
                "skuId": 889780814,
                "spuId": 61887044,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243502714
                  }
                ]
              },
              {
                "skuId": 889780815,
                "spuId": 61887044,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243502715
                  }
                ]
              },
              {
                "skuId": 889780816,
                "spuId": 61887044,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243502716
                  }
                ]
              },
              {
                "skuId": 889780817,
                "spuId": 61887044,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243502718
                  }
                ]
              },
              {
                "skuId": 889780818,
                "spuId": 61887044,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243502719
                  }
                ]
              },
              {
                "skuId": 889780819,
                "spuId": 61887044,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243502720
                  }
                ]
              },
              {
                "skuId": 889780820,
                "spuId": 61887044,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243502707
                  }
                ]
              },
              {
                "skuId": 889780821,
                "spuId": 61887044,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243502708
                  }
                ]
              },
              {
                "skuId": 889780822,
                "spuId": 61887044,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243502710
                  }
                ]
              },
              {
                "skuId": 889780823,
                "spuId": 61887044,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243502709
                  }
                ]
              },
              {
                "skuId": 889780824,
                "spuId": 61887044,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243502711
                  }
                ]
              },
              {
                "skuId": 889780825,
                "spuId": 61887044,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243502712
                  }
                ]
              },
              {
                "skuId": 889780826,
                "spuId": 61887044,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 243502713
                  }
                ]
              }
            ],
            "styleMode": 1,
            "favoriteList": [
              {
                "skuId": 889780813,
                "isAdded": 0
              },
              {
                "skuId": 889780814,
                "isAdded": 0
              },
              {
                "skuId": 889780815,
                "isAdded": 0
              },
              {
                "skuId": 889780816,
                "isAdded": 0
              },
              {
                "skuId": 889780817,
                "isAdded": 0
              },
              {
                "skuId": 889780818,
                "isAdded": 0
              },
              {
                "skuId": 889780819,
                "isAdded": 0
              },
              {
                "skuId": 889780820,
                "isAdded": 0
              },
              {
                "skuId": 889780821,
                "isAdded": 0
              },
              {
                "skuId": 889780822,
                "isAdded": 0
              },
              {
                "skuId": 889780823,
                "isAdded": 0
              },
              {
                "skuId": 889780824,
                "isAdded": 0
              },
              {
                "skuId": 889780825,
                "isAdded": 0
              },
              {
                "skuId": 889780826,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171213個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "61887044",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "0667f2d9ede1c9b9ce1370fc2b660925"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:07:59.588Z",
        "updatedAt": "2024-09-17T21:07:59.588Z",
        "__v": 0
      },
      {
        "_id": "66e9efb45061b0c9599cbe81",
        "spuId": 53017531,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 53017531,
              "globalSpuId": 10002691329,
              "categoryId": 1001189,
              "level1CategoryId": 29,
              "level2CategoryId": 35,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20220407/28b20b7f8d454107b47fbf4b0b018133.jpg",
              "title": "Nike Air Max Dawn 織物皮革 運動舒適 減震防滑耐磨 低幫 生活休閑鞋 男款 白綠色",
              "subTitle": "Nike Air Max Dawn 織物皮革 運動舒適 減震防滑耐磨 低幫 生活休閑鞋 男款 白綠色",
              "authPrice": 137,
              "sellDate": "2022春季",
              "sourceName": "default",
              "articleNumber": "DV3489-100",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 2,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220407/28b20b7f8d454107b47fbf4b0b018133.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220407/7d6078143e40442d937de73169230e9b.jpg",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220407/de92efcf83c744f487fa3c7465cc13e6.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220407/25610504637b44219e8986c59507b44a.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220407/6a95ee8805f345dcbeba8863ac32cdc2.jpg",
                  "imgType": 0,
                  "sort": 5,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220407/044a3b7d00434b40b65e9c3dcfa1215c.jpg",
                  "imgType": 0,
                  "sort": 6,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "DV3489-100",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "發售日期",
                  "value": "2022春季",
                  "defaultShow": 1
                },
                {
                  "key": "配色",
                  "value": "白/綠",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 106084985,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 106084986,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 106084987,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 106084988,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 106084989,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 106084990,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 106084991,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 106084992,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 106084993,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 106084994,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 106084995,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 106084996,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "47.5",
                  "propertyValueId": 106084997,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 15,
                  "definitionId": 6
                },
                {
                  "propertyId": 1012485,
                  "name": "尺碼",
                  "value": "48.5",
                  "propertyValueId": 106084998,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 17,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 5600,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 824881166,
                "spuId": 53017531,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 106084991
                  }
                ]
              },
              {
                "skuId": 824881167,
                "spuId": 53017531,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 106084994
                  }
                ]
              },
              {
                "skuId": 824881168,
                "spuId": 53017531,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 106084996
                  }
                ]
              },
              {
                "skuId": 824881169,
                "spuId": 53017531,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 106084995
                  }
                ]
              },
              {
                "skuId": 824881170,
                "spuId": 53017531,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 106084986
                  }
                ]
              },
              {
                "skuId": 824881171,
                "spuId": 53017531,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 106084987
                  }
                ]
              },
              {
                "skuId": 824881172,
                "spuId": 53017531,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 106084992
                  }
                ]
              },
              {
                "skuId": 824881173,
                "spuId": 53017531,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 106084993
                  }
                ]
              },
              {
                "skuId": 824881174,
                "spuId": 53017531,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 106084989
                  }
                ]
              },
              {
                "skuId": 824881175,
                "spuId": 53017531,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 106084990
                  }
                ]
              },
              {
                "skuId": 824881176,
                "spuId": 53017531,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 106084988
                  }
                ]
              },
              {
                "skuId": 824881177,
                "spuId": 53017531,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 106084998
                  }
                ]
              },
              {
                "skuId": 824881178,
                "spuId": 53017531,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 106084997
                  }
                ]
              },
              {
                "skuId": 824881179,
                "spuId": 53017531,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 106084985
                  }
                ]
              }
            ],
            "styleMode": 1,
            "favoriteList": [
              {
                "skuId": 824881166,
                "isAdded": 0
              },
              {
                "skuId": 824881167,
                "isAdded": 0
              },
              {
                "skuId": 824881168,
                "isAdded": 0
              },
              {
                "skuId": 824881169,
                "isAdded": 0
              },
              {
                "skuId": 824881170,
                "isAdded": 0
              },
              {
                "skuId": 824881171,
                "isAdded": 0
              },
              {
                "skuId": 824881172,
                "isAdded": 0
              },
              {
                "skuId": 824881173,
                "isAdded": 0
              },
              {
                "skuId": 824881174,
                "isAdded": 0
              },
              {
                "skuId": 824881175,
                "isAdded": 0
              },
              {
                "skuId": 824881176,
                "isAdded": 0
              },
              {
                "skuId": 824881177,
                "isAdded": 0
              },
              {
                "skuId": 824881178,
                "isAdded": 0
              },
              {
                "skuId": 824881179,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171213個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "53017531",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "864d34a774206eb45aa37609d7fb1194"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:08:04.403Z",
        "updatedAt": "2024-09-17T21:08:04.403Z",
        "__v": 0
      },
      {
        "_id": "66e9efb85061b0c9599cbe86",
        "spuId": 611248358,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 611248358,
              "globalSpuId": 12005015032,
              "categoryId": 31,
              "level1CategoryId": 29,
              "level2CategoryId": 30,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20240703/25c8fb4d1f4040239353e650178e9d0f.jpg",
              "title": "Nike Air Zoom GT Hustle 3 舒適輕盈 防滑耐磨 中幫 籃球鞋 男女同款 粉紫色",
              "subTitle": "Nike Air Zoom GT Hustle 3 舒適輕盈 防滑耐磨 中幫 籃球鞋 男女同款 粉紫色",
              "authPrice": 200,
              "sellDate": "2024夏季",
              "sourceName": "default",
              "articleNumber": "FV5952-601",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 1,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 1632733367,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240703/25c8fb4d1f4040239353e650178e9d0f.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1632733367,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240703/2f38c5c37fe04af8b43c74a35982a941.jpg",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1632733367,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240703/54cda7dc00384383a229f1cc8059d675.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1632733367,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240703/7fcfc9dd5a97442d8f6e3cfa138f30ec.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1632733367,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240703/cf7f8b7184cc4916972501d1f19a1c65.jpg",
                  "imgType": 0,
                  "sort": 5,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "FV5952-601",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "配色",
                  "value": "粉色/紫色",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "35.5",
                  "propertyValueId": 1632733368,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 0,
                  "definitionId": 6
                },
                {
                  "propertyId": 3422,
                  "name": "顏色",
                  "value": "粉色/紫色",
                  "propertyValueId": 1632733367,
                  "level": 1,
                  "customValue": "粉色/紫色",
                  "showValue": 0,
                  "sort": 1,
                  "definitionId": 1
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "36",
                  "propertyValueId": 1632733369,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "36.5",
                  "propertyValueId": 1632733370,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "37.5",
                  "propertyValueId": 1632733371,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "38",
                  "propertyValueId": 1632733372,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 1632733373,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 1632733374,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 1632733375,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 1632733376,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 1632733377,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 1632733378,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 1632733379,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 1632733380,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 1632733381,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 1632733382,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 14,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 1632733383,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 15,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "45.5",
                  "propertyValueId": 1632733384,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 16,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 1632733385,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 17,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "47",
                  "propertyValueId": 1632733386,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 18,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "47.5",
                  "propertyValueId": 1632733387,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 19,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "48",
                  "propertyValueId": 1632733388,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 20,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "48.5",
                  "propertyValueId": 1632733389,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 21,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "49",
                  "propertyValueId": 1632733390,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 22,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "49.5",
                  "propertyValueId": 1632733391,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 23,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "50",
                  "propertyValueId": 1632733392,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 24,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "50.5",
                  "propertyValueId": 1632733393,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 25,
                  "definitionId": 6
                },
                {
                  "propertyId": 4663,
                  "name": "尺碼",
                  "value": "51.5",
                  "propertyValueId": 1632733394,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 26,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 10600,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 1915798289,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733388
                  }
                ]
              },
              {
                "skuId": 1915798290,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733384
                  }
                ]
              },
              {
                "skuId": 1915798291,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733368
                  }
                ]
              },
              {
                "skuId": 1915798292,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733383
                  }
                ]
              },
              {
                "skuId": 1915798293,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733387
                  }
                ]
              },
              {
                "skuId": 1915798294,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733376
                  }
                ]
              },
              {
                "skuId": 1915798295,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733386
                  }
                ]
              },
              {
                "skuId": 1915798296,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733393
                  }
                ]
              },
              {
                "skuId": 1915798297,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733394
                  }
                ]
              },
              {
                "skuId": 1915798298,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733369
                  }
                ]
              },
              {
                "skuId": 1915798299,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733385
                  }
                ]
              },
              {
                "skuId": 1915798300,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733374
                  }
                ]
              },
              {
                "skuId": 1915798301,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733382
                  }
                ]
              },
              {
                "skuId": 1915798302,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733377
                  }
                ]
              },
              {
                "skuId": 1915798303,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733391
                  }
                ]
              },
              {
                "skuId": 1915798304,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733380
                  }
                ]
              },
              {
                "skuId": 1915798305,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733372
                  }
                ]
              },
              {
                "skuId": 1915798306,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733371
                  }
                ]
              },
              {
                "skuId": 1915798307,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733375
                  }
                ]
              },
              {
                "skuId": 1915798308,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733370
                  }
                ]
              },
              {
                "skuId": 1915798309,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733381
                  }
                ]
              },
              {
                "skuId": 1915798310,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733392
                  }
                ]
              },
              {
                "skuId": 1915798311,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733378
                  }
                ]
              },
              {
                "skuId": 1915798312,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733389
                  }
                ]
              },
              {
                "skuId": 1915798313,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733373
                  }
                ]
              },
              {
                "skuId": 1915798314,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733390
                  }
                ]
              },
              {
                "skuId": 1915798315,
                "spuId": 611248358,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1632733367
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1632733379
                  }
                ]
              }
            ],
            "styleMode": 2,
            "favoriteList": [
              {
                "skuId": 1915798289,
                "isAdded": 0
              },
              {
                "skuId": 1915798290,
                "isAdded": 0
              },
              {
                "skuId": 1915798291,
                "isAdded": 0
              },
              {
                "skuId": 1915798292,
                "isAdded": 0
              },
              {
                "skuId": 1915798293,
                "isAdded": 0
              },
              {
                "skuId": 1915798294,
                "isAdded": 0
              },
              {
                "skuId": 1915798295,
                "isAdded": 0
              },
              {
                "skuId": 1915798296,
                "isAdded": 0
              },
              {
                "skuId": 1915798297,
                "isAdded": 0
              },
              {
                "skuId": 1915798298,
                "isAdded": 0
              },
              {
                "skuId": 1915798299,
                "isAdded": 0
              },
              {
                "skuId": 1915798300,
                "isAdded": 0
              },
              {
                "skuId": 1915798301,
                "isAdded": 0
              },
              {
                "skuId": 1915798302,
                "isAdded": 0
              },
              {
                "skuId": 1915798303,
                "isAdded": 0
              },
              {
                "skuId": 1915798304,
                "isAdded": 0
              },
              {
                "skuId": 1915798305,
                "isAdded": 0
              },
              {
                "skuId": 1915798306,
                "isAdded": 0
              },
              {
                "skuId": 1915798307,
                "isAdded": 0
              },
              {
                "skuId": 1915798308,
                "isAdded": 0
              },
              {
                "skuId": 1915798309,
                "isAdded": 0
              },
              {
                "skuId": 1915798310,
                "isAdded": 0
              },
              {
                "skuId": 1915798311,
                "isAdded": 0
              },
              {
                "skuId": 1915798312,
                "isAdded": 0
              },
              {
                "skuId": 1915798313,
                "isAdded": 0
              },
              {
                "skuId": 1915798314,
                "isAdded": 0
              },
              {
                "skuId": 1915798315,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171213個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "611248358",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "51242299f4269434d852d06a21ea34ce"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:08:08.536Z",
        "updatedAt": "2024-09-17T21:08:08.536Z",
        "__v": 0
      },
      {
        "_id": "66e9efbc5061b0c9599cbe8b",
        "spuId": 608196097,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 608196097,
              "globalSpuId": 12004518188,
              "categoryId": 46,
              "level1CategoryId": 29,
              "level2CategoryId": 410,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20240616/c4d3e302d7974f26b904cfef3dd72301.jpg",
              "title": "Nike Offcourt Adjust Slide 舒適輕盈 防滑防磨一字拖鞋 女款 白粉",
              "subTitle": "Nike Offcourt Adjust Slide 舒適輕盈 防滑防磨一字拖鞋 女款 白粉",
              "authPrice": 46,
              "sellDate": "0002.11.30",
              "sourceName": "default",
              "articleNumber": "DV1033-102",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 3,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 1576278181,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240616/c4d3e302d7974f26b904cfef3dd72301.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1576278181,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240616/e7e2b45091c74f84bf8afbdacf6b25c8.jpg",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1576278181,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240616/1bc3170472c94823afd5d8441e2f8aee.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1576278181,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240616/e611c6d7ff8046be9902d5d189e73eb4.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                },
                {
                  "propertyValueId": 1576278181,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240616/809fa3d595b141ac9ca32dd41ad1ea1a.jpg",
                  "imgType": 0,
                  "sort": 5,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "DV1033-102",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "發售日期",
                  "value": "0002.11.30",
                  "defaultShow": 1
                },
                {
                  "key": "配色",
                  "value": "帆白/紫菀粉",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 4670,
                  "name": "尺碼",
                  "value": "35.5",
                  "propertyValueId": 1576278182,
                  "level": 2,
                  "customValue": "",
                  "showValue": 0,
                  "sort": 0,
                  "definitionId": 6
                },
                {
                  "propertyId": 4055,
                  "name": "顏色",
                  "value": "帆白/帆白/紫菀粉",
                  "propertyValueId": 1576278181,
                  "level": 1,
                  "customValue": "帆白/帆白/紫菀粉",
                  "showValue": 0,
                  "sort": 1,
                  "definitionId": 1
                },
                {
                  "propertyId": 4670,
                  "name": "尺碼",
                  "value": "36.5",
                  "propertyValueId": 1576278183,
                  "level": 2,
                  "customValue": "",
                  "showValue": 0,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 4670,
                  "name": "尺碼",
                  "value": "38",
                  "propertyValueId": 1576278184,
                  "level": 2,
                  "customValue": "",
                  "showValue": 0,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 4670,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 1576278185,
                  "level": 2,
                  "customValue": "",
                  "showValue": 0,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 4670,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 1576278186,
                  "level": 2,
                  "customValue": "",
                  "showValue": 0,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 4670,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 1576278187,
                  "level": 2,
                  "customValue": "",
                  "showValue": 0,
                  "sort": 10,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 2300,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 1869964024,
                "spuId": 608196097,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1576278181
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1576278187
                  }
                ]
              },
              {
                "skuId": 1869964025,
                "spuId": 608196097,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1576278181
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1576278184
                  }
                ]
              },
              {
                "skuId": 1869964026,
                "spuId": 608196097,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1576278181
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1576278185
                  }
                ]
              },
              {
                "skuId": 1869964027,
                "spuId": 608196097,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1576278181
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1576278186
                  }
                ]
              },
              {
                "skuId": 1869964028,
                "spuId": 608196097,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1576278181
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1576278183
                  }
                ]
              },
              {
                "skuId": 1869964029,
                "spuId": 608196097,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1576278181
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1576278182
                  }
                ]
              }
            ],
            "styleMode": 2,
            "favoriteList": [
              {
                "skuId": 1869964024,
                "isAdded": 0
              },
              {
                "skuId": 1869964025,
                "isAdded": 0
              },
              {
                "skuId": 1869964026,
                "isAdded": 0
              },
              {
                "skuId": 1869964027,
                "isAdded": 0
              },
              {
                "skuId": 1869964028,
                "isAdded": 0
              },
              {
                "skuId": 1869964029,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171213個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "608196097",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "8abf97fd137bb0c921bb54131980a612"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:08:12.390Z",
        "updatedAt": "2024-09-17T21:08:12.390Z",
        "__v": 0
      },
      {
        "_id": "66e9efc45061b0c9599cbe90",
        "spuId": 591462803,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 591462803,
              "globalSpuId": 12003012535,
              "categoryId": 33,
              "level1CategoryId": 29,
              "level2CategoryId": 30,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20240412/0823953af2b6435f86bb55bf8a2a984f.jpg",
              "title": "Nike Pegasus 41 輕便回彈耐磨透氣 低幫跑步鞋 男款 綠色",
              "subTitle": "Nike Pegasus 41 輕便回彈耐磨透氣 低幫跑步鞋 男款 綠色",
              "authPrice": 154,
              "sellDate": "2024.06.05",
              "sourceName": "default",
              "articleNumber": "FD2722-701",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 2,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240412/0823953af2b6435f86bb55bf8a2a984f.jpg",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240412/14d8db3d25134a3eb0ffce1981d56a9a.jpg",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240412/391677109634444b96a216b8671b1112.jpg",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240412/51cccd63d46745bfae685a28a0fc73cd.jpg",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240412/23073da98f664433a46fbd6ec497a530.jpg",
                  "sort": 10000
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240412/e9865eaaa40644ca854a6f231bd7f08d.jpg",
                  "sort": 10000
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "FD2722-701",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "發售日期",
                  "value": "2024.06.05",
                  "defaultShow": 1
                },
                {
                  "key": "配色",
                  "value": "綠色",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "36.5",
                  "propertyValueId": 1262435521,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 0,
                  "definitionId": 6
                },
                {
                  "propertyId": 4366,
                  "name": "顏色",
                  "value": "綠色",
                  "propertyValueId": 1262435520,
                  "level": 1,
                  "customValue": "綠色",
                  "showValue": 0,
                  "sort": 1,
                  "definitionId": 1
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "37.5",
                  "propertyValueId": 1262435522,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38",
                  "propertyValueId": 1262435523,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 1262435524,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 1262435525,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 1262435526,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 1262435527,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 1262435528,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 1262435529,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 1262435530,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 1262435531,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 1262435532,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 1262435533,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 1262435534,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 1262435535,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 14,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "47.5",
                  "propertyValueId": 1262435536,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 15,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "48.5",
                  "propertyValueId": 1262435537,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 16,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "49",
                  "propertyValueId": 1262435538,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 17,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "49.5",
                  "propertyValueId": 1262435539,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 18,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "50",
                  "propertyValueId": 1262435540,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 19,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "50.5",
                  "propertyValueId": 1262435541,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 20,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "51",
                  "propertyValueId": 1262435542,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 21,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "51.5",
                  "propertyValueId": 1262435543,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 22,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "36",
                  "propertyValueId": 1561046688,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 23,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "45.5",
                  "propertyValueId": 1643262598,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 24,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "47",
                  "propertyValueId": 1704694628,
                  "level": 2,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 25,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 11500,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 1672355563,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435537
                  }
                ]
              },
              {
                "skuId": 1672355565,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435539
                  }
                ]
              },
              {
                "skuId": 1672355566,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435540
                  }
                ]
              },
              {
                "skuId": 1672355567,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435541
                  }
                ]
              },
              {
                "skuId": 1672355568,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435527
                  }
                ]
              },
              {
                "skuId": 1672355569,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435528
                  }
                ]
              },
              {
                "skuId": 1672355570,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435530
                  }
                ]
              },
              {
                "skuId": 1672355571,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435529
                  }
                ]
              },
              {
                "skuId": 1672355572,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435526
                  }
                ]
              },
              {
                "skuId": 1672355573,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435542
                  }
                ]
              },
              {
                "skuId": 1672355574,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435531
                  }
                ]
              },
              {
                "skuId": 1672355575,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435532
                  }
                ]
              },
              {
                "skuId": 1672355576,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435543
                  }
                ]
              },
              {
                "skuId": 1672355577,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435521
                  }
                ]
              },
              {
                "skuId": 1672355578,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435533
                  }
                ]
              },
              {
                "skuId": 1672355579,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435522
                  }
                ]
              },
              {
                "skuId": 1672355580,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435535
                  }
                ]
              },
              {
                "skuId": 1672355581,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435524
                  }
                ]
              },
              {
                "skuId": 1672355582,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435523
                  }
                ]
              },
              {
                "skuId": 1672355583,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435534
                  }
                ]
              },
              {
                "skuId": 1672355584,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435536
                  }
                ]
              },
              {
                "skuId": 1672355585,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1262435525
                  }
                ]
              },
              {
                "skuId": 1857977098,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1561046688
                  }
                ]
              },
              {
                "skuId": 1923889802,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1643262598
                  }
                ]
              },
              {
                "skuId": 1980431761,
                "spuId": 591462803,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 1262435520
                  },
                  {
                    "level": 2,
                    "propertyValueId": 1704694628
                  }
                ]
              }
            ],
            "styleMode": 2,
            "favoriteList": [
              {
                "skuId": 1672355563,
                "isAdded": 0
              },
              {
                "skuId": 1672355565,
                "isAdded": 0
              },
              {
                "skuId": 1672355566,
                "isAdded": 0
              },
              {
                "skuId": 1672355567,
                "isAdded": 0
              },
              {
                "skuId": 1672355568,
                "isAdded": 0
              },
              {
                "skuId": 1672355569,
                "isAdded": 0
              },
              {
                "skuId": 1672355570,
                "isAdded": 0
              },
              {
                "skuId": 1672355571,
                "isAdded": 0
              },
              {
                "skuId": 1672355572,
                "isAdded": 0
              },
              {
                "skuId": 1672355573,
                "isAdded": 0
              },
              {
                "skuId": 1672355574,
                "isAdded": 0
              },
              {
                "skuId": 1672355575,
                "isAdded": 0
              },
              {
                "skuId": 1672355576,
                "isAdded": 0
              },
              {
                "skuId": 1672355577,
                "isAdded": 0
              },
              {
                "skuId": 1672355578,
                "isAdded": 0
              },
              {
                "skuId": 1672355579,
                "isAdded": 0
              },
              {
                "skuId": 1672355580,
                "isAdded": 0
              },
              {
                "skuId": 1672355581,
                "isAdded": 0
              },
              {
                "skuId": 1672355582,
                "isAdded": 0
              },
              {
                "skuId": 1672355583,
                "isAdded": 0
              },
              {
                "skuId": 1672355584,
                "isAdded": 0
              },
              {
                "skuId": 1672355585,
                "isAdded": 0
              },
              {
                "skuId": 1857977098,
                "isAdded": 0
              },
              {
                "skuId": 1923889802,
                "isAdded": 0
              },
              {
                "skuId": 1980431761,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171421個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "591462803",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "d4baad0013cbaacf2275d8fb83bf1399"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:08:20.437Z",
        "updatedAt": "2024-09-18T06:45:52.968Z",
        "__v": 0
      },
      {
        "_id": "66e9efcb5061b0c9599cbe95",
        "spuId": 61679627,
        "detail": {
          "code": 200,
          "msg": "success",
          "data": {
            "detail": {
              "spuId": 61679627,
              "globalSpuId": 10003388425,
              "categoryId": 33,
              "level1CategoryId": 29,
              "level2CategoryId": 30,
              "brandId": 144,
              "relationBrandIds": [],
              "logoUrl": "https://cdn.poizzzzon.com/pro-img/origin-img/20220916/259b9e986203411e99ca835220b494d8.jpg",
              "title": "Nike Air Zoom Maxfly 競速防滑透氣 低幫 碳板 訓練跑步鞋 男女同款 紅色",
              "subTitle": "Nike Air Zoom Maxfly 競速防滑透氣 低幫 碳板 訓練跑步鞋 男女同款 紅色",
              "authPrice": 259,
              "sellDate": "2022秋季",
              "sourceName": "default",
              "articleNumber": "DH5359-600",
              "articleNumbers": [],
              "isShow": 1,
              "fitId": 1,
              "defaultSkuId": 0,
              "goodsType": 0,
              "heat": 0,
              "soldNum": 0,
              "limitOffer": 0,
              "areaName": "TW",
              "language": "zh-TW2",
              "status": 1,
              "buyStatus": 0,
              "showSizeTableTips": 0,
              "sizeTableTips": "",
              "showSpuSizeApply": 1,
              "reminder": "",
              "createdBy": "DEWU",
              "areaId": 4,
              "bagWatchAccessory": false,
              "showSizeGuide": 1
            },
            "spuImage": {
              "images": [
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240718/19cfad1e08d94b35a6a351f386d9ae5b.jpg",
                  "imgType": 0,
                  "sort": 1,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20240718/68b43851839c432cb8cb6c1cc806b2c0.png",
                  "imgType": 0,
                  "sort": 2,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220916/bbfa6de6fb9b4de2a5db757f9aa94110.jpg",
                  "imgType": 0,
                  "sort": 3,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20220916/b9a8005476a444d294b6c3a9bd7dfbb6.jpg",
                  "imgType": 0,
                  "sort": 4,
                  "isShow": 1
                },
                {
                  "propertyValueId": 0,
                  "url": "https://cdn.poizzzzon.com/pro-img/origin-img/20231226/2120d5c598214032883ccfa7494eff96.jpg",
                  "imgType": 0,
                  "sort": 5,
                  "isShow": 1
                }
              ]
            },
            "baseProperties": {
              "brandList": [
                {
                  "brandId": 144,
                  "brandName": "Nike"
                }
              ],
              "list": [
                {
                  "key": "主貨號",
                  "value": "DH5359-600",
                  "name": "primary",
                  "defaultShow": 1,
                  "supportCopy": 1
                },
                {
                  "key": "發售日期",
                  "value": "2022秋季",
                  "defaultShow": 1
                },
                {
                  "key": "配色",
                  "value": "紅色",
                  "defaultShow": 0
                }
              ]
            },
            "saleProperties": {
              "list": [
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "36",
                  "propertyValueId": 240436681,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 1,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "36.5",
                  "propertyValueId": 240436682,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 2,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "37.5",
                  "propertyValueId": 240436683,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 3,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38",
                  "propertyValueId": 240436684,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 4,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "38.5",
                  "propertyValueId": 240436685,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 5,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "39",
                  "propertyValueId": 240436686,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 6,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40",
                  "propertyValueId": 240436687,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 7,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "40.5",
                  "propertyValueId": 240436688,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 8,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "41",
                  "propertyValueId": 240436689,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 9,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42",
                  "propertyValueId": 240436690,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 10,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "42.5",
                  "propertyValueId": 240436691,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 11,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "43",
                  "propertyValueId": 240436692,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 12,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44",
                  "propertyValueId": 240436693,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 13,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "44.5",
                  "propertyValueId": 240436694,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 14,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "45",
                  "propertyValueId": 240436695,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 15,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "45.5",
                  "propertyValueId": 246047010,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 16,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "46",
                  "propertyValueId": 240436696,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 17,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "47",
                  "propertyValueId": 282009802,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 18,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "47.5",
                  "propertyValueId": 240436697,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 19,
                  "definitionId": 6
                },
                {
                  "propertyId": 3424,
                  "name": "尺碼",
                  "value": "48.5",
                  "propertyValueId": 240436698,
                  "level": 1,
                  "customValue": "",
                  "showValue": 1,
                  "sort": 21,
                  "definitionId": 6
                }
              ]
            },
            "item": {
              "price": 16300,
              "maxPrice": 0
            },
            "skus": [
              {
                "skuId": 887884206,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436697
                  }
                ]
              },
              {
                "skuId": 887884207,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436691
                  }
                ]
              },
              {
                "skuId": 887884208,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436690
                  }
                ]
              },
              {
                "skuId": 887884209,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436692
                  }
                ]
              },
              {
                "skuId": 887884210,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436689
                  }
                ]
              },
              {
                "skuId": 887884211,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436687
                  }
                ]
              },
              {
                "skuId": 887884212,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436686
                  }
                ]
              },
              {
                "skuId": 887884213,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436694
                  }
                ]
              },
              {
                "skuId": 887884214,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436693
                  }
                ]
              },
              {
                "skuId": 887884215,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436688
                  }
                ]
              },
              {
                "skuId": 887884216,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436698
                  }
                ]
              },
              {
                "skuId": 887884217,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436696
                  }
                ]
              },
              {
                "skuId": 887884218,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436695
                  }
                ]
              },
              {
                "skuId": 887884219,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436685
                  }
                ]
              },
              {
                "skuId": 887884220,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436684
                  }
                ]
              },
              {
                "skuId": 887884221,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436683
                  }
                ]
              },
              {
                "skuId": 887884222,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436682
                  }
                ]
              },
              {
                "skuId": 887884223,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 240436681
                  }
                ]
              },
              {
                "skuId": 891013580,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 246047010
                  }
                ]
              },
              {
                "skuId": 907011615,
                "spuId": 61679627,
                "authPrice": 0,
                "status": 1,
                "properties": [
                  {
                    "level": 1,
                    "propertyValueId": 282009802
                  }
                ]
              }
            ],
            "styleMode": 1,
            "favoriteList": [
              {
                "skuId": 887884206,
                "isAdded": 0
              },
              {
                "skuId": 887884207,
                "isAdded": 0
              },
              {
                "skuId": 887884208,
                "isAdded": 0
              },
              {
                "skuId": 887884209,
                "isAdded": 0
              },
              {
                "skuId": 887884210,
                "isAdded": 0
              },
              {
                "skuId": 887884211,
                "isAdded": 0
              },
              {
                "skuId": 887884212,
                "isAdded": 0
              },
              {
                "skuId": 887884213,
                "isAdded": 0
              },
              {
                "skuId": 887884214,
                "isAdded": 0
              },
              {
                "skuId": 887884215,
                "isAdded": 0
              },
              {
                "skuId": 887884216,
                "isAdded": 0
              },
              {
                "skuId": 887884217,
                "isAdded": 0
              },
              {
                "skuId": 887884218,
                "isAdded": 0
              },
              {
                "skuId": 887884219,
                "isAdded": 0
              },
              {
                "skuId": 887884220,
                "isAdded": 0
              },
              {
                "skuId": 887884221,
                "isAdded": 0
              },
              {
                "skuId": 887884222,
                "isAdded": 0
              },
              {
                "skuId": 887884223,
                "isAdded": 0
              },
              {
                "skuId": 891013580,
                "isAdded": 0
              },
              {
                "skuId": 907011615,
                "isAdded": 0
              }
            ],
            "sizeKey": "EU歐碼",
            "branding": {
              "logo": "https://cdn.poizzzzon.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwMjIlRTUlQTQlODclRTQlQkIlQkQlMjAyQDN4MTYyMjcxMjU5MDIwNA==.png",
              "routerUrl": "https://asia-east-public.poizon.com/overseas/product/publicity?area=TW&lang=zh-TW2"
            },
            "brandSpu": {
              "brandLogoUrl": "https://cdn.poizzzzon.com/pro-img/cut-img/20240809/7aa64ce8f1db4d7ab57e0f685fc87499.jpg",
              "brandId": 144,
              "brandName": "Nike",
              "topLogoUrls": [
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240914/0b3c50c855b9430192b28afe0fdeb6dd.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20240413/a7d83156adbc4ec6aedb6deae0aab608.jpg",
                "https://cdn.poizzzzon.com/pro-img/origin-img/20230801/d0686833ede446318e6a7809ac2b308d.jpg"
              ],
              "totalSoldCount": "共有171423個商品",
              "viewText": "立即查看",
              "appForwardUrl": "/sell/brandProductList"
            },
            "breakCode": false
          },
          "status": 200
        },
        "auth": {
          "path": "https://asia-east-public.poizon.com/api/v1/h5/adapter/center/oversea/get-index-spu-share-detail",
          "body": {
            "spuId": "61679627",
            "countryCode": "TW",
            "language": "zh-TW2",
            "sign": "4bc8ab63cf7d8c4e364edc7767573f51"
          },
          "headers": {
            "host": "asia-east-public.poizon.com",
            "x-real-ip": "91.236.247.161, 91.236.247.161",
            "x-forwarded-for": "91.236.247.161, 91.236.247.161",
            "x-forwarded-proto": "https",
            "content-type": "application/json;charset=utf-8",
            "appid": "h5",
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru",
            "origin": "https://globalpoizonx.com",
            "region": "TW",
            "language": "zh-TW2",
            "timezone": "GMT-07:00",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1",
            "referer": "https://globalpoizonx.com/"
          }
        },
        "createdAt": "2024-09-17T21:08:27.243Z",
        "updatedAt": "2024-09-18T06:45:56.949Z",
        "__v": 0
      }
    ]

    productsItems = [...productsItems, ...[...Array(15)]];

    if (productsSlice[trimCollectionValue]?.length && products?.items?.length < 60 && !isLoading && !loading) {
      productsItems = productsSlice[trimCollectionValue]
    }

    if (!productsSlice[trimCollectionValue]?.length && !loading && !isLoading) {
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
      setSelectedProduct(item?.detail?.data);
      const spuId = item?.spuId || '';
      searchParams.set('spuId', spuId);
      setSearchParams(searchParams);
      localStorage.setItem('product', JSON.stringify(item.detail.data));
    }

    return (
      <div className="cards-section-wrapper">
        {productsItems?.filter((product) => !product?.isDeleted)?.map((item, index) => {

          console.log('item =',item)
          const image = item?.detail?.data?.detail?.logoUrl || '';
          const title = item?.detail?.data?.detail?.title || '';
          const price = item?.detail?.data?.item?.price || '';

          return(
            <div onClick={() => onCardClickHandler(item)} key={index}>
              <Card
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                loading={isLoading}
                image={image}
                price={price / 100 * 102}
                item={item}
                name={title}
              />
            </div>
        )})}
      </div>
    );
  };

  const docElements = document.getElementsByClassName("cards-section-wrapper");

  let currentPage = true;

  useEffect(() => {
    currentPage = false;
  }, [products]);

  window.addEventListener(
    "scroll",
    function (event) {
      try {
        const lastEl =
          docElements[0]?.children[docElements[0]?.children?.length - 1]
            ?.offsetTop - 3500;
        const windowPageYOffset = window.pageYOffset;


        if (windowPageYOffset >= lastEl && !isLoading && !currentPage) {
          currentPage = true;

          if (products.items.length === limit) {
            setOffset((prev) => {
              /*if ((productsSlice?.[trimCollectionValue]?.length || 1) + 1 === prev + 1) {
                return prev + 1;
              }*/

              return prev + 1;
            })
          }
        }
      } catch (e) {
        console.log("e =", e);
      }
    },
    false,
  );

  const onBrandClick = (brand) => {
    setLoading(true);
    setOffset(1);
    searchParams.set('brandId', brand);
    setSearchParams(searchParams);
  }

  const onSizeClick = (val) => {
    setSize(val);
  }

  const onMinPriceChange = (val) => {
    setMinPrice(val !== '00' ? val : '');
  }

  const onMaxPriceChange = (val) => {
    setMaxPrice(val !== '99' ? val : '');
  }

  const applyFilters = () => {
    window.scrollTo(0, 0);
    setLoading(true);
    setOffset(1);
    setShowFilters(false);
    searchParams.set('size', size);
    searchParams.set('minPrice', minPrice);
    searchParams.set('maxPrice', maxPrice);
    setSearchParams(searchParams);
  }

  const isEnabledFilters = !!(minPriceParam || maxPriceParam || sizeParam);

  const body = document.body;

  /*fixedElement?.addEventListener('mouseenter', () => {
    console.log('here =',fixedElement);
    body.style.overflow = 'hidden';
  });

  fixedElement?.addEventListener('mouseleave', () => {
    body.style.overflow = '';
  });*/

  if (showFilters || url) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }

  return (
    <Layout style={{ backgroundColor: "white", position: "relative" }}>
      {spuId && <div className="productWrapper" id="productWrapper">
        <Product selectedProduct={selectedProduct}/>
      </div>
      }
      <div className="filters-phone-wrapper" style={{display: showFilters ? 'block' : 'none'}}
           ref={filtersRef}>
        <Filters
          setShowFilters={setShowFilters}
          size={size}
          minPrice={minPrice}
          maxPrice={maxPrice}
          categoryId={categoryId}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          setSize={onSizeClick}
          setMinPrice={onMinPriceChange}
          setMaxPrice={onMaxPriceChange}
          setLoading={setLoading}
          setOffset={setOffset}
        />
        {!isDesktopScreen &&
          <div className="filters-phone-apply-btn">
            <Button
              type="primary"
              className={"btn"}
              onClick={applyFilters}
            >
              <span>Применить</span>
            </Button>
          </div>
        }
      </div>
      <div className="productsListWrapper">
        <div className="main-logo-wrapper">
          {/*<div
          className="main-logo-line main-logo-line-left"
          style={{
            width: isDesktopScreen
              ? "calc((100vw - 226px - 40px) / 2 )"
              : "calc((100vw - 158px - 40px) / 2 )",
          }}
        />*/}
          {isDesktopScreen ? <RePoizonMainLogo /> : <RePoizonMainMiddleLogo />}

          {/*<div
          className="main-logo-line main-logo-line-right"
          style={{
            width: isDesktopScreen
              ? "calc((100vw - 226px - 40px) / 2 )"
              : "calc((100vw - 158px - 40px) / 2 )",
          }}
        />*/}
        </div>
        <Header search={search}
                showFilters={showFilters}
                setOffset={setOffset}
                setLoading={setLoading}
                setShowFilters={setShowFilters}
                isEnabledFilters={isEnabledFilters}
        />
        <div className="content">
          <Categories setLoading={setLoading}/>
          <div className="brands-section-wrapper">
            <div className="brands-section-wrapper_card"
                 onClick={() => onBrandClick(144)}>
              <div className="brands-section-wrapper_card-icon">
                <NikeIcon />
              </div>
              <div style={{ fontWeight: "bold", fontSize: "10px" }}>NIKE</div>
            </div>
          <div
            className="brands-section-wrapper_card"
            onClick={() => onBrandClick(10139)}
          >
            <div className="brands-section-wrapper_card-icon">
              <AdidasIcon />
            </div>
            <div style={{ fontWeight: "bold", fontSize: "10px" }}>ADIDAS</div>
          </div>
          <div
            className="brands-section-wrapper_card"
            onClick={() => onBrandClick(4)}
          >
            <div className="brands-section-wrapper_card-icon">
              <NewBalanceIcon />
            </div>
            <div style={{ fontWeight: "bold", fontSize: "10px" }}>NEW BALANCE</div>
          </div>

          <div className="brands-section-wrapper_card"
               onClick={() => onBrandClick(10229)}>
            <div className="brands-section-wrapper_card-icon">
              <CoachIcon />
            </div>
            <div style={{ fontWeight: "bold", fontSize: "10px" }}>COACH</div>
          </div>

          {isDesktopScreen &&
            <div className="brands-section-wrapper_card"
                 onClick={() => console.log('more')}>
              <div className="brands-section-wrapper_card-icon">
                <MoreIcon />
              </div>
              <div style={{ fontWeight: "bold", fontSize: "10px" }}>Больше</div>
            </div>
          }
        </div>
        <div className="filters-content-wrapper">
          {isDesktopScreen && (
            <div className="filters-wrapper" ref={filtersRef}>
              <Filters
                size={size}
                minPrice={minPrice}
                maxPrice={maxPrice}
                categoryId={categoryId}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                setSize={onSizeClick}
                setMinPrice={onMinPriceChange}
                setMaxPrice={onMaxPriceChange}
                applyFilters={applyFilters}
                setLoading={setLoading}
                setOffset={setOffset}
              />
            </div>
          )}
          <Suspense fallback={<div>Loading...</div>}>{renderItems()}</Suspense>
        </div>
        </div>
        {!isDesktopScreen &&
          <footer>
            <div onClick={() => navigate("/products")}>
              <ActiveBagIcon />
            </div>
            <div onClick={() => navigate("/cart?from=products")}>
              <NonActiveCartIcon />
            </div>
            <div onClick={() => navigate("/profile")}>
              <NonActiveProfileIcon />
            </div>
          </footer>
        }
      </div>
      {/*<div className="loader">
        <div className="loader-box-wrapper">
          <div className="loader-box loader-box_black">
            <div className="loader__item_left_partition"></div>
            <div className="loader-box__item loader__item_left">POIZON</div>
          </div>
          <div className="loader-box loader-box_white">
            <div className="loader-box__item loader__item_right">RE</div>
          </div>
        </div>
      </div>*/}



    </Layout>
  );
}
export default Home;
