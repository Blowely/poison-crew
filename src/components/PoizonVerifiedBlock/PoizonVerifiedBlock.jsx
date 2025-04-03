import React from "react";

const PoizonVerifiedBlock = () => {
    return (
        <div className="product-info__item poizon_auth full-border-radius">
            <img className="product-info__item poizon_auth pzn_img"
                 src="https://cdn-img.poizonapp.com/node-common/e9004fdc-f3f9-1e94-d275-0965f2da9ee4-192-117.png?x-oss-process=image/format,webp/resize,w_100"
                 alt="100% authenticated"/>
            <div className="sm_divider">|</div>
            <div className="product-info__item poizon_auth main-txt">ВЕРЕФИЦИРОВАНО ЭКСПЕРТАМИ</div>
            {/*<div className="product-info__item poizon_auth second-txt">5-шаговая аутентификация</div>
                  <div>
                    <img className="PoizonImage_img__BNSaU"
                         src="https://cdn-img.poizon.com/node-common/1475aab5-a55a-f15d-fa9f-09992778d7c0.svg" alt=""/>
                  </div>*/}
        </div>
    )
}

export default PoizonVerifiedBlock;