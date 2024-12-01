// src/mockData.js
export const mockProducts = [
    {
      id: 1,
      name: "Product 1",
      category: "Category 1",
      price: 100,
      description: "This is a mock product for testing purposes.",
      colors: ["#FF5733", "#33FF57", "#3357FF"],
      discountedPrice: 80,
       // Bạn có thể thay đổi đường dẫn ảnh này theo ý muốn
      rating: 4.5,
      rents:5000,
      storageOptions: [
        { size: "32GB", inStock: 10 },
        { size: "64GB", inStock: 5 },
        { size: "128GB", inStock: 2 },
      ],
    },
    {
      id: 2,
      name: "Product 2",
      category: "Category 2",
      price: 200,
      description: "This is a mock product for testing purposes.",
      colors: ["#FF5733", "#33FF57", "#3357FF"],
      discountedPrice: 150,
      rating: 4.2,
      rents:6000,
      storageOptions: [
        { size: "32GB", inStock: 10 },
        { size: "64GB", inStock: 5 },
        { size: "128GB", inStock: 2 },
      ],
    },
    {
      id: 3,
      name: "Product 3",
      category: "Category 3",
      price: 50,
      description: "This is a mock product for testing purposes.",
      colors: ["#FF5733", "#33FF57", "#3357FF"],
      discountedPrice: 0, // Không có giá giảm
      rating: 4.0,
      rents:7000,
      storageOptions: [
        { size: "32GB", inStock: 10 },
        { size: "64GB", inStock: 5 },
        { size: "128GB", inStock: 2 },
      ],
    },
    {
      id: 4,
      name: "Product 4",
      category: "Category 4",
      price: 50,
      description: "This is a mock product for testing purposes.",
      colors: ["#FF5733", "#33FF57", "#3357FF"],
      discountedPrice: null, // Không có giá giảm
      rating: 4.0,
      rents:8000,
      storageOptions: [
        { size: "32GB", inStock: 10 },
        { size: "64GB", inStock: 5 },
        { size: "128GB", inStock: 2 },
      ],
    },
  ];
  