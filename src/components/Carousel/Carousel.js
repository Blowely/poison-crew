import {Carousel} from "antd";
import ContentLoader from "react-content-loader";
import React, {useEffect, useState} from "react";
import NoPhoto from "../../assets/svg/no-photo";

const CarouselComponent = ({images, onLoad, onError, limit}) => {
  const contentStyle = {
    margin: 0,
    //height: '460px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#f1f1f1',
  };


  return (
    <Carousel afterChange={() => {}} >
      {images?.map((el, i) => {


        if (i + 1 > limit) {
          return null;
        }
        return (
          <div key={i}>
            <h3 style={contentStyle}>
              <img style={{ width: '-webkit-fill-available'}} src={el} alt="no photo" onLoad={onLoad}
                   onError={onError}/>
            </h3>
          </div>
        );
      })}
    </Carousel>
  );
}

export default CarouselComponent;