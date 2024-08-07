import { SMTable } from "home/components/GlobalComponents/SMTable";
import styles from "home/styles/Projects.module.css";
import { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

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

interface PageProps {
  data?: any;
  error?: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const requestBody = {
      key: "value",
      // Add other request body properties here
    };

    const res = await fetch("https://api.example.com/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();

    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { error: "Failed to fetch data" } };
  }
};

export default function Home({ data, error }: PageProps) {
  console.log(data, error);
  return (
    <>
      <Head>
        <title>Projects</title>
        <meta
          name="description"
          content="View all the projects you are part of."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.projectsBody}>
        <div className={styles.projectsWrapper}>
          <div className={styles.projectsHeader}>
            <p className={styles.pageHeading}>Your Projects</p>
            <button className={styles.addProjectButton}>
              Create New Project
              <img
                className={styles.addIcon}
                src="/icons/AddIcon.svg"
                alt="Add"
              />
            </button>
          </div>
          <div className={styles.projectsCard}>
            <SMTable
              headerData={projectsHeader}
              tableData={mockProjects}
              showPagination
              tableName="AllProjects"
              rowsPerPage={6}
              clickableRow
              linkPrefix="/projects/"
              linkKey="pid"
            />
          </div>
        </div>
      </div>
    </>
  );
}
