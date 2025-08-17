import { useSelector, useDispatch } from "react-redux";
import { addEducation } from "../../store/resumeSlice";
import { useState } from "react";

export default function EducationStep() {
  const educations = useSelector((state) => state.resume.education.educations);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    school: "",
    degree: "",
    start_date: "",
    end_date: "",
    address: ""
  });

  const handleAdd = () => {
    dispatch(addEducation(form));
    setForm({ school: "", degree: "", start_date: "", end_date: "", address: "" });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Education</h2>
      <input type="text" placeholder="School" value={form.school}
        onChange={(e) => setForm({ ...form, school: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input type="text" placeholder="Degree" value={form.degree}
        onChange={(e) => setForm({ ...form, degree: e.target.value })}
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
      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Education
      </button>

      <ul className="mt-4">
        {educations.map((edu, i) => (
          <li key={i} className="border p-2 rounded my-1">
            {edu.degree} at {edu.school} ({edu.start_date} - {edu.end_date})
          </li>
        ))}
      </ul>
    </div>
  );
}
