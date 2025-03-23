import "./MeasureTable.scss";
import { Table } from "antd";

const MeasureTable = ({sizeTable}) => {
  const columns = [
    {
      title: 'US',
      dataIndex: 'us',
      key: 'us',
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
    },
    {
      title: 'RU',
      dataIndex: 'ru',
      key: 'ru',
    },
    {
      title: 'MM',
      dataIndex: 'mm',
      key: 'mm',
    },
  ];

  const data = sizeTable;

  const usSizeConversionTable = {};

// Получаем массивы значений для каждого типа
  const euSizes = data.find((item) => item.type === "EU")?.values || [];
  const usSizes = data.find((item) => item.type === "US")?.values || [];
  const ukSizes = data.find((item) => item.type === "UK")?.values || [];
  const ruSizes = data.find((item) => item.type === "RU")?.values || [];
  const mmSizes = data.find((item) => item.type === "MM")?.values || [];

// Определяем максимальную длину массива
  const maxLength = Math.max(euSizes.length, usSizes.length, ukSizes.length, ruSizes.length, mmSizes.length);

// Формируем таблицу сопоставления
  const tableData = [];

  for (let i = 0; i < maxLength; i++) {
    const usMen = usSizes[i] || null;
    const eu = euSizes[i] || null;
    const uk = ukSizes[i] || null;
    const ru = ruSizes[i] !== "/" ? ruSizes[i] : null;
    const mm = mmSizes[i] || null;

    if (usMen) {
      const entry = {
        key: i,
        usMen: usMen,
        eu: eu ? eu : null,
        uk: uk ? uk : null,
        ru: ru ? ru : null,
        mm: mm ? mm : null,
      };
      usSizeConversionTable[usMen] = entry;
      tableData.push(entry);
    }
  }



  return <Table dataSource={tableData}
                columns={columns}
                size="small"
                pagination={false}
                className="table-wrapper"
                rowClassName={(_,index) => {
                  return index % 2 === 0 ? "even-row" : ""
                }} />;
}

export default MeasureTable;