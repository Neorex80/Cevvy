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

  const validateStep = () => {
  if (currentStep === 1) {
    const { fullname, email, phone } = resumeData.personal;

    if (!fullname || !email || !phone) {
      setToast({
        title: "Missing required fields",
        description: "Full name, email, and phone number are required."
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToast({
        title: "Invalid email format",
        description: "Please enter a valid email address."
      });
      return false;
    }
  }

  if (currentStep === 2) {
    if (!resumeData.education.educations.length) {
      setToast({
        title: "No education added",
        description: "Please add at least one education entry."
      });
      return false;
    }

    for (const edu of resumeData.education.educations) {
      if (!edu.institution || !edu.degree || !edu.startDate) {
        setToast({
          title: "Incomplete education details",
          description: "Institution, degree, and start date are required for education."
        });
        return false;
      }
    }
  }
  return true;
};
  const nextStep = () => {
  if (!validateStep()) return;
  if (currentStep < steps.length) setCurrentStep(prev => prev + 1);
  else handleSubmit();
};

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

const handleSubmit = async (resumeData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    setToast({
      title: "Authentication required",
      description: "You must log in before submitting your resume."
    });
    return;
  }

  try {
    const res = await fetch(`http://localhost:2222/resume`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(resumeData)
    });

    if (!res.ok) {
      throw new Error("Failed to submit resume");
    }

    setToast({
      title: "Success!",
      description: "Your resume has been submitted."
    });
  } catch (err) {
    setToast({
      title: "Error",
      description: err.message
    });
  }
};


  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Toast toast={toast} />
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Build Your Resume
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a professional resume that stands out. Follow our step-by-step process to showcase your skills and experience.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Step {currentStep}: {steps[currentStep - 1].name}
            </h2>
            <span className="text-sm font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
              {currentStep} of {steps.length}
            </span>
          </div>
          <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
          <div className="p-8 lg:p-12">
            <div className="transform transition-all duration-500 ease-in-out">
              <CurrentStepComponent />
            </div>
          </div>
          
          {/* Card Footer with Navigation */}
          <div className="bg-gray-50 border-t border-gray-200 px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="group flex items-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-white transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    Previous Step
                  </button>
                )}
              </div>
              
              <div>
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="group flex items-center gap-3 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-4 focus:ring-blue-200"
                  >
                    Next Step
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="group flex items-center gap-3 px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-4 focus:ring-green-200"
                  >
                    Finish & Save
                    <Check className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            {currentStep === steps.length ? (
              "Ready to complete your resume"
            ) : (
              `${steps.length - currentStep} ${steps.length - currentStep === 1 ? 'step' : 'steps'} remaining`
            )}
          </div>
        </div>
      </div>
    </div>
  );
}