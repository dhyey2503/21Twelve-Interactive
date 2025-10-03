import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Register from './pages/Register';
import Login from './pages/Login';
import Shops from './pages/Shops';
import ShopForm from './pages/ShopForm';
import ProductForm from './pages/ProductForm';
import ShopProducts from './pages/ShopProducts';
import { AuthProvider, useAuth } from './AuthContext';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Shops />} />
          <Route path="/shops/new" element={<PrivateRoute><ShopForm /></PrivateRoute>} />
          <Route path="/shops/:id/edit" element={<PrivateRoute><ShopForm /></PrivateRoute>} />
          
          {/* View products of a shop */}
          <Route path="/shops/:shopId/products" element={<PrivateRoute><ShopProducts /></PrivateRoute>} />

          <Route path="/products/new" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
          <Route path="/products/:id/edit" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
