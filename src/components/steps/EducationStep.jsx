import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addEducation } from "../../store/resumeSlice";
import { GraduationCap, School, Calendar, MapPin, Plus, Trash2, Edit3 } from 'lucide-react';

export default function EducationStep() {
  const educations = useSelector((state) => state.resume.education.educations);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    school: "",
    degree: "",
    start_date: "",
    end_date: "",
    address: ""
  });

  const handleAdd = () => {
    if (form.school && form.degree && form.start_date && form.end_date) {
      dispatch(addEducation(form));
      setForm({ school: "", degree: "", start_date: "", end_date: "", address: "" });
    }
  };

  const handleFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const isFormValid = form.school && form.degree && form.start_date && form.end_date;

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
          <GraduationCap className="w-8 h-8 text-neutral-700" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Education</h1>
        <p className="text-neutral-700 text-lg">
          Add your educational background and qualifications.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Add Education Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
          <Plus className="w-5 h-5 text-neutral-600" />
          Add New Education
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="School/Institution"
            placeholder="Harvard University"
            value={form.school}
            field="school"
            icon={School}
          />

          <InputField
            label="Degree/Program"
            placeholder="Bachelor of Science in Computer Science"
            value={form.degree}
            field="degree"
            icon={GraduationCap}
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
              placeholder="Cambridge, MA, USA"
              value={form.address}
              field="address"
              icon={MapPin}
              required={false}
            />
          </div>
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
            Add Education
          </button>
        </div>
      </div>

      {/* Education List */}
      {educations.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
            <GraduationCap className="w-5 h-5 text-neutral-600" />
            Your Education ({educations.length})
          </h3>

          <div className="space-y-4">
            {educations.map((edu, index) => (
              <div key={index} className="group bg-gray-50 border border-gray-200 rounded-lg p-6 transition-all duration-200 hover:shadow-md hover:border-gray-300">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mt-1">
                        <GraduationCap className="w-5 h-5 text-neutral-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-neutral-900 mb-1">
                          {edu.degree}
                        </h4>
                        <p className="text-neutral-700 font-medium mb-2 flex items-center gap-2">
                          <School className="w-4 h-4 text-neutral-500" />
                          {edu.school}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-neutral-500" />
                            <span>
                              {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                            </span>
                          </div>
                          {edu.address && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-neutral-500" />
                              <span>{edu.address}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons (hidden for now but ready for future features) */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-white rounded-full transition-colors duration-200">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-neutral-500 hover:text-red-600 hover:bg-white rounded-full transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {educations.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-700 mb-2">No education added yet</h3>
          <p className="text-neutral-500 mb-6">Add your first education entry using the form above.</p>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></div>
            Step 2 of 6 - Education
          </span>
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
            {educations.length} education{educations.length !== 1 ? 's' : ''} added
          </span>
        </div>
      </div>
    </div>
  );
}

// Demo wrapper
function Demo() {
  const mockEducations = [
    {
      school: "Stanford University",
      degree: "Master of Science in Computer Science",
      start_date: "2020-09",
      end_date: "2022-06",
      address: "Stanford, CA, USA"
    },
    {
      school: "University of California, Berkeley",
      degree: "Bachelor of Science in Electrical Engineering",
      start_date: "2016-08",
      end_date: "2020-05",
      address: "Berkeley, CA, USA"
    }
  ];

  const mockDispatch = (action) => {
    console.log('Dispatched:', action);
  };

  React.useEffect(() => {
    window.mockUseSelector = () => ({ education: { educations: mockEducations } });
    window.mockUseDispatch = () => mockDispatch;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <EducationStep />
      </div>
    </div>
  );
}