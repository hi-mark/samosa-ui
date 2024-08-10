import styles from "home/styles/GlobalComponents/UtilisationGraph.module.css";

type UtilisationGraphProps = {
  hw1Utilisation: number;
  hw2Utilisation: number;
};

export const UtilisationGraph = (props: UtilisationGraphProps) => {
  const { hw1Utilisation, hw2Utilisation } = props;
  return (
    <div className={styles.utilGraphWrapper}>
      {!!hw1Utilisation && (
        <div
          className={styles.setWrapper}
          style={{
            width:
              (hw1Utilisation / (hw1Utilisation + hw2Utilisation)) * 100 + "%",
          }}
        >
          <p className={styles.label}>HW Set 1</p>
          <p className={styles.hwNumber}>{hw1Utilisation}</p>
          <div className={styles.barWrapper}>
            <div className={styles.indicatorBar} />
            <div className={styles.set1bar} />
          </div>
        </div>
      )}
      {!!hw2Utilisation && (
        <div
          className={styles.setWrapper}
          style={{
            width:
              (hw2Utilisation / (hw1Utilisation + hw2Utilisation)) * 100 + "%",
          }}
        >
          <p className={styles.label}>HW Set 2</p>
          <p className={styles.hwNumber}>{hw2Utilisation}</p>
          <div className={styles.barWrapper}>
            <div className={styles.indicatorBar} />
            <div className={styles.set2bar} />
          </div>
        </div>
      )}
      {!hw1Utilisation && !hw2Utilisation && (
        <div className={styles.label}>
          <p>No resources used yet</p>
        </div>
      )}
    </div>
  );
};
