import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetProductQuery, useParseProductQuery } from "../store/products.store";
import "./product.scss";
import { LeftOutlined, LinkOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../store";
import { addToCart } from "../common/cartSlice";
import SwiperCarousel from "../components/Carousel/SwiperCarousel";
import { useTimer } from "use-timer";
import RePoizonMainLogo from "../assets/svg/re-poizon-main-logo";
import MeasureTable from "../components/MeasureTable/MeasureTable";
import { getIntPrice } from "../common/utils";

function Product({ onAddToFavorite, isLoading }) {
  const selectedProduct = useMemo(() => ({
    "_id": "66ae2acd49e582bdeb1cf855",
    "spuId": 1164807,
    "images": [
      "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20220521/759477c01d894a40b4f2df840b3c1e34.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20220521/fcd74db8313d4d24b2be639586463ec2.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20220521/1270291bb6a045f18a6055362da13348.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20220521/2440a817d24c4361982d8e76bff87da9.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20220521/ae55ea4afdf5439db676841417334238.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20220521/0d63ef7931f547c9a22f4706036daa61.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20220521/1fdd9c2765204f15b0bfc19f3517f979.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20230225/f5b40f0997fb46a485d48db2af68ce63.jpg"
    ],
    "sizesAndPrices": [
      {
        "skuId": 602457984,
        "price": 4118660,
        "flagUrl": null,
        "size": "基础装（包+防尘袋）"
      },
      {
        "skuId": 634101061,
        "price": 6798660,
        "flagUrl": null,
        "size": "礼盒装（基础装+原盒）"
      },
      {
        "skuId": 634101065,
        "price": 6798660,
        "flagUrl": null,
        "size": "礼袋装（基础装+原装手提袋）"
      },
      {
        "skuId": 634101068,
        "price": 5860660,
        "flagUrl": null,
        "size": "礼袋装（基础装+原装手提袋）"
      }
    ],
    "sizeInfoList": [],
    "auth": {
      "path": "https://app.dewu.com/api/v1/app/sx/commodity/detail/page/coupon/v5",
      "query": {
        "newSign": "9ab27c91fcd22c5a9ee3ed13931b5f29"
      },
      "body": {
        "abTests": [
          {
            "name": "519_underwearSize",
            "value": "1"
          },
          {
            "name": "5.19_sellButton",
            "value": "3"
          },
          {
            "name": "5.14_versionIntro",
            "value": "1"
          },
          {
            "name": "512_ppzzpx",
            "value": "0"
          },
          {
            "name": "511_fsjxxz",
            "value": "1"
          },
          {
            "name": "510_fkrsAB",
            "value": "0"
          },
          {
            "name": "509_ppzgab",
            "value": "1"
          },
          {
            "name": "523_fzjrwtx",
            "value": "1"
          },
          {
            "name": "526_runningshoes",
            "value": "1"
          },
          {
            "name": "527_newProductPrice",
            "value": "1"
          },
          {
            "name": "527_Guidingsize",
            "value": "0"
          },
          {
            "name": "detail2023promo",
            "value": "0"
          },
          {
            "name": "5.22_skinColor",
            "value": "1"
          },
          {
            "name": "5.27_foodParam",
            "value": "1"
          },
          {
            "name": "531_chooseshoes",
            "value": "2"
          },
          {
            "name": "532_DeleteSeries",
            "value": "1"
          },
          {
            "name": "531_sxgyjd",
            "value": "1"
          },
          {
            "name": "531_deletesidebar",
            "value": "0"
          },
          {
            "name": "5.33_subtitle1",
            "value": "2"
          },
          {
            "name": "5.33_subtitle2",
            "value": "0"
          },
          {
            "name": "5.33_subtitle3",
            "value": "0"
          },
          {
            "name": "5.35_highlightScore",
            "value": "1"
          },
          {
            "name": "5.35_highlightUnfold",
            "value": "1"
          },
          {
            "name": "535_shoessize",
            "value": "2"
          },
          {
            "name": "535_PKTool",
            "value": "3"
          },
          {
            "name": "detail2024",
            "value": "8"
          },
          {
            "name": "detail2023on",
            "value": "0"
          },
          {
            "name": "532_newuser",
            "value": "2"
          },
          {
            "name": "533_function",
            "value": "1"
          },
          {
            "name": "531_wdgyjd",
            "value": "0"
          },
          {
            "name": "5.37_pjBaiKe",
            "value": "1"
          },
          {
            "name": "540_AIfootCollect",
            "value": "0"
          },
          {
            "name": "533_fuceng",
            "value": "1"
          },
          {
            "name": "542_SameStyle",
            "value": "2"
          },
          {
            "name": "540_Deletesidebar",
            "value": "2"
          },
          {
            "name": "5.37_pxpf",
            "value": "1"
          },
          {
            "name": "539_Series",
            "value": "5"
          },
          {
            "name": "huanjia",
            "value": "0"
          },
          {
            "name": "539_1line",
            "value": "1"
          },
          {
            "name": "5.39_ingredients",
            "value": "1"
          },
          {
            "name": "5.38_cmdb",
            "value": "1"
          },
          {
            "name": "539_fupv",
            "value": "1"
          },
          {
            "name": "538_suit",
            "value": "0"
          },
          {
            "name": "539_Perfumebonus",
            "value": "1"
          },
          {
            "name": "538_alcoholPDP",
            "value": "2"
          },
          {
            "name": "539_Hidevideo",
            "value": "0"
          },
          {
            "name": "5.39_jgtp",
            "value": "0"
          },
          {
            "name": "541_tl_kptp",
            "value": "0"
          },
          {
            "name": "540_PKinfo",
            "value": "5"
          },
          {
            "name": "540_FirstContent",
            "value": "5"
          },
          {
            "name": "540_GoodsStory",
            "value": "1"
          },
          {
            "name": "540_Alcoholinteract",
            "value": "1"
          },
          {
            "name": "543_wyperfume",
            "value": "3"
          },
          {
            "name": "544_detail_button",
            "value": "0"
          },
          {
            "name": "545tryonwatch",
            "value": "0"
          },
          {
            "name": "540_OutdoorJacket",
            "value": "0"
          },
          {
            "name": "541_Alcoholtaste",
            "value": "1"
          },
          {
            "name": "543_price",
            "value": "3"
          },
          {
            "name": "541quehuo",
            "value": "2"
          },
          {
            "name": "543_SeriesCompare",
            "value": "0"
          },
          {
            "name": "543_lmsd",
            "value": "0"
          },
          {
            "name": "2024_detail_20",
            "value": "19"
          },
          {
            "name": "544lihe",
            "value": "0"
          },
          {
            "name": "541_similar",
            "value": "0"
          },
          {
            "name": "544_similarzhedie",
            "value": "1"
          },
          {
            "name": "544biaoqian",
            "value": "3"
          },
          {
            "name": "544youhui",
            "value": "0"
          },
          {
            "name": "544_skincare",
            "value": "1"
          },
          {
            "name": "544_hufu",
            "value": "2"
          },
          {
            "name": "544zedie",
            "value": "1"
          },
          {
            "name": "545_zhediePic",
            "value": "0"
          },
          {
            "name": "545dingzi",
            "value": "4"
          },
          {
            "name": "546_Makeup",
            "value": "0"
          },
          {
            "name": "546propertyexplain",
            "value": "1"
          }
        ],
        "app_build": "5.46.1.140",
        "appId": "duapp",
        "appraiseReqMap": {
          "abFields": {
            "abDetailpageSize": "2",
            "v535LV6wd": "0",
            "v544NewDpModel": "19"
          },
          "propertyValueId": 0,
          "spuId": 1164807
        },
        "brand": "Apple",
        "buyLayerReq": {
          "extBodys": [
            {
              "name": "scene",
              "value": "commodityDetail"
            },
            {
              "name": "businessDetailVersion",
              "value": "V2"
            },
            {
              "name": "detail2023promo",
              "value": "0"
            },
            {
              "name": "5.30_fenqiWenan",
              "value": "0"
            },
            {
              "name": "533_fuceng",
              "value": "1"
            },
            {
              "name": "543_price",
              "value": "3"
            },
            {
              "name": "543_lmsd",
              "value": "0"
            },
            {
              "name": "544biaoqian",
              "value": "3"
            },
            {
              "name": "545dingzi",
              "value": "4"
            },
            {
              "name": "544xdk",
              "value": "0"
            }
          ],
          "mainSpuId": 0,
          "sourceFrom": "shareDetail",
          "spuId": 1164807
        },
        "cookieToken": "47a741b0fcf12c2eca899bc857f47a6ee9542c625d6d8143587a51b696a1258f3870d7f4d16ca1f7497d819d175a07554450aaca869a02d1b8c35de6441f16e0e2d563d987301699d03c88f5d62d7cf1|1414227211|1720620202|e56c15bf1d7c28eedd5ccc8c36a064ae75b03e14|1-0|d41d8cd9fe7afd55",
        "duid": "4a263684ee2490bd0dd6e62e05c72a07a2f6ff4e0eea7c9b0c1870331f4d7dcf11b8d2a82d2e3ef4e8bb8310cfc83a52",
        "emu": "0",
        "extDatas": [
          {
            "name": "CUSTOM_RECOMMEND_SWITCH",
            "value": "0"
          }
        ],
        "isProxy": "1",
        "isRoot": "0",
        "lastBrandId": 965,
        "loginToken": "47a741b0fcf12c2eca899bc857f47a6ee9542c625d6d8143587a51b696a1258f3870d7f4d16ca1f7497d819d175a07554450aaca869a02d1b8c35de6441f16e0e2d563d987301699d03c88f5d62d7cf1|1414227211|1720620202|e56c15bf1d7c28eedd5ccc8c36a064ae75b03e14|1-0|d41d8cd9fe7afd55",
        "mode": "0",
        "platform": "iPhone",
        "productSourceName": "shareDetail",
        "shumeiid": "2023040502503627d1ea66d01934e42b036f39520b668b01bbaef5b71d2fa6",
        "spuId": 1164807,
        "timestamp": "1723236552135",
        "token": "JLIjsdLjfsdII%3D%7CMTQxODg3MDczNA%3D%3D%7C07aaal32795abdeff41cc9633329932195",
        "v": "5.46.1"
      },
      "headers": {
        "host": "app.dewu.com",
        "x-real-ip": "213.209.148.4, 213.209.148.4",
        "x-forwarded-for": "213.209.148.4, 213.209.148.4",
        "x-forwarded-proto": "https",
        "cookietoken": "47a741b0fcf12c2eca899bc857f47a6ee9542c625d6d8143587a51b696a1258f3870d7f4d16ca1f7497d819d175a07554450aaca869a02d1b8c35de6441f16e0e2d563d987301699d03c88f5d62d7cf1|1414227211|1720620202|e56c15bf1d7c28eedd5ccc8c36a064ae75b03e14|1-0|d41d8cd9fe7afd55",
        "logintoken": "47a741b0fcf12c2eca899bc857f47a6ee9542c625d6d8143587a51b696a1258f3870d7f4d16ca1f7497d819d175a07554450aaca869a02d1b8c35de6441f16e0e2d563d987301699d03c88f5d62d7cf1|1414227211|1720620202|e56c15bf1d7c28eedd5ccc8c36a064ae75b03e14|1-0|d41d8cd9fe7afd55",
        "platform": "iPhone",
        "accept": "*/*",
        "user-agent": "DUApp/5.46.1 (com.siwuai.duapp; build:5.46.1.140; iOS 17.6.1) Alamofire/5.3.0",
        "skc": "WNcGDu9ZHHkAWOmVh3Jb4",
        "webua": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
        "cookie": "_user_location=3eaf80b99b78f648b2ef3159af22d67d1551ea0424141f70965891ede650e8e3a%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22_user_location%22%3Bi%3A1%3Bs%3A1%3A%221%22%3B%7D",
        "ipvx": "",
        "sks": "0,idw2",
        "mode": "0",
        "brand": "Apple",
        "isroot": "0",
        "edk": "7d7d616c355d5d414c39396a6e6a6d3c383c316a693c3d6e6b693f696c6c3f6e6e313e6a38393f6b6e",
        "dudevicetrait": "iPhone16,1",
        "accept-language": "en-RU;q=1.0, ru-RU;q=0.9",
        "fcuuid": "UUID11bfbe4049ba45fca7add7ff96b017cf",
        "ltk": "rwbZpoRPDMueCNTKbU8EaDDEQnjYWvlq2Pr7PhInmkUqDSakSoE7",
        "sk": "9OrZRBzOIxoT6412qrRvxaTSiyBLvDYlUHf0O498XRTrBb0vG2mCBoOWwsSP3hQZC8PrWaw8CrT3gq8j1MqCBxtbfr1v",
        "x-auth-token": "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MjMyMzQzMTksImV4cCI6MTc1NDc3MDMxOSwiaXNzIjoiVVVJRDExYmZiZTQwNDliYTQ1ZmNhN2FkZDdmZjk2YjAxN2NmIiwic3ViIjoiVVVJRDExYmZiZTQwNDliYTQ1ZmNhN2FkZDdmZjk2YjAxN2NmIiwidXVpZCI6IlVVSUQxMWJmYmU0MDQ5YmE0NWZjYTdhZGQ3ZmY5NmIwMTdjZiIsInVzZXJJZCI6MTQxNDIyNzIxMSwidXNlck5hbWUiOiLlvpfniallci1UNks2TTZLNSIsImlzR3Vlc3QiOmZhbHNlfQ.tGnfj-MBqXdYd0ejzZh-2lQ9y50cRK2DJbKAr2dWI3DcINg2QrqbUZzouVA0zHo0q0jSvtJRqZrWv9ktD31eYc7DmmA1Y4IHPt7sTotrPqUFcA1ru-DiGvWUe5aWCzdDZHnET8YHDYNTwOY7swQp3RQXQOQZjFJRgYXtXipZWVQaJrDR8_53Eaxdkq60eUO0rahJQrO6gDAFgwlc9g778UgPDrXYFhzAqYEAA8UkKeJC5xX6754T3p7A-V6l-Ke34ixCiJYaTQ52E55mH1gIuPL8wVBSUAeeAPxSVPNZgxzLQI6RzXWV9kWSXV8Np-0OZ7xyBkdqXEfs0O5QQr97nQ",
        "appid": "duapp",
        "content-type": "application/json",
        "isproxy": "1",
        "token": "JLIjsdLjfsdII%3D%7CMTQxODg3MDczNA%3D%3D%7C07aaal32795abdeff41cc9633329932195",
        "v": "5.46.1",
        "shumeiid": "2023040502503627d1ea66d01934e42b036f39520b668b01bbaef5b71d2fa6",
        "emu": "0",
        "timestamp": "1723236552135"
      }
    },
    "createdAt": "2024-08-03T13:04:13.432Z",
    "updatedAt": "2024-08-10T04:40:19.538Z",
    "__v": 0,
    "brandId": 79,
    "categoryId": 54,
    "categoryName": "腰包",
    "cheapestPrice": 4118660,
    "isDeleted": false,
    "level1CategoryId": 48,
    "level2CategoryId": 49,
    "salePropertiesList": [
      {
        "customValue": "",
        "level": 1,
        "propertyValueId": 35037707,
        "sort": 2,
        "fontProperty": false,
        "showValue": 1,
        "leafLevelTrue": false,
        "name": "长度",
        "propertyId": 1054111,
        "value": "80cm",
        "salePvStatus": 1,
        "definitionId": 3467
      },
      {
        "customValue": "",
        "level": 1,
        "propertyValueId": 35037708,
        "sort": 3,
        "fontProperty": false,
        "showValue": 1,
        "leafLevelTrue": false,
        "name": "长度",
        "propertyId": 1054111,
        "value": "85cm",
        "salePvStatus": 1,
        "definitionId": 3467
      },
      {
        "customValue": "",
        "level": 1,
        "propertyValueId": 35037709,
        "sort": 4,
        "fontProperty": false,
        "showValue": 1,
        "leafLevelTrue": false,
        "name": "长度",
        "propertyId": 1054111,
        "value": "90cm",
        "salePvStatus": 1,
        "definitionId": 3467
      },
      {
        "customValue": "",
        "level": 1,
        "propertyValueId": 37716870,
        "sort": 5,
        "fontProperty": false,
        "showValue": 1,
        "leafLevelTrue": false,
        "name": "长度",
        "propertyId": 1054111,
        "value": "95cm",
        "salePvStatus": 1,
        "definitionId": 3467
      },
      {
        "customValue": "",
        "level": 1,
        "propertyValueId": 44673254,
        "sort": 6,
        "fontProperty": false,
        "showValue": 1,
        "leafLevelTrue": false,
        "name": "长度",
        "propertyId": 1054111,
        "value": "100cm",
        "salePvStatus": 1,
        "definitionId": 3467
      },
      {
        "customValue": "",
        "level": 2,
        "propertyValueId": 297353562,
        "sort": 7,
        "fontProperty": false,
        "showValue": 1,
        "leafLevelTrue": true,
        "name": "包装",
        "propertyId": 1054195,
        "value": "基础装（包+防尘袋）",
        "salePvStatus": 1,
        "definitionId": 1978
      },
      {
        "customValue": "",
        "level": 2,
        "propertyValueId": 297353563,
        "sort": 8,
        "fontProperty": false,
        "showValue": 1,
        "leafLevelTrue": true,
        "name": "包装",
        "propertyId": 1054195,
        "value": "礼盒装（基础装+原盒）",
        "salePvStatus": 1,
        "definitionId": 1978
      },
      {
        "customValue": "",
        "level": 2,
        "propertyValueId": 297353564,
        "sort": 9,
        "fontProperty": false,
        "showValue": 1,
        "leafLevelTrue": true,
        "name": "包装",
        "propertyId": 1054195,
        "value": "礼袋装（基础装+原装手提袋）",
        "salePvStatus": 1,
        "definitionId": 1978
      },
      {
        "customValue": "",
        "level": 2,
        "propertyValueId": 297353565,
        "sort": 10,
        "fontProperty": false,
        "showValue": 1,
        "leafLevelTrue": true,
        "name": "包装",
        "propertyId": 1054195,
        "value": "送礼套装（基础装+原盒+原装手提袋）",
        "salePvStatus": 1,
        "definitionId": 1978
      }
    ],
    "skus": [
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 602457984,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 35037707
          },
          {
            "level": 2,
            "propertyValueId": 297353562
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 602457985,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 35037708
          },
          {
            "level": 2,
            "propertyValueId": 297353562
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 602457986,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 35037709
          },
          {
            "level": 2,
            "propertyValueId": 297353562
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 602749883,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 37716870
          },
          {
            "level": 2,
            "propertyValueId": 297353562
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 603244847,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 44673254
          },
          {
            "level": 2,
            "propertyValueId": 297353562
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 634101058,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 35037707
          },
          {
            "level": 2,
            "propertyValueId": 297353563
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 634101059,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 35037707
          },
          {
            "level": 2,
            "propertyValueId": 297353564
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 634101060,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 35037707
          },
          {
            "level": 2,
            "propertyValueId": 297353565
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 634101061,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 35037708
          },
          {
            "level": 2,
            "propertyValueId": 297353563
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 634101062,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 35037708
          },
          {
            "level": 2,
            "propertyValueId": 297353564
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 634101063,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 35037708
          },
          {
            "level": 2,
            "propertyValueId": 297353565
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 634101064,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 35037709
          },
          {
            "level": 2,
            "propertyValueId": 297353563
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 634101065,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 35037709
          },
          {
            "level": 2,
            "propertyValueId": 297353564
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 634101066,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 35037709
          },
          {
            "level": 2,
            "propertyValueId": 297353565
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 634101067,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 37716870
          },
          {
            "level": 2,
            "propertyValueId": 297353563
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 634101068,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 37716870
          },
          {
            "level": 2,
            "propertyValueId": 297353564
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 634101069,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 37716870
          },
          {
            "level": 2,
            "propertyValueId": 297353565
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 634101070,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 44673254
          },
          {
            "level": 2,
            "propertyValueId": 297353563
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 634101071,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 44673254
          },
          {
            "level": 2,
            "propertyValueId": 297353564
          }
        ],
        "status": 1
      },
      {
        "spuId": 1164807,
        "authPrice": 920000,
        "skuId": 634101072,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "properties": [
          {
            "level": 1,
            "propertyValueId": 44673254
          },
          {
            "level": 2,
            "propertyValueId": 297353565
          }
        ],
        "status": 1
      }
    ],
    "title": "GUCCI古驰 Fake Not 系列 字母条纹印花 老花Logo 皮革徽标 帆布拼皮 胸包腰包 男女同款情侣款 乌木色/棕色 潮酷推荐"
  }),[]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //const parsedProduct = JSON.parse(localStorage.getItem('product'));

  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCodeModalOpen, setCodeModalOpen] = useState(false);
  const [choice, setChoice] = useState({});
  const [measureOpen, setMeasureOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [isDisabledBuyBtn, setDisabledBuyBtn] = useState(false);
  const [product, setProduct] = useState(selectedProduct);
  const [lvl2Properties, setLvl2Properties] = useState({});


  const spuId = searchParams.get("spuId");

  const token = localStorage.getItem("token");
  const prevUpdatedAtRef = useRef(null);

  useParseProductQuery({
    spuId,
    token,
  }, {skip: !spuId});
  const isLoadingProduct = false;
  let { data: remoteProduct/*, isLoading: isLoadingProduct*/ } = useGetProductQuery(
    {
      spuId,
      token,
    },
    { pollingInterval: 13000, skip: !spuId },
  );

  const { time, start, pause, reset, status } = useTimer({
    //initialTime: 13,
    initialTime: 0,
    endTime: 0,
    timerType: 'DECREMENTAL',
  });

  const findSkuPropertiesBySkuId = useCallback((skuId) => {
    if (!selectedProduct || !selectedProduct?.skus?.length) {
      return {};
    }

    const skuObj = selectedProduct.skus.find((el) => el.skuId === skuId);

    if (skuObj?.properties?.length < 2) {
      return {};
    }

    const secondPropertiesLevel = skuObj?.properties[skuObj?.properties.length - 2];
    const propertyValueId = secondPropertiesLevel.propertyValueId;

    return selectedProduct?.salePropertiesList.find(el => el.propertyValueId === propertyValueId);
  },[selectedProduct])

  useEffect(() => {
    console.log('selectedProduct',selectedProduct);
    if(!Object.keys(selectedProduct)?.length) {
      return;
    }

    setProduct(selectedProduct);

    let currentProduct = selectedProduct;

    const itemIndex = currentProduct?.sizesAndPrices?.findIndex((el) => el?.price === currentProduct?.cheapestPrice);

    console.log('remoteProduct =',remoteProduct);
    setChoice({
      price: currentProduct?.sizesAndPrices?.[itemIndex]?.price?.toString(),
      size: currentProduct?.sizesAndPrices?.[itemIndex]?.size,
      index: itemIndex,
    })

    const temp2lvlProperties = {};

    currentProduct?.sizesAndPrices?.forEach((el) => {
      const skuId = el.skuId;

      if (temp2lvlProperties[skuId]) {
        return;
      }
      const property = findSkuPropertiesBySkuId(skuId);
      console.log('property',property);
      if (property?.propertyValueId) {
        temp2lvlProperties[property.propertyValueId] = property;
      }
    })
    console.log('temp2lvlProperties',temp2lvlProperties);
    setLvl2Properties(temp2lvlProperties);

    if (!prevUpdatedAtRef.current) {
      start();
      prevUpdatedAtRef.current = currentProduct?.updatedAt;
    } else if (prevUpdatedAtRef.current !== currentProduct?.updatedAt) {
      prevUpdatedAtRef.current = currentProduct?.updatedAt;
      //setDisabledBuyBtn(false);
    }
  }, [selectedProduct]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const onAddToCart = () => {
    if (!choice?.price) {
      return;
    }

    dispatch(
      addToCart({ ...product, size: choice?.size, price: choice?.price }),
    );
    navigate("/cart");
  };

  const onChangeChoiceHandler = (el, i) => {
    if (Number(el.price) > 0) {
      setChoice({ size: el.size, price: el.price?.toString(), index: i });
    }
  };

  const getTitlePrice = (price) => {
    if (!price) {
      return "--";
    }
    const str = JSON.stringify(price);

    const subStr = str.substring(0, str?.length - 2)
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(subStr);
  };

  const getBtnPrice = useCallback((price) => {
    if (isDisabledBuyBtn) {
      return `Обновление цен ${time}`
    }

    if (!price) {
      return "--";
    }
    const subStr = price.substring(0, price?.length - 2)
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(subStr);

  },[choice, isDisabledBuyBtn, time]);

  const onMeasureOpenClick = () => {
    setMeasureOpen(true);
  };

  const onLoadCarousel = () => {
    if (!isLoadingImages) {
      return null;
    }
    setIsLoadingImages(false);
  };

  const getClearTitle = (str) => {
    return str?.replace(/[^a-zA-Z\s]/g, '');
  }

  const showPropertyValue = (value, showValue) => {
    if (!showValue) {
      return '';
    }

    if (value?.includes('宽')) {
      return value.replace('宽', ' ширина');
    }

    return value;
  }

  const isDesktopScreen = window?.innerWidth > 768;

  return (
    <div style={{height: '100%'}}>
      {/*{!token && (
        <AuthModal
          open={isModalOpen}
          setRemotePhone={setPhone}
          setModalOpen={setModalOpen}
          onCancel={() => {
            setModalOpen(false);
            setCodeModalOpen(false);
          }}
          isCodeModalOpen={isCodeModalOpen}
          setCodeModalOpen={setCodeModalOpen}
        />
      )}*/}
      <Modal
        title="Выберите размер"
        open={isModalOpen}
        onOk={onAddToCart}
        okText={<>{getBtnPrice(choice?.price) || "--"}
          <span style={{ fontSize: "19px" }}>{isDisabledBuyBtn ? '' : ' ₽'}</span></>}
        okButtonProps={{
          disabled: isDisabledBuyBtn,
          loading: isDisabledBuyBtn,
        }}
        centered={!isDesktopScreen}
        onCancel={() => {
          setModalOpen(false);
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "15px",
            borderBottom: "1px solid #ececec",
            gap: "20px",
          }}
        >
          <img src={product?.images?.[0]} style={{ width: "20%" }} alt="" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: "22px",
                fontWeight: "700",
                display: "flex",
                gap: "3px",
                alignItems: "flex-end",
              }}
            >
              {getTitlePrice(choice?.price)|| "--"}
            </div>
            <div style={{ fontSize: "15px" }}>Размер: {choice.size}</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "15px",
            paddingRight: "25px",
            justifyContent: "space-between",
          }}
          onClick={onMeasureOpenClick}
          role="presentation"
        >
          <span>Таблица размеров</span><span>></span>
        </div>
        <div className="content-size-wrapper">
          {product?.sizesAndPrices?.map((el, i) => (
              <div
                className={
                  i === choice.index
                    ? "size-wrapper gap-2 selected"
                    : "size-wrapper gap-2"
                }
                onClick={() => onChangeChoiceHandler(el, i)}
                key={i}
                role="presentation"
              >
                <div
                  style={{
                    fontSize: "17px",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {el.size}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    textAlign: "center",
                    display: "flex",
                    gap: "1.5px",
                    justifyContent: "center",
                  }}
                >
                  {getTitlePrice(el.price) || "--"}
                </div>
              </div>
            ))}
        </div>
      </Modal>
      {measureOpen && (
        <Modal
          title="Таблица размеров"
          open={measureOpen}
          onOk={() => {
            setMeasureOpen(false);
          }}
          centered={!isDesktopScreen}
          onCancel={() => {
            setMeasureOpen(false);
          }}
        >
          <div
            style={{
              display: "grid",
              padding: "15px",
              borderBottom: "1px solid #ececec",
              gap: "15px",
            }}
          >
            <div style={{ fontSize: "22px", fontWeight: "500" }}>
              Таблица размеров
            </div>
            <MeasureTable sizeInfoList={product?.sizeInfoList} />
          </div>
        </Modal>
      )}
      {isLoadingProduct && (
        <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
          <LoadingOutlined style={{fontSize: '24px'}} spin />
        </div>)
      }
      {isDesktopScreen &&
        <div className="main-logo-wrapper">
          <div
            className="main-logo-line black main-logo-line-left"
            style={{
              width: "calc((100vw - 226px - 40px) / 2 )"
            }}
          />
          {<RePoizonMainLogo />}

          <div
            className="main-logo-line black main-logo-line-right"
            style={{
              width: "calc((100vw - 226px - 40px) / 2 )"
            }}
          />
        </div>
      }

      {!isLoadingProduct && (
        <div style={{height: '100%'}}>
          <LeftOutlined
            className="go-back-btn"
            onClick={() => window.history.go(-1)}
          />
          <LinkOutlined
            className="link-btn"
            onClick={() => window.history.go(-1)}
          />


          <div className={'layout-wrapper'} style={{padding: isDesktopScreen ? '0 20px 0 20px' : '0'}}>
            <div className={"content-wrapper"} style={{flexDirection: isDesktopScreen ? 'row' : 'column'}}>
              <div className={"carousel-wrapper"} style={{
                maxWidth: isDesktopScreen ? 'calc(50% - 24px / 2)' : 'none',
                marginTop: isDesktopScreen ? '40px' : '0'
              }}>
                <SwiperCarousel
                  style={{width: '100%'}}
                  images={product?.images}
                  onLoad={onLoadCarousel}
                  onError={onLoadCarousel}
                />
              </div>

              <div className={isDesktopScreen ? 'product-info-wrapper' : 'product-info-phone-wrapper'}>
                <div className="product-info__item standart">
                  {!isDesktopScreen &&
                    <div  className="title">
                      {getIntPrice(choice?.price)}
                    </div>
                  }
                  <div className="title-wrapper">
                    <span className="standart">{product?.title}</span>
                    {isDesktopScreen &&
                      <div  className="title">
                        {getIntPrice(choice?.price)}
                      </div>
                    }
                  </div>

                </div>
                {(!isDesktopScreen && !!(Object.keys(lvl2Properties)?.length)) &&
                  <div className="product-info__item standart">
                    <div className="label">
                      <div className="label_wrap">
                        <div className="size_label">
                          <div>Версия</div>
                        </div>
                      </div>
                    </div>
                    <div className="list">
                      {Object.keys(lvl2Properties)?.map((key, i) => (
                        <div
                          className={
                            i === choice.index
                              ? "size-wrapper gap-2 selected"
                              : "size-wrapper gap-2"
                          }
                          onClick={() => onChangeChoiceHandler(lvl2Properties[key], i)}
                          key={i}
                          role="presentation"
                        >
                          <div
                            style={{
                              fontSize: "17px",
                              fontWeight: "600",
                              textAlign: "center",
                            }}
                          >
                            {showPropertyValue(lvl2Properties[key].value, lvl2Properties[key]?.showValue)}
                          </div>
                        </div>
                      )).filter(el => el)}
                    </div>
                  </div>
                }

                {!isDesktopScreen &&
                  <div className="product-info__item standart">
                    <div className="label">
                      <div className="label_wrap">
                        <div className="size_label">
                          <div>Размер: EU</div>
                        </div>
                      </div>
                      <div className="size_guide" onClick={onMeasureOpenClick}>
                        Таблица размеров
                        <img className="PoizonImage_img__BNSaU"
                             src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg" alt="" />
                      </div>
                    </div>
                    <div className="list">
                      {product?.sizesAndPrices?.map((el, i) => (
                        <div
                          className={
                            i === choice.index
                              ? "size-wrapper gap-2 selected"
                              : "size-wrapper gap-2"
                          }
                          onClick={() => onChangeChoiceHandler(el, i)}
                          key={i}
                          role="presentation"
                        >
                          <div
                            style={{
                              fontSize: "17px",
                              fontWeight: "600",
                              textAlign: "center",
                            }}
                          >
                            {el.size}
                          </div>
                          <div
                            style={{
                              fontSize: "13px",
                              textAlign: "center",
                              display: "flex",
                              gap: "1.5px",
                              justifyContent: "center",
                            }}
                          >
                            {getTitlePrice(el.price) || "--"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }

                <div className="product-info__item poizon_auth">
                  <img className="product-info__item poizon_auth pzn_img"
                       src="https://cdn-img.poizonapp.com/node-common/e9004fdc-f3f9-1e94-d275-0965f2da9ee4-192-117.png?x-oss-process=image/format,webp/resize,w_100"
                       alt="100% authenticated" />
                  <div className="sm_divider">|</div>
                  <div className="product-info__item poizon_auth main-txt">ВЕРЕФИЦИРОВАНО ЭКСПЕРТАМИ</div>
                  <div className="product-info__item poizon_auth second-txt">5-шаговая аутентификация</div>
                  <div>
                    <img className="PoizonImage_img__BNSaU"
                         src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg" alt="" />
                  </div>
                </div>

                {(isDesktopScreen && !!(Object.keys(lvl2Properties)?.length)) &&
                  <div className="product-info__item">
                    <div className="label">
                      <div className="label_wrap">
                        <div className="size_label">
                          <div>Версия</div>
                        </div>
                      </div>
                      <div className="size_guide" onClick={onMeasureOpenClick}>
                        Таблица размеров
                        <img className="PoizonImage_img__BNSaU"
                             src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg" alt="" />
                      </div>
                    </div>
                    <div className="list">
                      {Object.keys(lvl2Properties)?.map((key, i) => (
                        <div
                          className={
                            i === choice.index
                              ? "size-wrapper gap-2 selected"
                              : "size-wrapper gap-2"
                          }
                          onClick={() => onChangeChoiceHandler(lvl2Properties[key], i)}
                          key={i}
                          role="presentation"
                        >
                          <div
                            style={{
                              fontSize: "17px",
                              fontWeight: "600",
                              textAlign: "center",
                            }}
                          >
                            {showPropertyValue(lvl2Properties[key].value, lvl2Properties[key]?.showValue)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }

                {isDesktopScreen &&
                  <div className="product-info__item">
                    <div className="label">
                      <div className="label_wrap">
                        <div className="size_label">
                          <div>Размер: EU</div>
                        </div>
                      </div>
                      <div className="size_guide" onClick={onMeasureOpenClick}>
                        Таблица размеров
                        <img className="PoizonImage_img__BNSaU"
                             src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg" alt="" />
                      </div>
                    </div>
                    <div className="list">
                      {product?.sizesAndPrices?.map((el, i) => (
                          <div
                            className={
                              i === choice.index
                                ? "size-wrapper gap-2 selected"
                                : "size-wrapper gap-2"
                            }
                            onClick={() => onChangeChoiceHandler(el, i)}
                            key={i}
                            role="presentation"
                          >
                            <div
                              style={{
                                fontSize: "17px",
                                fontWeight: "600",
                                textAlign: "center",
                              }}
                            >
                              {el.size}
                            </div>
                            <div
                              style={{
                                fontSize: "13px",
                                textAlign: "center",
                                display: "flex",
                                gap: "1.5px",
                                justifyContent: "center",
                              }}
                            >
                              {getTitlePrice(el.price) || "--"}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                }


                {isDesktopScreen &&
                  <div className="btn_wrapper">
                    <Button
                      type="primary"
                      className={"btn"}
                      onClick={onAddToCart}
                      disabled={isDisabledBuyBtn}
                      loading={isDisabledBuyBtn}
                    >
                      {getBtnPrice(choice?.price)}
                      <span> {!isDisabledBuyBtn ? 'В корзину' : ''}</span>
                    </Button>
                  </div>

                }
              </div>

            </div>

            {!isDesktopScreen &&
              <div
                style={{
                  position: "fixed",
                  bottom: "0",
                  width: "100%",
                  padding: 10,
                  backgroundColor: "white",
                  borderTop: "1px solid #f9f9f9",
                  zIndex: 2,
                }}
              >
                <Button
                  type="primary"
                  className={"btn"}
                  onClick={onAddToCart}
                  disabled={isDisabledBuyBtn}
                  loading={isDisabledBuyBtn}
                >
                  <span>{getBtnPrice(choice?.price)}</span>
                  <span>{!isDisabledBuyBtn ? 'В корзину' : '₽'}</span>
                </Button>
              </div>
            }

          </div>
        </div>
      )}
    </div>
  );
}
export default Product;
