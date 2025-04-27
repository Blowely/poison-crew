import "./MeasureTable.scss";
import { Table } from "antd";

const MeasureTable = ({ sizeTable }) => {
  const columns = [
    { title: 'US', dataIndex: 'us', key: 'us' },
    { title: 'EU', dataIndex: 'eu', key: 'eu' },
    { title: 'UK', dataIndex: 'uk', key: 'uk' },
    { title: 'RU', dataIndex: 'ru', key: 'ru' },
    { title: 'MM', dataIndex: 'mm', key: 'mm' },
  ];

  // Извлекаем данные для каждого типа
  const euSizes = sizeTable.find((item) => item.type === "EU")?.values || [];
  const usSizes = sizeTable.find((item) => item.type === "US")?.values || []; // <-- исправлено
  const ukSizes = sizeTable.find((item) => item.type === "UK")?.values || [];
  const ruSizes = sizeTable.find((item) => item.type === "RU")?.values || [];
  const mmSizes = sizeTable.find((item) => item.type === "MM")?.values || [];

  // Формируем данные для таблицы
  const tableData = [];
  const maxLength = Math.max(
      euSizes.length,
      usSizes.length, // <-- исправлено
      ukSizes.length,
      ruSizes.length,
      mmSizes.length
  );

  for (let i = 0; i < maxLength; i++) {
    tableData.push({
      key: i,
      us: usSizes[i] || "-", // <-- ключ "us", данные берутся напрямую
      eu: euSizes[i] || "-",
      uk: ukSizes[i] || "-",
      ru: ruSizes[i] || "-",
      mm: mmSizes[i] || "-",
    });
  }

  return <Table dataSource={tableData} columns={columns} pagination={false} size="small" />;
};

export default MeasureTable;