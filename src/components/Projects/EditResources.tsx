import styles from "home/styles/Projects.module.css";
import { useState } from "react";
import { ErrorMessage } from "../GlobalComponents/FormComponents";

export const EditResources = (props: any) => {
  const {
    showEditResources,
    setShowEditResources,
    availableResources,
    data = {},
    setData,
    projectId,
  } = props;
  const [hw1, setHw1] = useState(data.hwset1);
  const [hw2, setHw2] = useState(data.hwset2);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const updateResources = async () => {
    if (error) return;

    if (hw1 < 0 || hw2 < 0) {
      setError("Resource cannot be negative");
      return;
    } else if (
      hw1 > availableResources.hwset1 + data.hwset1 ||
      hw2 > availableResources.hwset2 + data.hwset2
    ) {
      setError("Resource cannot be greater than available resources");
      return;
    }

    setLoading(true);
    try {
      // call api to update resources
      const response = await fetch(
        process.env.NEXT_PUBLIC_UPDATE_RESOURCES || "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId,
            hwset1: parseInt(hw1),
            hwset2: parseInt(hw2),
          }),
        }
      );
      const resdata = await response.json();

      if (resdata.error) {
        window.alert(resdata.error);
      } else {
        setData({ hwset1: hw1, hwset2: hw2 });
        setShowEditResources(false);
      }
    } catch (error) {
      console.error("Error updating resources:", error);
      setError("Failed to update resources");
    } finally {
      setLoading(false);
    }
  };
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
                  <div className={styles.editCell}>{data.hwset1}</div>
                  <div className={styles.editCell}>
                    {availableResources.hwset1}
                  </div>
                  <div className={styles.editCell}>
                    <input
                      className={styles.inputBox}
                      value={hw1}
                      onChange={(e) => {
                        setError("");
                        const filteredValue = e.target.value.replace(
                          /[^0-9.]/g,
                          ""
                        );
                        setHw1(filteredValue);
                      }}
                    />
                  </div>
                </div>
                <div className={styles.editRow}>
                  <div className={styles.editCellLeft}></div>
                  <div className={styles.editDivider}></div>
                </div>
                <div className={styles.editRow}>
                  <div className={styles.editCellLeft}>HW Set2</div>
                  <div className={styles.editCell}>{data.hwset2}</div>
                  <div className={styles.editCell}>
                    {availableResources.hwset2}
                  </div>
                  <div className={styles.editCell}>
                    <input
                      className={styles.inputBox}
                      value={hw2}
                      onChange={(e) => {
                        setError("");
                        const filteredValue = e.target.value.replace(
                          /[^0-9.]/g,
                          ""
                        );
                        setHw2(filteredValue);
                      }}
                    />
                  </div>
                </div>
              </div>
            </form>
            <ErrorMessage msg={error} />
            <div className={styles.buttonsWrapper}>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  if (loading) return;
                  setShowEditResources(false);
                }}
                style={{ opacity: loading ? 0 : 1 }}
              >
                Cancel
              </button>
              <button onClick={updateResources} className={styles.saveButton}>
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
