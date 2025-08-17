import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useSelector } from "react-redux";

import PersonalInfoStep from "../components/steps/PersonalInfoStep";
import EducationStep from "../components/steps/EducationStep";
import ExperienceStep from "../components/steps/ExperienceStep";
import SkillsStep from "../components/steps/SkillsStep";
import ProjectStep from "../components/steps/ProjectStep";
import CertificationStep from "../components/steps/CertificationStep";

import ProgressBar from "../components/ProgressBar";
import Toast from "../components/Toast";

const steps = [
  { id: 1, name: "Personal Info", component: PersonalInfoStep },
  { id: 2, name: "Education", component: EducationStep },
  { id: 3, name: "Experience", component: ExperienceStep },
  { id: 4, name: "Skills", component: SkillsStep },
  { id: 5, name: "Projects", component: ProjectStep },
  { id: 6, name: "Certifications", component: CertificationStep }
];

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [toast, setToast] = useState(null);

  const resumeData = useSelector((state) => state.resume);

  const showToast = (title, description, variant = "default") => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 3000);
  };

  const validateStep = () => {
    // (optional) add validation rules
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < steps.length) setCurrentStep((prev) => prev + 1);
      else handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    console.log("Final resume data:", resumeData);

    try {
      await fetch("http://localhost:8080/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData)
      });
      showToast("Resume Complete!", "Your resume has been saved successfully.", "success");
    } catch (err) {
      showToast("Error", "Failed to save resume. Try again.", "error");
      console.error("Error saving resume:", err);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Toast toast={toast} />
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} />

      <div className="my-8">
        <CurrentStepComponent />
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
