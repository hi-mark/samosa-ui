import Head from "next/head";
import styles from "home/styles/Dashboard.module.css";
import { useContext, useEffect, useState } from "react";
import useFetchOnPageLoad from "home/hooks/useFetchOnPageLoad";
import { Dashboard } from "home/components/Dashboard";
import { AppContext } from "home/context/AppContext";

export default function Home() {
  const { appData, setAppData } = useContext(AppContext);

  const requestBody = {
    // userId: appData.userId ,
    userId: "siddecode@gmail.com",
  };

  const { data, error, loading } = useFetchOnPageLoad(
    process.env.NEXT_PUBLIC_DASHBOARD,
    requestBody
  );

  useEffect(() => {
    if (data) {
      setAppData((prev) => ({
        ...prev,
        members: data.team,
      }));
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Dashboard of Samosa IT, an APAD Project"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && <Dashboard data={data} />}
    </>
  );
}
