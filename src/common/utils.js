import { useRef } from "react";

export const collectionQueryProps = (type) => ({
  providesTags: (result) => result?.items.map(({ _id }) => ({ type, id: _id })),
  transformResponse: (response, meta) => ({
    items: response?.items || response || [],
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
        arrayParams.push(...value.map((v) => `${key}=${v}`));
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
  const foundSizeIndex = sizesAndPrices.findIndex(s => s.size === size);

  if (foundSizeIndex < 0) {
    return null;
  }

  const price = sizesAndPrices[foundSizeIndex].price;
  return price.toString().substring(0, price?.length - 2);
}

export const getCheapestPriceOfSize = (sizes = []) => {
  let cheapestPrice = 1000000;

  sizes.forEach((s) => {
    const newPrice = Number(s?.price?.minPrice?.amountText);

    if (newPrice < cheapestPrice) {
      cheapestPrice = newPrice;
    }
  });

  return cheapestPrice;
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

  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price * 102);
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
  console.log('relationsOfSecondPropertyLevel=',relationsOfSecondPropertyLevel);

  const propertyValueIdSkus = relationsOfSecondPropertyLevel.map((rel) => selectedProduct.skus.find(({skuId}) => skuId === rel.skuId));

  console.log('propertyValueIdSkus',propertyValueIdSkus);
}

export function keepNumbersAndSpecialChars(str) {
  return str.replace(/[^\d\W_]/g, '');
}