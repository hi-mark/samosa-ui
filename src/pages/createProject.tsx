import { ChangeEvent, useState } from "react";
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
interface FormData {
  projectId: string;
  projectName: string;
  projectDescription: string;
  projectTeam: string[];
}

const dummyMembers = [
  { userid: "m1@gmail.com", name: "Munish Kohar", role: "Admin" },
  { userid: "m2@gmail.com", name: "Jane Doe", role: "Member" },
  { userid: "m3@gmail.com", name: "John Smith", role: "Member" },
  { userid: "m4@gmail.com", name: "Jash Chawla", role: "Admin" },
  { userid: "m5@gmail.com", name: "Shubash Mehar", role: "Member" },
  { userid: "m6@gmail.com", name: "Jay Cee Agarwal", role: "Admin" },
  { userid: "m7@gmail.com", name: "Marcus Lumbos", role: "Member" },
];

const CreateProject = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectId: "",
    projectName: "",
    projectDescription: "",
    projectTeam: [],
  });
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateStep();
    console.log(formData);
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
                    {dummyMembers.map((member) => (
                      <div key={member.userid} className={styles.memberWrapper}>
                        <input
                          type="checkbox"
                          className={styles.memberCheckbox}
                          value={member.userid}
                          onChange={handleMemberChange}
                          checked={formData.projectTeam.includes(member.userid)}
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
              <PrimaryButton handleClick={nextStep}>Next</PrimaryButton>
            )}
            {step === 2 && (
              <PrimaryButton handleClick={handleSubmit}>
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
