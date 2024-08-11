import styles from "home/styles/GlobalComponents/ProjectUtilisationGraph.module.css";

type projectProps = {
  projectId: string;
  hwset1: number;
  hwset2: number;
};

const getMaxUtilisation = (projects: any): [number, number[]] => {
  let maxUtilisation = 0;
  projects.forEach((project: any) => {
    maxUtilisation = Math.max(maxUtilisation, project.hwset1, project.hwset2);
  });

  //   increasing the maxUtilisation to the nearest multiple of 10
  maxUtilisation = Math.ceil((maxUtilisation * 1.2) / 10) * 10;

  const firstUtilisation = Math.ceil(maxUtilisation / 4);
  const secondUtilisation = Math.ceil((maxUtilisation * 2) / 4);
  const thirdUtilisation = Math.ceil((maxUtilisation * 3) / 4);

  return [
    maxUtilisation,
    [maxUtilisation, secondUtilisation, thirdUtilisation, 0],
  ];
};

export const ProjectUtilisationGraph = (props: any) => {
  const { projects } = props;
  const [maxUtilisation, utilisationArray] = getMaxUtilisation(projects);

  return (
    <div className={styles.wrapper}>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div
            className={styles.legendColor}
            style={{ backgroundColor: "#09b96d" }}
          ></div>
          <p className={styles.legendText}>HW Set 1</p>
        </div>
        <div className={styles.legendItem}>
          <div
            className={styles.legendColor}
            style={{ backgroundColor: "#ff812e" }}
          ></div>
          <p className={styles.legendText}>HW Set 2</p>
        </div>
      </div>
      <div className={styles.graphWrapper}>
        <div className={styles.index}>
          <div className={styles.indexWrapper}>
            {utilisationArray.map((utilisation: number) => {
              return <p className={styles.label1}>{utilisation}</p>;
            })}
          </div>
          <div>
            <p style={{ opacity: 0 }}>1</p>
          </div>
        </div>
        <div className={styles.graph}>
          {projects.map((project: projectProps) => {
            return (
              <div className={styles.projectWrapper}>
                <div className={styles.barsWrapper}>
                  <div
                    className={styles.bar}
                    style={{
                      minHeight: `${(project.hwset1 * 100) / maxUtilisation}%`,
                      height: `${(project.hwset1 * 100) / maxUtilisation}%`,
                      backgroundColor: "#09b96d",
                    }}
                  ></div>
                  <div
                    className={styles.bar}
                    style={{
                      minHeight: `${(project.hwset2 * 100) / maxUtilisation}%`,
                      backgroundColor: "#ff812e",
                    }}
                  ></div>
                </div>
                <div>
                  <p className={styles.label2}>{project.projectId}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectUtilisationGraph;
