import { SMTable } from "home/components/GlobalComponents/SMTable";
import styles from "home/styles/Projects.module.css";
import { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { UtilisationGraph } from "home/components/GlobalComponents/UtilisationGraph";
import { ProjectDetails } from "home/components/Projects/ProjectDetails";
import { EditResources } from "home/components/Projects/EditResources";
import { ParsedUrlQuery } from "querystring";
import { ErrorPage } from "home/components/GlobalComponents/ErrorPage";
import { useRouter } from "next/router";

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

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params;
  const endpoint = process.env.NEXT_PUBLIC_PROJECT_DETAILS || "";

  try {
    const requestBody = {
      projectId: id,
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await res.json();
    data.projectId = id;

    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { error: "Failed to fetch data" } };
  }
};

export default function Home(props: any) {
  // need to update

  const { data } = props;
  const error = data?.error;
  const router = useRouter();

  const [resources, setResources] = useState({
    hwset1: data?.hwset1 || 0,
    hwset2: data?.hwset2 || 0,
  });
  const [availableResources, setAvailableResources] = useState({
    hwset1: 0,
    hwset2: 0,
  });
  const [showEditResources, setShowEditResources] = useState(false);

  const openEditResources = async () => {
    // call get api to get available resources data

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_GET_AVAILABLE_HARDWARE || ""
      );
      const resourcesData = await res.json();

      // Do something with the resourcesData
      setAvailableResources({
        hwset1: resourcesData.hwset1,
        hwset2: resourcesData.hwset2,
      });
      setShowEditResources(true);
    } catch (error) {
      window.alert("Failed to fetch resources data, try again.");
    }
  };


  const deleteProject = async () => {

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_DELETE_PROJECT_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: data?.projectId,
        }),
      });
      const resp = await response.json();
      window.alert("Successfully deleted project");
      //notifyDelete();
      router.push("/dashboard"); // Redirect to the dashboard page
    } catch (error) {
      window.alert("Failed to delete project: " + error);
    }
  };

  return (
    <>
      <Head>
        <title>{data?.projectId || "Not Found"}</title>
        <meta
          name="description"
          content="View all the projects you are part of."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <EditResources
        showEditResources={showEditResources}
        setShowEditResources={setShowEditResources}
        data={resources}
        setData={setResources}
        availableResources={availableResources}
        projectId={data?.projectId}
      />

      <div className={styles.projectsBody}>
        {data && !error && (
          <div className={styles.projectsWrapper}>
            <div className={styles.projectsHeader}>
              <p className={styles.pageHeading}>Project Details</p>
              <button className={styles.deleteProjectButton} onClick={
                () => {
                        deleteProject();
                      }}>
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
                <ProjectDetails projectData={data} />
                <div className={styles.utilisationCard}>
                  <div className={styles.cardHeader}>
                    <p className={styles.cardHeading}>Project Utilisation</p>
                    <button
                      className={styles.editUtilisationButton}
                      onClick={() => {
                        openEditResources();
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
                    <UtilisationGraph
                      hw1Utilisation={resources.hwset1}
                      hw2Utilisation={resources.hwset2}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.membersCard}>
                <p className={styles.cardHeading}>Project Members</p>
                <SMTable
                  tableName={`Project ${data.projectId} Members`}
                  headerData={headerData}
                  tableData={data.members}
                />
              </div>
            </div>
          </div>
        )}
        {error && <ErrorPage msg={error || "AEF"} />}
      </div>
    </>
  );
}
