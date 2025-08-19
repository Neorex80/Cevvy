import React from 'react';
import { Zap, Tag, Star } from 'lucide-react';

export default function SkillsStep() {
  const skillCategoryExamples = [
    "Programming Languages",
    "Frameworks & Libraries",
    "Databases",
    "Tools & Technologies",
    "Soft Skills",
    "Languages"
  ];

  const InputField = ({ 
    label, 
    placeholder, 
    icon: Icon,
    required = true,
    suggestions = []
  }) => (
    <div className="group">
      <label className="block text-sm font-semibold text-neutral-800 mb-2 transition-colors duration-200 group-focus-within:text-neutral-900">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-neutral-600" />}
          {label}
          {required && <span className="text-red-500 text-xs">*</span>}
        </div>
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full border border-gray-300 p-3 rounded-lg transition-all duration-200 
                   focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400
                   hover:border-gray-400 bg-white shadow-sm
                   placeholder:text-gray-400 text-neutral-800"
        />
        {suggestions.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-neutral-500 mb-1">Suggestions:</p>
            <div className="flex flex-wrap gap-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-neutral-600 rounded-full transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 shadow-sm">
          <Zap className="w-8 h-8 text-neutral-700" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Skills & Expertise</h1>
        <p className="text-neutral-700 text-lg">
          Organize your skills into categories to showcase your expertise.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Add Skills Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
          <Tag className="w-5 h-5 text-neutral-600" />
          Add Skill Category
        </h3>

        <div className="space-y-6">
          {/* Category Name */}
          <InputField
            label="Category Name"
            placeholder="e.g., Programming Languages"
            icon={Tag}
            suggestions={skillCategoryExamples}
          />

          {/* Skills in Category */}
          <div>
            <h4 className="text-md font-semibold text-neutral-800 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-neutral-600" />
              Skills in this Category
            </h4>
            
            <div className="space-y-3">
              <input
                type="text"
                placeholder="e.g., JavaScript"
                className="w-full border border-gray-300 p-3 rounded-lg transition-all duration-200 
                         focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400
                         hover:border-gray-400 bg-white shadow-sm
                         placeholder:text-gray-400 text-neutral-800"
              />
              <input
                type="text"
                placeholder="Add another skill..."
                className="w-full border border-gray-300 p-3 rounded-lg transition-all duration-200 
                         focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400
                         hover:border-gray-400 bg-white shadow-sm
                         placeholder:text-gray-400 text-neutral-800"
              />
              <input
                type="text"
                placeholder="Add another skill..."
                className="w-full border border-gray-300 p-3 rounded-lg transition-all duration-200 
                         focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400
                         hover:border-gray-400 bg-white shadow-sm
                         placeholder:text-gray-400 text-neutral-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-neutral-700 mb-2">Add your skills</h3>
        <p className="text-neutral-500 mb-6">Create your first skill category using the form above.</p>
        <div className="text-sm text-neutral-400">
          <p>Popular categories: Programming Languages, Frameworks, Tools, Soft Skills</p>
        </div>
      </div>

      {/* Skills Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <Star className="w-4 h-4" />
          Pro Tips for Skills
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Group similar skills together (e.g., "Frontend Technologies", "Backend Technologies")</li>
          <li>• List skills from most to least proficient within each category</li>
          <li>• Include both technical and soft skills relevant to your target role</li>
          <li>• Be specific (e.g., "React.js" instead of just "JavaScript Framework")</li>
        </ul>
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></div>
            Step 4 of 6 - Skills & Expertise
          </span>
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-600 max-w-2xl mx-auto">
          Your skills are a crucial part of your resume. Make sure to include relevant skills that match your target positions.
        </p>
      </div>
    </div>
  );
}