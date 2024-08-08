import { SMTable } from "home/components/GlobalComponents/SMTable";
import styles from "home/styles/Projects.module.css";
import { useContext, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { AppContext } from "home/context/AppContext";
import useFetchOnPageLoad from "home/hooks/useFetchOnPageLoad";
import { ErrorPage } from "home/components/GlobalComponents/ErrorPage";

const projectsHeader = [
  { title: "Project Name", key: "name", leftAlign: true },
  { title: "P Id", key: "projectId" },
  { title: "HW Set 1", key: "hwset1" },
  { title: "HW Set 2", key: "hwset2" },
  { title: "Date Created", key: "dateCreated" },
];

export default function Home() {
  const { appData, setAppData } = useContext(AppContext);

  const requestBody = {
    userId: appData.userId || "sid@gmail.com",
  };

  const { data, error, loading } = useFetchOnPageLoad(
    process.env.NEXT_PUBLIC_ALL_PROJECTS,
    requestBody
  );
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
        {data && (
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
                tableData={data.projects}
                showPagination
                tableName="AllProjects"
                rowsPerPage={6}
                clickableRow
                linkPrefix="/projects/"
                linkKey="projectId"
              />
            </div>
          </div>
        )}
        {error && <ErrorPage msg={error} />}
        {loading && <p>Loading...</p>}
      </div>
    </>
  );
}
