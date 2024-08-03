import Head from "next/head";
import Favicon from "home/components/GlobalComponents/Favicon";
import styles from "home/styles/Dashboard.module.css";
import { useState } from "react";

const mockDashboardData = {
  team: [
    { id: "m1", name: "Munish Kohar", role: "Admin" },
    { id: "m2", name: "Jane Doe", role: "Member" },
    { id: "m3", name: "John Smith", role: "Member" },
    { id: "m4", name: "Jash Chawla", role: "Admin" },
    { id: "m5", name: "Shubash Mehar", role: "Member" },
    { id: "m6", name: "Jay Cee Agarwal", role: "Admin" },
    { id: "m7", name: "Marcus Lumbos", role: "Member" },
  ],
  totalHW1Utilisation: 324,
  totalHW2Utilisation: 234,
  projects: [
    {
      pid: "p1",
      name: "Project 1",
      hwset1: 10,
      hwset2: 5,
    },
    {
      pid: "p2",
      name: "Project 2",
      hwset1: 8,
      hwset2: 3,
    },
    {
      pid: "p3",
      name: "Project 3",
      hwset1: 12,
      hwset2: 7,
    },
    {
      pid: "p4",
      name: "Project 4",
      hwset1: 6,
      hwset2: 2,
    },
    {
      pid: "p5",
      name: "Project 5",
      hwset1: 15,
      hwset2: 9,
    },
  ],
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalRows = mockDashboardData.team.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = mockDashboardData.team.slice(startIndex, endIndex);
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Dashboard of Samosa IT, an APAD Project"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Favicon />
      </Head>
      <div className={styles.dashboardBody}>
        <div className={styles.dashboardContainer}>
          <div className={styles.teamColumn}>
            <div className={styles.teamCard}>
              <p className={styles.cardHeading}>Team Members</p>
              <table className={styles.teamTable}>
                <thead>
                  <tr>
                    <th>Serial</th>
                    <th className={styles.nameTab}>Name</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((member, index) => (
                    <tr key={member.id}>
                      <td>{startIndex + index + 1}</td>
                      <td className={styles.nameTab}>{member.name}</td>
                      <td>{member.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.pagination}>
                <button
                  className={styles.paginationButton}
                  onClick={handleClickPrev}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <p>
                  {currentPage} / {totalPages}
                </p>
                <button
                  className={styles.paginationButton}
                  onClick={handleClickNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
            <div className={styles.inviteCard}>Hello</div>
          </div>
          <div className={styles.projectColumn}>
            <div className={styles.projectsCard}>
              <p className={styles.cardHeading}>Projects</p>
              <table className={styles.projectsTable}>
                <thead>
                  <tr>
                    <th className={styles.firstCell}>Serial</th>
                    <th>Project Name</th>
                    <th>P Id</th>
                    <th>HW Set 1</th>
                    <th>HW Set 2</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDashboardData.projects.map((project, index) => (
                    <tr key={project.pid}>
                      <td className={styles.firstCell}>{index + 1}</td>
                      <td>{project.name}</td>
                      <td>{project.pid}</td>
                      <td>{project.hwset1}</td>
                      <td>{project.hwset2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.inforgraphicsWrapper}>
              <div className={styles.projectUtilisationCard}>
                <p className={styles.cardHeading}>Projects Utilisation</p>
              </div>
              <div className={styles.totalUtilisationCard}>
                <p className={styles.cardHeading}>Total Utilisation</p>
                <div className={styles.utilGraphWrapper}>
                  <div
                    className={styles.setWrapper}
                    style={{
                      width: `${
                        (mockDashboardData.totalHW1Utilisation /
                          (mockDashboardData.totalHW1Utilisation +
                            mockDashboardData.totalHW2Utilisation)) *
                        100
                      }%`,
                      minWidth: "15%",
                      maxWidth: "85%",
                    }}
                  >
                    <p>HW Set 1</p>
                    <p>{mockDashboardData.totalHW1Utilisation}</p>
                    <div className={styles.barWrapper}>
                      <div className={styles.indicatorBar} />
                      <div className={styles.set1bar} />
                    </div>
                  </div>

                  <div className={styles.setWrapper}>
                    <p>HW Set 2</p>
                    <p>{mockDashboardData.totalHW2Utilisation}</p>
                    <div className={styles.barWrapper}>
                      <div className={styles.indicatorBar} />
                      <div className={styles.set2bar} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
