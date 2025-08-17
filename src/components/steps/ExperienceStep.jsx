import { useState } from "react";

export default function ExperienceStep({ data, onChange }) {
  const [experience, setExperience] = useState(data || []);

  const handleAdd = () => {
    const newExp = [...experience, { role: "", company: "", years: "" }];
    setExperience(newExp);
    onChange(newExp);
  };

  const handleChange = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
    onChange(updated);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Experience</h2>
      {experience.map((exp, i) => (
        <div key={i} className="space-y-2 border-b pb-3">
          <input
            type="text"
            placeholder="Role"
            value={exp.role}
            onChange={(e) => handleChange(i, "role", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => handleChange(i, "company", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Years"
            value={exp.years}
            onChange={(e) => handleChange(i, "years", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Experience
      </button>
    </div>
  );
}
