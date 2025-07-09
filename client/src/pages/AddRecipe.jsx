import RecipeForm from "../components/RecipeForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddRecipe() {
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    try {
      await axios.post("http://localhost:3000/api/recipes", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Recipe added successfully!");
      navigate("/my-recipes");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add recipe");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a New Recipe</h2>
      <RecipeForm onSubmit={handleAdd} submitText="Add Recipe" />
    </div>
  );
}
