import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const API_BASE = 'https://fakestoreapi.com/products';

export default function ProductForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', price: '', description: '' });

  useEffect(() => {
    if (mode === 'edit' && id) {
      fetch(`${API_BASE}/${id}`).then(res => res.json()).then(data => {
        setFormData({ title: data.title, price: data.price, description: data.description });
      });
    }
  }, [mode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: mode === 'edit' ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    const url = mode === 'edit' ? `${API_BASE}/${id}` : API_BASE;
    await fetch(url, options);
    navigate('/products');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === 'edit' ? `Edit ${formData.title}` : 'New Product'}</h2>
      <input placeholder="Name" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
      <input placeholder="Price" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
      <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
      <button type="submit">{mode === 'edit' ? 'Update' : 'Create'}</button>
      <br />
      <Link to="/products">Go back</Link>
    </form>
  );
}
