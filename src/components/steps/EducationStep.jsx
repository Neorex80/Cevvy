import { useState } from "react";

export default function EducationStep({ data, onChange }) {
  const [education, setEducation] = useState(data || []);

  const handleAdd = () => {
    const newEdu = [...education, { degree: "", institution: "", year: "" }];
    setEducation(newEdu);
    onChange(newEdu);
  };

  const handleChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
    onChange(updated);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Education</h2>
      {education.map((edu, i) => (
        <div key={i} className="space-y-2 border-b pb-3">
          <input
            type="text"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => handleChange(i, "degree", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) => handleChange(i, "institution", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Year"
            value={edu.year}
            onChange={(e) => handleChange(i, "year", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Education
      </button>
    </div>
  );
}
