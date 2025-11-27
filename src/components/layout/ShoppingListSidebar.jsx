import { CheckSquare, ShoppingBag, Square, Trash2, X } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useMealPlan } from '../../hooks/useMealPlan';

const ShoppingListSidebar = ({ isOpen, onClose }) => {
  const { mealPlan } = useMealPlan();
  const [purchasedItems, setPurchasedItems] = useState(new Set());

  // Add effect to handle 'Escape' key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  const shoppingListItems = useMemo(() => {
    const recipesInPlan = Object.values(mealPlan).filter(Boolean);
    const allIngredients = {};
    recipesInPlan.forEach(recipe => {
      if (recipe && recipe.ingredients) {
        recipe.ingredients.forEach(item => {
          if (item.name) {
            const key = item.name.toLowerCase();
            if (!allIngredients[key]) {
              allIngredients[key] = {
                name: item.name,
                measure: item.measure,
              };
            }
          }
        });
      }
    });
    return Object.values(allIngredients);
  }, [mealPlan]);

  const togglePurchased = (name) => {
    setPurchasedItems(prevPurchased => {
      const newPurchased = new Set(prevPurchased);
      if (newPurchased.has(name)) {
        newPurchased.delete(name);
      } else {
        newPurchased.add(name);
      }
      return newPurchased;
    });
  };

  const clearCompleted = () => {
    setPurchasedItems(new Set());
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <div className={`shopping-list-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <ShoppingBag size={28} />
          <h2>Shopping List</h2>
          <button onClick={onClose} className="close-sidebar-button">
            <X size={24} />
          </button>
        </div>
        
        {shoppingListItems.length > 0 ? (
          <>
            <div className="shopping-list-actions">
              <button onClick={clearCompleted} className="clear-completed-button">
                <Trash2 size={16} />
                <span>Clear All</span>
              </button>
            </div>
            <ul className="shopping-list-items">
              {shoppingListItems.map((item) => {
                const isPurchased = purchasedItems.has(item.name);
                return (
                  <li key={item.name} className={`shopping-list-item ${isPurchased ? 'purchased' : ''}`} onClick={() => togglePurchased(item.name)}>
                    <div className="checkbox">
                      {isPurchased ? <CheckSquare size={20} /> : <Square size={20} />}
                    </div>
                    <span className="item-measure">{item.measure}</span>
                    <span className="item-name">{item.name} {isPurchased && "(Purchased)"}</span>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <p className="empty-list-message">Your shopping list is empty. Add some meals to your plan to get started!</p>
        )}
      </div>
    </>
  );
};

export default ShoppingListSidebar;
