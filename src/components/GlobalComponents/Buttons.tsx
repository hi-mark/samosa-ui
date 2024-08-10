import styles from "home/styles/GlobalComponents/Buttons.module.css";

export const PrimaryButton = (props: any) => {
  return (
    <button
      disabled={props.disabled}
      className={styles.primaryButton}
      onClick={props.handleClick}
      {...props}
    >
      {props.children}
    </button>
  );
};

export const SecondaryButton = (props: any) => {
  return (
    <button
      id={props.id}
      disabled={props.disabled}
      className={styles.secondaryButton}
      onClick={props.handleClick}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;
