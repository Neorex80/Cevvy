import { createContext, useState, useContext } from 'react';

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState({
    certifications: {
      certifications: [],
    },
    education: {
      educations: [],
    },
    personalInfo: {},
    experience: {
      experiences: [],
    },
    projects: {
      projects: [],
    },
    skills: {
      skills: [],
    },
  });

  const addCertification = (certification) => {
    setResume(prev => ({
      ...prev,
      certifications: {
        certifications: [...prev.certifications.certifications, certification],
      },
    }));
  };

  const addEducation = (education) => {
    setResume(prev => ({
      ...prev,
      education: {
        educations: [...prev.education.educations, education],
      },
    }));
  };

  const sendToBackend = async () => {
    try {
      // This is a placeholder for a real backend API call
      console.log('Sending resume data to backend:', resume);
      // const response = await fetch('/api/save-resume', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(resume),
      // });
      // const data = await response.json();
      // console.log('Backend response:', data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const value = {
    resume,
    addCertification,
    addEducation,
    sendToBackend,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === null) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};