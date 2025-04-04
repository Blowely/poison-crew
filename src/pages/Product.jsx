import React, {useCallback, useEffect, useRef, useState} from "react";
import {Breadcrumb, Modal} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useParseProductQuery} from "../store/products.store";
import "./product.scss";
import {ArrowLeftOutlined, LoadingOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../store";
import {addToCart, removeFromCart} from "../common/cartSlice";
import SwiperCarousel from "../components/Carousel/SwiperCarousel";
import MeasureTable from "../components/MeasureTable/MeasureTable";
import {
  getCategoryClickedLink,
  getCheapestElOfSize,
  getCurrentPriceOfSize,
  getIntPrice,
  normalizeSize
} from "../common/utils";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import {BRANDS, CATEGORIES} from "../components/constants";
import {APPAREL_SIZES_ORDER} from "./constants";
import IconHeart from "../assets/svg/iconHeart";
import TelegramButton from "../components/TelegramButton/TelegramButton";
import DeliverBlock from "../components/Delivery/DeliveryBlock";
import InsuranceBlock from "../components/InsuranceBlock/InsuranceBlock";
import VerifiedBlock from "../components/VerifiedBlock/VerifiedBlock";
import ProductGallery from "../components/CarouselDesktop/CarouselDesktop";
import MainLogoComponent from "../components/MainLogoComponent/MainLogoComponent";
import CartButton from "../components/CartButton/CartButton";
import PoizonVerifiedBlock from "../components/PoizonVerifiedBlock/PoizonVerifiedBlock";

function Product({ selectedProduct, setLoading = () => {}, setOffset = () => {} }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [choice, setChoice] = useState({});
  const [measureOpen, setMeasureOpen] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [isDisabledBuyBtn] = useState(false);
  const [product, setProduct] = useState({});
  const [sizesAndPrices, setSizesAndPrices] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const spuId = searchParams.get("spuId");
  const sizesParam = searchParams.get("sizes");
  const gender = localStorage.getItem("gender") || "men";

  const token = localStorage.getItem("token");
  const prevUpdatedAtRef = useRef(null);
  const productLayoutRef = useRef(null);

  const isLoadingProduct = false;
  const isTest = true

  const cartItems = useAppSelector((state) => state.cart.items) || [];
  console.log('cartItems=',cartItems);

  const { data: updatedProductData } = useParseProductQuery({
    spuId,
    token,
  }, {skip: !spuId || isTest});

  /*let { data: remoteProduct } = useGetProductQuery(
    {
      spuId,
      token,
    },
    { skip: !spuId || Object.keys(selectedProduct)?.length},
  );*/

  const [remoteProduct, setRemoteProduct] = useState( {
    "split": {
      "first": 13495,
      "second": 13495
    },
    "category": {
      "category1": "footwear",
      "category2": "footwear/casual",
      "category3": "footwear/casual/sneakers"
    },
    "series": {
      "id": 234,
      "name": "Suede系列"
    },
    "size": {
      "primary": "35.5",
      "us": "4",
      "uk": "3",
      "eu": "35.5",
      "ru": "34.5"
    },
    "priceV2": {
      "price": 26990,
      "priceWithoutDiscount": 26990,
      "discount": false,
      "priceWithExpress": 30490,
      "priceWithExpressWithoutDiscount": 30490,
      "priceFromAvailability": 0,
      "previousPriceFromAvailability": 0,
      "discountFromAvailability": false
    },
    "metadata": {
      "shoplaza": false
    },
    "deliveryTime": {
      "min": 21,
      "max": 26,
      "expressMax": 12,
      "expressMin": 9
    },
    "_id": "678d7ce86e12b96be3e653c7",
    "spuId": 8246981,
    "__v": 0,
    "availability": "AVAILABLE",
    "brand": "PUMA",
    "createdAt": "2025-01-19T22:30:00.138Z",
    "fit": "UNISEX",
    "fromAvailability": false,
    "images": [
      "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
      "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
    ],
    "maxPrice": 26990,
    "name": "staple x PUMA Suede Staple",
    "price": 10173,
    "productProperties": [
      {
        "definitionId": "APPLICABLE_SEASON",
        "key": "适用季节",
        "translatedKey": "Сезон",
        "value": [
          "春",
          "夏",
          "秋",
          "冬"
        ],
        "translatedValue": [
          "весна",
          "лето",
          "осень",
          "зима"
        ]
      },
      {
        "definitionId": "UPPER_MATERIAL",
        "key": "鞋面材质",
        "translatedKey": "Верх",
        "value": [
          "皮革"
        ],
        "translatedValue": [
          "кожа"
        ]
      },
      {
        "definitionId": "PRIMARY_COLOR",
        "key": "主色",
        "translatedKey": "Основной цвет",
        "value": [
          "米色"
        ],
        "translatedValue": [
          "Бежевый"
        ]
      },
      {
        "definitionId": "UPPER_HEIGHT",
        "key": "鞋帮高度",
        "translatedKey": "Высота верха",
        "value": [
          "低帮"
        ],
        "translatedValue": [
          "Низкий верх"
        ]
      },
      {
        "definitionId": "FEATURE",
        "key": "功能性",
        "translatedKey": "Особенности",
        "value": [
          "防滑"
        ],
        "translatedValue": [
          "Нескользящие"
        ]
      },
      {
        "definitionId": "CLOSURE",
        "key": "闭合方式",
        "translatedKey": "Застежка",
        "value": [
          "系带"
        ],
        "translatedValue": [
          "Шнуровка"
        ]
      },
      {
        "definitionId": "TOE_STYLE",
        "key": "鞋头款式",
        "translatedKey": "Носок",
        "value": [
          "圆头"
        ],
        "translatedValue": [
          "Круглый"
        ]
      },
      {
        "definitionId": "HEEL_TYPE",
        "key": "鞋跟类型",
        "translatedKey": "Каблук",
        "value": [
          "平跟"
        ],
        "translatedValue": [
          "Плоский"
        ]
      },
      {
        "definitionId": "MAIN_ARTICLE_NUMBER",
        "key": "主货号",
        "translatedKey": "Основной номер товара",
        "value": [
          "396254-01"
        ],
        "translatedValue": [
          "396254-01"
        ]
      },
      {
        "definitionId": "SALE_PRICE",
        "key": "发售价格",
        "translatedKey": "Цена предложения",
        "value": [
          "¥799"
        ],
        "translatedValue": [
          "¥799"
        ]
      },
      {
        "definitionId": "RELEASE_DATE",
        "key": "发售日期",
        "translatedKey": "Дата выхода",
        "value": [
          "2024.01"
        ],
        "translatedValue": [
          "2024.01"
        ]
      }
    ],
    "returnable": false,
    "sizeTable": [
      {
        "type": "EU",
        "primary": true,
        "values": [
          "35",
          "35.5",
          "36",
          "37",
          "37.5",
          "38",
          "38.5",
          "39",
          "40",
          "40.5",
          "41",
          "42",
          "42.5",
          "43",
          "44",
          "44.5",
          "45",
          "46",
          "46.5",
          "47",
          "47.5",
          "48",
          "48.5",
          "49.5"
        ]
      },
      {
        "type": "MM",
        "primary": false,
        "values": [
          "215",
          "220",
          "225",
          "230",
          "235",
          "240",
          "245",
          "250",
          "255",
          "260",
          "265",
          "270",
          "275",
          "280",
          "285",
          "290",
          "295",
          "300",
          "305",
          "310",
          "315",
          "320",
          "325",
          "330"
        ]
      },
      {
        "type": "US",
        "primary": false,
        "values": [
          "3.5",
          "4",
          "4.5",
          "5",
          "5.5",
          "6",
          "6.5",
          "7",
          "7.5",
          "8",
          "8.5",
          "9",
          "9.5",
          "10",
          "10.5",
          "11",
          "11.5",
          "12",
          "12.5",
          "13",
          "13.5",
          "14",
          "14.5",
          "15"
        ]
      },
      {
        "type": "UK",
        "primary": false,
        "values": [
          "2.5",
          "3",
          "3.5",
          "4",
          "4.5",
          "5",
          "5.5",
          "6",
          "6.5",
          "7",
          "7.5",
          "8",
          "8.5",
          "9",
          "9.5",
          "10",
          "10.5",
          "11",
          "11.5",
          "12",
          "12.5",
          "13",
          "13.5",
          "14"
        ]
      },
      {
        "type": "RU",
        "primary": false,
        "values": [
          "/",
          "34.5",
          "35",
          "36",
          "36.5",
          "37",
          "37.5",
          "38",
          "39",
          "39.5",
          "40",
          "41",
          "41.5",
          "42",
          "43",
          "43.5",
          "44",
          "45",
          "45.5",
          "46",
          "/",
          "/",
          "47.5",
          "48.5"
        ]
      }
    ],
    "skuId": 648998540,
    "skus": [
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 648998540,
        "cnyPrice": 1299,
        "price": 26990,
        "split": {
          "first": 13495,
          "second": 13495
        },
        "size": {
          "primary": "35.5",
          "us": "4",
          "uk": "3",
          "eu": "35.5",
          "ru": "34.5"
        },
        "fromAvailability": [],
        "maxPrice": 26990,
        "deliveryTime": {
          "min": 21,
          "max": 26,
          "expressMax": 12,
          "expressMin": 9
        },
        "priceV2": {
          "price": 26990,
          "priceWithoutDiscount": 26990,
          "discount": false,
          "priceWithExpress": 30490,
          "priceWithExpressWithoutDiscount": 30490,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      },
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 648998541,
        "cnyPrice": 359,
        "price": 10173,
        "split": {
          "first": 5087,
          "second": 5086
        },
        "size": {
          "primary": "36",
          "us": "4.5",
          "uk": "3.5",
          "eu": "36",
          "ru": "35"
        },
        "fromAvailability": [],
        "maxPrice": 10173,
        "deliveryTime": {
          "min": 21,
          "max": 26,
          "expressMax": 12,
          "expressMin": 9
        },
        "priceV2": {
          "price": 10173,
          "priceWithoutDiscount": 10173,
          "discount": false,
          "priceWithExpress": 13673,
          "priceWithExpressWithoutDiscount": 13673,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      },
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 648998542,
        "cnyPrice": 449,
        "price": 11783,
        "split": {
          "first": 5892,
          "second": 5891
        },
        "size": {
          "primary": "37",
          "us": "5",
          "uk": "4",
          "eu": "37",
          "ru": "36"
        },
        "fromAvailability": [],
        "maxPrice": 11783,
        "deliveryTime": {
          "min": 24,
          "max": 29,
          "expressMax": 15,
          "expressMin": 12
        },
        "priceV2": {
          "price": 11783,
          "priceWithoutDiscount": 11783,
          "discount": false,
          "priceWithExpress": 15283,
          "priceWithExpressWithoutDiscount": 15283,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      },
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 648998543,
        "cnyPrice": 489,
        "price": 12499,
        "split": {
          "first": 6250,
          "second": 6249
        },
        "size": {
          "primary": "37.5",
          "us": "5.5",
          "uk": "4.5",
          "eu": "37.5",
          "ru": "36.5"
        },
        "fromAvailability": [],
        "maxPrice": 12499,
        "deliveryTime": {
          "min": 24,
          "max": 29,
          "expressMax": 15,
          "expressMin": 12
        },
        "priceV2": {
          "price": 12499,
          "priceWithoutDiscount": 12499,
          "discount": false,
          "priceWithExpress": 15999,
          "priceWithExpressWithoutDiscount": 15999,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      },
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 648998544,
        "cnyPrice": 439,
        "price": 11604,
        "split": {
          "first": 5802,
          "second": 5802
        },
        "size": {
          "primary": "38",
          "us": "6",
          "uk": "5",
          "eu": "38",
          "ru": "37"
        },
        "fromAvailability": [],
        "maxPrice": 11604,
        "deliveryTime": {
          "min": 21,
          "max": 26,
          "expressMax": 12,
          "expressMin": 9
        },
        "priceV2": {
          "price": 11604,
          "priceWithoutDiscount": 11604,
          "discount": false,
          "priceWithExpress": 15104,
          "priceWithExpressWithoutDiscount": 15104,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      },
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 648998545,
        "cnyPrice": 0,
        "price": 0,
        "size": {
          "primary": "38.5",
          "us": "6.5",
          "uk": "5.5",
          "eu": "38.5",
          "ru": "37.5"
        },
        "fromAvailability": [],
        "maxPrice": 0,
        "priceV2": {
          "price": 0,
          "priceWithoutDiscount": 0,
          "discount": false,
          "priceWithExpress": 0,
          "priceWithExpressWithoutDiscount": 0,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      },
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 648998546,
        "cnyPrice": 569,
        "price": 13930,
        "split": {
          "first": 6965,
          "second": 6965
        },
        "size": {
          "primary": "39",
          "us": "7",
          "uk": "6",
          "eu": "39",
          "ru": "38"
        },
        "fromAvailability": [],
        "maxPrice": 13930,
        "deliveryTime": {
          "min": 21,
          "max": 26,
          "expressMax": 12,
          "expressMin": 9
        },
        "priceV2": {
          "price": 13930,
          "priceWithoutDiscount": 13930,
          "discount": false,
          "priceWithExpress": 17430,
          "priceWithExpressWithoutDiscount": 17430,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      },
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 648998547,
        "cnyPrice": 559,
        "price": 13751,
        "split": {
          "first": 6876,
          "second": 6875
        },
        "size": {
          "primary": "40",
          "us": "7.5",
          "uk": "6.5",
          "eu": "40",
          "ru": "39"
        },
        "fromAvailability": [],
        "maxPrice": 13751,
        "deliveryTime": {
          "min": 24,
          "max": 29,
          "expressMax": 15,
          "expressMin": 12
        },
        "priceV2": {
          "price": 13751,
          "priceWithoutDiscount": 13751,
          "discount": false,
          "priceWithExpress": 17251,
          "priceWithExpressWithoutDiscount": 17251,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      },
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 648998548,
        "cnyPrice": 0,
        "price": 0,
        "size": {
          "primary": "40.5",
          "us": "8",
          "uk": "7",
          "eu": "40.5",
          "ru": "39.5"
        },
        "fromAvailability": [],
        "maxPrice": 0,
        "priceV2": {
          "price": 0,
          "priceWithoutDiscount": 0,
          "discount": false,
          "priceWithExpress": 0,
          "priceWithExpressWithoutDiscount": 0,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      },
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 648998549,
        "cnyPrice": 479,
        "price": 12320,
        "split": {
          "first": 6160,
          "second": 6160
        },
        "size": {
          "primary": "41",
          "us": "8.5",
          "uk": "7.5",
          "eu": "41",
          "ru": "40"
        },
        "fromAvailability": [],
        "maxPrice": 12320,
        "deliveryTime": {
          "min": 21,
          "max": 26,
          "expressMax": 12,
          "expressMin": 9
        },
        "priceV2": {
          "price": 12320,
          "priceWithoutDiscount": 12320,
          "discount": false,
          "priceWithExpress": 15820,
          "priceWithExpressWithoutDiscount": 15820,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      },
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 648998550,
        "cnyPrice": 499,
        "price": 12678,
        "split": {
          "first": 6339,
          "second": 6339
        },
        "size": {
          "primary": "42",
          "us": "9",
          "uk": "8",
          "eu": "42",
          "ru": "41"
        },
        "fromAvailability": [],
        "maxPrice": 12678,
        "deliveryTime": {
          "min": 21,
          "max": 26,
          "expressMax": 12,
          "expressMin": 9
        },
        "priceV2": {
          "price": 12678,
          "priceWithoutDiscount": 12678,
          "discount": false,
          "priceWithExpress": 16178,
          "priceWithExpressWithoutDiscount": 16178,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      },
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 648998551,
        "cnyPrice": 519,
        "price": 13035,
        "split": {
          "first": 6518,
          "second": 6517
        },
        "size": {
          "primary": "42.5",
          "us": "9.5",
          "uk": "8.5",
          "eu": "42.5",
          "ru": "41.5"
        },
        "fromAvailability": [],
        "maxPrice": 13035,
        "deliveryTime": {
          "min": 21,
          "max": 26,
          "expressMax": 12,
          "expressMin": 9
        },
        "priceV2": {
          "price": 13035,
          "priceWithoutDiscount": 13035,
          "discount": false,
          "priceWithExpress": 16535,
          "priceWithExpressWithoutDiscount": 16535,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      },
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 648998552,
        "cnyPrice": 729,
        "price": 16792,
        "split": {
          "first": 8396,
          "second": 8396
        },
        "size": {
          "primary": "43",
          "us": "10",
          "uk": "9",
          "eu": "43",
          "ru": "42"
        },
        "fromAvailability": [],
        "maxPrice": 16792,
        "deliveryTime": {
          "min": 21,
          "max": 26,
          "expressMax": 12,
          "expressMin": 9
        },
        "priceV2": {
          "price": 16792,
          "priceWithoutDiscount": 16792,
          "discount": false,
          "priceWithExpress": 20292,
          "priceWithExpressWithoutDiscount": 20292,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      },
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 648998553,
        "cnyPrice": 429,
        "price": 11425,
        "split": {
          "first": 5713,
          "second": 5712
        },
        "size": {
          "primary": "44",
          "us": "10.5",
          "uk": "9.5",
          "eu": "44",
          "ru": "43"
        },
        "fromAvailability": [],
        "maxPrice": 11425,
        "deliveryTime": {
          "min": 21,
          "max": 26,
          "expressMax": 12,
          "expressMin": 9
        },
        "priceV2": {
          "price": 11425,
          "priceWithoutDiscount": 11425,
          "discount": false,
          "priceWithExpress": 14925,
          "priceWithExpressWithoutDiscount": 14925,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      },
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 648998554,
        "cnyPrice": 0,
        "price": 0,
        "size": {
          "primary": "44.5",
          "us": "11",
          "uk": "10",
          "eu": "44.5",
          "ru": "43.5"
        },
        "fromAvailability": [],
        "maxPrice": 0,
        "priceV2": {
          "price": 0,
          "priceWithoutDiscount": 0,
          "discount": false,
          "priceWithExpress": 0,
          "priceWithExpressWithoutDiscount": 0,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      },
      {
        "images": [
          "https://cdn.poizon.com/pro-img/origin-img/20240110/ae98c26fbda14091a48dda7dac6361a7.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/eb7f6a69ec3642408f01c9fd0767ba32.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/5ec127a7fa4e40acb3dedb689cb9f69f.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/f1b39b39b555455a9074e9e529cd2ced.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/522aa5c5135246deaeba154efd386bbb.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/1225630274284b109cb5cd01153c8df9.jpg",
          "https://cdn.poizon.com/pro-img/origin-img/20240110/b658bb5cfacd4dae847ab5333730b271.jpg"
        ],
        "skuId": 745959415,
        "cnyPrice": 0,
        "price": 0,
        "size": {
          "primary": "45",
          "us": "11.5",
          "uk": "10.5",
          "eu": "45",
          "ru": "44"
        },
        "fromAvailability": [],
        "maxPrice": 0,
        "priceV2": {
          "price": 0,
          "priceWithoutDiscount": 0,
          "discount": false,
          "priceWithExpress": 0,
          "priceWithExpressWithoutDiscount": 0,
          "priceFromAvailability": 0,
          "previousPriceFromAvailability": 0,
          "discountFromAvailability": false
        }
      }
    ],
    "slug": "staple-x-puma-suede-staple",
    "updatedAt": "2025-01-20T03:05:56.602Z",
    "article": "396254-01",
    "brandId": 2,
    "category1": 29,
    "category2": 35,
    "category3": 38,
    "description": "",
    "primarySizeType": "EU",
    "properties": {
      "skus": [
        {
          "skuId": 648998540,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 342480852,
              "typeId": 6,
              "value": "35.5"
            }
          ]
        },
        {
          "skuId": 648998541,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 342480853,
              "typeId": 6,
              "value": "36"
            }
          ]
        },
        {
          "skuId": 648998542,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 342480854,
              "typeId": 6,
              "value": "37"
            }
          ]
        },
        {
          "skuId": 648998543,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 342480855,
              "typeId": 6,
              "value": "37.5"
            }
          ]
        },
        {
          "skuId": 648998544,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 342480856,
              "typeId": 6,
              "value": "38"
            }
          ]
        },
        {
          "skuId": 648998545,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 342480857,
              "typeId": 6,
              "value": "38.5"
            }
          ]
        },
        {
          "skuId": 648998546,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 342480858,
              "typeId": 6,
              "value": "39"
            }
          ]
        },
        {
          "skuId": 648998547,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 342480859,
              "typeId": 6,
              "value": "40"
            }
          ]
        },
        {
          "skuId": 648998548,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 342480860,
              "typeId": 6,
              "value": "40.5"
            }
          ]
        },
        {
          "skuId": 648998549,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 342480861,
              "typeId": 6,
              "value": "41"
            }
          ]
        },
        {
          "skuId": 648998550,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 342480862,
              "typeId": 6,
              "value": "42"
            }
          ]
        },
        {
          "skuId": 648998551,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 342480863,
              "typeId": 6,
              "value": "42.5"
            }
          ]
        },
        {
          "skuId": 648998552,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 342480864,
              "typeId": 6,
              "value": "43"
            }
          ]
        },
        {
          "skuId": 648998553,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 342480865,
              "typeId": 6,
              "value": "44"
            }
          ]
        },
        {
          "skuId": 648998554,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 342480866,
              "typeId": 6,
              "value": "44.5"
            }
          ]
        },
        {
          "skuId": 745959415,
          "properties": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            },
            {
              "id": 529719113,
              "typeId": 6,
              "value": "45"
            }
          ]
        }
      ],
      "propertyValues": [
        {
          "id": 342480851,
          "value": "米色",
          "typeId": 1,
          "translatedValue": "бежевый"
        },
        {
          "id": 342480852,
          "value": "35.5",
          "typeId": 6
        },
        {
          "id": 342480853,
          "value": "36",
          "typeId": 6
        },
        {
          "id": 342480854,
          "value": "37",
          "typeId": 6
        },
        {
          "id": 342480855,
          "value": "37.5",
          "typeId": 6
        },
        {
          "id": 342480856,
          "value": "38",
          "typeId": 6
        },
        {
          "id": 342480857,
          "value": "38.5",
          "typeId": 6
        },
        {
          "id": 342480858,
          "value": "39",
          "typeId": 6
        },
        {
          "id": 342480859,
          "value": "40",
          "typeId": 6
        },
        {
          "id": 342480860,
          "value": "40.5",
          "typeId": 6
        },
        {
          "id": 342480861,
          "value": "41",
          "typeId": 6
        },
        {
          "id": 342480862,
          "value": "42",
          "typeId": 6
        },
        {
          "id": 342480863,
          "value": "42.5",
          "typeId": 6
        },
        {
          "id": 342480864,
          "value": "43",
          "typeId": 6
        },
        {
          "id": 342480865,
          "value": "44",
          "typeId": 6
        },
        {
          "id": 342480866,
          "value": "44.5",
          "typeId": 6
        },
        {
          "id": 529719113,
          "value": "45",
          "typeId": 6
        }
      ],
      "propertyTypes": [
        {
          "id": 1,
          "name": "Цвет",
          "values": [
            {
              "id": 342480851,
              "typeId": 1,
              "value": "бежевый"
            }
          ]
        },
        {
          "id": 6,
          "name": "Размер",
          "values": [
            {
              "id": 342480852,
              "typeId": 6,
              "value": "35.5"
            },
            {
              "id": 342480853,
              "typeId": 6,
              "value": "36"
            },
            {
              "id": 342480854,
              "typeId": 6,
              "value": "37"
            },
            {
              "id": 342480855,
              "typeId": 6,
              "value": "37.5"
            },
            {
              "id": 342480856,
              "typeId": 6,
              "value": "38"
            },
            {
              "id": 342480857,
              "typeId": 6,
              "value": "38.5"
            },
            {
              "id": 342480858,
              "typeId": 6,
              "value": "39"
            },
            {
              "id": 342480859,
              "typeId": 6,
              "value": "40"
            },
            {
              "id": 342480860,
              "typeId": 6,
              "value": "40.5"
            },
            {
              "id": 342480861,
              "typeId": 6,
              "value": "41"
            },
            {
              "id": 342480862,
              "typeId": 6,
              "value": "42"
            },
            {
              "id": 342480863,
              "typeId": 6,
              "value": "42.5"
            },
            {
              "id": 342480864,
              "typeId": 6,
              "value": "43"
            },
            {
              "id": 342480865,
              "typeId": 6,
              "value": "44"
            },
            {
              "id": 342480866,
              "typeId": 6,
              "value": "44.5"
            },
            {
              "id": 529719113,
              "typeId": 6,
              "value": "45"
            }
          ]
        }
      ]
    }
  })

  useEffect(() => {
    setProduct(updatedProductData || remoteProduct || selectedProduct);
  },[selectedProduct, remoteProduct, updatedProductData]);

  useEffect(() => {
    const currentProduct = product;
    console.log('currentProduct',currentProduct)
    if (!currentProduct?.skus?.length) {
      return;
    }

    let handledSizesAndPrices = currentProduct?.skus || []

    if (!Object.keys(currentProduct?.skus?.[0]?.size)?.length) {
      const propertyTypeSizeIndex = currentProduct?.properties?.propertyTypes.findIndex((type) => type.name === "Размер");
      const sizesValues = currentProduct?.properties?.propertyTypes[propertyTypeSizeIndex]?.values;

      const sizesAndPrices = sizesValues?.map((size, i) => ({
        ...size,
        price: currentProduct?.skus[i]?.price,
        size: size?.value
      }));
      console.log('sizesAndPrices =',sizesAndPrices);
      handledSizesAndPrices = sizesAndPrices || [];
    }

    // For bags and else
    if (currentProduct?.skus?.length === 1 && currentProduct?.skus[0].price) {
      handledSizesAndPrices = [{size: 'Стандарт', index: 0, price: currentProduct?.skus[0].price}]
    }

    const sortedHandledSizesAndPrices = [
      ...new Map(
          handledSizesAndPrices.map(item => [normalizeSize(item?.size || item?.value), item])
      ).values()
    ].sort((a, b) => {
      const sizeA = normalizeSize(a?.size || a?.value);
      const sizeB = normalizeSize(b?.size || b?.value);

      const isNumeric = !isNaN(sizeA) && !isNaN(sizeB);

      if (isNumeric) {
        return parseFloat(sizeA) - parseFloat(sizeB); // Числовая сортировка
      } else {
        return APPAREL_SIZES_ORDER.indexOf(sizeA) - APPAREL_SIZES_ORDER.indexOf(sizeB); // Буквенная сортировка
      }
    });

    //console.log('sortedHandledSizesAndPrices',sortedHandledSizesAndPrices)

    setSizesAndPrices(sortedHandledSizesAndPrices);

    if (!sortedHandledSizesAndPrices?.length) {
      return;
    }

    let p = getCheapestElOfSize(sortedHandledSizesAndPrices?.filter(el => el.price && (el?.size || el?.size?.primary)));

    if ((typeof p?.size === 'object' && Object.keys(p?.size)?.length) || !p?.size) {
      p.size = 'Стандарт';
    }

    setChoice({ size: p?.size, price: p.price, index: p.index });

    if (sizesParam?.split(',').length  === 1) {
      const p = getCurrentPriceOfSize(sizesParam, sortedHandledSizesAndPrices?.filter(el => el.price && (el?.size || el?.size?.primary)));
      setChoice({ size: p?.size, price: p.price, index: p.index });
    }

    const icon = document.getElementsByClassName('tabler-icon-heart')[0];
    if (!icon) return;

    const prevFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const productIndex = prevFavorites.findIndex((el) => el?.spuId === product?.spuId);

    if (productIndex >= 0) {
      icon.style.fill = '#a2a2a2';
    }

    if (!prevUpdatedAtRef.current) {
      prevUpdatedAtRef.current = currentProduct?.updatedAt;
    } else if (prevUpdatedAtRef.current !== currentProduct?.updatedAt) {
      prevUpdatedAtRef.current = currentProduct?.updatedAt;
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const onAddToCart = () => {
    if (!choice?.price) {
      return;
    }

    dispatch(
      addToCart({
        ...product,
        selectedSize: choice?.size?.eu || choice?.size,
        price: choice.price,
        cartId: `${product.spuId}-${choice?.size?.eu || choice?.size}`
      }),
    );
    //navigate("/cart");
  };

  const onChangeChoiceHandler = (el, i) => {
    console.log('el',el);
    if (!el.price) {
      return;
    }

    const price = el?.price;
    setChoice({ size: el?.size?.primary || el?.size || 'cтандарт', price, index: i });
  };

  const getTitlePrice = (price) => {
    if (!price) {
      return "--";
    }

    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  const getBtnPrice = useCallback((price) => {
    if (!price) {
      return "--";
    }

    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);

  },[choice, isDisabledBuyBtn]);

  const onMeasureOpenClick = () => {
    setMeasureOpen(true);
  };

  const onLoadCarousel = () => {
    if (!isLoadingImages) {
      return null;
    }
    setIsLoadingImages(false);
  };

  const onBrandClick = () => {
    if (!product?.brandId) {
      return;
    }

    setLoading(true);
    setOffset(1);
    navigate(`?brandIds=${product?.brandId}&brandName=${product?.brand}`);
  }

  const onInfoBlockItemClick = (link) => {
    window.open(link);
  }

  const getImgSrc = () => {
    const brandIndex = BRANDS.findIndex(el => el.id === product?.brandIds);
    if (brandIndex === -1) {
      return null
    }
    return BRANDS[brandIndex]?.src;
  }

  const copyUrl = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Смотри, какой классный товар!",
          url: window.location.href,
        });
        console.log("Контент успешно отправлен!");
      } catch (error) {
        console.error("Ошибка при отправке:", error);
      }
    } else {
      alert("Функция 'Поделиться' не поддерживается в этом браузере.");
    }
  }

  const goBack = () => {
    if (window.location.href.includes('favorites')) {
      return window.location.href = window.location.origin?.split('?')[0] + '/favorites';
    }

    if (window?.history?.length === 2) {
      return navigate("/");
    }

    window.history.go(-1);
  }

  const onFavoriteIconClick = () => {
    const icon = document.getElementsByClassName('tabler-icon-heart')[0];
    if (!icon) return;

    const prevFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const isFavorite = icon.style.fill === 'rgb(162, 162, 162)';

    if (isFavorite) {
      const updatedFavorites = prevFavorites.filter((el) => el?.spuId !== product?.spuId);
      icon.style.fill = "none";
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      icon.style.fill = '#a2a2a2';
      localStorage.setItem("favorites", JSON.stringify([...prevFavorites, product]));
    }
  };

  const isDesktopScreen = window?.innerWidth > 768;

  const getValue = (size) => {
    if (size?.eu) return size.eu;
    if (size?.primary) return size.primary;
    if (typeof size === 'string' || typeof size === 'number') return size;
    return "";
  }

  const root = document.getElementById("root");


  useEffect(() => {
    root.style.overflowY = "hidden";
    return () => { root.style.overflowY = "unset" };
  }, [])

  /*window?.onscroll(
      "scroll",
      function (event) {
        try {
          console.log(event)
          setIsScrolled(window.scrollY > 100);
        } catch (e) {
          console.log("e =", e);
        }
      },
      false,
  );
*/
  const onBreadcrumbItemClick = (link) => {
    setOffset(1)
    setLoading(true);
    navigate(link);
  }

  const checkIsCartItem = (product, size) => {
    console.log('product',product)
    console.log(' size',size)
     // Извлекаем значение размера
    const cartId = `${product.spuId}-${size}`; // Формируем корректный cartId

    const foundedIndex = cartItems.findIndex((el) => el.cartId === cartId);
    console.log('foundedIndex',foundedIndex)
    return foundedIndex >= 0;
  }

  const getCartItemCount = useCallback((product, size) => {
    const sizeValue = size?.eu || size?.primary; // Извлекаем значение размера
    const cartId = `${product.spuId}-${sizeValue}`; // Формируем корректный cartId

    const foundedIndex = cartItems.findIndex((el) => el.cartId === cartId);

    if (foundedIndex < 0) {
      return null
    }

    return <div className="counter-wrapper">
      <span>
        {cartItems[foundedIndex]?.count}
      </span>
    </div>
  }, [cartItems]);

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(product));
  }

  return (
    <div style={{height: '100%'}} ref={productLayoutRef}>
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
              padding: "16px",
              borderBottom: "1px solid #ececec",
              gap: "16px",
            }}
          >
            <div style={{ fontSize: "22px", fontWeight: "500" }}>
              Таблица размеров
            </div>
            <MeasureTable sizeTable={product?.sizeTable} />
          </div>
        </Modal>
      )}
      {isLoadingProduct && (
        <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
          <LoadingOutlined style={{fontSize: '24px'}} spin />
        </div>)
      }
      {isDesktopScreen && <MainLogoComponent
                              style={{width:'100vw', marginLeft:'-12.5%'}}
                              setLoading={setLoading}
                              setOffset={setOffset}
      />}
      {!isLoadingProduct && (
          <div style={{height: '100%'}}>
            {!isDesktopScreen &&
                <div className={`product-bar-wrapper ${isScrolled ? "solid" : ""}`}>
                  <img
                      src="https://storage.yandexcloud.net/pc-mediafiles/icons/%D0%9D%D0%B0%D0%B7%D0%B0%D0%B4%20(1).png"
                      alt="" className="go-back-btn"
                      onClick={goBack}/>
                  <div className="title-wrapper bar">
                    <div className="first-part">
                      <span className="standart" style={{minHeight: '24px', fontWeight: '500'}}>
                            {selectedProduct?.brand || product?.brand}
                      </span>
                      <span className="dot">·</span>
                      <span className="standart" style={{minHeight: '24px'}}>
                            {selectedProduct?.name || product?.name}
                      </span>
                    </div>

                    <div className={isDesktopScreen ? 'title' : 'phone-bar-title'}>
                      {getIntPrice(choice?.price || selectedProduct?.price)}
                    </div>
                  </div>
                  <div className="right-items-wrapper">
                    <div className="link-btn favorite-btn" onClick={onFavoriteIconClick}>
                      <IconHeart/>
                    </div>
                    <img
                        src="https://storage.yandexcloud.net/pc-mediafiles/icons/%D0%9F%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8%D1%82%D1%8C%D1%81%D1%8F(cropped).png"
                        className="link-btn"
                        onClick={copyUrl} alt=""/>
                  </div>

                </div>
            }


            <div className={'layout-wrapper'} style={{padding: isDesktopScreen ? '0 20px' : '0'}}>
              <div className={"content-wrapper"} style={{flexDirection: isDesktopScreen ? 'row' : 'column'}}>
                <div className={"carousel-wrapper"} style={{
                  maxWidth: isDesktopScreen ? 'calc(50% - 24px / 2)' : 'none',
                }}>
                  {isDesktopScreen && product &&
                      <div className="breadcrumb-wrapper">
                      <div className="back-to-main-btn" onClick={goBack}><ArrowLeftOutlined/></div>
                        <Breadcrumb
                            items={[
                              {
                                title: <span
                                    onClick={() => onBreadcrumbItemClick('/')}
                                    className={'breadcrumb-wrapper-item'}
                                >
                                  Главная
                                </span>,
                              },
                              {
                                title: <span onClick={
                                  () => onBreadcrumbItemClick(getCategoryClickedLink(
                                    1,
                                    product.category1,
                                    product?.category?.category1 || ""
                                ))}
                                   className={'breadcrumb-wrapper-item'}
                                >
                                  {
                                      (CATEGORIES.find(el => el.id === product.category1))?.name
                                      || product?.category?.category1 || ""
                                  }
                                </span>,
                              },
                              {
                                title: <span onClick={
                                  () => onBreadcrumbItemClick(getCategoryClickedLink(
                                    2,
                                    product.category2,
                                    product?.category?.category2?.split('/')[1] || ""
                                    ))}
                                   className={'breadcrumb-wrapper-item'}
                                >{
                                    (CATEGORIES.find(el => el.id === product.category2))?.name
                                    || product?.category?.category2?.split('/')[1] || ""
                                }
                                </span>,
                              },
                              {
                                title: <span onClick={
                                  () => onBreadcrumbItemClick(getCategoryClickedLink(
                                    3,
                                    product.category3,
                                    product?.category?.category3?.split('/')[2]
                                ))}
                                   className={'breadcrumb-wrapper-item'}
                                >{
                                    (CATEGORIES.find(el => el.id === product.category3))?.name
                                    || product?.category?.category3?.split('/')[2] || ""
                                  }
                                </span>,
                              },
                            ]}
                        />
                      </div>
                  }

                  {isDesktopScreen &&
                      <ProductGallery
                          images={remoteProduct?.images || selectedProduct?.images}
                        onLoad={onLoadCarousel}
                        onError={onLoadCarousel}
                    />
                  }
                  {!isDesktopScreen &&
                    <SwiperCarousel
                        images={remoteProduct?.images || selectedProduct?.images}
                        onLoad={onLoadCarousel}
                        onError={onLoadCarousel}
                    />
                  }



                  {isDesktopScreen && <div style={{width: '100%'}}>
                  <div className="item-details-wrapper">
                    <ItemDetails details={product?.productProperties} style={{marginTop: '50px'}}/>
                  </div>
                  <div className="product-info__item standart brand " onClick={onBrandClick}>
                    {!!getImgSrc() && <img
                        src={getImgSrc()}
                        alt="brand" className="brand-logo"/>
                    }
                    <div className="brand-info">
                      <span className="brand-name">{product?.brand}</span>
                      <span className="items">10K+ items ></span>
                    </div>
                  </div>
                </div>
                }


                </div>

                <div className={isDesktopScreen ? 'product-info-wrapper' : 'product-info-phone-wrapper'}>
                  {isDesktopScreen &&
                      <div
                          className={"product-info__item standart " + (isDesktopScreen ? ' transparent space-between' : '')}
                          style={{borderRadius: '0'}}
                      >
                        {!isDesktopScreen &&
                            <div className="title">
                              {getIntPrice(choice?.price || selectedProduct?.price)}
                            </div>
                        }
                        <div className="title-wrapper">
                          <span className="standart" style={{minHeight: '24px'}}>
                            {selectedProduct?.name || product?.name}
                          </span>
                          {isDesktopScreen &&
                              <div className="title">
                                {getIntPrice(choice?.price || selectedProduct?.price)}
                              </div>
                          }
                        </div>
                        {isDesktopScreen &&
                            <div className="link-btn favorite-btn" onClick={onFavoriteIconClick}>
                              <IconHeart/>
                            </div>
                        }
                      </div>
                  }

                  {!isDesktopScreen &&
                      <div style={{display: 'grid', gap: '10px'}}>
                        <div className={"product-info__item standart"}>
                          {!isDesktopScreen &&
                              <div className="title">
                                {getIntPrice(choice?.price)}
                              </div>
                          }
                          <div className="title-wrapper">
                            <span className="standart" style={{minHeight: '24px'}}>
                              {selectedProduct?.name || product?.name}
                            </span>
                          </div>
                        </div>
                        {!!sizesAndPrices?.length && sizesAndPrices[0]?.size !== 'Стандарт' && (
                            <div className="product-info__item standart">
                              <div className="label">
                                <div className="label_wrap">
                                  <div className="size_label">
                                    <div>Размер: EU</div>
                                  </div>
                                </div>
                                {product?.category?.category1 === 'footwear' &&
                                    <div className="size_guide" onClick={onMeasureOpenClick}>
                                      Таблица размеров
                                      <img className="PoizonImage_img__BNSaU"
                                           src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg"
                                           alt=""/>
                                    </div>
                                }

                              </div>
                              <div className="list">
                                {sizesAndPrices?.filter(el => el?.price && el?.size)?.map((el, i) => (
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
                                      {getCartItemCount(product, el?.size)}
                                      <div
                                          style={{
                                            fontSize: "17px",
                                            fontWeight: "600",
                                            textAlign: "center",
                                          }}
                                      >
                                        {getValue(el?.size)}
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
                        )}
                        {!isDesktopScreen && product?.category?.category2 &&
                            <div className="product-info__item standart brand"
                                 onClick={
                                   () => onBreadcrumbItemClick(getCategoryClickedLink(
                                       2,
                                       product.category2,
                                       product.category?.category2?.split('/')[1] || ""
                                   ))}
                            >
                              <div className="brand-info">
                                <span className={'brand-name'}>
                                  {
                                      (CATEGORIES.find(el => el.id === product.category2))?.name
                                      || product.category?.category2?.split('/')[1] || ""
                                  }
                                </span>
                                <span className="items">Еще товары категории {
                                    (CATEGORIES.find(el => el.id === product.category2))?.name
                                    || product.category?.category2?.split('/')[1] || ""
                                }</span>
                              </div>

                              <span className="brand-name-arrow">
                                <img className="PoizonImage_img__BNSaU"
                                     src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg"
                                     alt=""/>
                              </span>
                            </div>
                        }
                        {!isDesktopScreen && product?.category?.category3 &&
                            <div className="product-info__item standart brand"
                                 onClick={
                                   () => onBreadcrumbItemClick(getCategoryClickedLink(
                                       3,
                                       product.category3,
                                       product.category?.category3?.split('/')[2]
                                   ))}
                            >
                              <div className="brand-info">
                                <span className={'brand-name'}>
                                  {
                                      (CATEGORIES.find(el => el.id === product.category3))?.name
                                      || product.category?.category3?.split('/')[2] || ""
                                  }
                                </span>
                                <span className="items">Еще товары категории {
                                    (CATEGORIES.find(el => el.id === product.category3))?.name
                                    || product.category?.category3?.split('/')[2] || ""
                                }</span>
                              </div>

                              <span className="brand-name-arrow">
                                <img className="PoizonImage_img__BNSaU"
                                     src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg"
                                     alt=""/>
                              </span>
                            </div>
                        }

                        <div className="product-info__item standart">
                          <ItemDetails details={product?.productProperties}/>
                        </div>

                        <div className="product-info__item standart brand" onClick={onBrandClick}>
                          {!!getImgSrc() && <img
                              src={getImgSrc()}
                              alt="brand" className="brand-logo"/>
                          }

                          <div className="brand-info">
                            <span className="brand-name">{product?.brand}</span>
                            <span className="items">10K+ items</span>
                          </div>

                          <span className="brand-name-arrow">
                            <img className="PoizonImage_img__BNSaU"
                                 src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg"
                                 alt=""/>
                          </span>
                        </div>
                        {!isDesktopScreen &&
                            <div className="product-info__item standart brand"
                                 onClick={() => onInfoBlockItemClick("https://t.me/repoizon_otzovik")}
                            >
                              <div className="brand-info">
                                <span className="brand-name">Отзывы</span>
                                <span className="items">Отзывы о работе re:Poizon</span>
                              </div>

                              <span className="brand-name-arrow">
                            <img className="PoizonImage_img__BNSaU"
                                 src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg"
                                 alt=""/>
                          </span>
                            </div>
                        }
                        {!isDesktopScreen &&
                            <div className="product-info__item standart brand"
                                 onClick={() => onInfoBlockItemClick("https://t.me/re_poizon_ru")}
                            >
                              <div className="brand-info">
                                <span>
                                  <span className="brand-name">Мы в телеграм
                                  </span>
                                  <img src="/telegram-icon.svg" alt="Telegram"/>
                                </span>
                                <span className="items">Новости проекта и модные тренды</span>
                              </div>

                              <span className="brand-name-arrow">
                            <img className="PoizonImage_img__BNSaU"
                                 src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg"
                                 alt=""/>
                          </span>
                            </div>
                        }
                        <div className="product-info__item standart">
                          <DeliverBlock/>
                        </div>
                        <div className="product-info__item standart">
                          <InsuranceBlock/>
                        </div>
                        <div className="product-info__item standart">
                          <VerifiedBlock/>
                        </div>
                        <PoizonVerifiedBlock />
                      </div>
                  }

                  {!isDesktopScreen &&
                      <TelegramButton text="Задать вопрос по товару" productUrl={window.location.href}/>}

                  {isDesktopScreen && !!sizesAndPrices?.length && sizesAndPrices[0]?.size !== 'Стандарт' &&
                      <div className="product-info__item">
                        <div className="label">
                          <div className="label_wrap">
                            <div className="size_label">
                              <div>Размер: EU</div>
                            </div>
                          </div>
                          {product?.category?.category1 === 'footwear' &&
                              <div className="size_guide" onClick={onMeasureOpenClick}>
                                Таблица размеров
                                <img className="PoizonImage_img__BNSaU"
                                     src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg"
                                     alt=""/>
                              </div>
                          }
                        </div>
                        <div className="list">
                          {sizesAndPrices?.filter(el => el?.price && el?.size)?.map((el, i) => (
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
                                  {getValue(el?.size)}
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
                                  {getTitlePrice(el?.price) || "--"}
                                </div>
                              </div>
                          ))}
                        </div>
                      </div>
                  }


                  {isDesktopScreen &&
                      <CartButton
                          price={choice?.price || ""}
                          onAddToCart={onAddToCart}
                          removeFromCartHandler={removeFromCartHandler}
                          disabled={isDisabledBuyBtn}
                          showCounter={checkIsCartItem(product, choice?.size)}
                      />

                      /*<div className="btn_wrapper">
                        <Button
                            type="primary"
                            className={"btn"}
                            onClick={onAddToCart}
                            disabled={isDisabledBuyBtn}
                            loading={isDisabledBuyBtn}
                        >
                          {getBtnPrice(choice?.price)}
                          <span> {!isDisabledBuyBtn ? 'Добавить в корзину' : ''}</span>
                        </Button>
                      </div>*/
                  }
                  {isDesktopScreen && <div className="telegram-button-wrapper">
                    <TelegramButton text="Задать вопрос по товару" productUrl={window.location.href} />
                  </div>}
                  {isDesktopScreen &&
                      <>
                        <div className="product-info__item standart">
                          <DeliverBlock/>
                        </div>
                        <div className="product-info__item standart">
                          <InsuranceBlock/>
                        </div>
                        <div className="product-info__item standart">
                          <VerifiedBlock/>
                        </div>
                        <PoizonVerifiedBlock />
                      </>
                  }
                </div>

              </div>
            </div>
          </div>
      )}
      {!isDesktopScreen &&
          <footer className="footer-btn-wrapper">
            <CartButton
                price={choice?.price || ""}
                onAddToCart={onAddToCart}
                removeFromCartHandler={removeFromCartHandler}
                disabled={isDisabledBuyBtn}
                showCounter={checkIsCartItem(product, choice?.size)}
            />
          </footer>
      }
    </div>
  );
}

export default Product;
