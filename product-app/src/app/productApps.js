import React, { useContext, useEffect } from "react";
import { productContext, productDispatchContext } from "./productContext";

export default function ProductApps() {
  const { products, searchWord, sortPrice } = useContext(productContext);
  const dispatch = useContext(productDispatchContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      dispatch({
        type: 'SET_PRODUCTS',
        value: data.products
    });
    }
    fetchData();
  }, []);

  const handleSearch = (e) => {
    dispatch({
      type: "SEARCH",
      value: e.target.value,
    });
  };

  const handleSort = (e) => {
    dispatch({
      type: "SORT",
      value: e.target.value,
    });
  };

  // Search products
  const searchedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchWord.toLowerCase())
  );

  // Sort 
  const sortedProducts = [...searchedProducts].sort((a, b) => {
    if (sortPrice === "lowToHigh") {
      return a.price - b.price;
    } else if (sortPrice === "highToLow") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <div className="main">
        <h1>Product Search App</h1>
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
      </div>
      

      <div className="card-container">
        {sortedProducts.map((product, id) => (
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
