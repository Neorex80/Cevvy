import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addCertification } from "../../store/resumeSlice";
import { Award, Building, Calendar, Plus, Trash2, Edit3, CheckCircle, ExternalLink } from 'lucide-react';

export default function CertificationStep() {
  const certifications = useSelector((state) => state.resume.certifications.certifications || []);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    issuer: "",
    date: ""
  });

  const handleAdd = () => {
    if (form.title && form.issuer && form.date) {
      dispatch(addCertification(form));
      setForm({ title: "", issuer: "", date: "" });
    }
  };

  const handleFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const isFormValid = form.title && form.issuer && form.date;

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

  const popularCertifications = [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional",
    "Microsoft Azure Fundamentals",
    "Certified Kubernetes Administrator",
    "PMP - Project Management Professional",
    "Cisco Certified Network Associate",
    "CompTIA Security+",
    "Salesforce Certified Administrator"
  ];

  const popularIssuers = [
    "Amazon Web Services (AWS)",
    "Google Cloud",
    "Microsoft",
    "Oracle",
    "Cisco",
    "CompTIA",
    "PMI",
    "Salesforce",
    "Adobe",
    "IBM"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 shadow-sm">
          <Award className="w-8 h-8 text-neutral-700" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Certifications</h1>
        <p className="text-neutral-700 text-lg">
          Add your professional certifications and credentials.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Add Certification Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
          <Plus className="w-5 h-5 text-neutral-600" />
          Add New Certification
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <InputField
              label="Certification Title"
              placeholder="AWS Certified Solutions Architect"
              value={form.title}
              field="title"
              icon={Award}
            />
            {/* Certification suggestions */}
            <div className="mt-2">
              <p className="text-xs text-neutral-500 mb-2">Popular certifications:</p>
              <div className="flex flex-wrap gap-1">
                {popularCertifications.slice(0, 4).map((cert, index) => (
                  <button
                    key={index}
                    onClick={() => handleFormChange('title', cert)}
                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-neutral-600 rounded-full transition-colors duration-200"
                  >
                    {cert}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <InputField
            label="Date Earned"
            type="month"
            placeholder="Date Earned"
            value={form.date}
            field="date"
            icon={Calendar}
          />
        </div>

        <div className="mt-6">
          <InputField
            label="Issuing Organization"
            placeholder="Amazon Web Services (AWS)"
            value={form.issuer}
            field="issuer"
            icon={Building}
          />
          {/* Issuer suggestions */}
          <div className="mt-2">
            <p className="text-xs text-neutral-500 mb-2">Popular issuers:</p>
            <div className="flex flex-wrap gap-1">
              {popularIssuers.slice(0, 6).map((issuer, index) => (
                <button
                  key={index}
                  onClick={() => handleFormChange('issuer', issuer)}
                  className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-neutral-600 rounded-full transition-colors duration-200"
                >
                  {issuer}
                </button>
              ))}
            </div>
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
            Add Certification
          </button>
        </div>
      </div>

      {/* Certifications List */}
      {certifications.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
            <Award className="w-5 h-5 text-neutral-600" />
            Your Certifications ({certifications.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="group bg-gray-50 border border-gray-200 rounded-lg p-6 transition-all duration-200 hover:shadow-md hover:border-gray-300">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mt-1">
                        <Award className="w-5 h-5 text-neutral-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-neutral-900 mb-2 leading-tight">
                          {cert.title}
                        </h4>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <Building className="w-4 h-4 text-neutral-500" />
                            <span className="font-medium">{cert.issuer}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <Calendar className="w-4 h-4 text-neutral-500" />
                            <span>Earned {formatDate(cert.date)}</span>
                          </div>

                          {/* Certification status */}
                          <div className="flex items-center gap-2 mt-3">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700 font-medium">Certified</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-white rounded-full transition-colors duration-200">
                      <ExternalLink className="w-4 h-4" />
                    </button>
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
      {certifications.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-700 mb-2">No certifications added yet</h3>
          <p className="text-neutral-500 mb-6">Add your first certification using the form above.</p>
          <div className="text-sm text-neutral-400">
            <p>Include professional certifications, licenses, and credentials</p>
          </div>
        </div>
      )}

      {/* Certification Tips */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
          <Award className="w-4 h-4" />
          Tips for Certifications
        </h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Include active and recently earned certifications (within 3-5 years)</li>
          <li>• List certifications relevant to your target role and industry</li>
          <li>• Include certification numbers or badge links if available</li>
          <li>• Order by relevance and recency, not chronologically</li>
          <li>• Consider adding expiration dates for time-sensitive certifications</li>
        </ul>
      </div>

      {/* Popular Certification Categories */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h4 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2">
          <Award className="w-4 h-4" />
          Popular Certification Categories
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-neutral-700 mb-2">Cloud & Infrastructure</h5>
            <ul className="text-neutral-600 space-y-1">
              <li>• AWS Certifications</li>
              <li>• Google Cloud</li>
              <li>• Microsoft Azure</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-neutral-700 mb-2">Security</h5>
            <ul className="text-neutral-600 space-y-1">
              <li>• CompTIA Security+</li>
              <li>• CISSP</li>
              <li>• CEH</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-neutral-700 mb-2">Project Management</h5>
            <ul className="text-neutral-600 space-y-1">
              <li>• PMP</li>
              <li>• Scrum Master</li>
              <li>• ITIL</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-neutral-700 mb-2">Data & Analytics</h5>
            <ul className="text-neutral-600 space-y-1">
              <li>• Google Analytics</li>
              <li>• Tableau</li>
              <li>• Power BI</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></div>
            Optional Step - Certifications
          </span>
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
            {certifications.length} certification{certifications.length !== 1 ? 's' : ''} added
          </span>
        </div>
      </div>
    </div>
  );
}

// Demo wrapper
function Demo() {
  const mockCertifications = [
    {
      title: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services (AWS)",
      date: "2023-08"
    },
    {
      title: "Google Cloud Professional Cloud Architect",
      issuer: "Google Cloud",
      date: "2023-05"
    },
    {
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      date: "2023-03"
    }
  ];

  const mockDispatch = (action) => {
    console.log('Dispatched:', action);
  };

  React.useEffect(() => {
    window.mockUseSelector = () => ({ certifications: { certifications: mockCertifications } });
    window.mockUseDispatch = () => mockDispatch;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <CertificationStep />
      </div>
    </div>
  );
}