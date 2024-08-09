import styles from "home/styles/Dashboard.module.css";
import { useState } from "react";
import { UtilisationGraph } from "./GlobalComponents/UtilisationGraph";
import { SMTable } from "./GlobalComponents/SMTable";
import PrimaryButton from "./GlobalComponents/Buttons";
import { useRouter } from "next/router";

const teamHeader = [
  {
    title: "Name",
    key: "name",
    leftAlign: true,
  },
  {
    title: "Role",
    key: "role",
  },
];

const projectsHeader = [
  { title: "Project Name", key: "name", leftAlign: true },
  { title: "P Id", key: "projectId" },
  { title: "HW Set 1", key: "hwset1" },
  { title: "HW Set 2", key: "hwset2" },
];

export const Dashboard = ({ data }: any) => {
  const { totalOrgHW1Utilisation, totalOrgHW2Utilisation, team, projects } =
    data;

  const router = useRouter();

  return (
    <div className={styles.dashboardBody}>
      {/* <PrimaryButton
        handleClick={() => {
          router.push("/createProject");
        }}
      >
        Hello
      </PrimaryButton> */}
      <div className={styles.dashboardContainer}>
        <div className={styles.teamColumn}>
          <div className={styles.teamCard}>
            <p className={styles.cardHeading}>Team Members</p>
            <SMTable
              headerData={teamHeader}
              tableData={team}
              tableName="AllTeamMembers"
              rowsPerPage={5}
              showPagination
            />
          </div>
          <div className={styles.inviteCard}>Hello</div>
        </div>
        <div className={styles.projectColumn}>
          <div className={styles.projectsCard}>
            <div className={styles.thp}>
              <p className={styles.cardHeading}>Projects</p>
              <PrimaryButton
                handleClick={() => {
                  router.push("/projects");
                }}
              >
                All Projects
              </PrimaryButton>
            </div>
            <SMTable
              headerData={projectsHeader}
              tableData={projects}
              tableName="AllProjects"
              rowsPerPage={5}
              clickableRow
              linkPrefix="/projects/"
              linkKey="projectId"
              showPagination
            />
          </div>
          <div className={styles.inforgraphicsWrapper}>
            <div className={styles.projectUtilisationCard}>
              <p className={styles.cardHeading}>Projects Utilisation</p>
            </div>
            <div className={styles.totalUtilisationCard}>
              <p className={styles.cardHeading}>Total Utilisation</p>
              <div className={styles.utilGraphWrapper}>
                <UtilisationGraph
                  hw1Utilisation={totalOrgHW1Utilisation}
                  hw2Utilisation={totalOrgHW2Utilisation}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
