import {
  PrimaryButton,
  SecondaryButton,
} from "home/components/GlobalComponents/Buttons";
import { ErrorMessage } from "home/components/GlobalComponents/FormComponents";
import { TwoStepFormStepper } from "home/components/GlobalComponents/TwoStepFormStepper";
import { AppContext } from "home/context/AppContext";
import styles from "home/styles/SignUp.module.css";
import { get } from "http";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useState } from "react";

type operation = "join" | "create";

const getSignUpReqBody = (formData: FormData): string => {
  const { confirmPassword, ...rest } = formData;
  return JSON.stringify(rest);
};

interface FormData {
  firstName: string;
  lastName: string;
  userId: string;
  password: string;
  confirmPassword: string;
  orgId: string;
  orgName: string;
  operation: operation;
}

const SignUp = () => {
  const { appData, setAppData } = useContext(AppContext);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    userId: "",
    password: "",
    confirmPassword: "",
    orgId: "",
    orgName: "",
    operation: "join",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors({});
  };

  const validateStep = (): boolean => {
    let newErrors: Partial<FormData> = {};
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First Name is required";
      if (!formData.lastName) newErrors.lastName = "Last Name is required";
      if (!formData.userId) newErrors.userId = "Email is required";
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
      setStep(step + 1);
    }
  };

  const prevStep = (): void => {
    if (step <= 1) return;
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep()) {
      window.alert("Recheck form for errors");
      return;
    }

    // API call to sign up the user
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SIGNUP}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: getSignUpReqBody(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAppData((prev) => ({
          ...prev,
          userId: formData.userId,
        }));
        Cookies.set('userId', formData.userId, {
          expires: 1, // 1 day expiry
          secure: true,
          sameSite: 'strict',
          path: '/',
        });
        router.push("/dashboard");
        // Handle successful response
      } else {
        // Handle error response
        window.alert(`Login Failed: ${data.error}`);
      }
    } catch (error) {
      // Handle network or other errors
      window.alert("An error occurred. Please try again later.");
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
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                  />
                  <ErrorMessage msg={errors.userId} />
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
          </form>
          <div className={styles.buttonContainer}>
            <SecondaryButton disabled={step === 1} handleClick={prevStep}>
              Prev
            </SecondaryButton>
            {step === 1 && (
              <PrimaryButton id="nextCreateUser" handleClick={nextStep}>
                Next
              </PrimaryButton>
            )}
            {step === 2 && (
              <PrimaryButton id="submitCreateUser" handleClick={handleSubmit}>
                Sign Up
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
