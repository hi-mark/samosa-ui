import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "home/styles/Login.module.css";
import { AppContext } from "../context/AppContext"; // Adjust the path to your AppContext file

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { appData, setAppData } = useContext(AppContext);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_LOGIN_URL || "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            "userId": email,
            "password": password }),
        }
      );
        const data = await response.json();
        if(data.error){
           window.alert(data.error);
            return
        }
        setAppData((prev) => ({
          ...prev,
          userId: data.userId, // Use the actual key returned by your API
        }));
        router.push("/dashboard"); // Redirect to the dashboard page
   
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.loginBody}>
        <div className={styles.loginContainer}>
          <div className={styles.logoWrapper}>
            <img
              src="/images/LogoFull.svg"
              alt="Samosas IT"
              className={styles.logo}
            />
          </div>
          <h2>Welcome Back!</h2>
          <p className={styles.loginSubheading}>Please enter your details</p>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="email">
                Email id
              </label>
              <input
                className={styles.inputBox}
                type="email"
                id="email"
                placeholder="yourmail@abc.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="password">
                Password
              </label>
              <input
                className={styles.inputBox}
                type="password"
                id="password"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="forgot-password">
              <a href="/forgot-password" className={styles.forgotPassword}>
                Forgot Password?
              </a>
            </div>
            <button className={styles.loginButton} type="submit">
              Log in
            </button>
          </form>
          <div className={styles.signupWrapper}>
            <p>
              Don't you have an account?{" "}
              <a className={styles.signupLink} href="/signup">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
