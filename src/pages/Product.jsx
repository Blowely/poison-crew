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

function Product({ selectedProduct, onAddToFavorite, isLoading }) {

 /* const selectedProduct = useMemo(() => ({
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
        "size": "基础装（包+防尘袋）",
        "propertyValueId": 297353562,
      },
      {
        "skuId": 634101061,
        "price": 6798660,
        "flagUrl": null,
        "size": "礼盒装（基础装+原盒）",
        "propertyValueId": 297353563,
      },
      {
        "skuId": 634101065,
        "price": 5847260,
        "flagUrl": null,
        "size": "礼袋装（基础装+原装手提袋）",
        "propertyValueId": 297353564,
      },
      {
        "skuId": 634101068,
        "price": 5847260,
        "flagUrl": null,
        "size": "礼袋装（基础装+原装手提袋）",
        "propertyValueId": 297353564,
      }
    ],
    "sizeInfoList": [],
    "createdAt": "2024-08-03T13:04:13.432Z",
    "updatedAt": "2024-08-12T12:27:05.304Z",
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
        "definitionId": 3467,
        "salePvStatus": 1
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
        "definitionId": 3467,
        "salePvStatus": 1
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
        "definitionId": 3467,
        "salePvStatus": 1
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
        "definitionId": 3467,
        "salePvStatus": 1
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
        "definitionId": 3467,
        "salePvStatus": 1
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
        "definitionId": 1978,
        "salePvStatus": 1
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
        "definitionId": 1978,
        "salePvStatus": 1
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
        "definitionId": 1978,
        "salePvStatus": 1
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
        "definitionId": 1978,
        "salePvStatus": 1
      }
    ],
    "skus": [
      {
        "spuId": 1164807,
        "skuId": 602457984,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 602457985,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 602457986,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 602749883,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 603244847,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 634101058,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 634101059,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 634101060,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 634101061,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 634101062,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 634101063,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 634101064,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 634101065,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 634101066,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 634101067,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 634101068,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 634101069,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 634101070,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 634101071,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
        "skuId": 634101072,
        "logoUrl": "https://cdn.poizon.com/pro-img/origin-img/20220521/d953bc3b6e884389bda2eb848666ae63.jpg",
        "authPrice": 920000,
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
    "title": "GUCCI古驰 Fake Not 系列 字母条纹印花 老花Logo 皮革徽标 帆布拼皮 胸包腰包 男女同款情侣款 乌木色/棕色 潮酷推荐",
    "arSkuIdRelation": [
      {
        "propertyValueId": 35037707,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 602457984
      },
      {
        "propertyValueId": 35037708,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 602457985
      },
      {
        "propertyValueId": 35037709,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 602457986
      },
      {
        "propertyValueId": 37716870,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 602749883
      },
      {
        "propertyValueId": 44673254,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 603244847
      },
      {
        "propertyValueId": 35037707,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 634101058
      },
      {
        "propertyValueId": 35037707,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 634101059
      },
      {
        "propertyValueId": 35037707,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 634101060
      },
      {
        "propertyValueId": 35037708,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 634101061
      },
      {
        "propertyValueId": 35037708,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 634101062
      },
      {
        "propertyValueId": 35037708,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 634101063
      },
      {
        "propertyValueId": 35037709,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 634101064
      },
      {
        "propertyValueId": 35037709,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 634101065
      },
      {
        "propertyValueId": 35037709,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 634101066
      },
      {
        "propertyValueId": 37716870,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 634101067
      },
      {
        "propertyValueId": 37716870,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 634101068
      },
      {
        "propertyValueId": 37716870,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 634101069
      },
      {
        "propertyValueId": 44673254,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 634101070
      },
      {
        "propertyValueId": 44673254,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 634101071
      },
      {
        "propertyValueId": 44673254,
        "spuId": 1164807,
        "supportFlag": false,
        "skuId": 634101072
      }
    ]
  }),[])*/

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
  const [lvl2Properties, setLvl2Properties] = useState([]);
  const [availableLvl1Properties, setAvailableLvl1Properties] = useState({});
  const [availableLvl2Properties, setAvailableLvl2Properties] = useState({});

  const spuId = searchParams.get("spuId");
  const sizeParam = searchParams.get("size");

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
    if(!Object.keys(selectedProduct)?.length) {
      return;
    }

    setProduct(selectedProduct);

    let currentProduct = selectedProduct;

    if (sizeParam) {
      const itemIndex = currentProduct?.sizesAndPrices?.findIndex((el) => {
        return el?.size === sizeParam
      });

      setChoice({
        price: currentProduct?.sizesAndPrices?.[itemIndex]?.price?.toString(),
        size: currentProduct?.sizesAndPrices?.[itemIndex]?.size,
        index: itemIndex,
      })

    } else {
      const itemIndex = currentProduct?.sizesAndPrices?.findIndex((el) => {
        return el?.price === currentProduct?.cheapestPrice
      });

      setChoice({
        price: currentProduct?.sizesAndPrices?.[itemIndex]?.price?.toString(),
        size: currentProduct?.sizesAndPrices?.[itemIndex]?.size,
        index: itemIndex,
      })
    }



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
    if (!lvl2Properties) {
      return;
    }

    const tempAvailableSizesBy1lvlProps = {};

    /*lvl2Properties?.map((sku) => {
      if (!sku.properties[-2]) {
        return;
      }
      const lvl1Prop = sku.properties[-2];
      tempAvailableSizesBy1lvlProps[lvl1Prop.propertyValueId] = sku.properties[-1];
    })*/

  },[lvl2Properties])

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
    if (!Number(el.price)) {
      return;
    }

    setChoice({ size: el.size, price: el.price?.toString(), index: i });

    if (!selectedProduct?.arSkuIdRelation?.length) {
      return;
    }

    const skuObj = selectedProduct.skus.find(({skuId}) => el.skuId === skuId);

    if (skuObj?.properties?.length < 2) {
      return {};
    }

    // for second level
    const { propertyValueId } = skuObj?.properties[skuObj?.properties.length - 2];


    const relationsOfSecondPropertyLevel = selectedProduct.arSkuIdRelation.filter((el) => el.propertyValueId === propertyValueId);
    console.log('relationsOfSecondPropertyLevel=',relationsOfSecondPropertyLevel);

    const propertyValueIdSkus = relationsOfSecondPropertyLevel.map((rel) => selectedProduct.skus.find(({skuId}) => skuId === rel.skuId));

    console.log('propertyValueIdSkus',propertyValueIdSkus);
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
                    <span className="standart">{product?.clearTitle || product.title}</span>
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
