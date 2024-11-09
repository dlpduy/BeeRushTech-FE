import React from "react";
import ProductCard from "../../Category/Product/component/ProductCard";
import { useState,useEffect } from "react";
import styles from './HotItem.module.css'


const HotItem = () => {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    // Mock product data
    const mockData = [
      { name: 'Product A', rentalCount: 120, image: 'https://via.placeholder.com/150' },
      { name: 'Product B', rentalCount: 110, image: 'https://via.placeholder.com/150' },
      { name: 'Product C', rentalCount: 95, image: 'https://via.placeholder.com/150' },
      { name: 'Product D', rentalCount: 80, image: 'https://via.placeholder.com/150' },
      { name: 'Product E', rentalCount: 75, image: 'https://via.placeholder.com/150' }
    ];

    // Sort by rental count and get top 4 products
    const topProducts = mockData.sort((a, b) => b.rentalCount - a.rentalCount).slice(0, 4);
    setProducts(topProducts);
  }, []);
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.bold}>HOT </div> Items
            </div>
            <div className={styles.productContainer}>
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}

            <div className={styles.viewAll}>
                <div className={styles.view_all_content}>
                    View all
                </div>
            </div>
            </div>
        </div>
    );
}


export default HotItem;