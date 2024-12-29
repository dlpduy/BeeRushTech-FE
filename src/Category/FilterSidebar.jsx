import React, { useEffect, useState } from "react";
import "./FilterSidebar.css";

const FilterSidebar = ({ allProducts, setFilterCriteria }) => {
  const [expandedCategories, setExpandedCategories] = useState({}); // Trạng thái mở rộng thể loại
  const [selectedCategory, setSelectedCategory] = useState(null); // Thể loại đã chọn
  const [selectedBrand, setSelectedBrand] = useState(null); // Thương hiệu đã chọn
  const [priceRange, setPriceRange] = useState([1000, 200000]); // Khoảng giá

  // Lấy danh sách thể loại duy nhất từ `allProducts`
  const categories = [...new Set(allProducts.map((product) => product.category.name))];

  // Lấy danh sách thương hiệu theo thể loại đã chọn
  const getBrandsForCategory = (categoryName) => {
    return [
      ...new Set(
        allProducts
          .filter((product) => product.category.name === categoryName)
          .map((product) => product.brand)
      ),
    ];
  };

  // Xử lý thay đổi khoảng giá
  const handlePriceChange = (event, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = Number(event.target.value);

    if (index === 0 && newPriceRange[0] > newPriceRange[1]) {
      newPriceRange[1] = newPriceRange[0];
    } else if (index === 1 && newPriceRange[1] < newPriceRange[0]) {
      newPriceRange[0] = newPriceRange[1];
    }

    setPriceRange(newPriceRange);
  };

  // Chọn hoặc mở rộng thể loại
  const handleCategorySelect = (categoryName) => {
    setExpandedCategories((prevExpanded) => ({
      ...prevExpanded,
      [categoryName]: !prevExpanded[categoryName],
    }));

    // Reset thương hiệu đã chọn nếu thể loại thay đổi
    if (selectedCategory !== categoryName) {
      setSelectedCategory(categoryName);
      setSelectedBrand(null);
    }
  };

  // Chọn thương hiệu
  const handleBrandSelect = (brandName) => {
    setSelectedBrand(brandName === selectedBrand ? null : brandName);
  };

  // Cập nhật bộ lọc khi thể loại, thương hiệu hoặc khoảng giá thay đổi
  useEffect(() => {
    setFilterCriteria({
      category: selectedCategory,
      brand: selectedBrand,
      priceRange,
    });
  }, [selectedCategory, selectedBrand, priceRange, setFilterCriteria]);

  return (
    <div className="filter-sidebar">
      <h4 className="filter-title">Bộ lọc</h4>

      {/* Bộ lọc thể loại và thương hiệu */}
      <div className="filter-section">
        <h4>Thể loại</h4>
        <ul>
          {categories.map((categoryName) => (
            <li key={categoryName}>
              {/* Tên thể loại */}
              <div
                onClick={() => handleCategorySelect(categoryName)}
                className={`category-item ${
                  selectedCategory === categoryName ? "selected" : ""
                }`}
              >
                {categoryName}{" "}
                <span>{expandedCategories[categoryName] ? "▼" : "►"}</span>
              </div>

              {/* Danh sách thương hiệu thuộc thể loại */}
              {expandedCategories[categoryName] && (
                <ul className="subcategory">
                  {getBrandsForCategory(categoryName).map((brandName) => (
                    <li
                      key={brandName}
                      onClick={() => handleBrandSelect(brandName)}
                      className={`brand-item ${
                        selectedBrand === brandName ? "selected" : ""
                      }`}
                    >
                      {brandName}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Bộ lọc khoảng giá */}
      <div className="price-slider-container">
        <h4>Khoảng giá</h4>
        <div className="price-slider">
          <input
            type="range"
            min="1000"
            max="1000000"
            step="1000"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
          />
          <input
            type="range"
            min="1000"
            max="1000000"
            step="1000"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
          />
        </div>
        <div className="price-range">
          <span>Tối thiểu: {priceRange[0]} VND</span>
          <span>Tối đa: {priceRange[1]} VND</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
