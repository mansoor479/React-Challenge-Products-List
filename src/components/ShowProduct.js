import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_BASE = 'https://fakestoreapi.com/products';

export default function ShowProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/${id}`).then(res => res.json()).then(setProduct);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <Link to="/products">Back</Link> |{' '}
      <Link to={`/products/edit/${product.id}`}>Edit</Link>
    </div>
  );
}
