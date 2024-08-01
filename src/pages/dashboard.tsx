import Head from "next/head";
import { useState } from "react";
import Favicon from "home/components/GlobalComponents/Favicon";
import styles from "home/styles/Dashboard.module.css";

export default function Dashboard() {
  const [projectID, setProjectID] = useState("");
  const [hardwareResource, setHardwareResource] = useState("");

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log("ProjectID:", projectID, "Hardware Resource:", hardwareResource);
  };

  const handleCreateNewProject = () => {
    // Handle create new project logic here
    window.alert("Not ready for that yet!");
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Favicon />
      </Head>
      <body className={styles.dashboardBody} suppressHydrationWarning={true}>
        <div className={styles.dashboardContainer} suppressHydrationWarning={true}>
          <h1 className={styles.welcomeMessage}>Welcome to your Dashboard!</h1>
          <form onSubmit={handleSubmit} className={styles.resourceForm}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="projectID">ProjectID</label>
              <input
                type="text"
                id="projectID"
                value={projectID}
                onChange={(e) => setProjectID(e.target.value)}
                className={styles.inputBox}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>Access Project</button>
          </form>
          <a onClick={handleCreateNewProject} className={styles.signupLink}>
            Create a new Project?
          </a>
        </div>
      </body>
    </>
  );
}
