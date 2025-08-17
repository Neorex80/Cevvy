import { useSelector, useDispatch } from "react-redux";
import { updatePersonal } from "../../store/resumeSlice";

export default function PersonalInfoStep() {
  const personal = useSelector((state) => state.resume.personal);
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    dispatch(updatePersonal({ [field]: value }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Personal Information</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={personal.fullname}
        onChange={(e) => handleChange("fullname", e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={personal.number}
        onChange={(e) => handleChange("number", e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={personal.email}
        onChange={(e) => handleChange("email", e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="url"
        placeholder="Portfolio Website"
        value={personal.web_url}
        onChange={(e) => handleChange("web_url", e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="LinkedIn Username"
        value={personal.linkedin_name}
        onChange={(e) => handleChange("linkedin_name", e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="url"
        placeholder="LinkedIn URL"
        value={personal.linkedin_url}
        onChange={(e) => handleChange("linkedin_url", e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="GitHub Username"
        value={personal.github_name}
        onChange={(e) => handleChange("github_name", e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="url"
        placeholder="GitHub URL"
        value={personal.github_url}
        onChange={(e) => handleChange("github_url", e.target.value)}
        className="w-full border p-2 rounded"
      />
    </div>
  );
}
