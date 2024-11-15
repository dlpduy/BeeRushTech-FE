import React, { useState } from 'react';

const FilterSidebar = ({ setFilterCriteria, applyFilter }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 300]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setExpandedCategory(category === expandedCategory ? null : category);
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
        <div style={styles.sidebar}>
            <h4 style={styles.title}>Filters</h4>
            
            {/* Category Section */}
            <div style={styles.section}>
                
                <ul style={styles.categoryList}>
                    <li style={styles.categoryHeader} onClick={() => handleCategorySelect('Máy ảnh & Máy quay')}>
                        <span>Máy ảnh & Máy quay</span>
                        <span style={styles.arrow}>{expandedCategory === 'Máy ảnh & Máy quay' ? '▼' : '►'}</span>
                    </li>
                    {expandedCategory === 'Máy ảnh & Máy quay' && (
                        <ul style={styles.subcategoryList}>
                            <li style={styles.subcategoryItem}>Sony</li>
                            <li style={styles.subcategoryItem}>Fujifilm</li>
                            <li style={styles.subcategoryItem}>Nikon</li>
                        </ul>
                    )}
                    <li style={styles.categoryHeader} onClick={() => handleCategorySelect('Ống kính')}>
                        <span>Ống kính</span>
                        <span style={styles.arrow}>{expandedCategory === 'Ống kính' ? '▼' : '►'}</span>
                    </li>
                    {expandedCategory === 'Ống kính' && (
                        <ul style={styles.subcategoryList}>
                            <li style={styles.subcategoryItem}>Canon</li>
                            <li style={styles.subcategoryItem}>Sigma</li>
                        </ul>
                    )}
                    <li style={styles.categoryHeader} onClick={() => handleCategorySelect('Chân máy')}>
                        <span>Chân máy</span>
                        <span style={styles.arrow}>{expandedCategory === 'Chân máy' ? '▼' : '►'}</span>
                    </li>
                    {expandedCategory === 'Chân máy' && (
                        <ul style={styles.subcategoryList}>
                            <li style={styles.subcategoryItem}>Manfrotto</li>
                            <li style={styles.subcategoryItem}>Gitzo</li>
                        </ul>
                    )}
                    <li style={styles.categoryHeader} onClick={() => handleCategorySelect('Flycam')}>
                        <span>Flycam</span>
                        <span style={styles.arrow}>{expandedCategory === 'Flycam' ? '▼' : '►'}</span>
                    </li>
                    {expandedCategory === 'Flycam' && (
                        <ul style={styles.subcategoryList}>
                            <li style={styles.subcategoryItem}>DJI</li>
                            <li style={styles.subcategoryItem}>Parrot</li>
                        </ul>
                    )}
                </ul>
            </div>

            {/* Price Section */}
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
        fontFamily: 'Lato, sans-serif',
        padding: '20px',
        h4: '20px',
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '24px',
    },
    section: {
        marginTop: '24px',
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
    categoryHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
        cursor: 'pointer',
        fontSize: '16px',
    },
    arrow: {
        marginLeft: 'auto',
        fontSize: '12px',
    },
    subcategoryList: {
        listStyleType: 'none',
        padding: '8px 0 0 16px',
        margin: 0,
    },
    subcategoryItem: {
        padding: '4px 0',
        cursor: 'pointer',
        fontSize: '14px',
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
