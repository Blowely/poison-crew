import CatCard from "./CatCard";
import "./index.scss";

const Categories = ({setLoading}) => {

  const isDesktopScreen = window.screen.availWidth > 768;

  let data = [{
    categoryId:38,
    img:'https://cdn-img.poizon.com/node-common/8f37961b-732b-1dc9-0d30-7dc7aeb0e044-438-438.jpg?x-oss-process=image/format,webp/resize,w_500',
    title:'Кроссовки',
    isOnlyDesktop: false,
  },{
    categoryId:4,
    img:'https://cdn-img.poizonapp.com/pro-img/cut-img/20240124/e76f2487714d4bfc9146ee43160f1913.jpg?x-oss-process=image/format,webp/resize,w_500',
    title:'Футболки',
    isOnlyDesktop: false,
  },{
    categoryId:122,
    img:'https://cdn-img.poizon.com/node-common/9b5827da-2783-d2ca-8287-8cc52c40b637-438-438.jpg?x-oss-process=image/format,webp/resize,w_500',
    title:'Очки',
    isOnlyDesktop: false
  },{
    categoryId:305,
    img:'https://cdn-img.poizonapp.com/pro-img/cut-img/20230906/49de9366b9f74c51bc0f60237ca88b4c.jpg?x-oss-process=image/format,webp/resize,w_500',
    title:'Сумки',
    isOnlyDesktop: false
  }]

  data = isDesktopScreen ? [...data, {
    categoryId: 43,
    img:'https://cdn-img.poizonapp.com/pro-img/cut-img/20230801/45daabfbec5746818ddb4865ac39c6e5.jpg?x-oss-process=image/format,webp/resize,w_500',
    title:'Ботинки',
    isOnlyDesktop: true
  }] : data

  return <div className="card-wrapper">{data.map((el,i) => {
    return <div key={i}><CatCard title={el.title} img={el.img} categoryId={el.categoryId} setLoading={setLoading} /></div>
  })}</div>
}

export default Categories;