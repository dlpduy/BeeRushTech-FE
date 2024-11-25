import React, { useEffect, useState } from "react";
import "./FilterSidebar.css";

const FilterSidebar = ({ setFilterCriteria }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([10, 200]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setExpandedCategory(category === expandedCategory ? null : category);
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedCategory(subcategory);
    setExpandedCategory(null);
  };

  const handlePriceChange = (event, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = Number(event.target.value);
    setPriceRange(newPriceRange);
  };

  useEffect(() => {
    setFilterCriteria({ category: selectedCategory, priceRange });
  }, [selectedCategory, priceRange, setFilterCriteria]);

  return (
    <div className="filter-sidebar">
      <h4 className="filter-title">Filters</h4>

      {/* Category Filter */}
      <div className="filter-section">
        <h4>Category</h4>
        <ul>
          <li onClick={() => handleCategorySelect("Cameras & Lenses")}>
            Cameras & Lenses <span>{expandedCategory === "Cameras & Lenses" ? "▼" : "►"}</span>
          </li>
          {expandedCategory === "Cameras & Lenses" && (
            <ul className="subcategory">
              <li onClick={() => handleSubcategorySelect("Sony")}>Sony</li>
              <li onClick={() => handleSubcategorySelect("Fujifilm")}>Fujifilm</li>
              <li onClick={() => handleSubcategorySelect("Nikon")}>Nikon</li>
            </ul>
          )}
          <li onClick={() => handleCategorySelect("Smartphones")}>
            Smartphones <span>{expandedCategory === "Smartphones" ? "▼" : "►"}</span>
          </li>
          {expandedCategory === "Smartphones" && (
            <ul className="subcategory">
              <li onClick={() => handleSubcategorySelect("Apple")}>Apple</li>
              <li onClick={() => handleSubcategorySelect("Samsung")}>Samsung</li>
            </ul>
          )}
        </ul>
      </div>

      {/* Price Filter */}
      <div className="filter-section">
        <h4>Price</h4>
        <div className="price-slider-container">
          <div className="price-slider">
            <input
              type="range"
              min="10"
              max="200"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
            />
            <input
              type="range"
              min="10"
              max="200"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
            />
          </div>
          <div className="price-range">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Apply Filter Button */}
      <button className="apply-filter-button">Apply Filter</button>
    </div>
  );
};

export default FilterSidebar;
