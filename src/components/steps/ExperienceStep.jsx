import { useSelector, useDispatch } from "react-redux";
import { addExperience } from "../../store/resumeSlice";
import { useState } from "react";

export default function ExperienceStep() {
  const experiences = useSelector((state) => state.resume.experience.experiences);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    position: "",
    company_name: "",
    start_date: "",
    end_date: "",
    address: "",
    job_des: { lines: [""] }
  });

  const handleAdd = () => {
    dispatch(addExperience(form));
    setForm({ position: "", company_name: "", start_date: "", end_date: "", address: "", job_des: { lines: [""] } });
  };

  const handleLineChange = (index, value) => {
    const newLines = [...form.job_des.lines];
    newLines[index] = value;
    setForm({ ...form, job_des: { lines: newLines } });
  };

  const addLine = () => {
    setForm({ ...form, job_des: { lines: [...form.job_des.lines, ""] } });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Experience</h2>
      <input type="text" placeholder="Position" value={form.position}
        onChange={(e) => setForm({ ...form, position: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input type="text" placeholder="Company" value={form.company_name}
        onChange={(e) => setForm({ ...form, company_name: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input type="month" placeholder="Start Date" value={form.start_date}
        onChange={(e) => setForm({ ...form, start_date: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input type="month" placeholder="End Date" value={form.end_date}
        onChange={(e) => setForm({ ...form, end_date: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input type="text" placeholder="Address" value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <h3 className="font-semibold">Job Description</h3>
      {form.job_des.lines.map((line, i) => (
        <input key={i} type="text" placeholder="Responsibility / Achievement"
          value={line}
          onChange={(e) => handleLineChange(i, e.target.value)}
          className="w-full border p-2 rounded my-1"
        />
      ))}
      <button onClick={addLine} className="bg-gray-300 px-3 py-1 rounded">+ Add Line</button>
      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Experience
      </button>

      <ul className="mt-4">
        {experiences.map((exp, i) => (
          <li key={i} className="border p-2 rounded my-1">
            {exp.position} at {exp.company_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
