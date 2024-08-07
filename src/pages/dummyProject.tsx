import { SMTable } from "home/components/GlobalComponents/SMTable";
import styles from "home/styles/Projects.module.css";
import { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { UtilisationGraph } from "home/components/GlobalComponents/UtilisationGraph";
import { ProjectDetails } from "home/components/Projects/ProjectDetails";
import { EditResources } from "home/components/Projects/EditResources";

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

  const [showEditResources, setShowEditResources] = useState(false);

  return (
    <>
      <Head>
        <title>{ProjectID}</title>
        <meta
          name="description"
          content="View all the projects you are part of."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <EditResources
        showEditResources={showEditResources}
        setShowEditResources={setShowEditResources}
        data={projectData}
      />

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
              <ProjectDetails projectData={projectData} />
              <div className={styles.utilisationCard}>
                <div className={styles.cardHeader}>
                  <p className={styles.cardHeading}>Project Utilisation</p>
                  <button
                    className={styles.editUtilisationButton}
                    onClick={() => {
                      setShowEditResources(true);
                    }}
                  >
                    <img
                      className={styles.editIcon}
                      src="/icons/edit.svg"
                      alt="Edit Utilisation"
                    />
                  </button>
                </div>
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
