import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../AuthContext';

export default function ShopProducts() {
  const { shopId } = useParams();
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [shopName, setShopName] = useState('');
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/shops/${shopId}`);
      setProducts(res.data.products || []);
      setShopName(res.data.name || '');
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || err.message || 'Failed to load products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [shopId]);

  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await api.delete(`/products/${productId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.status === 200) {
        alert('Product deleted successfully');
        setProducts(prev => prev.filter(p => p._id !== productId));
      }
    } catch (err) {
      alert(err.response?.data?.msg || err.message || 'Failed to delete product');
    }
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mb-4">{shopName} - Products</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 && !error && <p>No products available</p>}
        {products.map(p => (
          <div key={p._id} className="card p-4 hover:shadow-lg transition">
            <h3 className="font-medium">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>
            <div className="mt-2 text-sm font-semibold">${p.price}</div>

            <div className="mt-2 flex space-x-2">
              <Link to={`/products/${p._id}/edit`} className="text-xs underline">Edit</Link>
              <button onClick={() => deleteProduct(p._id)} className="text-xs text-red-600 underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link to="/" className="text-blue-600 underline">Back to Shops</Link>
      </div>
    </div>
  );
}
