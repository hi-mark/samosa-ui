import PrimaryButton from "home/components/GlobalComponents/Buttons";
import styles from "home/styles/ForgotPassword.module.css";

const fgpPage = (props: any) => {
  return (
    <div className={styles.fgpBody}>
      <div className={styles.fgpWrapper}>
        <img className={styles.fgpImg} src="/icons/404.svg" alt="fgp Image" />
        <p className={styles.fgpHeading}>
          {" "}
          Looks like you forgot your password.
        </p>
        <p className={styles.fgpMsg}>
          Contact our support and we will get back to you ASAP
        </p>
        <PrimaryButton
          id="ContactSupportButton"
          handleClick={() =>
            window.open(
              "https://api.whatsapp.com/send?phone=917988639960&text=Hey%20Munish%2C%20I%20was%20testing%20your%20Samosa%20IT%20project%20and%20I%20forgot%20my%20password%20for%20username%3A%20",
              "_blank"
            )
          }
        >
          Contact Support
        </PrimaryButton>
      </div>
    </div>
  );
};

export default fgpPage;
