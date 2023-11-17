import {Carousel} from "antd";
import React from "react";

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
    <Carousel afterChange={() => {}}>
      {images?.map((image, index) => {

        if (index + 1 > limit) {
          return null;
        }

        return (
          <div key={index}>
            <h3 style={contentStyle}>
              <img
                style={{ width: '-webkit-fill-available'}}
                src={image}
                onLoad={onLoad}
                alt={`Image ${index + 1}`}
                onError={onError}/>
            </h3>
          </div>
        );
      })}
    </Carousel>
  );
}

export default CarouselComponent;