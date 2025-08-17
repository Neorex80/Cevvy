import { useSelector, useDispatch } from "react-redux";
import { addCertification } from "../../store/resumeSlice";
import { useState } from "react";

export default function CertificationStep() {
  const certifications = useSelector((state) => state.resume.certifications.certifications || []);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    issuer: "",
    date: ""
  });

  const handleAdd = () => {
    dispatch(addCertification(form));
    setForm({ title: "", issuer: "", date: "" });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Certifications</h2>
      <input type="text" placeholder="Certification Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input type="text" placeholder="Issuer"
        value={form.issuer}
        onChange={(e) => setForm({ ...form, issuer: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input type="month" placeholder="Date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Certification
      </button>

      <ul className="mt-4">
        {certifications.map((cert, i) => (
          <li key={i} className="border p-2 rounded my-1">
            {cert.title} ({cert.issuer}, {cert.date})
          </li>
        ))}
      </ul>
    </div>
  );
}
