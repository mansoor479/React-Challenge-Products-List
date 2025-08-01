import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = 'https://fakestoreapi.com/products';

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(API_BASE).then(res => res.json()).then(setProducts);
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2>Products</h2>
      <Link to="/products/new">Add product</Link>
      <table>
        <thead>
          <tr><th>Name</th><th>Description</th><th>Price</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.description.slice(0, 30)}...</td>
              <td>${p.price}</td>
              <td>
                <Link to={`/products/show/${p.id}`}>Show</Link>{' '}
                <Link to={`/products/edit/${p.id}`}>Edit</Link>{' '}
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
