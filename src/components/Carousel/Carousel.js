import { Carousel as CarouselSlider } from 'react-responsive-carousel';
import {Carousel} from "antd";

const contentStyle = {
  margin: 0,
  //height: '460px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const CarouselComponent = ({images}) => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <Carousel afterChange={onChange}>
      {images?.map((el) => {
      return (
        <div>
          <h3 style={contentStyle}>
            <img style={{ width: '-webkit-fill-available'}} src={el} alt=""/>
          </h3>
        </div>
        );
      })}
    </Carousel>
  );
}

export default CarouselComponent;