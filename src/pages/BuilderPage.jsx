import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import PersonalInfoStep from "../components/steps//PersonalInfoStep";
import EducationStep from "../components/steps/EducationStep";
import ExperienceStep from "../components/steps/ExperienceStep";
import SkillsStep from "../components/steps/SkillsStep";
import ProgressBar from "../components/ProgressBar";
import Toast from "../components/Toast";

const steps = [
  { id: 1, name: "Personal Info", component: PersonalInfoStep },
  { id: 2, name: "Education", component: EducationStep },
  { id: 3, name: "Experience", component: ExperienceStep },
  { id: 4, name: "Skills", component: SkillsStep },
//   { id: 5, name: "Summary", component: SummaryStep },
];

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState({
    personalInfo: { fullName: "", email: "", phoneNumber: "", address: "", linkedin: "", portfolio: "" },
    education: [],
    experience: [],
    skills: []
  })
  const [errors, setErrors] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (title, description, variant = "default") => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 3000);
  };

  const debouncedSave = useMemo(() => {
    let timeout;
    return (data) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log("Auto-saving data...", data);
        showToast("Auto-saved", "Your changes have been saved automatically.");
        setHasUnsavedChanges(false);
      }, 1500);
    };
  }, []);

  useEffect(() => {
    if (hasUnsavedChanges) {
      debouncedSave(resumeData);
    }
  }, [resumeData, debouncedSave, hasUnsavedChanges]);

  const handleDataChange = (step, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [step]: { ...prev[step], [field]: value },
    }));
    setHasUnsavedChanges(true);
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!resumeData.personalInfo.fullName) newErrors.fullName = "Full name is required";
      if (!resumeData.personalInfo.email) newErrors.email = "Email is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) setCurrentStep((prev) => prev + 1);
      else handleSubmit();
    }
  };

  const prevStep = () => currentStep > 1 && setCurrentStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Final resume data:", resumeData);
    showToast("Resume Complete!", "Your resume has been successfully saved.", "success");
  };

  const getCurrentStepData = () => {
    switch (currentStep) {
      case 1: return resumeData.personalInfo;
      case 2: return resumeData.education;
      case 3: return resumeData.experience;
      case 4: return resumeData.skills;
      default: return {};
    }
  };

  const getCurrentStepKey = () => {
    switch (currentStep) {
      case 1: return "personalInfo";
      case 2: return "education";
      case 3: return "experience";
      case 4: return "skills";
      default: return "personalInfo";
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Toast toast={toast} />
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} />

      <div className="my-8">
        <CurrentStepComponent
          data={getCurrentStepData()}
          onChange={(field, value) => handleDataChange(getCurrentStepKey(), field, value)}
          errors={errors}
        />
      </div>

      <div className="flex justify-between items-center mt-8">
        <div>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Previous Step
            </button>
          )}
        </div>
        <div>
          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next Step <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Finish & Save <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
