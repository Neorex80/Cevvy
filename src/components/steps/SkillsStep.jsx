import { useState } from "react";

export default function SkillsStep({ data, onChange }) {
  const [skills, setSkills] = useState(data || []);

  const handleAdd = () => {
    const newSkills = [...skills, ""];
    setSkills(newSkills);
    onChange(newSkills);
  };

  const handleChange = (index, value) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
    onChange(updated);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Skills</h2>
      {skills.map((skill, i) => (
        <input
          key={i}
          type="text"
          placeholder="Skill"
          value={skill}
          onChange={(e) => handleChange(i, e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />
      ))}
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Skill
      </button>
    </div>
  );
}
