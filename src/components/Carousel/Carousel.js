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

  return (
    <Carousel afterChange={() => {}}>
      {images?.map((el, i) => {
      return (
        <div key={i}>
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