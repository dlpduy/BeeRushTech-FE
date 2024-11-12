import React, { useState } from 'react';

const FilterSidebar = ({ setFilterCriteria, applyFilter }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 300]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handlePriceChange = (event, index) => {
        const newPriceRange = [...priceRange];
        newPriceRange[index] = Number(event.target.value);
        setPriceRange(newPriceRange);
    };

    const handleApplyFilter = () => {
        setFilterCriteria({ category: selectedCategory, priceRange });
        applyFilter();
    };

    return (
        <div>
            <div style={styles.section}>
                
                <ul style={styles.categoryList}>
                    <li style={styles.categoryItem} onClick={() => handleCategorySelect('Máy ảnh & Máy quay')}>
                        Máy ảnh & Máy quay
                    </li>
                    <li style={styles.categoryItem} onClick={() => handleCategorySelect('Chân máy')}>
                        Chân máy
                    </li>
                    <li style={styles.categoryItem} onClick={() => handleCategorySelect('Flycam')}>
                        Flycam
                    </li>
                    <li style={styles.categoryItem} onClick={() => handleCategorySelect('Smart phone')}>
                        Smart phone
                    </li>
                </ul>
            </div>

            <div style={styles.section}>
                <h4 style={styles.categoryTitle}>Price</h4>
                <div style={styles.sliderContainer}>
                    <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        style={styles.slider}
                    />
                    <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        style={styles.slider}
                    />
                </div>
                <div style={styles.priceRange}>
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            <button onClick={handleApplyFilter} style={styles.applyButton}>Apply Filter</button>
        </div>
    );
};

const styles = {
    sidebar: {
        width: '250px',
        padding: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px', 
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px',
    },
    section: {
        marginBottom: '16px',
    },
    categoryTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '8px',
    },
    categoryList: {
        listStyleType: 'none',
        padding: 0,
    },
    categoryItem: {
        padding: '8px 0',
        cursor: 'pointer',
    },
    sliderContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '8px',
    },
    slider: {
        appearance: 'none',
        width: '100%',
        height: '5px',
        background: '#ddd',
        outline: 'none',
        opacity: '0.7',
        transition: 'opacity .15s ease-in-out',
    },
    priceRange: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
    },
    applyButton: {
        width: '100%',
        padding: '10px 0',
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default FilterSidebar;
