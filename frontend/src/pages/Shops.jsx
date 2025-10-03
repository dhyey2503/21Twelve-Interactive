import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Shops() {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const fetchShops = async () => {
    try {
      const res = await api.get('/shops/all');
      setShops(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load shops');
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  // Delete shop
  const deleteShop = async (shopId) => {
    if (!window.confirm('Are you sure you want to delete this shop?')) return;

    try {
      const res = await api.delete(`/shops/${shopId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.status === 200) {
        alert('Shop deleted successfully');
        setShops(prev => prev.filter(s => s._id !== shopId));
      } else {
        alert(`Failed to delete shop: ${res.statusText}`);
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.msg || err.message || 'Unknown error';
      alert(`Failed to delete shop: ${msg}`);
    }
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mb-4">Shops</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shops.map(s => (
          <div key={s._id} className="card p-4 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">{s.name}</h3>
            <p className="text-sm text-gray-600">{s.description}</p>

            <div className="mt-3 flex items-center space-x-2">
              <Link to={`/shops/${s._id}/edit`} className="text-sm underline">Edit Shop</Link>
              <button
                onClick={() => deleteShop(s._id)}
                className="text-sm text-red-600 underline"
              >
                Delete Shop
              </button>
            </div>

            <div className="mt-3">
              <Link 
                to={`/shops/${s._id}/products`} 
                className="text-sm font-medium text-blue-600 underline"
              >
                View Products ({s.products?.length || 0})
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
