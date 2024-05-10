import styles from "./MeasureTable.module.scss";

const MeasureTable = ({sizeInfoList}) => {
  return <div className={styles.wrapper}>{sizeInfoList.map((el) => {
    return <div className={styles.column}>
      <div className={styles.head}>{el?.sizeKey}</div>
      <div className={styles.values}>{el?.sizeValue?.split(',').map((val) => {
        return <div className={styles.val}>{val}</div>
      })}</div>
    </div>
  })}</div>

}

export default MeasureTable;