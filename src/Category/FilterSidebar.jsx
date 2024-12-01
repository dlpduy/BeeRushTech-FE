import React, { useEffect, useState } from "react";
import "./FilterSidebar.css";

const FilterSidebar = ({ setFilterCriteria }) => {
  const [selectedCategories, setSelectedCategories] = useState([]); // Lưu trữ các lựa chọn
  const [expandedCategories, setExpandedCategories] = useState({}); // Trạng thái mở/đóng cho từng danh mục
  const [priceRange, setPriceRange] = useState([10, 200]);

  const handlePriceChange = (event, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = Number(event.target.value);

    // Đảm bảo giá trị bên dưới luôn lớn hơn hoặc bằng giá trị bên trên
    if (index === 0 && newPriceRange[0] > newPriceRange[1]) {
      newPriceRange[1] = newPriceRange[0];
    } else if (index === 1 && newPriceRange[1] < newPriceRange[0]) {
      newPriceRange[0] = newPriceRange[1];
    }

    setPriceRange(newPriceRange);
  };

  const handleCategorySelect = (category) => {
    setExpandedCategories(prevExpandedCategories => ({
      ...prevExpandedCategories,
      [category]: !prevExpandedCategories[category], // Đảo trạng thái mở/đóng của danh mục
    }));
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedCategories(prevSelectedCategories =>
      prevSelectedCategories.includes(subcategory)
        ? prevSelectedCategories.filter(item => item !== subcategory) // Nếu đã chọn, bỏ chọn
        : [...prevSelectedCategories, subcategory] // Nếu chưa chọn, thêm vào
    );
  };


  useEffect(() => {
    setFilterCriteria({ categories: selectedCategories, priceRange }); // Truyền danh sách các lựa chọn vào setFilterCriteria
  }, [selectedCategories, priceRange, setFilterCriteria]);

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
            max="500"
            step="1"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
          />
          <input
            type="range"
            className="bottom"
            min="0"
            max="500"
            step="1"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
          />
        </div>
        <div className="price-range">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Apply Filters Button */}
      <button className="apply-filter-button">Apply Filters</button>
    </div>
  );
};

export default FilterSidebar;
