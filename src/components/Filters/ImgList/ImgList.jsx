import "./ImgList.scss";
import { Checkbox } from "antd";
import { useState } from "react";

const CheckboxGroup = Checkbox.Group;

const ImgList = ({plainOptions, setLoading,selectedBrands, setSelectedBrands}) => {
  console.log('plainOptions',plainOptions);
  const [checkedList, setCheckedList] = useState([]);

  const checkAll = plainOptions?.length === checkedList?.length;
  const indeterminate = checkedList?.length > 0 && checkedList?.length < plainOptions?.length;

  const onChange = (list) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  return (
    <div className="list-wrapper">
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
      </Checkbox>
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    </div>
  );
}

export default ImgList;