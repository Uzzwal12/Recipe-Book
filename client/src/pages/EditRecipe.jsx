import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import RecipeForm from "../components/RecipeForm";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const { title, ingredients, instructions, cookingTime } = res.data;
        setInitialData({
          title,
          ingredients: ingredients.join(", "),
          instructions,
          cookingTime,
        });
        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch recipe");
        navigate("/my-recipes");
      }
    };

    fetchRecipe();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await axios.put(`http://localhost:3000/api/recipes/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Recipe updated successfully!");
      navigate("/my-recipes");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update recipe");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Recipe</h2>
      <RecipeForm
        onSubmit={handleUpdate}
        submitText="Update Recipe"
        initialData={initialData}
      />
    </div>
  );
}
