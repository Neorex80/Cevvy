import { useSelector, useDispatch } from "react-redux";
import { addProject } from "../../store/resumeSlice";
import { useState } from "react";

export default function ProjectStep() {
  const projects = useSelector((state) => state.resume.projects.projects);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    tech_stack: "",
    start_date: "",
    end_date: "",
    project_des: { lines: [""] }
  });

  const handleAdd = () => {
    dispatch(addProject(form));
    setForm({ name: "", tech_stack: "", start_date: "", end_date: "", project_des: { lines: [""] } });
  };

  const handleLineChange = (index, value) => {
    const newLines = [...form.project_des.lines];
    newLines[index] = value;
    setForm({ ...form, project_des: { lines: newLines } });
  };

  const addLine = () => {
    setForm({ ...form, project_des: { lines: [...form.project_des.lines, ""] } });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Projects</h2>
      <input type="text" placeholder="Project Name" value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input type="text" placeholder="Tech Stack (comma-separated)" value={form.tech_stack}
        onChange={(e) => setForm({ ...form, tech_stack: e.target.value })}
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

      <h3 className="font-semibold">Project Description</h3>
      {form.project_des.lines.map((line, i) => (
        <input key={i} type="text" placeholder="Feature / Achievement"
          value={line}
          onChange={(e) => handleLineChange(i, e.target.value)}
          className="w-full border p-2 rounded my-1"
        />
      ))}
      <button onClick={addLine} className="bg-gray-300 px-3 py-1 rounded">+ Add Line</button>

      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Project
      </button>

      <ul className="mt-4">
        {projects.map((proj, i) => (
          <li key={i} className="border p-2 rounded my-1">
            {proj.name} ({proj.start_date} - {proj.end_date})
          </li>
        ))}
      </ul>
    </div>
  );
}
