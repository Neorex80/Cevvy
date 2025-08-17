import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addSkillCategory } from "../../store/resumeSlice";
import { Zap, Tag, Plus, Trash2, Edit3, X, Star } from 'lucide-react';

export default function SkillsStep() {
  const categories = useSelector((state) => state.resume.skills.categories);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    category_name: "",
    items: [""]
  });

  const handleFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleItemChange = (index, value) => {
    const newItems = [...form.items];
    newItems[index] = value;
    setForm({ ...form, items: newItems });
  };

  const addItem = () => {
    setForm({ ...form, items: [...form.items, ""] });
  };

  const removeItem = (index) => {
    if (form.items.length > 1) {
      const newItems = form.items.filter((_, i) => i !== index);
      setForm({ ...form, items: newItems });
    }
  };

  const handleAdd = () => {
    if (form.category_name && form.items.some(item => item.trim() !== "")) {
      // Filter out empty skills before adding
      const filteredItems = form.items.filter(item => item.trim() !== "");
      const categoryToAdd = {
        ...form,
        items: filteredItems
      };
      dispatch(addSkillCategory(categoryToAdd));
      setForm({ category_name: "", items: [""] });
    }
  };

  const isFormValid = form.category_name && form.items.some(item => item.trim() !== "");

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
    value, 
    field, 
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
          value={value}
          onChange={(e) => handleFormChange(field, e.target.value)}
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
                  onClick={() => handleFormChange(field, suggestion)}
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
          <Plus className="w-5 h-5 text-neutral-600" />
          Add New Skill Category
        </h3>

        <div className="space-y-6">
          {/* Category Name */}
          <InputField
            label="Category Name"
            placeholder="e.g., Programming Languages"
            value={form.category_name}
            field="category_name"
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
              {form.items.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={`${index === 0 ? 'e.g., JavaScript' : 'Add another skill...'}`}
                      value={item}
                      onChange={(e) => handleItemChange(index, e.target.value)}
                      className="w-full border border-gray-300 p-3 rounded-lg transition-all duration-200 
                               focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400
                               hover:border-gray-400 bg-white shadow-sm
                               placeholder:text-gray-400 text-neutral-800"
                    />
                  </div>
                  {form.items.length > 1 && (
                    <button
                      onClick={() => removeItem(index)}
                      className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={addItem}
              className="mt-3 flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 hover:text-neutral-800 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Another Skill
            </button>
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
            Add Category
          </button>
        </div>
      </div>

      {/* Skills Categories List */}
      {categories.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
            <Zap className="w-5 h-5 text-neutral-600" />
            Your Skill Categories ({categories.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="group bg-gray-50 border border-gray-200 rounded-lg p-6 transition-all duration-200 hover:shadow-md hover:border-gray-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Tag className="w-4 h-4 text-neutral-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-neutral-900">
                        {category.category_name}
                      </h4>
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

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.items
                    .filter(item => item && item.trim() !== "")
                    .map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 text-neutral-700 text-sm rounded-full shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <Star className="w-3 h-3 text-neutral-500" />
                        {skill}
                      </span>
                    ))
                  }
                </div>

                {/* Skill count */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="text-xs text-neutral-500">
                    {category.items.filter(item => item && item.trim() !== "").length} skill{category.items.filter(item => item && item.trim() !== "").length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-700 mb-2">No skills added yet</h3>
          <p className="text-neutral-500 mb-6">Create your first skill category using the form above.</p>
          <div className="text-sm text-neutral-400">
            <p>Popular categories: Programming Languages, Frameworks, Tools, Soft Skills</p>
          </div>
        </div>
      )}

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
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
            {categories.length} categor{categories.length !== 1 ? 'ies' : 'y'} • {categories.reduce((total, cat) => total + cat.items.filter(item => item && item.trim() !== "").length, 0)} total skills
          </span>
        </div>
      </div>
    </div>
  );
}

// Demo wrapper
function Demo() {
  const mockCategories = [
    {
      category_name: "Programming Languages",
      items: ["JavaScript", "Python", "Java", "TypeScript", "C++"]
    },
    {
      category_name: "Frontend Technologies",
      items: ["React", "Vue.js", "HTML5", "CSS3", "Tailwind CSS"]
    },
    {
      category_name: "Backend Technologies",
      items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs"]
    }
  ];

  const mockDispatch = (action) => {
    console.log('Dispatched:', action);
  };

  React.useEffect(() => {
    window.mockUseSelector = () => ({ skills: { categories: mockCategories } });
    window.mockUseDispatch = () => mockDispatch;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <SkillsStep />
      </div>
    </div>
  );
}