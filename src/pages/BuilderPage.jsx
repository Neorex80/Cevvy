import React, { useState, createContext, useContext } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { API_URL } from "../config";

// Context for form data management
const ResumeDataContext = createContext();

export const useResumeData = () => {
  const context = useContext(ResumeDataContext);
  if (!context) {
    throw new Error('useResumeData must be used within ResumeDataProvider');
  }
  return context;
};

// Personal Info Component
const PersonalInfoStep = () => {
  const { formData, updateFormData } = useResumeData();
  const data = formData.personal || {};

  const handleChange = (field, value) => {
    updateFormData('personal', { ...data, [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Personal Information</h1>
        <p className="text-neutral-700 text-lg">Let's start with your basic information</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Full Name"
            value={data.fullname || ''}
            onChange={(e) => handleChange('fullname', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={data.number || ''}
            onChange={(e) => handleChange('number', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="email"
            placeholder="Email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="url"
            placeholder="Website URL"
            value={data.web_url || ''}
            onChange={(e) => handleChange('web_url', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="LinkedIn Name"
            value={data.linkedin_name || ''}
            onChange={(e) => handleChange('linkedin_name', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={data.linkedin_url || ''}
            onChange={(e) => handleChange('linkedin_url', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="GitHub Name"
            value={data.github_name || ''}
            onChange={(e) => handleChange('github_name', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="url"
            placeholder="GitHub URL"
            value={data.github_url || ''}
            onChange={(e) => handleChange('github_url', e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Address"
              value={data.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Education Component
const EducationStep = () => {
  const { formData, updateFormData } = useResumeData();
  const educations = formData.education?.educations || [];
  const [currentEdu, setCurrentEdu] = useState({
    school: '', degree: '', start_date: '', end_date: '', address: ''
  });

  const addEducation = () => {
    if (!currentEdu.school || !currentEdu.degree) return;
    
    const updatedEducations = [...educations, currentEdu];
    updateFormData('education', { educations: updatedEducations });
    setCurrentEdu({ school: '', degree: '', start_date: '', end_date: '', address: '' });
  };

  const removeEducation = (index) => {
    const updatedEducations = educations.filter((_, i) => i !== index);
    updateFormData('education', { educations: updatedEducations });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Education</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold mb-6">Add Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="School/Institution"
            value={currentEdu.school}
            onChange={(e) => setCurrentEdu({...currentEdu, school: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Degree/Program"
            value={currentEdu.degree}
            onChange={(e) => setCurrentEdu({...currentEdu, degree: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Start Year"
            value={currentEdu.start_date}
            onChange={(e) => setCurrentEdu({...currentEdu, start_date: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="End Year"
            value={currentEdu.end_date}
            onChange={(e) => setCurrentEdu({...currentEdu, end_date: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Location"
              value={currentEdu.address}
              onChange={(e) => setCurrentEdu({...currentEdu, address: e.target.value})}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>
        <button
          onClick={addEducation}
          className="mt-4 bg-neutral-800 text-white px-6 py-2 rounded-lg hover:bg-neutral-900"
        >
          Add Education
        </button>
      </div>

      {educations.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-semibold mb-6">Your Education ({educations.length})</h3>
          {educations.map((edu, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{edu.degree}</h4>
                <p className="text-gray-600">{edu.school}</p>
                <p className="text-sm text-gray-500">{edu.start_date} - {edu.end_date}</p>
                {edu.address && <p className="text-sm text-gray-500">{edu.address}</p>}
              </div>
              <button
                onClick={() => removeEducation(index)}
                className="text-red-500 hover:text-red-700 px-2 py-1"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Experience Component
const ExperienceStep = () => {
  const { formData, updateFormData } = useResumeData();
  const experiences = formData.experience?.experiences || [];
  const [currentExp, setCurrentExp] = useState({
    position: '', company_name: '', start_date: '', end_date: '', address: '', job_des: { lines: [''] }
  });

  const addExperience = () => {
    if (!currentExp.position || !currentExp.company_name) return;
    
    const updatedExperiences = [...experiences, {
      ...currentExp,
      job_des: { lines: currentExp.job_des.lines.filter(line => line.trim()) }
    }];
    updateFormData('experience', { experiences: updatedExperiences });
    setCurrentExp({
      position: '', company_name: '', start_date: '', end_date: '', address: '', job_des: { lines: [''] }
    });
  };

  const updateJobLine = (index, value) => {
    const newLines = [...currentExp.job_des.lines];
    newLines[index] = value;
    setCurrentExp({...currentExp, job_des: { lines: newLines }});
  };

  const addJobLine = () => {
    setCurrentExp({
      ...currentExp, 
      job_des: { lines: [...currentExp.job_des.lines, ''] }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Work Experience</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold mb-6">Add Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Job Title"
            value={currentExp.position}
            onChange={(e) => setCurrentExp({...currentExp, position: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={currentExp.company_name}
            onChange={(e) => setCurrentExp({...currentExp, company_name: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Start Date (YYYY-MM)"
            value={currentExp.start_date}
            onChange={(e) => setCurrentExp({...currentExp, start_date: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="End Date (YYYY-MM)"
            value={currentExp.end_date}
            onChange={(e) => setCurrentExp({...currentExp, end_date: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Location"
              value={currentExp.address}
              onChange={(e) => setCurrentExp({...currentExp, address: e.target.value})}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-md font-semibold mb-4">Job Description</h4>
          {currentExp.job_des.lines.map((line, index) => (
            <input
              key={index}
              type="text"
              placeholder={`• Job responsibility ${index + 1}...`}
              value={line}
              onChange={(e) => updateJobLine(index, e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 mb-3"
            />
          ))}
          <button
            onClick={addJobLine}
            className="text-blue-600 hover:text-blue-800 text-sm mb-4"
          >
            + Add another responsibility
          </button>
        </div>

        <button
          onClick={addExperience}
          className="bg-neutral-800 text-white px-6 py-2 rounded-lg hover:bg-neutral-900"
        >
          Add Experience
        </button>
      </div>

      {experiences.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-semibold mb-6">Your Experience ({experiences.length})</h3>
          {experiences.map((exp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold">{exp.position}</h4>
                  <p className="text-gray-600">{exp.company_name}</p>
                  <p className="text-sm text-gray-500">{exp.start_date} - {exp.end_date}</p>
                  {exp.address && <p className="text-sm text-gray-500">{exp.address}</p>}
                  <ul className="mt-2 text-sm text-gray-600">
                    {exp.job_des.lines.map((line, i) => (
                      <li key={i}>• {line}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => {
                    const updated = experiences.filter((_, i) => i !== index);
                    updateFormData('experience', { experiences: updated });
                  }}
                  className="text-red-500 hover:text-red-700 px-2 py-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Skills Component
const SkillsStep = () => {
  const { formData, updateFormData } = useResumeData();
  const categories = formData.skills?.categories || [];
  const [currentCategory, setCurrentCategory] = useState({
    category_name: '', items: ['']
  });

  const addCategory = () => {
    if (!currentCategory.category_name) return;
    
    const updatedCategories = [...categories, {
      ...currentCategory,
      items: currentCategory.items.filter(item => item.trim())
    }];
    updateFormData('skills', { categories: updatedCategories });
    setCurrentCategory({ category_name: '', items: [''] });
  };

  const updateSkillItem = (index, value) => {
    const newItems = [...currentCategory.items];
    newItems[index] = value;
    setCurrentCategory({...currentCategory, items: newItems});
  };

  const addSkillItem = () => {
    setCurrentCategory({
      ...currentCategory, 
      items: [...currentCategory.items, '']
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Skills & Expertise</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold mb-6">Add Skill Category</h3>
        
        <input
          type="text"
          placeholder="Category Name (e.g., Programming Languages)"
          value={currentCategory.category_name}
          onChange={(e) => setCurrentCategory({...currentCategory, category_name: e.target.value})}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 mb-6"
        />

        <div>
          <h4 className="text-md font-semibold mb-4">Skills in this Category</h4>
          {currentCategory.items.map((item, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Skill ${index + 1}...`}
              value={item}
              onChange={(e) => updateSkillItem(index, e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 mb-3"
            />
          ))}
          <button
            onClick={addSkillItem}
            className="text-blue-600 hover:text-blue-800 text-sm mb-4"
          >
            + Add another skill
          </button>
        </div>

        <button
          onClick={addCategory}
          className="bg-neutral-800 text-white px-6 py-2 rounded-lg hover:bg-neutral-900"
        >
          Add Category
        </button>
      </div>

      {categories.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-semibold mb-6">Your Skills ({categories.length})</h3>
          {categories.map((category, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{category.category_name}</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {category.items.map((item, i) => (
                      <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    const updated = categories.filter((_, i) => i !== index);
                    updateFormData('skills', { categories: updated });
                  }}
                  className="text-red-500 hover:text-red-700 px-2 py-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Projects Component
const ProjectStep = () => {
  const { formData, updateFormData } = useResumeData();
  const projects = formData.projects?.projects || [];
  const [currentProject, setCurrentProject] = useState({
    name: '', tech_stack: '', start_date: '', end_date: '', project_des: { lines: [''] }
  });

  const addProject = () => {
    if (!currentProject.name || !currentProject.tech_stack) return;
    
    const updatedProjects = [...projects, {
      ...currentProject,
      project_des: { lines: currentProject.project_des.lines.filter(line => line.trim()) }
    }];
    updateFormData('projects', { projects: updatedProjects });
    setCurrentProject({
      name: '', tech_stack: '', start_date: '', end_date: '', project_des: { lines: [''] }
    });
  };

  const updateProjectLine = (index, value) => {
    const newLines = [...currentProject.project_des.lines];
    newLines[index] = value;
    setCurrentProject({...currentProject, project_des: { lines: newLines }});
  };

  const addProjectLine = () => {
    setCurrentProject({
      ...currentProject, 
      project_des: { lines: [...currentProject.project_des.lines, ''] }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Projects</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold mb-6">Add New Project</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Project Name"
            value={currentProject.name}
            onChange={(e) => setCurrentProject({...currentProject, name: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Tech Stack"
            value={currentProject.tech_stack}
            onChange={(e) => setCurrentProject({...currentProject, tech_stack: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Start Year"
            value={currentProject.start_date}
            onChange={(e) => setCurrentProject({...currentProject, start_date: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="End Year"
            value={currentProject.end_date}
            onChange={(e) => setCurrentProject({...currentProject, end_date: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="mt-6">
          <h4 className="text-md font-semibold mb-4">Project Description</h4>
          {currentProject.project_des.lines.map((line, index) => (
            <input
              key={index}
              type="text"
              placeholder={`• Project feature ${index + 1}...`}
              value={line}
              onChange={(e) => updateProjectLine(index, e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 mb-3"
            />
          ))}
          <button
            onClick={addProjectLine}
            className="text-blue-600 hover:text-blue-800 text-sm mb-4"
          >
            + Add another feature
          </button>
        </div>

        <button
          onClick={addProject}
          className="bg-neutral-800 text-white px-6 py-2 rounded-lg hover:bg-neutral-900"
        >
          Add Project
        </button>
      </div>

      {projects.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-semibold mb-6">Your Projects ({projects.length})</h3>
          {projects.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold">{project.name}</h4>
                  <p className="text-gray-600">{project.tech_stack}</p>
                  <p className="text-sm text-gray-500">{project.start_date} - {project.end_date}</p>
                  <ul className="mt-2 text-sm text-gray-600">
                    {project.project_des.lines.map((line, i) => (
                      <li key={i}>• {line}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => {
                    const updated = projects.filter((_, i) => i !== index);
                    updateFormData('projects', { projects: updated });
                  }}
                  className="text-red-500 hover:text-red-700 px-2 py-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Certifications Component
const CertificationStep = () => {
  const { formData, updateFormData } = useResumeData();
  const certifications = formData.certifications?.certifications || [];
  const [currentCert, setCurrentCert] = useState({
    title: '', date: '', issuer: '', certificate_url: '', details: ['']
  });

  const addCertification = () => {
    if (!currentCert.title || !currentCert.issuer) return;
    
    const updatedCertifications = [...certifications, {
      ...currentCert,
      details: currentCert.details.filter(detail => detail.trim())
    }];
    updateFormData('certifications', { certifications: updatedCertifications });
    setCurrentCert({
      title: '', date: '', issuer: '', certificate_url: '', details: ['']
    });
  };

  const updateCertDetail = (index, value) => {
    const newDetails = [...currentCert.details];
    newDetails[index] = value;
    setCurrentCert({...currentCert, details: newDetails});
  };

  const addCertDetail = () => {
    setCurrentCert({
      ...currentCert, 
      details: [...currentCert.details, '']
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Certifications</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold mb-6">Add Certification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Certification Title"
            value={currentCert.title}
            onChange={(e) => setCurrentCert({...currentCert, title: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Year"
            value={currentCert.date}
            onChange={(e) => setCurrentCert({...currentCert, date: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Issuing Organization"
            value={currentCert.issuer}
            onChange={(e) => setCurrentCert({...currentCert, issuer: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="url"
            placeholder="Certificate URL (optional)"
            value={currentCert.certificate_url}
            onChange={(e) => setCurrentCert({...currentCert, certificate_url: e.target.value})}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="mt-6">
          <h4 className="text-md font-semibold mb-4">Additional Details (optional)</h4>
          {currentCert.details.map((detail, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Detail ${index + 1}...`}
              value={detail}
              onChange={(e) => updateCertDetail(index, e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 mb-3"
            />
          ))}
          <button
            onClick={addCertDetail}
            className="text-blue-600 hover:text-blue-800 text-sm mb-4"
          >
            + Add another detail
          </button>
        </div>

        <button
          onClick={addCertification}
          className="bg-neutral-800 text-white px-6 py-2 rounded-lg hover:bg-neutral-900"
        >
          Add Certification
        </button>
      </div>

      {certifications.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-semibold mb-6">Your Certifications ({certifications.length})</h3>
          {certifications.map((cert, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold">{cert.title}</h4>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">{cert.date}</p>
                  {cert.certificate_url && (
                    <a href={cert.certificate_url} className="text-blue-600 text-sm underline" target="_blank" rel="noopener noreferrer">
                      View Certificate
                    </a>
                  )}
                  {cert.details.length > 0 && (
                    <ul className="mt-2 text-sm text-gray-600">
                      {cert.details.map((detail, i) => (
                        <li key={i}>• {detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  onClick={() => {
                    const updated = certifications.filter((_, i) => i !== index);
                    updateFormData('certifications', { certifications: updated });
                  }}
                  className="text-red-500 hover:text-red-700 px-2 py-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const steps = [
  { id: 1, name: "Personal Info", component: PersonalInfoStep },
  { id: 2, name: "Education", component: EducationStep },
  { id: 3, name: "Experience", component: ExperienceStep },
  { id: 4, name: "Skills", component: SkillsStep },
  { id: 5, name: "Projects", component: ProjectStep },
  { id: 6, name: "Certifications", component: CertificationStep }
];

const ProgressBar = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const Toast = ({ toast }) => {
  if (!toast) return null;
  
  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <h4 className="font-semibold text-gray-900">{toast.title}</h4>
      <p className="text-sm text-gray-600 mt-1">{toast.description}</p>
    </div>
  );
};

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    personal: {},
    education: { educations: [] },
    experience: { experiences: [] },
    skills: { categories: [] },
    projects: { projects: [] },
    certifications: { certifications: [] }
  });

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
    const token = localStorage.getItem('Token');
    const response = await fetch(`${API_URL}/resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`    
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      // Set link attributes for download
      link.href = url;
      link.download = 'resume.pdf'; 
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setToast({
        title: "Success!",
        description: "Your resume has been generated and is downloading."
      });
    } else {
      throw new Error('Failed to submit resume');
    }
  } catch (err) {
    setToast({
      title: "Error",
      description: "Failed to submit resume. Please try again."
    });
    console.error(err);
  } finally {
    setIsSubmitting(false);
    setTimeout(() => setToast(null), 3000);
  }
};

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <ResumeDataContext.Provider value={{ formData, updateFormData }}>
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
    </ResumeDataContext.Provider>
  );
}