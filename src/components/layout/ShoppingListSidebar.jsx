import { CheckSquare, ShoppingBag, Square, Trash2, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  useTransition
} from "react";
import { useMealPlan } from "../../hooks/useMealPlan";
import { formatRecipe } from "../../utils/formatRecipe";
import { getRecipeDetailsByIdUncached } from "../../utils/mealdb";
import ErrorMessage from "../ErrorMessage";
import ShoppingListSkeleton from "../ShoppingListSkeleton";

const ShoppingListSidebar = ({ isOpen, onClose }) => {
  const { mealPlan } = useMealPlan();
  const [purchasedItems, setPurchasedItems] = useState(new Set());
  const [shoppingListItems, setShoppingListItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [, startTransition] = useTransition();

  const sidebarRef = useRef(null);

  // Focus management and Escape key handling
  useEffect(() => {
    if (isOpen) {
      if (sidebarRef.current) {
        sidebarRef.current.focus();
      }

      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          onClose();
        }

        if (event.key === "Tab" && sidebarRef.current) {
          const focusableElements = sidebarRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              event.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              event.preventDefault();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Effect to re-generate the list when the sidebar is opened or the meal plan changes
  useEffect(() => {
    const generateShoppingList = async () => {
      const recipesInPlan = Object.values(mealPlan).filter(Boolean);
      if (recipesInPlan.length === 0) {
        setShoppingListItems([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const recipeDetailsPromises = recipesInPlan.map((meal) =>
          getRecipeDetailsByIdUncached(meal.id)
        );
        const recipesData = await Promise.all(recipeDetailsPromises);

        const allIngredients = {};
        recipesData.forEach((recipeResponse) => {
          // Check if meals is an array and has content
          if (Array.isArray(recipeResponse.meals) && recipeResponse.meals.length > 0) {
            const rawRecipe = recipeResponse.meals[0];
            const recipe = formatRecipe(rawRecipe);
            
            if (recipe && recipe.ingredients) {
              recipe.ingredients.forEach((item) => {
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
          } else {
            // Log the invalid response for debugging
            console.warn("Received invalid recipe data:", recipeResponse);
          }
        });
        setShoppingListItems(Object.values(allIngredients));
      } catch (err) {
        console.error("Failed to generate shopping list:", err);
        setError("Failed to fetch recipe details for the shopping list.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      startTransition(() => {
        generateShoppingList();
      });
    }
  }, [isOpen, mealPlan]);

  const togglePurchased = (name) => {
    setPurchasedItems((prevPurchased) => {
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

  const renderContent = () => {
    if (isLoading) {
      return <ShoppingListSkeleton />;
    }
    if (error) {
      return <ErrorMessage message={error} />;
    }
    if (shoppingListItems.length > 0) {
      return (
        <>
          <div className="shopping-list-actions">
            <button
              onClick={clearCompleted}
              className="clear-completed-button"
              aria-label="Clear all purchased items"
            >
              <Trash2 size={16} />
              <span>Clear All</span>
            </button>
          </div>
          <ul className="shopping-list-items">
            {shoppingListItems.map((item) => {
              const isPurchased = purchasedItems.has(item.name);
              return (
                <li
                  key={item.name}
                  className={`shopping-list-item ${
                    isPurchased ? "purchased" : ""
                  }`}
                >
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isPurchased}
                      onChange={() => togglePurchased(item.name)}
                      className="sr-only" // Visually hide default checkbox
                    />
                    {isPurchased ? (
                      <CheckSquare size={20} />
                    ) : (
                      <Square size={20} />
                    )}
                    <span className="item-measure">{item.measure}</span>
                    <span className="item-name">
                      {item.name} {isPurchased && "(Purchased)"}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </>
      );
    }
    return (
      <p className="empty-list-message">
        Your shopping list is empty. Add some meals to your plan to get started!
      </p>
    );
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <div
        className={`shopping-list-sidebar ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal={isOpen ? "true" : "false"}
        aria-labelledby="shopping-list-title"
        tabIndex={-1} // Make div focusable
        ref={sidebarRef}
      >
        <div className="sidebar-header">
          <ShoppingBag size={28} />
          <h2 id="shopping-list-title">Shopping List</h2>
          <button
            onClick={onClose}
            className="close-sidebar-button"
            aria-label="Close shopping list"
          >
            <X size={24} />
          </button>
        </div>
        {renderContent()}
      </div>
    </>
  );
};

export default ShoppingListSidebar;