import "./ImgList.scss";
import { Checkbox } from "antd";
import { useState } from "react";

const CheckboxGroup = Checkbox.Group;

const ImgList = ({data,setLoading, setSelectedBrands}) => {
  const plainOptions = data.map((el) => el?.originName);

  const [checkedList, setCheckedList] = useState([]);

  const checkAll = plainOptions?.length === checkedList?.length;
  const indeterminate = checkedList?.length > 0 && checkedList?.length < plainOptions?.length;

  const onChange = (list) => {
    setCheckedList(list);
    const items = list.map(el => data.find(({originName}) => originName === el));
    setSelectedBrands(items);
    setLoading(true);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    const items = (plainOptions || []).map(el => data.find(({originName}) => originName === el));
    setSelectedBrands(items);
    setLoading(true);
  };

  return (
    <div className="list-wrapper">
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Выбрать все
      </Checkbox>
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    </div>
  );
}

export default ImgList;