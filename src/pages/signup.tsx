import {
  PrimaryButton,
  SecondaryButton,
} from "home/components/GlobalComponents/Buttons";
import { TwoStepFormStepper } from "home/components/GlobalComponents/TwoStepFormStepper";
import styles from "home/styles/SignUp.module.css";
import { ChangeEvent, useState } from "react";

type operation = "join" | "create";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  orgId: string;
  orgName: string;
  operation: operation;
}

type ErrorProps = {
  msg: string | undefined;
};

const ErrorMessage = ({ msg }: ErrorProps) => {
  return (
    <div>
      <p className={styles.error}>{msg || <> &nbsp;</>}</p>
    </div>
  );
};

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    orgId: "",
    orgName: "",
    operation: "join",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = (): boolean => {
    let newErrors: Partial<FormData> = {};
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First Name is required";
      if (!formData.lastName) newErrors.lastName = "Last Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Confirm Password is required";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    if (step === 2) {
      if (!formData.orgId) newErrors.orgId = "Organization ID is required";
      if (formData.operation === "create" && !formData.orgName)
        newErrors.orgName = "Organization Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (): void => {
    if (validateStep()) {
      setCompletedSteps([...completedSteps, step]);
      setStep(step + 1);
    }
  };

  const prevStep = (): void => {
    if (step <= 1) return;
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Form Submitted", formData);
    }
  };

  return (
    <div className={styles.signupBody}>
      <div className={styles.signupContainer}>
        <TwoStepFormStepper
          step={step}
          title1="New User"
          title2="Sign Up"
          lalbel1="Personal Information"
          label2="Organization's Information"
        />
        <div className={styles.formWrapper}>
          <form className={styles.signupForm} onSubmit={handleSubmit}>
            {step === 1 && (
              <div className={styles.stepContent}>
                <div className={styles.nameWrapper}>
                  <div className={styles.inputWrapper}>
                    <p className={styles.inputLabel}>First Name:</p>
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      className={styles.inputBox}
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <ErrorMessage msg={errors.firstName} />
                  </div>
                  <div className={styles.inputWrapper}>
                    <p className={styles.inputLabel}>Last Name:</p>
                    <input
                      type="text"
                      className={styles.inputBox}
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    <ErrorMessage msg={errors.lastName} />
                  </div>
                </div>
                <div className={styles.inputWrapper}>
                  <p className={styles.inputLabel}>Email:</p>
                  <input
                    type="email"
                    className={styles.inputBox}
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <ErrorMessage msg={errors.email} />
                </div>

                <div className={styles.inputWrapper}>
                  <p className={styles.inputLabel}>Password:</p>
                  <input
                    type="password"
                    className={styles.inputBox}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <ErrorMessage msg={errors.password} />
                </div>

                <div className={styles.inputWrapper}>
                  <p className={styles.inputLabel}>Confirm Password:</p>
                  <input
                    type="password"
                    className={styles.inputBox}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <ErrorMessage msg={errors.confirmPassword} />
                </div>
              </div>
            )}
            {step === 2 && (
              <div className={styles.stepContent}>
                <div className={styles.operationWrapper}>
                  <div className={styles.radioWrapper}>
                    <input
                      type="radio"
                      id="join"
                      name="operation"
                      value="join"
                      checked={formData.operation === "join"}
                      onChange={handleChange}
                    />
                    <label className={styles.inputLabel} htmlFor="join">
                      Join
                    </label>
                  </div>
                  <div className={styles.radioWrapper}>
                    <input
                      type="radio"
                      id="create"
                      name="operation"
                      value="create"
                      checked={formData.operation === "create"}
                      onChange={handleChange}
                    />
                    <label className={styles.inputLabel} htmlFor="join">
                      Create
                    </label>
                  </div>
                </div>
                <div className={styles.inputWrapper}>
                  <p className={styles.inputLabel}>Organization ID:</p>
                  <input
                    type="text"
                    className={styles.inputBox}
                    placeholder="ABC123"
                    name="orgId"
                    value={formData.orgId}
                    onChange={handleChange}
                  />
                  <ErrorMessage msg={errors.orgId} />
                </div>
                {formData.operation === "create" && (
                  <div className={styles.inputWrapper}>
                    <p className={styles.inputLabel}>Organization Name:</p>
                    <input
                      type="text"
                      className={styles.inputBox}
                      placeholder="ABC Corp"
                      name="orgName"
                      value={formData.orgName}
                      onChange={handleChange}
                    />
                    <ErrorMessage msg={errors.orgName} />
                  </div>
                )}
              </div>
            )}
            <div className={styles.buttonContainer}>
              <SecondaryButton disabled={step === 1} handleClick={prevStep}>
                Prev
              </SecondaryButton>
              {step === 1 && (
                <PrimaryButton handleClick={nextStep}>Next</PrimaryButton>
              )}
              {step === 2 && (
                <PrimaryButton handleClick={handleSubmit}>
                  Sign Up
                </PrimaryButton>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
