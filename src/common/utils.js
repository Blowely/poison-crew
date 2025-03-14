import { useRef } from "react";
import {useNavigate} from "react-router-dom";

export const collectionQueryProps = (type) => ({
  providesTags: (result) => result?.items?.map(({ _id }) => ({ type, id: _id })),
  transformResponse: (response, meta) => ({
    items: response?.items || [],
    totalCount: Number(
      meta?.response?.headers?.get("X-Total-Count") ||
        response?.total_count ||
        0,
    ),
  }),
});

export const customUrlBuilder = (url, params) => {
  const searchParams = new URLSearchParams(params);
  let newUrl = `${url}?`;
  const arrayParams = [];
  Object.entries(params).forEach(([key, value]) => {
    if (value instanceof Array) {
      searchParams.delete(key);
      // if (value.length) {
      //   newUrl += `${key}=${value.join(',')}&`;
      // }
      if (value.length) {
        arrayParams.push(...value?.map((v) => `${key}=${v}`));
      }
    } else if (!value) {
      searchParams.delete(key);
    }
  });
  newUrl += arrayParams.join("&");

  const searchString = searchParams.toString();

  const result = [newUrl];

  if (searchString) {
    result.push(decodeURIComponent(searchParams.toString()));
  }

  return result.join("&");
};

export const getMultipleRandom = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};

export function iosCopyToClipboard(el) {
  var oldContentEditable = el.contentEditable,
    oldReadOnly = el.readOnly,
    range = document.createRange();

  el.contentEditable = true;
  el.readOnly = false;
  range.selectNodeContents(el);

  var s = window.getSelection();
  s.removeAllRanges();
  s.addRange(range);

  el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

  el.contentEditable = oldContentEditable;
  el.readOnly = oldReadOnly;

  document.execCommand("copy");
}

export const getCurrentPriceOfSize = (size, sizesAndPrices) => {
  const foundSizeIndex = sizesAndPrices.findIndex(s => (s.size?.primary || s?.size) === size);

  if (foundSizeIndex < 0) {
    return {};
  }

  const price = sizesAndPrices[foundSizeIndex].price;
  return {price, size, index: foundSizeIndex};
}

export const getCheapestElOfSize = (sizes = []) => {
  if (!sizes?.length) {
    return {};
  }

  if (sizes?.length === 1) {
    return {...sizes[0], index: 0};
  }

  let cheapestPrice = 1000000;
  let cheapestEl = sizes[0];
  let cheapestIndex = 0;

  sizes.forEach((el,index) => {
    if (!el?.price) {
      return;
    }
    const newPrice = Number(el?.price);

    if (newPrice < cheapestPrice) {
      cheapestPrice = newPrice;
      cheapestIndex = index;
      cheapestEl = el;
    }
  });

  return {size: cheapestEl.size?.eu || cheapestEl?.size || '',  price: cheapestEl.price, index: cheapestIndex};
};

export const useFirstRender = () => {
  const ref = useRef(true);
  const firstRender = ref.current;
  ref.current = false;
  return firstRender;
};

export const getIntPrice = (price) => {
  if (!price) {
    return "";
  }

  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
}

export const getPrice = (price) => {
  if (!price) {
    return '--';
  }

  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price.toString());
}

const getLvl2Properties = (selectedProduct, el) => {
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

  const propertyValueIdSkus = relationsOfSecondPropertyLevel.map((rel) => selectedProduct.skus.find(({skuId}) => skuId === rel.skuId));

}

export function keepNumbersAndSpecialChars(str) {
  if (!str) {
    return str;
  }
  return str.toString().replace(/[^\d\W_]/g, '');
}

export const normalizeSize = (size) => {
  if (!size) return "";

  if (typeof size === 'object' && !Object.keys(size)?.length) return "";

  return (size?.primary || size)?.replace(/^(\d+)X/, (_, num) => "X"?.repeat(parseInt(num, 10))); // "2XS" -> "XXS", "3XL" -> "XXXL"
};

export const checkAuthProfileClick = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }
  navigate('/profile');
}