import React from 'react';
import { ShoppingBag, Menu } from 'lucide-react';

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="app-header">
      <div className="header-logo">
        <h1>Meal Planner</h1>
      </div>
      <div className="header-actions">
        <button onClick={onToggleSidebar} className="sidebar-toggle-button">
          <ShoppingBag size={24} />
          <span>Shopping List</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
