

"use client"
import React, { useState, useEffect } from "react";
import "./globals.css";

function App() {
  const [products, setProducts] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
    };

    fetchData();
  }, []);

  function handleSearch(e) {
    setSearchWord(e.target.value);
  }

  function handleSort(e) {
    setSortPrice(e.target.value);
  }

  // Search products
  const searchedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchWord.toLowerCase())
  );

  // Sort by price
  const sortedProducts = [...searchedProducts].sort((a, b) => {
    if (sortPrice === "lowToHigh") {
      return a.price - b.price;
    } else if (sortPrice === "highToLow") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  // Filter products by selected categories
  const filteredProducts = selectedCategories.includes("All")
    ? sortedProducts
    : sortedProducts.filter(product => selectedCategories.includes(product.category));

  // Extracting unique categories from products
  const categories = ["All", ...new Set(products.map(product => product.category))];

  // Event handler for category selection
  const handleCategorySelect = (category) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      const currentIndex = selectedCategories.indexOf("All");
      if (currentIndex !== -1) {
        setSelectedCategories([category]);
      } else {
        const newCategories = [...selectedCategories];
        if (newCategories.includes(category)) {
          newCategories.splice(newCategories.indexOf(category), 1);
        } else {
          newCategories.push(category);
        }
        setSelectedCategories(newCategories);
      }
    }
  };

  return (
    <div>
      <div className="main">
        <h1>Product App</h1>
        <input
          className="search"
          type="text"
          placeholder="Search"
          value={searchWord}
          onChange={handleSearch}
        />
        <p>Sort by price:</p>
        <select value={sortPrice} onChange={handleSort}>
          <option value="none">None</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>

        <div>
          <h3>Categories:</h3>
          <div>
            {categories.map((category, index) => (
              <button
                key={index}
                className={selectedCategories.includes(category) ? "selected" : ""}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card-container">
        {filteredProducts.map((product, id) => (
          <div className="card" key={id}>
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;