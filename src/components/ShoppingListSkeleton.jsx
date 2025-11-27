const ShoppingListSkeleton = () => {
  return (
    <div className="shopping-list-skeleton">
      <div className="shopping-list-actions">
        <div className="skeleton skeleton-button"></div>
      </div>
      <ul className="shopping-list-items">
        {Array.from({ length: 15 }).map((_, index) => (
          <li key={index} className="shopping-list-item">
            <div className="skeleton skeleton-checkbox"></div>
            <div className="skeleton skeleton-text skeleton-measure"></div>
            <div className="skeleton skeleton-text skeleton-name"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListSkeleton;
