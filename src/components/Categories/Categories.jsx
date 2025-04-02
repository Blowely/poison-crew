import CatCard from "./CatCard";
import "./index.scss";

const Categories = ({setLoading, setOffset}) => {

  const isDesktopScreen = window.screen.availWidth > 768;

  let data = [{
    category3Id:38,
    img:'https://cdn-img.poizon.com/node-common/8f37961b-732b-1dc9-0d30-7dc7aeb0e044-438-438.jpg?x-oss-process=image/format,webp/resize,w_400',
    imgPng:'https://storage.yandexcloud.net/pc-mediafiles/test1/sneakers.png?x-oss-process=image/format,webp/resize,w_400',
    title:'Кроссовки',
    isOnlyDesktop: false,
  },{
    category1Id: 2,
    img:'https://cdn-img.poizon.com/node-common/e81a571e-648c-7628-c598-fd9b64bd9741-438-438.jpg?x-oss-process=image/format,webp/resize,w_400',
    imgPng:'https://storage.yandexcloud.net/pc-mediafiles/test1/e81a571e-648c-7628-c598-fd9b64bd9741-438-438.png?x-oss-process=image/format,webp/resize,w_400',
    title:'Одежда',
    isOnlyDesktop: false,
  },
  {
    category3Id:122,
    img:'https://cdn-img.poizon.com/node-common/9b5827da-2783-d2ca-8287-8cc52c40b637-438-438.jpg?x-oss-process=image/format,webp/resize,w_400',
    imgPng:'https://storage.yandexcloud.net/pc-mediafiles/test1/9b5827da-2783-d2ca-8287-8cc52c40b637-438-438.png?x-oss-process=image/format,webp/resize,w_400',
    title:'Очки',
    isOnlyDesktop: false
  },{
    category3Id:305,
    img:'https://cdn-img.poizonapp.com/pro-img/cut-img/20230906/49de9366b9f74c51bc0f60237ca88b4c.jpg?x-oss-process=image/format,webp/resize,w_400',
    imgPng:'https://storage.yandexcloud.net/pc-mediafiles/test1/bag.png?x-oss-process=image/format,webp/resize,w_400',
    title:'Сумки',
    isOnlyDesktop: false
  },{
    category2Id: 292,
    img:'https://cdn-img.poizonapp.com/pro-img/cut-img/20230801/45daabfbec5746818ddb4865ac39c6e5.jpg?x-oss-process=image/format,webp/resize,w_400',
    imgPng:'https://storage.yandexcloud.net/pc-mediafiles/test1/shoes.png?x-oss-process=image/format,webp/resize,w_400',
    title:'Ботинки',
    isOnlyDesktop: true
  },
  {
    category3Id:4,
    img:'https://cdn-img.poizonapp.com/pro-img/cut-img/20240124/e76f2487714d4bfc9146ee43160f1913.jpg?x-oss-process=image/format,webp/resize,w_400',
    imgPng:'https://storage.yandexcloud.net/pc-mediafiles/test1/tshirt.png?x-oss-process=image/format,webp/resize,w_400',
    title:'Футболки',
    isOnlyDesktop: false,
  }]

  return <div className="card-wrapper">{data.map((el,i) => {
    return <div key={i}><CatCard title={el.title} img={isDesktopScreen ? el.imgPng : el.img}
                                 category3Id={el?.category3Id}
                                 category2Id={el?.category2Id}
                                 category1Id={el?.category1Id}
                                 setLoading={setLoading}
                                 setOffset={setOffset} /></div>
  })}</div>
}

export default Categories;