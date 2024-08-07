import styles from "home/styles/Projects.module.css";
import { useState } from "react";

export const EditResources = (props: any) => {
  const { showEditResources, setShowEditResources, data = {} } = props;
  const [hw1, setHw1] = useState(data.hwset1 || "");
  const [hw2, setHw2] = useState(data.hwset2);
  return (
    <>
      {showEditResources && (
        <div className={styles.backdrop}>
          <div className={styles.EditResourcesCard}>
            <p className={styles.cardHeading}>Modify Resource Utilisation</p>
            <form>
              <div className={styles.editTable}>
                <div className={styles.editRow}>
                  <div className={styles.editCellLeft}></div>
                  <div className={styles.editCell}>
                    <p className={styles.editLabel}>Current</p>
                  </div>
                  <div className={styles.editCell}>
                    <p className={styles.editLabel}>Available</p>
                  </div>
                  <div className={styles.editCell}>
                    <p className={styles.editLabel}>New</p>
                  </div>
                </div>
                <div className={styles.editRow}>
                  <div className={styles.editCellLeft}>HW Set1</div>
                  <div className={styles.editCell}>23</div>
                  <div className={styles.editCell}>42</div>
                  <div className={styles.editCell}>
                    <input className={styles.inputBox} />
                  </div>
                </div>
                <div className={styles.editRow}>
                  <div className={styles.editCellLeft}></div>
                  <div className={styles.editDivider}></div>
                </div>
                <div className={styles.editRow}>
                  <div className={styles.editCellLeft}>HW Set2</div>
                  <div className={styles.editCell}>23</div>
                  <div className={styles.editCell}>42</div>
                  <div className={styles.editCell}>
                    <input className={styles.inputBox} />
                  </div>
                </div>
              </div>
            </form>
            <div className={styles.buttonsWrapper}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowEditResources(false)}
              >
                Cancel
              </button>
              <button className={styles.saveButton}>Update</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
