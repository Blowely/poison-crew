import styles from "./MeasureTable.module.scss";

const MeasureTable = ({sizeInfoList}) => {
  return <div className={styles.wrapper}>{sizeInfoList.map((el, i) => {
    return <div className={styles.column} key={i}>
      <div className={styles.head}>{el?.sizeKey}</div>
      <div className={styles.values}>{el?.sizeValue?.split(',').map((val, i) => {
        return <div className={styles.val} key={i}>{val}</div>
      })}</div>
    </div>
  })}</div>

}

export default MeasureTable;