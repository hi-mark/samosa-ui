import Head from "next/head";
import { useState } from "react";
import Favicon from "home/components/GlobalComponents/Favicon";
import styles from "home/styles/Login.module.css";
import router from "next/router";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({
          userId: email,
          password: password,
        }),
      });
      console.log(response);

      if (response.ok) {
        // Handle successful login (e.g., redirect to another page or display a success message)
        console.log("Login successful!");
        router.push("/dashboard");
      } else {
        // Handle failed login (e.g., display an error message)
        window.alert("Please Check your credentials");
      }
    } catch (error) {
      // Handle network errors or other unexpected issues
      window.alert("An error occurred during login:");
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login to Samosa IT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.loginBody} suppressHydrationWarning={true}>
        <div className={styles.loginContainer} suppressHydrationWarning={true}>
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
