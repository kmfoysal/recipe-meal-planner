import { Search } from 'lucide-react'; // Still useful for the icon, or can remove if no icon is desired
import { useEffect, useState } from 'react';
import { useCategories } from '../hooks/useCategories';

const RecipeSearch = ({ setSearchQuery, setCategory }) => {
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');

  const categories = useCategories(); // Fetch categories using the new hook

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(currentSearch);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [currentSearch, setSearchQuery]); // Dependency array includes currentSearch and setSearchQuery

  const handleSearchChange = (e) => {
    setCurrentSearch(e.target.value);
    // When typing in search, clear category filter
    if (currentCategory) {
      setCurrentCategory('');
      setCategory('');
    }
  };

  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.value);
    setCategory(e.target.value); // Update parent's category state immediately
    // Debounced search effect will automatically update the search query with currentSearch
  };

  // No handleSubmit needed as there's no explicit submit button

  return (
    <form className="recipe-search-form"> {/* Removed onSubmit */}
      <div className="search-input-wrapper">
        <label htmlFor="recipe-search-input" className="sr-only">Search for recipes</label>
        <input
          id="recipe-search-input"
          type="text"
          placeholder="Search for recipes..."
          value={currentSearch}
          onChange={handleSearchChange}
          className="search-input"
          aria-label="Search for recipes"
        />
      </div>

      <label htmlFor="category-select" className="sr-only">Filter by category</label>
      <select
        id="category-select"
        value={currentCategory}
        onChange={handleCategoryChange}
        className="category-select"
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.strCategory} value={cat.strCategory}>
            {cat.strCategory}
          </option>
        ))}
      </select>
    </form>
  );
};

export default RecipeSearch;
