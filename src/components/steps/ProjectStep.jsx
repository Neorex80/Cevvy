import React from 'react';
import { FolderOpen, Code, Calendar, List } from 'lucide-react';

export default function ProjectStep() {
  const InputField = ({ 
    label, 
    type = "text", 
    placeholder, 
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
        className="w-full border border-gray-300 p-3 rounded-lg transition-all duration-200 
                 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400
                 hover:border-gray-400 bg-white shadow-sm
                 placeholder:text-gray-400 text-neutral-800"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 shadow-sm">
          <FolderOpen className="w-8 h-8 text-neutral-700" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Projects</h1>
        <p className="text-neutral-700 text-lg">
          Showcase your personal and professional projects.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Add Project Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
          <FolderOpen className="w-5 h-5 text-neutral-600" />
          Add New Project
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Project Name"
            placeholder="E-commerce Website"
            icon={FolderOpen}
          />

          <InputField
            label="Tech Stack"
            placeholder="React, Node.js, MongoDB, Express"
            icon={Code}
          />

          <InputField
            label="Start Date"
            type="month"
            placeholder="Start Date"
            icon={Calendar}
          />

          <InputField
            label="End Date"
            type="month"
            placeholder="End Date"
            icon={Calendar}
          />
        </div>

        {/* Project Description Section */}
        <div className="mt-8">
          <h4 className="text-md font-semibold text-neutral-800 mb-4 flex items-center gap-2">
            <List className="w-4 h-4 text-neutral-600" />
            Project Description & Key Features
          </h4>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="• Built a responsive user interface with React..."
              className="w-full border border-gray-300 p-3 rounded-lg transition-all duration-200 
                       focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400
                       hover:border-gray-400 bg-white shadow-sm
                       placeholder:text-gray-400 text-neutral-800"
            />
            <input
              type="text"
              placeholder="• Add another feature or achievement..."
              className="w-full border border-gray-300 p-3 rounded-lg transition-all duration-200 
                       focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400
                       hover:border-gray-400 bg-white shadow-sm
                       placeholder:text-gray-400 text-neutral-800"
            />
            <input
              type="text"
              placeholder="• Add another feature or achievement..."
              className="w-full border border-gray-300 p-3 rounded-lg transition-all duration-200 
                       focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400
                       hover:border-gray-400 bg-white shadow-sm
                       placeholder:text-gray-400 text-neutral-800"
            />
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FolderOpen className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-neutral-700 mb-2">Add your projects</h3>
        <p className="text-neutral-500 mb-6">Fill out the form above to add your projects.</p>
        <div className="text-sm text-neutral-400">
          <p>Include personal projects, school assignments, or professional work</p>
        </div>
      </div>

      {/* Project Tips */}
      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
          <FolderOpen className="w-4 h-4" />
          Pro Tips for Projects
        </h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Include a mix of personal, academic, and professional projects</li>
          <li>• Focus on projects that demonstrate skills relevant to your target role</li>
          <li>• Highlight specific technologies, frameworks, and tools used</li>
          <li>• Quantify achievements when possible (e.g., "Reduced load time by 40%")</li>
          <li>• Include links to live demos or GitHub repositories if available</li>
        </ul>
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></div>
            Step 5 of 6 - Projects
          </span>
        </div>
      </div>
    </div>
  );
}