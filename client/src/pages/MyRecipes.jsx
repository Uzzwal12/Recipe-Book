import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchMyRecipes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/api/users/my-recipes",
        {
          params: { page, limit: 6 },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("res", res);
      setRecipes(res.data.recipes);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch my recipes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRecipes();
  }, [page]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:3000/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // ✅ Remove the deleted recipe from state
      setRecipes((prev) => prev.filter((r) => r._id !== id));
      toast.success("Recipe deleted");
    } catch (err) {
      toast.error("Failed to delete recipe");
    }
  };

  return (
    <div className="px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">My Recipes</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : recipes?.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't added any recipes yet.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard recipe={recipe}>
                <Link
                  to={`/edit-recipe/${recipe._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
                >
                  Delete
                </button>
              </RecipeCard>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8 items-center">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
