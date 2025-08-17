import { useSelector, useDispatch } from "react-redux";
import { addSkillCategory } from "../../store/resumeSlice";
import { useState } from "react";

export default function SkillsStep() {
  const categories = useSelector((state) => state.resume.skills.categories);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    category_name: "",
    items: [""]
  });

  const handleItemChange = (index, value) => {
    const newItems = [...form.items];
    newItems[index] = value;
    setForm({ ...form, items: newItems });
  };

  const addItem = () => {
    setForm({ ...form, items: [...form.items, ""] });
  };

  const handleAdd = () => {
    dispatch(addSkillCategory(form));
    setForm({ category_name: "", items: [""] });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Skills</h2>
      <input type="text" placeholder="Category (e.g. Programming Languages)"
        value={form.category_name}
        onChange={(e) => setForm({ ...form, category_name: e.target.value })}
        className="w-full border p-2 rounded"
      />
      {form.items.map((item, i) => (
        <input key={i} type="text" placeholder="Skill"
          value={item}
          onChange={(e) => handleItemChange(i, e.target.value)}
          className="w-full border p-2 rounded my-1"
        />
      ))}
      <button onClick={addItem} className="bg-gray-300 px-3 py-1 rounded">+ Add Skill</button>
      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Category
      </button>

      <ul className="mt-4">
        {categories.map((cat, i) => (
          <li key={i} className="border p-2 rounded my-1">
            {cat.category_name}: {cat.items.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
