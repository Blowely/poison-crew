import "./index.scss";
import { useNavigate } from "react-router-dom";

const CatCard = ({img, title, categoryId}) => {
  const navigate = useNavigate();

  return <div className="cat-card" onClick={() => navigate(`/products?categoryId=${categoryId}`)}>
    <img src={img || 'https://cdn-img.poizon.com/node-common/8f37961b-732b-1dc9-0d30-7dc7aeb0e044-438-438.jpg?x-oss-process=image/format,webp/resize,w_500'} />
    <div>{title || "Категория"}</div>
  </div>
}

export default CatCard;