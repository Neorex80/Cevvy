import React, { useState } from 'react';
import { Award, Building, Calendar, X, Edit2, Trash2, Plus } from 'lucide-react';

export default function CertificationStep() {
  const [certifications, setCertifications] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    dateEarned: '',
    issuingOrganization: '',
    expirationDate: '',
    credentialId: '',
    credentialUrl: ''
  });
  const [editingIndex, setEditingIndex] = useState(-1);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const InputField = ({ 
    label, 
    type = "text", 
    placeholder, 
    icon: Icon,
    required = true,
    name,
    value
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
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 p-3 rounded-lg transition-all duration-200 
                 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400
                 hover:border-gray-400 bg-white shadow-sm
                 placeholder:text-gray-400 text-neutral-800"
      />
    </div>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSuggestionClick = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    return formData.title.trim() && formData.issuingOrganization.trim();
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const certificationData = {
      ...formData,
      id: Date.now(), // Simple ID generation
      dateAdded: new Date().toISOString()
    };

    if (editingIndex >= 0) {
      // Update existing certification
      const updatedCertifications = [...certifications];
      updatedCertifications[editingIndex] = certificationData;
      setCertifications(updatedCertifications);
      setEditingIndex(-1);
    } else {
      // Add new certification
      setCertifications(prev => [...prev, certificationData]);
    }

    // Reset form
    setFormData({
      title: '',
      dateEarned: '',
      issuingOrganization: '',
      expirationDate: '',
      credentialId: '',
      credentialUrl: ''
    });
    setShowAdvanced(false);
  };

  const handleEdit = (index) => {
    const cert = certifications[index];
    setFormData({
      title: cert.title,
      dateEarned: cert.dateEarned,
      issuingOrganization: cert.issuingOrganization,
      expirationDate: cert.expirationDate || '',
      credentialId: cert.credentialId || '',
      credentialUrl: cert.credentialUrl || ''
    });
    setEditingIndex(index);
    setShowAdvanced(!!(cert.expirationDate || cert.credentialId || cert.credentialUrl));
  };

  const handleDelete = (index) => {
    setCertifications(prev => prev.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      dateEarned: '',
      issuingOrganization: '',
      expirationDate: '',
      credentialId: '',
      credentialUrl: ''
    });
    setEditingIndex(-1);
    setShowAdvanced(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01'); // Add day for month input
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

      {/* Add/Edit Certification Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
          <Award className="w-5 h-5 text-neutral-600" />
          {editingIndex >= 0 ? 'Edit Certification' : 'Add New Certification'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <InputField
              label="Certification Title"
              name="title"
              value={formData.title}
              placeholder="AWS Certified Solutions Architect"
              icon={Award}
            />
            {/* Certification suggestions */}
            <div className="mt-2">
              <p className="text-xs text-neutral-500 mb-2">Popular certifications:</p>
              <div className="flex flex-wrap gap-1">
                {popularCertifications.slice(0, 4).map((cert, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick('title', cert)}
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
            name="dateEarned"
            value={formData.dateEarned}
            type="month"
            placeholder="Date Earned"
            icon={Calendar}
          />
        </div>

        <div className="mt-6">
          <InputField
            label="Issuing Organization"
            name="issuingOrganization"
            value={formData.issuingOrganization}
            placeholder="Amazon Web Services (AWS)"
            icon={Building}
          />
          {/* Issuer suggestions */}
          <div className="mt-2">
            <p className="text-xs text-neutral-500 mb-2">Popular issuers:</p>
            <div className="flex flex-wrap gap-1">
              {popularIssuers.slice(0, 6).map((issuer, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick('issuingOrganization', issuer)}
                  className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-neutral-600 rounded-full transition-colors duration-200"
                >
                  {issuer}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Fields Toggle */}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-800 transition-colors"
          >
            <Plus className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-45' : ''}`} />
            {showAdvanced ? 'Hide' : 'Show'} additional fields
          </button>
        </div>

        {/* Advanced Fields */}
        {showAdvanced && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Expiration Date"
                name="expirationDate"
                value={formData.expirationDate}
                type="month"
                placeholder="Expiration Date (if applicable)"
                icon={Calendar}
                required={false}
              />
              <InputField
                label="Credential ID"
                name="credentialId"
                value={formData.credentialId}
                placeholder="Certificate number or ID"
                required={false}
              />
            </div>
            <div className="mt-6">
              <InputField
                label="Credential URL"
                name="credentialUrl"
                value={formData.credentialUrl}
                type="url"
                placeholder="https://www.example.com/verify/certificate"
                required={false}
              />
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            disabled={!validateForm()}
            className="bg-neutral-800 text-white px-6 py-2 rounded-lg hover:bg-neutral-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            {editingIndex >= 0 ? 'Update Certification' : 'Add Certification'}
          </button>
          {editingIndex >= 0 && (
            <button
              onClick={handleCancel}
              className="border border-gray-300 text-neutral-600 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Certifications List */}
      {certifications.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
            <Award className="w-5 h-5 text-neutral-600" />
            Your Certifications ({certifications.length})
          </h3>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={cert.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-neutral-800 text-lg mb-1">{cert.title}</h4>
                    <p className="text-neutral-600 mb-2 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      {cert.issuingOrganization}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                      {cert.dateEarned && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Earned: {formatDate(cert.dateEarned)}
                        </span>
                      )}
                      {cert.expirationDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Expires: {formatDate(cert.expirationDate)}
                        </span>
                      )}
                      {cert.credentialId && (
                        <span>ID: {cert.credentialId}</span>
                      )}
                    </div>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit certification"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete certification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-700 mb-2">Add your certifications</h3>
          <p className="text-neutral-500 mb-6">Fill out the form above to add your certifications.</p>
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
              <li>• Kubernetes</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-neutral-700 mb-2">Security</h5>
            <ul className="text-neutral-600 space-y-1">
              <li>• CompTIA Security+</li>
              <li>• CISSP</li>
              <li>• CEH</li>
              <li>• CISM</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-neutral-700 mb-2">Project Management</h5>
            <ul className="text-neutral-600 space-y-1">
              <li>• PMP</li>
              <li>• Scrum Master</li>
              <li>• PRINCE2</li>
              <li>• Agile</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-neutral-700 mb-2">Development</h5>
            <ul className="text-neutral-600 space-y-1">
              <li>• Oracle Java</li>
              <li>• MongoDB</li>
              <li>• Salesforce</li>
              <li>• Adobe Certified</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}