import styles from "home/styles/GlobalComponents/FormComponents.module.css";

type ErrorProps = {
  msg: string | undefined;
};

export const ErrorMessage = ({ msg }: ErrorProps) => {
  return (
    <div>
      <p className={styles.error}>{msg || <> &nbsp;</>}</p>
    </div>
  );
};

type InputFieldProps = {
  type?: string;
  name: string;
  label: string;
  placeholder: string;
  handleChange: (e: any) => void;
  value: string;
  error: string | undefined;
};

export const InputLabel = (props: any) => {
  return <p className={styles.inputLabel}>{props.children}</p>;
};

export const InputWrapper = (props: any) => {
  return <div className={styles.inputWrapper}>{props.children}</div>;
};

export const InputBox = (props: any) => {
  return <input className={styles.inputBox} {...props} />;
};

export const InputField = (props: InputFieldProps) => {
  const {
    type = "text",
    label,
    placeholder,
    handleChange,
    value,
    name,
    error,
  } = props;

  return (
    <InputWrapper>
      <InputLabel>{label}</InputLabel>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className={styles.inputBox}
        value={value}
        onChange={handleChange}
      />
      <ErrorMessage msg={error} />
    </InputWrapper>
  );
};
