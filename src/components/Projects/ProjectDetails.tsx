import styles from "home/styles/Projects.module.css";

export const ProjectDetails = ({ projectData }: any) => {
  return (
    <div className={styles.detailsCard}>
      <div className={styles.dataItem}>
        <p className={styles.dataLabel}>Project ID</p>
        <p className={styles.dataValue}>{projectData.projectId}</p>
      </div>
      <div className={styles.dataItem}>
        <p className={styles.dataLabel}>Project Name</p>
        <p className={styles.dataValue}>{projectData.name}</p>
      </div>
      <div className={styles.dataItem}>
        <p className={styles.dataLabel}>Date Created</p>
        <p className={styles.dataValue}>{projectData.dateCreated}</p>
      </div>
      <div className={styles.fullLengthdataItem}>
        <p className={styles.dataLabel}>Project Details</p>
        <p className={styles.dataValue}>{projectData.description}</p>
      </div>
    </div>
  );
};
