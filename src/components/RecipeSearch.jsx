import { Search } from 'lucide-react';
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
    // When category changes, the debounced search effect will automatically update the search query
    // setSearchQuery(''); // No need to clear search, debounced effect handles it
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // The debounced effect will handle setSearchQuery(currentSearch)
    // If user explicitly submits, we might want to immediately set it without debounce
    // But for simplicity, we let the effect handle it.
    // If category is selected, clear it on explicit search
    if (currentCategory) {
      setCurrentCategory('');
      setCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-search-form">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={currentSearch}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <Search size={18} />
          <span>Search</span>
        </button>
      </div>

      <select
        value={currentCategory}
        onChange={handleCategoryChange}
        className="category-select"
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
