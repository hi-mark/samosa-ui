import styles from "home/styles/GlobalComponents/TwoStepFormStepper.module.css";
type stepperProps = {
  step: number;
  title1: string;
  title2: string;
  lalbel1: string;
  label2: string;
};

export const TwoStepFormStepper = (props: stepperProps) => {
  const { step, title1, title2, lalbel1, label2 } = props;

  return (
    <div className={styles.leftColumn}>
      <div className={styles.headingWrapper}>
        <p className={styles.formHeading}>{title1}</p>
        <p className={styles.formHeading}>{title2}</p>
      </div>
      <div className={styles.progressWrapper}>
        <div className={styles.formStep}>
          <div className={styles.progressCircle}>
            {step === 2 ? (
              <img
                className={styles.checkIcon}
                src="/icons/check.svg"
                alt="Check"
              />
            ) : (
              1
            )}
          </div>
          <p className={styles.progressLabel}>{lalbel1}</p>
        </div>
        <div className={styles.separatorWrapper}>
          <div
            className={styles.separator}
            style={{ backgroundColor: step === 1 ? "#e2e2e2" : "#000" }}
          ></div>
        </div>
        <div className={step === 1 ? styles.formInactiveStep : styles.formStep}>
          <div className={styles.progressCircle}>2</div>
          <p className={styles.progressLabel}>{label2}</p>
        </div>
      </div>
    </div>
  );
};
