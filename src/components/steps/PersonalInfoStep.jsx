import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updatePersonal } from "../../store/resumeSlice";
import { User, Phone, Mail, Globe, Github, Linkedin, MapPin } from 'lucide-react';

export default function PersonalInfoStep() {
  const personal = useSelector((state) => state.resume.personal);
  const dispatch = useDispatch();
  
  // ✅ Use local state for immediate typing response
  const [localPersonal, setLocalPersonal] = React.useState(personal);

  // ✅ Update local state when Redux state changes (but not during typing)
  React.useEffect(() => {
    setLocalPersonal(personal);
  }, [personal]);

  // ✅ Handle typing - update local state immediately
  const handleChange = (field, value) => {
    setLocalPersonal(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ✅ Handle blur - update Redux when user finishes typing
  const handleBlur = (field, value) => {
    dispatch(updatePersonal({ [field]: value }));
  };

  const InputField = ({ 
    label, 
    type = "text", 
    placeholder, 
    value, 
    field, 
    icon: Icon,
    required = true,
  }) => (
    <div className="group">
      <label
        className="block text-sm font-semibold text-neutral-800 mb-2 transition-colors duration-200 group-focus-within:text-neutral-900"
        htmlFor={field}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-neutral-600" />}
          {label}
          {required && <span className="text-red-500 text-xs">*</span>}
        </div>
      </label>
      <div className="relative">
        <input
          id={field}
          type={type}
          placeholder={placeholder}
          value={value || ''} 
          required={required}
          onChange={(e) => handleChange(field, e.target.value)}
          onBlur={(e) => handleBlur(field, e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg transition-all duration-200 
                   focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400
                   hover:border-gray-400 bg-white shadow-sm
                   placeholder:text-gray-400 text-neutral-800"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 shadow-sm">
          <User className="w-8 h-8 text-neutral-700" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Personal Information</h1>
        <p className="text-neutral-700 text-lg">
          Let's start with some basic information to build your professional profile.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Form Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Basic Information Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
              <User className="w-5 h-5 text-neutral-600" />
              Basic Details
            </h3>
          </div>

          <InputField
            label="Full Name"
            placeholder="John Doe"
            value={localPersonal.fullname}
            field="fullname"
            icon={User}
          />

          <InputField
            label="Phone Number"
            type="tel"
            placeholder="(123) 456-7890"
            value={localPersonal.phone}
            field="phone"
            icon={Phone}
          />

          <InputField
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={localPersonal.email}
            field="email"
            icon={Mail}
          />

          <InputField
            label="Website"
            placeholder="https://yourwebsite.com"
            value={localPersonal.website}
            field="website"
            icon={Globe}
            required={false}
          />

          {/* Social Media Section */}
          <div className="md:col-span-2 mt-8">
            <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
              <Globe className="w-5 h-5 text-neutral-600" />
              Professional Links
            </h3>
          </div>

          <InputField
            label="LinkedIn Profile Name"
            placeholder="John Doe"
            value={localPersonal.linkedin_name}
            field="linkedin_name"
            icon={Linkedin}
            required={false}
          />

          <InputField
            label="LinkedIn Profile URL"
            placeholder="https://linkedin.com/in/yourprofile"
            value={localPersonal.linkedin_url}
            field="linkedin_url"
            icon={Linkedin}
            required={false}
          />

          <InputField
            label="GitHub Username"
            placeholder="johndoe"
            value={localPersonal.github_name}
            field="github_name"
            icon={Github}
            required={false}
          />

          <InputField
            label="GitHub Profile URL"
            placeholder="https://github.com/yourprofile"
            value={localPersonal.github_url}
            field="github_url"
            icon={Github}
            required={false}
          />

          {/* Location Section */}
          <div className="md:col-span-2 mt-8">
            <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
              <MapPin className="w-5 h-5 text-neutral-600" />
              Location
            </h3>
          </div>

          <div className="md:col-span-2">
            <InputField
              label="Address"
              placeholder="123 Main St, Anytown, USA"
              value={localPersonal.address}
              field="address"
              icon={MapPin}
              required={false}
            />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></div>
              Step 1 of 6 - Personal Information
            </span>
            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
              Required fields marked with *
            </span>
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-600 max-w-2xl mx-auto">
          This information will be used to create your professional resume header. 
          Make sure all details are accurate and up-to-date for the best results.
        </p>
      </div>
    </div>
  );
}