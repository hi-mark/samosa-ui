import { SMTable } from "home/components/GlobalComponents/SMTable";
import styles from "home/styles/Projects.module.css";
import { useState } from "react";

const projectsHeader = [
  { title: "Project Name", key: "name", leftAlign: true },
  { title: "P Id", key: "pid" },
  { title: "HW Set 1", key: "hwset1" },
  { title: "HW Set 2", key: "hwset2" },
  { title: "Date Created", key: "dateCreated" },
];

const mockProjects = [
  {
    pid: "p1",
    name: "Project 1",
    hwset1: 10,
    hwset2: 5,
    dateCreated: "2021-09-01",
  },
  {
    pid: "p2",
    name: "Project 2",
    hwset1: 8,
    hwset2: 3,
    dateCreated: "2021-09-01",
  },
  {
    pid: "p3",
    name: "Project 3",
    hwset1: 12,
    hwset2: 7,
    dateCreated: "2021-09-01",
  },
  {
    pid: "p4",
    name: "Project 4",
    hwset1: 6,
    hwset2: 2,
    dateCreated: "2021-09-01",
  },
  {
    pid: "p5",
    name: "Project 5",
    hwset1: 15,
    hwset2: 9,
    dateCreated: "2021-09-01",
  },
  {
    pid: "p6",
    name: "Project 6",
    hwset1: 15,
    hwset2: 9,
    dateCreated: "2021-09-01",
  },
  {
    pid: "p7",
    name: "Project 7",
    hwset1: 15,
    hwset2: 9,
    dateCreated: "2021-09-01",
  },
  {
    pid: "p8",
    name: "Project 8",
    hwset1: 15,
    hwset2: 9,
    dateCreated: "2021-09-01",
  },
  {
    pid: "p9",
    name: "Project 9",
    hwset1: 15,
    hwset2: 9,
    dateCreated: "2021-09-01",
  },
  {
    pid: "p10",
    name: "Project 10",
    hwset1: 15,
    hwset2: 9,
    dateCreated: "2021-09-01",
  },
  {
    pid: "p11",
    name: "Project 11",
    hwset1: 15,
    hwset2: 9,
    dateCreated: "2021-09-01",
  },
  {
    pid: "p12",
    name: "Project 12",
    hwset1: 15,
    hwset2: 9,
    dateCreated: "2021-09-01",
  },
];

export default function Home() {
  return (
    <div className={styles.projectsBody}>
      <div className={styles.projectsWrapper}>
        <div className={styles.projectsHeader}>
          <p className={styles.cardHeading}>Projects</p>
          <button className={styles.addProjectButton}>
            Create New Project
          </button>
        </div>
        <div className={styles.projectsCard}>
          <SMTable
            headerData={projectsHeader}
            tableData={mockProjects}
            showPagination
            tableName="AllProjects"
            rowsPerPage={6}
          />
        </div>
      </div>
    </div>
  );
}
