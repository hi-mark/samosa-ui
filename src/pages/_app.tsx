import "home/styles/globals.css";
import type { AppProps } from "next/app";
import { AppContextProvider, AppContext } from "home/context/AppContext";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import Cookies from "js-cookie";
import { Navbar } from "home/components/NavBar";

const NeueMontreal = localFont({
  src: [
    {
      path: "../../public/fonts/NeueMontreal-Regular.otf",
      weight: "450",
    },
    {
      path: "../../public/fonts/NeueMontreal-Light.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/NeueMontreal-Bold.otf",
      weight: "800",
    },
    {
      path: "../../public/fonts/NeueMontreal-Medium.otf",
      weight: "530",
    },
  ],
  display: "swap",
});

function App({ Component, pageProps }: AppProps) {
  /* check if user id exist in context
    -  if yes then check if login/signup page then route to dashboard
    
    else if user id doesn't exist in context
    - check if userid exist in cookies, if yes then update context from cookies then if user is on login/signup then redirect to dashboard
    - else redirect to login page


  */

  const { appData, setAppData } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    // const userIdInContext = appData.userId;
    const userIdInCookies = Cookies.get("userId");

    const isLoginOrSignupPage =
      router.pathname === "/login" ||
      router.pathname === "/signup" ||
      router.pathname === "/forgotPassword";

    if (userIdInCookies) {
      if (isLoginOrSignupPage) {
        router.push("/dashboard");
      }
    } else {
      if (!isLoginOrSignupPage) {
        router.push("/login");
      }
    }
  }, [appData.userId, router.pathname, setAppData]);

  return (
    <AppContextProvider>
      <div
        className={NeueMontreal.className}
        style={{ width: "100% !important" }}
      >
        <Navbar />
        <Component {...pageProps} />
      </div>
    </AppContextProvider>
  );
}

export default App;
