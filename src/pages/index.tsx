import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "home/styles/Home.module.css";
import { use, useContext, useEffect } from "react";
import { AppContext } from "home/context/AppContext";
import router from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { appData } = useContext(AppContext);

  // redirect user if not loggedin to login page otherwise dashboard page
  useEffect(() => {
    if (!appData.userid) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Samosa IT</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </>
  );
}
