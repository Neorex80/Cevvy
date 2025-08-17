import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addExperience } from "../../store/resumeSlice";
import { Briefcase, Building, Calendar, MapPin, Plus, Trash2, Edit3, List, X } from 'lucide-react';

export default function ExperienceStep() {
  const experiences = useSelector((state) => state.resume.experience.experiences);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    position: "",
    company_name: "",
    start_date: "",
    end_date: "",
    address: "",
    job_des: { lines: [""] }
  });

  const handleAdd = () => {
    if (form.position && form.company_name && form.start_date && form.end_date) {
      // Filter out empty lines before adding
      const filteredLines = form.job_des.lines.filter(line => line.trim() !== "");
      const experienceToAdd = {
        ...form,
        job_des: { lines: filteredLines.length > 0 ? filteredLines : [""] }
      };
      dispatch(addExperience(experienceToAdd));
      setForm({ 
        position: "", 
        company_name: "", 
        start_date: "", 
        end_date: "", 
        address: "", 
        job_des: { lines: [""] } 
      });
    }
  };

  const handleFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleLineChange = (index, value) => {
    const newLines = [...form.job_des.lines];
    newLines[index] = value;
    setForm({ ...form, job_des: { lines: newLines } });
  };

  const addLine = () => {
    setForm({ ...form, job_des: { lines: [...form.job_des.lines, ""] } });
  };

  const removeLine = (index) => {
    if (form.job_des.lines.length > 1) {
      const newLines = form.job_des.lines.filter((_, i) => i !== index);
      setForm({ ...form, job_des: { lines: newLines } });
    }
  };

  const isFormValid = form.position && form.company_name && form.start_date && form.end_date;

  const InputField = ({ 
    label, 
    type = "text", 
    placeholder, 
    value, 
    field, 
    icon: Icon,
    required = true 
  }) => (
    <div className="group">
      <label className="block text-sm font-semibold text-neutral-800 mb-2 transition-colors duration-200 group-focus-within:text-neutral-900">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-neutral-600" />}
          {label}
          {required && <span className="text-red-500 text-xs">*</span>}
        </div>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleFormChange(field, e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-lg transition-all duration-200 
                 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400
                 hover:border-gray-400 bg-white shadow-sm
                 placeholder:text-gray-400 text-neutral-800"
      />
    </div>
  );

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 shadow-sm">
          <Briefcase className="w-8 h-8 text-neutral-700" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Work Experience</h1>
        <p className="text-neutral-700 text-lg">
          Add your professional work experience and achievements.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Add Experience Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
          <Plus className="w-5 h-5 text-neutral-600" />
          Add New Experience
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Job Title/Position"
            placeholder="Senior Software Engineer"
            value={form.position}
            field="position"
            icon={Briefcase}
          />

          <InputField
            label="Company Name"
            placeholder="Google Inc."
            value={form.company_name}
            field="company_name"
            icon={Building}
          />

          <InputField
            label="Start Date"
            type="month"
            placeholder="Start Date"
            value={form.start_date}
            field="start_date"
            icon={Calendar}
          />

          <InputField
            label="End Date"
            type="month"
            placeholder="End Date"
            value={form.end_date}
            field="end_date"
            icon={Calendar}
          />

          <div className="md:col-span-2">
            <InputField
              label="Location"
              placeholder="San Francisco, CA, USA"
              value={form.address}
              field="address"
              icon={MapPin}
              required={false}
            />
          </div>
        </div>

        {/* Job Description Section */}
        <div className="mt-8">
          <h4 className="text-md font-semibold text-neutral-800 mb-4 flex items-center gap-2">
            <List className="w-4 h-4 text-neutral-600" />
            Job Description & Achievements
          </h4>
          
          <div className="space-y-3">
            {form.job_des.lines.map((line, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={`• ${index === 0 ? 'Developed and maintained web applications...' : 'Add another responsibility or achievement...'}`}
                    value={line}
                    onChange={(e) => handleLineChange(index, e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg transition-all duration-200 
                             focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400
                             hover:border-gray-400 bg-white shadow-sm
                             placeholder:text-gray-400 text-neutral-800"
                  />
                </div>
                {form.job_des.lines.length > 1 && (
                  <button
                    onClick={() => removeLine(index)}
                    className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button 
            onClick={addLine}
            className="mt-3 flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 hover:text-neutral-800 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Another Line
          </button>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleAdd}
            disabled={!isFormValid}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-sm transition-all duration-200 ${
              isFormValid 
                ? 'bg-neutral-800 text-white hover:bg-neutral-700 hover:shadow-md transform hover:scale-105' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </button>
        </div>
      </div>

      {/* Experience List */}
      {experiences.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
            <Briefcase className="w-5 h-5 text-neutral-600" />
            Your Experience ({experiences.length})
          </h3>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="group bg-gray-50 border border-gray-200 rounded-lg p-6 transition-all duration-200 hover:shadow-md hover:border-gray-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mt-1">
                        <Briefcase className="w-5 h-5 text-neutral-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-neutral-900 mb-1">
                          {exp.position}
                        </h4>
                        <p className="text-neutral-700 font-medium mb-2 flex items-center gap-2">
                          <Building className="w-4 h-4 text-neutral-500" />
                          {exp.company_name}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-neutral-500" />
                            <span>
                              {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                            </span>
                          </div>
                          {exp.address && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-neutral-500" />
                              <span>{exp.address}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-white rounded-full transition-colors duration-200">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-neutral-500 hover:text-red-600 hover:bg-white rounded-full transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Job Description */}
                {exp.job_des && exp.job_des.lines && exp.job_des.lines.length > 0 && exp.job_des.lines[0] && (
                  <div className="ml-13">
                    <h5 className="text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
                      <List className="w-4 h-4 text-neutral-500" />
                      Key Responsibilities & Achievements
                    </h5>
                    <ul className="space-y-1">
                      {exp.job_des.lines
                        .filter(line => line && line.trim() !== "")
                        .map((line, lineIndex) => (
                          <li key={lineIndex} className="text-sm text-neutral-600 flex items-start gap-2">
                            <span className="text-neutral-400 mt-1">•</span>
                            <span>{line}</span>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {experiences.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-700 mb-2">No experience added yet</h3>
          <p className="text-neutral-500 mb-6">Add your first work experience using the form above.</p>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></div>
            Step 3 of 6 - Work Experience
          </span>
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
            {experiences.length} experience{experiences.length !== 1 ? 's' : ''} added
          </span>
        </div>
      </div>
    </div>
  );
}

// Demo wrapper
function Demo() {
  const mockExperiences = [
    {
      position: "Senior Software Engineer",
      company_name: "Google Inc.",
      start_date: "2021-03",
      end_date: "2023-12",
      address: "Mountain View, CA, USA",
      job_des: {
        lines: [
          "Developed and maintained scalable web applications serving millions of users",
          "Led a team of 5 engineers in implementing new features and optimizations",
          "Improved system performance by 40% through code optimization and architecture improvements"
        ]
      }
    }
  ];

  const mockDispatch = (action) => {
    console.log('Dispatched:', action);
  };

  React.useEffect(() => {
    window.mockUseSelector = () => ({ experience: { experiences: mockExperiences } });
    window.mockUseDispatch = () => mockDispatch;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <ExperienceStep />
      </div>
    </div>
  );
}