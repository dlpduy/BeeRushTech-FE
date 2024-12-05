import React, { useEffect, useState } from "react";
import "./FilterSidebar.css";

const FilterSidebar = ({ setFilterCriteria }) => {
  const [selectedCategories, setSelectedCategories] = useState([]); // Selected categories
  const [expandedCategories, setExpandedCategories] = useState({}); // Categories expansion state
  const [priceRange, setPriceRange] = useState([10, 200]); // Price range

  // Handle price change
  const handlePriceChange = (event, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = Number(event.target.value);

    // Ensure the price range is valid
    if (index === 0 && newPriceRange[0] > newPriceRange[1]) {
      newPriceRange[1] = newPriceRange[0];
    } else if (index === 1 && newPriceRange[1] < newPriceRange[0]) {
      newPriceRange[0] = newPriceRange[1];
    }

    setPriceRange(newPriceRange);
  };

  // Toggle category selection (expand/collapse)
  const handleCategorySelect = (brand) => {
    setExpandedCategories((prevExpandedCategories) => ({
      ...prevExpandedCategories,
      [brand]: !prevExpandedCategories[brand],
    }));
  };

  // Handle subcategory selection (add or remove from selected categories)
  const handleSubcategorySelect = (subcategory) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(subcategory)
        ? prevSelectedCategories.filter((item) => item !== subcategory)
        : [...prevSelectedCategories, subcategory]
    );
  };

  // Update the filter criteria whenever selected categories or price range changes
  useEffect(() => {
    setFilterCriteria({ categories: selectedCategories, priceRange });
  }, [selectedCategories, priceRange, setFilterCriteria]); // Trigger every time categories or price range changes

  return (
    <div className="filter-sidebar">
      <h4 className="filter-title">Filters</h4>

      {/* Category Filter */}
      <div className="filter-section">
        <h4>Category</h4>
        <ul>
          <li
            onClick={() => handleCategorySelect("Cameras & Lenses")}
            className={expandedCategories["Cameras & Lenses"] ? "expanded" : ""}
          >
            Cameras & Lenses <span>{expandedCategories["Cameras & Lenses"] ? "▼" : "►"}</span>
          </li>
          {expandedCategories["Cameras & Lenses"] && (
            <ul className="subcategory">
              <li
                onClick={() => handleSubcategorySelect("Sony")}
                className={selectedCategories.includes("Sony") ? "selected" : ""}
              >
                Sony
              </li>
              <li
                onClick={() => handleSubcategorySelect("Fujifilm")}
                className={selectedCategories.includes("Fujifilm") ? "selected" : ""}
              >
                Fujifilm
              </li>
              <li
                onClick={() => handleSubcategorySelect("Nikon")}
                className={selectedCategories.includes("Nikon") ? "selected" : ""}
              >
                Nikon
              </li>
            </ul>
          )}

          <li
            onClick={() => handleCategorySelect("Speaker")}
            className={expandedCategories["Speaker"] ? "expanded" : ""}
          >
            Speaker <span>{expandedCategories["Speaker"] ? "▼" : "►"}</span>
          </li>
          {expandedCategories["Speaker"] && (
            <ul className="subcategory">
              <li
                onClick={() => handleSubcategorySelect("Sony")}
                className={selectedCategories.includes("Sony") ? "selected" : ""}
              >
                Sony
              </li>
              <li
                onClick={() => handleSubcategorySelect("JBL")}
                className={selectedCategories.includes("JBL") ? "selected" : ""}
              >
                JBL
              </li>
            </ul>
          )}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div className="price-slider-container">
        <div className="price-slider">
          <input
            type="range"
            className="top"
            min="0"
            max="1000000"
            step="10"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
          />
          <input
            type="range"
            className="bottom"
            min="10000"
            max="100000000"
            step="10000"
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
  );
};

export default FilterSidebar;
