import React from "react";
import { useEffect,useState } from "react";
import styles from './NewProduct.module.css'
import ProductCard from "../../Category/Product/component/ProductCard";


const NewProduct = ()=>{
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
                <div className={styles.bold}>NEW </div> Products 
            </div>
            <div className={styles.productContainer}>
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}

            <div className={styles.viewAll}>
                <div className={styles.view_all_content}>
                </div>
            </div>
            </div>
        </div>
        
    );
}


export default NewProduct;


