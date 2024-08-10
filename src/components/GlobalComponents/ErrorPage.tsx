import styles from "home/styles/GlobalComponents/ErrorPage.module.css";
import PrimaryButton from "./Buttons";
export const ErrorPage = (props: any) => {
  return (
    <div className={styles.errorWrapper}>
      <img className={styles.errorImg} src="/icons/404.svg" alt="error Image" />
      <p className={styles.errorHeading}> Some-osa went wrong</p>
      <p className={styles.errorMsg}>({props?.msg})</p>
      <PrimaryButton
        id="GoBackButton"
        handleClick={() => window.history.back()}
      >
        Go Back
      </PrimaryButton>
    </div>
  );
};
