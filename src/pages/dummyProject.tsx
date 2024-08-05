import { SMTable } from "home/components/GlobalComponents/SMTable";
import styles from "home/styles/Projects.module.css";
import { useState } from "react";
import { GetServerSideProps } from "next";
import Favicon from "home/components/GlobalComponents/Favicon";
import Head from "next/head";
import { UtilisationGraph } from "home/components/GlobalComponents/UtilisationGraph";

const headerData = [
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

const projectData = {
  projectId: "p1",
  name: "Project 1",
  dateCreated: "2021-09-01",
  hwset1: 10,
  hwset2: 5,
  description: "This is a project description",
  members: [
    { id: "m1", name: "Munish Kohar", role: "Admin" },
    { id: "m2", name: "Jane Doe", role: "Member" },
    { id: "m3", name: "John Smith", role: "Member" },
  ],
};

export default function Home({ props }: any) {
  // need to update
  const ProjectID = "P12";

  return (
    <>
      <Head>
        <title>{ProjectID}</title>
        <meta
          name="description"
          content="View all the projects you are part of."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Favicon />
      </Head>

      <div className={styles.projectsBody}>
        <div className={styles.projectsWrapper}>
          <div className={styles.projectsHeader}>
            <p className={styles.pageHeading}>Project Details</p>
            <button className={styles.deleteProjectButton}>
              Delete Project
              <img
                className={styles.deleteIcon}
                src="/icons/delete red.svg"
                alt="Delete this project"
              />
            </button>
          </div>
          <div className={styles.projectsContainer}>
            <div className={styles.detailsColumn}>
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
              <div className={styles.utilisationCard}>
                <p className={styles.cardHeading}>Project Utilisation</p>
                <div className={styles.utilisationWrapper}>
                  <UtilisationGraph hw1Utilisation={24} hw2Utilisation={68} />
                </div>
              </div>
            </div>
            <div className={styles.membersCard}>
              <p className={styles.cardHeading}>Project Members</p>
              <SMTable
                tableName={`Project ${ProjectID} Members`}
                headerData={headerData}
                tableData={projectData.members}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
