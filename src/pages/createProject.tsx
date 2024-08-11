import { ChangeEvent, useContext, useState } from "react";
import styles from "home/styles/CreateProject.module.css";
import { TwoStepFormStepper } from "home/components/GlobalComponents/TwoStepFormStepper";
import {
  ErrorMessage,
  InputField,
  InputLabel,
  InputWrapper,
} from "home/components/GlobalComponents/FormComponents";
import PrimaryButton, {
  SecondaryButton,
} from "home/components/GlobalComponents/Buttons";
import { AppContext } from "home/context/AppContext";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface FormData {
  projectId: string;
  projectName: string;
  projectDescription: string;
  projectTeam: string[];
}

const checkAndFetchMembers = async ({ userId, appData, setAppData }: any) => {
  if (appData?.members?.length && appData?.members?.length !== 0) return;

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_DASHBOARD || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    const data = await response.json();

    setAppData((prev: any) => ({
      ...prev,
      members: data.team,
    }));
  } catch (error) {
    window.alert(
      "An error occurred while fetching members, you may add them later or go back to previous step and try again"
    );
  }
};

const getCreateProjectReqBody = (
  userId: string,
  formData: FormData
): string => {
  const body = {
    projectId: formData.projectId,
    name: formData.projectName,
    description: formData.projectDescription,
    users: formData.projectTeam,
    userId,
  };
  return JSON.stringify(body);
};

const CreateProject = () => {
  const { appData, setAppData } = useContext(AppContext);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectId: "",
    projectName: "",
    projectDescription: "",
    projectTeam: [],
  });

  const userId = appData.userId || Cookies.get("userId") || "";
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleMemberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      const projectTeam = checked
        ? [...prevFormData.projectTeam, value]
        : prevFormData.projectTeam.filter((id) => id !== value);
      return { ...prevFormData, projectTeam };
    });
  };

  const validateStep = () => {
    let newErrors: Partial<FormData> = {};
    if (step === 1) {
      if (!formData.projectId) newErrors.projectId = "Project Id is required";
      if (!formData.projectName)
        newErrors.projectName = "Project Name is required";
      if (!formData.projectDescription)
        newErrors.projectDescription = "Project Description is required";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CREATE_PROJECT || "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: getCreateProjectReqBody(userId, formData),
        }
      );

      const data = await response.json();

      // check for returned error
      if (data.error) {
        window.alert(data.error);
        return;
      }
      router.push(`projects/${formData.projectId}`);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const nextStep = async () => {
    if (!validateStep()) return;
    await checkAndFetchMembers({ userId, appData, setAppData });
    setStep(step + 1);
  };

  const prevStep = (): void => {
    if (step <= 1) return;
    setStep(step - 1);
  };

  return (
    <div className={styles.createProjectBody}>
      <div className={styles.createProjectContainer}>
        <TwoStepFormStepper
          step={step}
          title1="Create New"
          title2="Project"
          lalbel1="Project Details"
          label2="Add Project Members"
        />
        <div className={styles.formWrapper}>
          <form
            className={styles.createProjectForm}
            id="createUserForm"
            onSubmit={handleSubmit}
          >
            {step === 1 && (
              <div className={styles.stepContent}>
                <InputField
                  label="Project Id:"
                  name="projectId"
                  placeholder="P123"
                  handleChange={handleChange}
                  value={formData.projectId}
                  error={errors.projectId}
                />
                <InputField
                  label="Project Name:"
                  name="projectName"
                  placeholder="Cool Awesome Project"
                  handleChange={handleChange}
                  value={formData.projectName}
                  error={errors.projectName}
                />
                <InputWrapper>
                  <InputLabel>Project Description:</InputLabel>
                  <textarea
                    name="projectDescription"
                    form="createUserForm"
                    rows={3}
                    placeholder="A brief description of the project"
                    className={styles.textArea}
                    value={formData.projectDescription}
                    onChange={handleChange}
                  />
                  <ErrorMessage msg={errors.projectDescription} />
                </InputWrapper>
              </div>
            )}
            {step === 2 && (
              <div className={styles.stepContent}>
                <InputWrapper>
                  <InputLabel>Project Member:</InputLabel>
                  <div className={styles.memberContainer}>
                    {appData.members &&
                      appData.members
                        .filter((member) => member.userId !== userId)
                        .map((member) => (
                          <div
                            key={member.userId}
                            className={styles.memberWrapper}
                          >
                            <input
                              type="checkbox"
                              className={styles.memberCheckbox}
                              value={member.userId}
                              onChange={handleMemberChange}
                              checked={formData.projectTeam.includes(
                                member.userId
                              )}
                            />
                            <label className={styles.memberLabel}>
                              {member.name}
                            </label>
                          </div>
                        ))}
                  </div>
                </InputWrapper>
              </div>
            )}
          </form>
          <div className={styles.buttonContainer}>
            <SecondaryButton disabled={step === 1} handleClick={prevStep}>
              Prev
            </SecondaryButton>
            {step === 1 && (
              <PrimaryButton id="nextCreateProject" handleClick={nextStep}>
                Next
              </PrimaryButton>
            )}
            {step === 2 && (
              <PrimaryButton
                id="createProjectButton"
                handleClick={handleSubmit}
              >
                Create Project
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
