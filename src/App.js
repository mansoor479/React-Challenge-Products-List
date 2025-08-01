import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllProducts from './components/AllProducts';
import ShowProduct from './components/ShowProduct';
import ProductForm from './components/ProductForm';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/show/:id" element={<ShowProduct />} />
        <Route path="/products/new" element={<ProductForm mode="new" />} />
        <Route path="/products/edit/:id" element={<ProductForm mode="edit" />} />
        <Route path="*" element={<AllProducts />} />
      </Routes>
    </Router>
  );
}
