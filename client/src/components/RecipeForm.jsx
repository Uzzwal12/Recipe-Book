import { useEffect, useState } from "react";
export default function RecipeForm({ onSubmit, submitText, initialData }) {
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      if (initialData.imageUrl) {
        setExistingImageUrl(`http://localhost:3000${initialData.imageUrl}`);
      }
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setExistingImageUrl(""); // remove preview if user selects new image
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("ingredients", form.ingredients);
    formData.append("instructions", form.instructions);
    formData.append("cookingTime", form.cookingTime);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md"
      />
      <textarea
        name="ingredients"
        placeholder="Ingredients (comma separated)"
        value={form.ingredients}
        onChange={handleChange}
        required
        rows="3"
        className="w-full px-4 py-2 border rounded-md"
      />
      <textarea
        name="instructions"
        placeholder="Instructions"
        value={form.instructions}
        onChange={handleChange}
        required
        rows="4"
        className="w-full px-4 py-2 border rounded-md"
      />
      <input
        type="text"
        name="cookingTime"
        placeholder="Cooking Time (e.g., 30 minutes)"
        value={form.cookingTime}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md"
      />

      {existingImageUrl && (
        <img
          src={existingImageUrl}
          alt="Current"
          className="w-32 h-32 object-cover rounded-md border"
        />
      )}

      <input type="file" onChange={handleImageChange} />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        {submitText}
      </button>
    </form>
  );
}
