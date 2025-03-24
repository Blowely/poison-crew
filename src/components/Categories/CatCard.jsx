import "./index.scss";
import {useNavigate, useSearchParams} from "react-router-dom";

const CatCard = ({img, title, category3Id, category2Id, category1Id, setLoading, setOffset}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onCardClick = () => {
    setLoading(true);
    setOffset(1);

    if (category3Id) {
      searchParams.set('category3Id', category3Id);
    }
    if (category2Id) {
      searchParams.set('category2Id', category2Id);
    }
    if (category1Id) {
      searchParams.set('category1Id', category1Id);
    }
    setSearchParams(searchParams);
  }

  return <div className="cat-card" onClick={onCardClick}>
    <img src={img || 'https://cdn-img.poizon.com/node-common/8f37961b-732b-1dc9-0d30-7dc7aeb0e044-438-438.jpg?x-oss-process=image/format,webp/resize,w_400'} />
    <div>{title || "Категория"}</div>
  </div>
}

export default CatCard;