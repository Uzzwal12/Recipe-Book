export default function RecipeCard({ recipe, children }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4 items-start">
      <img
        src={
          recipe.imageUrl
            ? `http://localhost:3000${recipe.imageUrl}`
            : "https://via.placeholder.com/150"
        }
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-md"
      />

      <div className="flex-1 flex flex-col justify-between w-full">
        <div>
          <h3 className="text-xl font-semibold">{recipe.title}</h3>
          <p className="text-gray-600 text-sm mb-2">
            Cooking Time: {recipe.cookingTime}
          </p>
        </div>

        {children && (
          <div className="mt-4 flex gap-3 justify-end">{children}</div>
        )}
      </div>
    </div>
  );
}
