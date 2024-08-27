import "./MeasureTable.scss";
import { usSizeConversionTable } from "../../pages/constants";
import { Table } from "antd";

const MeasureTable = () => {
  const columns = [
    {
      title: 'US Men',
      dataIndex: 'usMen',
      key: 'usMen',
    },
    {
      title: 'US Women',
      dataIndex: 'usWomen',
      key: 'usWomen',
    },
    {
      title: 'EU',
      dataIndex: 'eu',
      key: 'eu',
    },
    {
      title: 'UK',
      dataIndex: 'uk',
      key: 'uk',
    }
  ];

  const dataSource = Object.keys(usSizeConversionTable).map(key => ({
    key,
    ...usSizeConversionTable[key]
  }));


  return <Table dataSource={dataSource}
                columns={columns}
                pagination={false}
                rowClassName={(_,index) => {
                  return index % 2 === 0 ? "even-row" : ""
                }} />;
}

export default MeasureTable;