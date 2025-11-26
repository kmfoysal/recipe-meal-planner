import React, { useState } from 'react';
import { useCategories } from '../hooks/useCategories';

const RecipeSearch = ({ setSearchQuery, setCategory }) => {
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');

  const categories = useCategories(); // Fetch categories using the new hook

  const handleSearchChange = (e) => {
    setCurrentSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.value);
    setCategory(e.target.value); // Update parent's category state immediately
    setSearchQuery(''); // Clear search when category is selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(currentSearch); // Update parent's search query state
    setCategory(''); // Clear category when searching
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-search-form">
      <input
        type="text"
        placeholder="Search for recipes..."
        value={currentSearch}
        onChange={handleSearchChange}
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>

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
