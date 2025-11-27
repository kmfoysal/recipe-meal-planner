import RecipeCardSkeleton from './RecipeCardSkeleton';

const RecipeGridSkeleton = ({ count = 12 }) => {
  return (
    <div className="recipe-grid">
      {Array.from({ length: count }).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default RecipeGridSkeleton;
